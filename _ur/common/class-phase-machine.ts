/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  PhaseMachine allows you to define "operation phase_def" in the lifecycle that
  run hooks in a specific order. The addHook functions that are provided can
  return a Promise that must be resolved before the next addHook is called.

  When creating a PhaseMachine instance, it is given a PM_Name and a phase_def
  structure consists of PHASE_GROUPS containing PHASES. 

  The main API function is HookPhase(pmHookSelector, handlerFunc), which allows you
  to add a hook to a phase or phase group. The hook selector is simply
  PM_Name+'/'+PHASEID.

  If the machine doesn't yet exist, the hook will be queued until the machine
  with matching PM_Name. On creation, the queued hooks will be processed and
  added to the function lists held for each phase.

  PhaseMachine instances are managed by a "Game Loop" or "Startup Sequence"
  manager that calls each PHASE_GROUP in succession. If a handerFunc returns
  a Promise, the next phase will not be called until the Promise resolves.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPES & INTERFACES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type PM_Name = string; // uppercase string
type PM_State = {
  _cur_phase: PM_PhaseID;
  _cur_group: PM_PhaseID;
  [key: string]: any;
};
type PM_PhaseID = string; // upper snakecase string for groups and phases
type PM_PhaseGroup = `PHASE_${PM_PhaseID}`; // e.g. 'PHASE_UPDATE_ALL'
type PM_PhaseList = PM_PhaseID[]; // list of phase names
type PM_Definition = {
  [phaseGroup: PM_PhaseID]: PM_PhaseList;
};
type PM_HookSelector = `${PM_Name}/${PM_PhaseID}`; // e.g. 'SIM/UPDATE_ALL'
type PM_HookFunction = (
  machine?: PM_Name,
  phase?: PM_PhaseID
) => void | Promise<void>;
type PM_Hook = {
  phase: PM_PhaseID;
  exec?: PM_HookFunction;
  enter?: PM_HookFunction;
  exit?: PM_HookFunction;
};
type PM_HookEvent = 'enter' | 'exit' | 'exec';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
const WARN = console.warn.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const m_machines: Map<PM_Name, PhaseMachine> = new Map();
const m_queue: Map<PM_Name, PM_Hook[]> = new Map();

/// PRIVATE HELPERS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: extract the phase machine and phase from a string delimited by
 *  a slash. For example, 'SIM/UPDATE_ALL' designates the machine 'SIM' with
 *  a phase called 'UPDATE_ALL'
 *  note: phase groups are also valid phase IDs for a hook, and fire AFTER
 *  all phases in the group have completed.
 */
