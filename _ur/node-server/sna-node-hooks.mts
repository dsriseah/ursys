/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA NODE HOOKS - Shared PhaseMachine module for SNA server-side apps

  This is a utility module used for server-side system components that need to
  access the SNA lifecycle. User components can use sna-node.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';
import { PhaseMachine } from '../common/class-phase-machine.ts';
import {
  RunPhaseGroup,
  HookPhase,
  GetDanglingHooks,
  GetMachine
} from '../common/class-phase-machine.ts';
import { IsSnakeCase } from '../common/util-text.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { PhaseID, HookFunction } from '../common/class-phase-machine.ts';
import type { OpResult, DataObj } from '../_types/dataset.d.ts';
import type { SNA_Module } from '../common/class-sna-module.ts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA.HOOK', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let COMPONENTS: Set<SNA_Module> = new Set();
let GLOBAL_CONFIG: DataObj = {};
let PM: PhaseMachine;

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
  if (COMPONENTS.has(component)) LOG(`SNA_Module '${_name}' already registered`);
  if (DBG) LOG(`Registering SNA_Module: '${_name}'`);
  COMPONENTS.add(component);
  // see if the component has a registration hook for chained registration
  const { AddModule } = component;
  if (typeof AddModule === 'function')
    AddModule({ f_AddModule: SNA_RegisterComponent });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: register a global configuration object, merging with the existing
 *  configuration */
function SNA_GlobalConfig(config: DataObj): DataObj {
  // when no config is provided, return the current global config
  if (config === undefined) return GLOBAL_CONFIG;
  // otherwise merge the new config with the existing global config
  if (Object.keys(GLOBAL_CONFIG).length === 0) {
    if (DBG) LOG(`Setting SNA Global Configuration`);
  } else if (DBG) LOG(`Updating SNA Global Configuration`);
  GLOBAL_CONFIG = Object.assign(GLOBAL_CONFIG, config);
  // return a copy of the global config
  return { ...GLOBAL_CONFIG };
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: shortcut hook for SNA machine */
function SNA_Hook(phase: PhaseID, fn: HookFunction) {
  HookPhase(`SNA/${phase}`, fn);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_LifecycleStart() {
  const fn = 'SNA_LifecycleStart:';
  if (PM === undefined)
    PM = new PhaseMachine('SNA', {
      PHASE_INIT: [
        'SRV_BOOT', // boot the system
        'SRV_INIT', // allocate system data structures
        'SRV_CONFIG' // configure the system
      ],
      PHASE_LOAD: [
        'LOAD_INIT', // initialize data structures
        'LOAD_FILES', // load data from server
        'LOAD_CONFIG' // finalize data
      ],
      PHASE_CONNECT: [
        'EXPRESS_INIT', // express allocate data structures
        'EXPRESS_CONFIG', // express add middleware routes
        'EXPRESS_READY', // express server is ready to start
        'EXPRESS_LISTEN', // express server is listening
        'URNET_LISTEN' // ursys network is listening on socket-ish connection
      ],
      PHASE_RUN: [
        'SRV_START', // server process start hook
        'SRV_RUN' // server process run hook
      ],
      PHASE_READY: [
        'SRV_READY' // server is ready to run
      ],
      PHASE_SHUTDOWN: [
        'SRV_KILLED', // server process kill signal detected
        'SRV_TERMINATED', // server process terminate detected
        'SRV_CLOSE', // server process close hook
        'SRV_STOP' // server proccess stop hook
      ],
      PHASE_DISCONNECT: [
        'SRV_DISCONNECT' // server upstream host disconnect hook
      ],
      PHASE_ERROR: ['SRV_ERROR']
    });

  // configure all registered components with global config
  for (const component of COMPONENTS) {
    const { PreConfig, _name } = component;
    if (typeof PreConfig === 'function') {
      if (DBG) LOG(`Configuring SNA_Module '${_name}'`);
      PreConfig(GLOBAL_CONFIG);
    }
  }

  // initialize all registered components
  for (const component of COMPONENTS) {
    const { PreHook, _name } = component;
    if (typeof PreHook === 'function') {
      if (DBG) LOG(`Initializing SNA_Module '${_name}'`);
      PreHook();
    }
  }

  // run phase groups in order
  if (DBG) LOG(`SNA Node Lifecycle Starting`);
  await RunPhaseGroup('SNA/PHASE_INIT');
  await RunPhaseGroup('SNA/PHASE_LOAD');
  await RunPhaseGroup('SNA/PHASE_CONNECT');
  await RunPhaseGroup('SNA/PHASE_RUN');
  await RunPhaseGroup('SNA/PHASE_READY');
  const dooks = GetDanglingHooks();
  if (dooks) {
    LOG(`${RED} *** ERROR *** dangling phase hooks detected${NRM}`, dooks);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current phase machine state */
function SNA_LifecycleStatus() {
  const fn = 'SNA_LifecycleStatus:';
  const status: { [key: string]: any } = {};

  if (PM === undefined)
    Object.assign(status, {
      phaseGroup: undefined,
      phase: undefined,
      message: 'SNA PhaseMachine is undefined'
    });
  else {
    const { cur_group, cur_phase } = PM;
    const lastPhaseGroup = PM.getPhaseList('PHASE_READY');
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
  SNA_LifecycleStatus,
  // ursys lifecycle
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
};
