/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  PhaseMachine allows you to define "operation phase_def" in the lifecycle that
  run hooks in a specific order. The addHookEntry functions that are provided can
  return a Promise that must be resolved before the next addHookEntry is called.

  When creating a PhaseMachine instance, it is given a MachineName and a phase_def
  structure consists of PHASE_GROUPS containing PHASES. 

  The main API function is HookPhase(pmHookSelector, handlerFunc), which allows you
  to add a hook to a phase or phase group. The hook selector is simply
  PHASEGROUP+'/'+PHASEID. An event suffix can be added to the PHASEID to designate
  :enter, :exec, or :exit events (default is :exec).

  If the machine doesn't yet exist, the hook will be queued until the machine
  with matching MachineName. On creation, the queued hooks will be processed and
  added to the function lists held for each phase.

  PhaseMachine instances are managed by a "Game Loop" or "Startup Sequence"
  manager that calls each PHASE_GROUP in succession. If a handerFunc returns
  a Promise, the next phase will not be called until the Promise resolves.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPES & INTERFACES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type MachineName = string; // uppercase string
type MachineState = {
  _cur_phase: PhaseID;
  _cur_group: PhaseID;
  [key: string]: any;
};
type PhaseID = string; // upper snakecase string for groups and phases
type PhaseGroupID = `PHASE_${PhaseID}`; // e.g. 'PHASE_UPDATE_ALL'
type PhaseList = PhaseID[]; // list of phase names
type PhaseDefinition = {
  [phaseGroup: PhaseID]: PhaseList;
};
type HookSelector = `${MachineName}/${PhaseID}`; // e.g. 'SIM/UPDATE_ALL'
type HookFunction = (machine?: MachineName, phase?: PhaseID) => void | Promise<any>;
type HookObj = {
  phase: PhaseID;
  enter?: HookFunction;
  exec?: HookFunction;
  exit?: HookFunction;
};
type HookEvent =
  | 'enter' // entering a phase
  | 'exec' //  while inside a phase
  | 'exit'; // exiting a phase

type Executors = [Function[], Promise<void>[]];
type Selectors = [MachineName, PhaseID, HookEvent];

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
const WARN = console.warn.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const m_machines: Map<MachineName, PhaseMachine> = new Map();
const m_queue: Map<MachineName, HookObj[]> = new Map();

/// PRIVATE HELPERS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: extract the phase machine and phase from a string delimited by
 *  a slash. For example, 'SIM/UPDATE_ALL' designates the machine 'SIM' with
 *  a phase called 'UPDATE_ALL'. Optional :event suffix can be added to the
 *  phase name to designate the event type, otherwise it defaults to 'exec'
 *  (phase events are lowercase strings 'enter', 'exec', 'exit')
 */
