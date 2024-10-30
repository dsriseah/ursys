/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA WEB HOOKS - Shared PhaseMachine module for SNA client-side apps

  This is a utility module used for client-side system components that need to
  access the SNA lifecycle. User components can use sna-web.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PhaseMachine } from '../common/class-phase-machine.ts';
import { ConsoleStyler } from '../common/util-prompts.ts';
import { IsSnakeCase } from '../common/util-text.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { PhaseID, HookFunction } from '../common/class-phase-machine.ts';
import type { SNA_Module, OpResult, DataObj } from '../@ur-types.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('SNA.HOOK', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let COMPONENTS: Set<SNA_Module> = new Set();
let GLOBAL_CONFIG: DataObj = {};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let PM: PhaseMachine;

/// DEREFERENCED STATIC METHODS ///////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks } = PhaseMachine;

/// SNA COMPONENT REGISTRATION ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: register a component with the SNA lifecycle */
function SNA_RegisterComponent(component: SNA_Module) {
  const fn = 'SNA_RegisterComponent:';
  const { _name, PreHook } = component;
  if (typeof _name !== 'string')
    throw Error(`${fn} bad SNA component: missing _name`);
  if (!IsSnakeCase(_name))
    throw Error(`${fn} bad SNA component: _name must be snake_case`);
  if (typeof PreHook !== 'function')
    throw Error(`${fn} bad SNA component: missing PreHook function`);
  if (COMPONENTS.has(component))
    LOG(...PR(`SNA_Module '${_name}' already registered`));
  if (DBG) LOG(...PR(`Registering SNA_Module: '${_name}'`));
  COMPONENTS.add(component);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: register a global configuration object, merging with the existing
 *  configuration */
function SNA_GlobalConfig(config: DataObj): DataObj {
  // when no config is provided, return the current global config
  if (config === undefined) return GLOBAL_CONFIG;
  // otherwise merge the new config with the existing global config
  if (Object.keys(GLOBAL_CONFIG).length === 0) {
    if (DBG) LOG(...PR(`Setting SNA Global Configuration`));
  } else if (DBG) LOG(...PR(`Updating SNA Global Configuration`));
  GLOBAL_CONFIG = Object.assign(GLOBAL_CONFIG, config);
  // return a copy of the global config
  return { ...GLOBAL_CONFIG };
}

/// SNA LIFECYCLE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_LifecycleStart() {
  const fn = 'SNA_LifecycleStart:';
  if (PM === undefined)
    PM = new PhaseMachine('SNA', {
      PHASE_BOOT: [
        'APP_PAGE', // app initial page load complete
        'APP_BOOT' // for minimal initialization of data structure
      ],
      PHASE_INIT: [
        'DOM_READY' // the app's initial page has rendered fully
      ],
      PHASE_CONNECT: [
        'NET_CONNECT', // start the network connection
        'NET_AUTH', // hook for authentication setup
        'NET_REGISTER', // hook for registration info
        'NET_READY', // ursys network is active and registered
        'NET_DECLARE', // hook for declaring messages to URNET
        'NET_ACTIVE', // system is listen for messages
        'NET_DATASET' // hook for dataset connection
      ],
      PHASE_LOAD: [
        'LOAD_DATA', // load data from server
        'LOAD_CONFIG', // load configuration
        'LOAD_ASSETS' // load assets
      ],
      PHASE_CONFIG: [
        'APP_CONFIG', // app configure based on loaded data, config, etc
        'APP_READY' // app is completely configured
      ],
      PHASE_RUN: [
        'APP_RESET', // app sets initial settings
        'APP_START', // app starts running
        'APP_RUN' // app is running (terminal phase)
      ],
      /* independent groups */
      PHASE_SHUTDOWN: [
        'APP_CLOSE', // app is close hook
        'NET_DISCONNECT', // network disconnected hook
        'APP_STOP' // app stop hook
      ],
      PHASE_ERROR: ['APP_ERROR']
    });

  // configure all registered components with global config
  for (const component of COMPONENTS) {
    const { PreConfig, _name } = component;
    if (typeof PreConfig === 'function') {
      if (DBG) LOG(...PR(`Configuring SNA_Module '${_name}'`));
      PreConfig(GLOBAL_CONFIG);
    }
  }

  // initialize all registered components
  for (const component of COMPONENTS) {
    const { PreHook, _name } = component;
    if (typeof PreHook === 'function') {
      if (DBG) LOG(...PR(`Initializing SNA_Module '${_name}'`));
      PreHook();
    }
  }

  // run phase groups in order
  if (DBG) LOG(...PR(`SNA Web Lifecycle Starting`));
  await RunPhaseGroup('SNA/PHASE_BOOT');
  await RunPhaseGroup('SNA/PHASE_INIT');
  await RunPhaseGroup('SNA/PHASE_CONNECT');
  await RunPhaseGroup('SNA/PHASE_LOAD');
  await RunPhaseGroup('SNA/PHASE_CONFIG');
  await RunPhaseGroup('SNA/PHASE_RUN');
  // check for mystery hooks due to typos or dependency issues
  const dooks = GetDanglingHooks();
  if (dooks) {
    LOG(...PR(`*** ERROR *** dangling phase hooks detected`), dooks);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: shortcut hook for SNA machine */
function SNA_Hook(phase: PhaseID, fn: HookFunction) {
  HookPhase(`SNA/${phase}`, fn);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current phase machine state */
function SNA_LifecycleStatus(): OpResult {
  const fn = 'SNA_Status:';
  const status: { [key: string]: any } = {};

  if (PM === undefined)
    Object.assign(status, {
      phaseGroup: undefined,
      phase: undefined,
      message: 'SNA PhaseMachine is undefined'
    });
  else {
    const { cur_group, cur_phase } = PM;
    const lastPhaseGroup = PM.getPhaseList('PHASE_RUN');
    const lastPhase = lastPhaseGroup[lastPhaseGroup.length - 1];
    Object.assign(status, {
      phaseGroup: PM.cur_group,
      phase: PM.cur_phase,
      completed: cur_phase === lastPhase
    });
    status.message = `SNA current lifecycle: '${cur_group}/${cur_phase}'`;
    if (status.completed) status.message += ' [completed]';
  }
  return status;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna process
  SNA_RegisterComponent,
  SNA_GlobalConfig,
  SNA_Hook,
  SNA_LifecycleStart,
  SNA_LifecycleStatus
};
export {
  // phase machine static methods
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
};