function m_DecodeHookSelector(phaseSelector: string): [PM_Name, PM_PhaseID] {
  const fn = 'm_DecodeHookSelector:';
  if (typeof phaseSelector !== 'string') throw Error('arg must be non-empty string');
  const bits = phaseSelector.split('/');
  if (bits.length !== 2)
    throw Error(`${fn} malformed phase selector '${phaseSelector}'`);
  // return as tuple machine, phase
  const machineName: PM_Name = bits[0].toUpperCase();
  const phaseName: PM_PhaseID = bits[1].toUpperCase();
  return [machineName, phaseName];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: extract the phase group from a phase ID */
function m_DecodePhaseGroup(pm: PhaseMachine, phaseID: PM_PhaseID): PM_PhaseGroup {
  if (!(pm instanceof PhaseMachine)) throw Error('arg1 must be PhaseMachine');
  return pm.lookupPhaseGroup(phaseID);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: process queued hooks for a phasemachine name. */
function m_ProcessHookQueue(pmName: PM_Name) {
  const fn = 'm_ProcessHookQueue:';
  const machine = m_machines.get(pmName);
  if (!machine) {
    WARN(`${pmName} not yet defined`);
    return;
  }
  const qhooks = m_queue.get(pmName) || [];
  if (DBG) LOG(`phasemachine '${pmName}' has ${qhooks.length} queued ops`);
  try {
    qhooks.forEach(hook => machine.addHook(hook.phase, hook));
    m_queue.delete(pmName);
  } catch (e) {
    console.warn('Error while processing queued phasemachine hooks');
    throw Error(e.toString());
  }
}

/// URSYS PhaseMachine CLASS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class PhaseMachine {
  pm_name: string;
  pm_state: PM_State;
  phase_hooks: Map<PM_PhaseID | PM_PhaseID, PM_Hook[]>; // name -> addHook[]
  phase_membership: Map<PM_PhaseID, PM_PhaseGroup>;
  phase_def: PM_Definition;
  phase_timer: ReturnType<typeof setTimeout>;

  constructor(pmName: PM_Name, phases: PM_Definition) {
    // initialize
    if (typeof pmName !== 'string') throw Error('arg1 must be string');
    if (pmName.length < 1) throw Error('arg1 string.length must be > 1');
    if (m_machines.has(pmName)) throw Error(`already registered '${pmName}'`);
    this.pm_name = pmName.toUpperCase();
    this.phase_hooks = new Map();
    this.phase_membership = new Map();
    this.phase_def = phases;
    this.pm_state = {
      _cur_phase: '', // current operation
      _cur_group: '' // current operation group
    };
    this.phase_timer = null;
    // parse phase_def into initial map structure
    // note that both phases and their group containers can be hooked
    const groupList: PM_PhaseGroup[] = Object.keys(this.phase_def) as PM_PhaseGroup[];
    groupList.forEach(pgroup => {
      // initialize an array to store hooks for each phase group name
      this.phase_hooks.set(pgroup, []);
      // now initialize array for each phase in the phase group
      this.phase_def[pgroup].forEach(p => {
        this.phase_hooks.set(p, []); // add each op in the phase to ophooks map
        this.phase_membership.set(p, pgroup); // add phase to group membership
      });
    });
    // save instance by name
    m_machines.set(pmName, this);
    // check queued hooks
    m_ProcessHookQueue(pmName);
  } // end constructor

  /** API: register an Operations Handler. <op> is a string constant
   *  define in phase_def and converted into the MAP. <f> is a function that
   *  will be invoked during the operation, and it can return a promise or value.
   */
  addHook(phid: PM_PhaseID, hook: PM_Hook) {
    const fn = 'addHook:';
    if (!this.phase_hooks.has(phid)) this.phase_hooks.set(phid, []);
    this.phase_hooks.get(phid).push(hook);
    if (DBG) LOG(`${fn} added hook for ${phid}`);
  }

  /** API: execute all hooks associated with a phase. If any phase
   *  returns a Promise, the function will wait for it to resolve before
   *  returning.
   */
  _promisePhase(
    phid: PM_PhaseID,
    event: PM_HookEvent = 'exec'
  ): Promise<void[]> | void {
    const fn = '_promisePhase:';
    // note: contents of PHASE_HOOKs are promise-generating functions
    if (phid.startsWith('PHASE_')) this.cur_group = phid;
    else {
      this.cur_group = this.phase_membership.get(phid);
      this.cur_phase = phid;
    }
    // check that there are promises to execute
    let hooks = this.phase_hooks.get(phid);
    if (hooks.length === 0) return Promise.resolve([]);
    // got this far, then invoke the hooks
    const promises = [];
    hooks.forEach(hook => {
      const fn = hook[event];
      if (typeof fn !== 'function') throw Error(`${fn} '${event}' is not defined`);
      const fname = `fn_${event}`;
      let retval = fn(this.pm_name, phid); // can return void or promise <void>
      if (retval instanceof Promise) promises.push(retval);
    });
    if (promises.length > 0) return Promise.all(promises);
  }

  /** API: execute all Promises associated with a Phase Group in serial order,
   *  waiting for each to resolve before executing the next. If there are hooks
   *  associated with the PhaseGroup, they fire after all Phases have completed.
   */
  async execPhaseGroup(pgroup: string, event: PM_HookEvent = 'exec') {
    const fn = 'execPhaseGroup:';
    this.cur_group = pgroup;
    if (DBG) LOG(`${fn} EXECUTING ${pgroup}`);
    // processes phases inside group first
    const phaseList = this.phase_def[pgroup];
    if (phaseList.length === 0) return;
    for (const phase of phaseList) await this._promisePhase(phase, event);
    // then process group hooks
    await this._promisePhase(pgroup, event);
  }

  /** helper: return hook function array for a given phase or phase group.
   *  It defaults to returning the 'exec' function.
   */
  getHookFunctions(phid: PM_PhaseID, event: PM_HookEvent = 'exec') {
    const hooks = this.phase_hooks.get(phid);
    return hooks.map(hook => hook[event]);
  }

  /** helper: check for phase group membership */
  lookupPhaseGroup(phid: string): PM_PhaseGroup {
    const fn = 'lookupPhaseGroup:';
    if (typeof phid !== 'string') throw Error(`${fn} arg must be string`);
    if (phid.startsWith('PHASE_') && this.phase_def[phid])
      return phid as PM_PhaseGroup;
    return this.phase_membership.get(phid);
  }

  /** helper: print current phase information to console */
  consolePhaseInfo(pr = 'PhaseInfo', bg = 'MediumVioletRed') {
    const phaseInfo = `${this.pm_name}/${this.cur_group}:${this.cur_phase}`;
    LOG(
      `%c${pr}%c`,
      `color:#fff;background-color:${bg};padding:3px 10px;border-radius:10px;`,
      'color:auto;background-color:auto'
    );
    return phaseInfo;
  }

  /** setter: update current phase */
  set cur_phase(phase: PM_PhaseID) {
    this.pm_state._cur_phase = phase;
  }

  /** setter: update current phase group */
  set cur_group(group: PM_PhaseID) {
    this.pm_state._cur_group = group;
  }

  /** getter: return current phase */
  get cur_phase() {
    return this.pm_state._cur_phase;
  }

  /** getter: return current phase group */
  get cur_group() {
    return this.pm_state._cur_group;
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: Register a PhaseHook at any time. If the machine doesn't yet exist,
   *  the hook will be queued until the machine is created */
  static HookPhase(
    selector: PM_HookSelector,
    fn: PM_HookFunction,
    event: PM_HookEvent = 'exec'
  ) {
    const [machine, phase] = m_DecodeHookSelector(selector);
    const pm = m_machines.get(machine);
    const hook = { phase, [event]: fn };
    // if the phase machine exists, add the hook
    if (pm) {
      pm.addHook(phase, hook);
      return;
    }
    // otherwise, queue the request, creating the machine queue if necessary
    if (!m_queue.has(machine)) m_queue.set(machine, []);
    const mq = m_queue.get(machine);
    mq.push(hook); // array of 2-element arrays
    m_ProcessHookQueue(machine);
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: Execute a PhaseGroup in a machine. If the machine doesn't yet exist,
   *  the function will throw an error. */
  static async RunPhaseGroup(
    selector: PM_HookSelector,
    event: PM_HookEvent = 'exec'
  ) {
    const [machine, phaseID] = m_DecodeHookSelector(selector);
    const pm = m_machines.get(machine);
    if (!pm) throw Error(`machine '${machine}' not yet defined`);
    const phaseGroup = m_DecodePhaseGroup(pm, phaseID);
    await pm.execPhaseGroup(phaseGroup, event);
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return a string of all current machines and their phase_def */
  static GetMachineStates() {
    let out = '';
    for (const [name, m] of m_machines) {
      if (out.length !== 0) out += ', ';
      out += `${name}[${m.cur_group}.${m.cur_phase}]`;
    }
    return out;
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return initialized PhaseMachine if it exists */
  static GetMachine(name: PM_Name) {
    return m_machines.get(name);
  }
  // end class PhaseMachine
}

/// STATIC METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function HookPhase(
  selector: PM_HookSelector,
  fn: PM_HookFunction,
  event: PM_HookEvent
) {
  PhaseMachine.HookPhase(selector, fn, event);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function RunPhaseGroup(selector: PM_HookSelector, event: PM_HookEvent) {
  PhaseMachine.RunPhaseGroup(selector, event);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function NewPhaseMachine(name: PM_Name, phases: PM_Definition) {
  return new PhaseMachine(name, phases);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetMachineStates() {
  return PhaseMachine.GetMachineStates();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetPhaseMachine(name: PM_Name) {
  return m_machines.get(name);
}

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default PhaseMachine;
export {
  NewPhaseMachine,
  HookPhase,
  RunPhaseGroup,
  GetPhaseMachine,
  GetMachineStates
};
export type { PM_Name, PM_Definition };