function m_DecodeHookSelector(sel: string): Selectors {
  const fn = 'm_DecodeHookSelector:';
  if (typeof sel !== 'string') throw Error('arg must be non-empty string');
  // regex to extract machine, phase, and event from string
  // of format 'machine/phase:event' where event is optional
  const regex = /([^/]+)\/([^:]+):?([^:]*)/;
  let [_, machine, phase, event] = sel.match(regex) || [];
  if (!machine || !phase) throw Error(`${fn} invalid hook selector '${sel}'`);
  if (machine && machine !== machine.toUpperCase())
    throw Error(`${fn} machine name must be uppercase`);
  if (phase && phase !== phase.toUpperCase())
    throw Error(`${fn} phase name must be uppercase`);
  if (!event) event = 'exec';
  if (!['enter', 'exec', 'exit'].includes(event))
    throw Error(`${fn} invalid event name '${event}'`);
  if (DBG) console.log(`${fn} ${machine} / ${phase} : ${event}`);
  return [machine, phase, event as HookEvent];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: extract the phase group from a phase ID */
function m_DecodePhaseGroup(pm: PhaseMachine, phaseID: PhaseID): PhaseGroupID {
  if (!(pm instanceof PhaseMachine)) throw Error('arg1 must be PhaseMachine');
  return pm.lookupPhaseGroup(phaseID);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: process queued hooks for a phasemachine name. */
function m_ProcessHookQueue(pmName: MachineName) {
  const fn = 'm_ProcessHookQueue:';
  const machine = m_machines.get(pmName);
  if (!machine) return; // machine not yet created
  const qhooks = m_queue.get(pmName) || [];
  if (DBG) LOG(`phasemachine '${pmName}' has ${qhooks.length} queued ops`);
  try {
    qhooks.forEach(hook => machine.addHookEntry(hook.phase, hook));
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
  pm_state: MachineState;
  phase_hooks: Map<PhaseID, HookObj[]>; // name -> addHookEntry[]
  phase_membership: Map<PhaseID, PhaseGroupID>;
  phase_def: PhaseDefinition;
  phase_timer: ReturnType<typeof setTimeout>;

  constructor(pmName: MachineName, phases: PhaseDefinition) {
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
    const groupList: PhaseGroupID[] = Object.keys(this.phase_def) as PhaseGroupID[];
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

  /// GETTER SETTER ///

  /** setter: update current phase */
  set cur_phase(phase: PhaseID) {
    this.pm_state._cur_phase = phase;
  }
  /** setter: update current phase group */
  set cur_group(group: PhaseID) {
    this.pm_state._cur_group = group;
  }
  /** return current phase */
  get cur_phase() {
    return this.pm_state._cur_phase;
  }
  /** return current phase group */
  get cur_group() {
    return this.pm_state._cur_group;
  }

  /** return the list of phasegroups or phases in the group */
  getPhaseList(phase?: PhaseID): string[] {
    if (phase === undefined) {
      const groups = Object.keys(this.phase_def);
      return groups;
    }
    const group = this.phase_def[phase];
    if (group === undefined) return [];
    return group;
  }

  /// PHASE OPERATIONS ///

  /** API: register an Operations Handler. <op> is a string constant
   *  define in phase_def and converted into the MAP. <f> is a function that
   *  will be invoked during the operation, and it can return a promise or value.
   */
  addHookEntry(phid: PhaseID, hook: HookObj) {
    const fn = 'addHookEntry:';
    if (!this.phase_hooks.has(phid)) this.phase_hooks.set(phid, []);
    this.phase_hooks.get(phid).push(hook);
    if (DBG) LOG(`${fn} added hook for ${phid}`);
  }

  /** API: execute all hooks associated with a phase event. If any phase
   *  returns a Promise, the function will wait for it to resolve before
   *  returning.
   */
  async _promiseHookEvaluation(phid: PhaseID, evt: HookEvent): Promise<void[]> {
    const fn = '_promiseHookEvaluation:';
    // housekeeping for phase group
    if (phid.startsWith('PHASE_')) this.cur_group = phid;
    else {
      this.cur_group = this.phase_membership.get(phid);
      this.cur_phase = phid;
    }
    // check that there are executors for this phase event
    let hooks = this.phase_hooks.get(phid); // array of hook objects
    if (hooks.length === 0) return Promise.resolve([]);
    // got this far, there is a mix of functions and promises
    const promises = [];
    // LOG(`hooks[${phid}]: ${hooks.map(h => h.phase)}`);
    for (const hook of hooks) {
      const hookFunc = hook[evt]; // { exec: fn, enter: fn, exit: fn }
      // first run the executor function
      if (hookFunc === undefined) return;
      let retval = hookFunc(this.pm_name, phid); // can return void or promise <void>
      // if the executor returns a promise, add it to the promises array
      if (retval instanceof Promise) {
        promises.push(retval);
      }
    }
    // suspend operation until all promises have resolved for this phase
    if (promises.length > 0) return await Promise.all(promises);
  }

  /** API: execute all Promises associated with a Phase Group in serial order,
   *  waiting for each to resolve before executing the next. If there are hooks
   *  associated with the PhaseGroup, they fire after all Phases have completed.
   */
  async invokeGroupHooks(pgroup: string) {
    const fn = 'invokeGroupHooks:';
    // housekeeping for phase group
    this.cur_group = pgroup;
    // LOG(`${fn} executing group ${pgroup}`);
    // process the group enter hooks
    await this._promiseHookEvaluation(pgroup, 'enter'); // prgroup is just another named phase in this context
    // processes phases inside group first
    const phaseList = this.phase_def[pgroup];
    if (phaseList.length === 0) return;
    for (const phase of phaseList) {
      if (DBG) console.log(`${fn} entering group ${phase}`);
      await this._promiseHookEvaluation(phase, 'enter');
      await this._promiseHookEvaluation(phase, 'exec');
      await this._promiseHookEvaluation(phase, 'exit');
    }
    // then process remaining group hooks
    await this._promiseHookEvaluation(pgroup, 'exec'); // just another named phase
    await this._promiseHookEvaluation(pgroup, 'exit'); // just another named phase
  }

  /** helper: return hook function array for a given phase or phase group.
   *  It defaults to returning the 'exec' function.
   */
  getHookFunctions(phid: PhaseID, evt: HookEvent = 'exec') {
    const hooks = this.phase_hooks.get(phid);
    return hooks.map(hook => hook[evt]);
  }

  /** helper: check for phase group membership */
  lookupPhaseGroup(phid: string): PhaseGroupID {
    const fn = 'lookupPhaseGroup:';
    if (typeof phid !== 'string') throw Error(`${fn} arg must be string`);
    if (phid.startsWith('PHASE_') && this.phase_def[phid])
      return phid as PhaseGroupID;
    return this.phase_membership.get(phid);
  }

  /** helper: check for valid phase selector */
  hasHook(psel: string) {
    const fn = 'hasHook:';
    const [machine, phase] = m_DecodeHookSelector(psel);
    return this.phase_hooks.has(phase);
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

  /// STATIC CLASS API ///

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: Register a PhaseHook at any time. If the machine doesn't yet exist,
   *  the hook will be queued until the machine is created */
  static HookPhase(selector: HookSelector, fn: HookFunction) {
    const [machine, phase, event] = m_DecodeHookSelector(selector);
    const pm = m_machines.get(machine);
    const hook = { phase, [event]: fn };
    // if the phase machine exists, add the hook
    if (pm) {
      pm.addHookEntry(phase, hook);
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
  static async RunPhaseGroup(selector: HookSelector) {
    const fn = 'RunPhaseGroup:';
    const [machine, phaseID] = m_DecodeHookSelector(selector);
    const pm = m_machines.get(machine);
    if (!pm) throw Error(`machine '${machine}' not yet defined`);
    const phaseGroup = m_DecodePhaseGroup(pm, phaseID);
    if (phaseGroup === undefined)
      throw Error(`${fn} phaseGroup '${phaseID}' is undefined`);
    await pm.invokeGroupHooks(phaseGroup);
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return a list of all pending machines that have not been hooked. */
  static GetDanglingHooks() {
    let out = [];
    for (const [name, hooks] of m_queue)
      for (const hook of hooks) out.push(`${name}/${hook.phase}`);
    if (out.length === 0) return null;
    return out;
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return a string of all current machines and their phase_def */
  static GetMachineStates() {
    let out = [];
    for (const [name, m] of m_machines)
      out.push(`${name}[${m.cur_group}.${m.cur_phase}]`);
    return out;
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return initialized PhaseMachine if it exists */
  static GetMachine(name: MachineName) {
    return m_machines.get(name);
  }
  // end class PhaseMachine
}

/// STATIC METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**  API: Register a PhaseHook at any time. If the machine doesn't yet exist,
 *   the hook will be queued until the machine is created. The format for
 *   selector is MACHINE/PHASE_NAME, with an optional :enter :exec :exit
 *   event tag at the end. */
function HookPhase(selector: HookSelector, fn: HookFunction) {
  PhaseMachine.HookPhase(selector, fn);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Run all hooks associated with the selector in 'enter', 'exec', and
 *  'exit' order */
async function RunPhaseGroup(selector: HookSelector) {
  await PhaseMachine.RunPhaseGroup(selector);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return a list of all pending machines that have not been hooked.
 *  Used after running all phase groups to detect misdefined hooks */
function GetDanglingHooks() {
  return PhaseMachine.GetDanglingHooks();
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Create a new PhaseMachine instance with the given name and phase_def */
function NewPhaseMachine(name: MachineName, phases: PhaseDefinition) {
  return new PhaseMachine(name, phases);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return a string of all current machines and their phase_def */
function GetMachineStates() {
  return PhaseMachine.GetMachineStates();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return initialized PhaseMachine if it exists */
function GetMachine(name: MachineName) {
  return m_machines.get(name);
}

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// the class is accessible as default when imported by other ts files
export default PhaseMachine;
/// when imported from node mts module, this is what is received as default
export {
  PhaseMachine, // class instance
  // static methods that work on selecttors
  NewPhaseMachine, // (name, phases)
  HookPhase, // (hookselector, handlerFunc, event)=>void
  RunPhaseGroup, // (hookselector)=>void
  GetDanglingHooks,
  GetMachine, // (name)=>PhaseMachine
  GetMachineStates // ()=>PhaseDef[]
};
/// type exports
export type {
  MachineName,
  PhaseID,
  PhaseDefinition,
  HookSelector,
  HookFunction,
  HookEvent
};
