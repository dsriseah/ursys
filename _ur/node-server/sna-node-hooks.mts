/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA NODE HOOKS - Shared PhaseMachine module for SNA server-side apps

  This is a utility module used for server-side system components that need to
  access the SNA lifecycle. User components can use sna-node.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { makeTerminalOut, ANSI } from '../common/util-prompts.js';
import { PhaseMachine } from '../common/class-phase-machine.js';
import {
  RunPhaseGroup,
  HookPhase,
  GetDanglingHooks,
  GetMachine
} from '../common/class-phase-machine.js';
import { SNA_Component } from '../common/class-sna-component.js';
import { IsSnakeCase } from '../common/util-text.js';
import {
  SNA_GetServerConfigUnsafe,
  SNA_GetLockState,
  SNA_SetLockState
} from './sna-node-context.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { PhaseID, HookFunction } from '../common/class-phase-machine.js';
import type { SNA_ComponentProps } from '../_types/sna.d.ts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA.HOOK', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let COMPONENTS: Set<SNA_Component> = new Set();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let PM: PhaseMachine;

/// SNA COMPONENT REGISTRATION ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SNA_NewComponent(name: string, config: SNA_ComponentProps): SNA_Component {
  return new SNA_Component(name, config);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: register a component with the SNA lifecycle */
function SNA_UseComponent(component: SNA_Component) {
  const fn = 'SNA_UseComponent:';
  const { _name, PreHook } = component;
  if (typeof _name !== 'string')
    throw Error(`${fn} bad SNA component: missing _name`);
  if (!IsSnakeCase(_name))
    throw Error(`${fn} bad SNA component: _name ${_name} must be snake_case`);
  if (COMPONENTS.has(component)) LOG(`SNA_Component '${_name}' already registered`);
  if (DBG) LOG(`Registering SNA_Component: '${_name}'`);
  COMPONENTS.add(component);
  // see if the component has a registration hook for chained registration
  const { AddComponent } = component;
  if (typeof AddComponent === 'function')
    AddComponent({ f_AddComponent: SNA_UseComponent });
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: shortcut hook for SNA machine */
function SNA_HookServerPhase(phase: PhaseID, fn: HookFunction) {
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

  // advance from init->preconfig
  if (!SNA_SetLockState('init')) LOG(`${RED}lockstate 'init' fail${NRM}`);

  // configure all registered components with global config
  const SRV_CFG_COPY = { ...SNA_GetServerConfigUnsafe() };
  for (const component of COMPONENTS) {
    const { PreConfig, _name } = component;
    if (typeof PreConfig === 'function') {
      if (DBG) LOG(`Configuring SNA_Component '${_name}'`);
      PreConfig(SRV_CFG_COPY);
    }
  }
  // advance from init->preconfig
  if (!SNA_SetLockState('preconfig')) LOG(`${RED}lockstate 'preconfig' fail${NRM}`);

  // initialize all registered components
  for (const component of COMPONENTS) {
    const { PreHook, _name } = component;
    if (typeof PreHook === 'function') {
      if (DBG) LOG(`Initializing SNA_Component '${_name}'`);
      PreHook();
    }
  }

  // advance from preconfig->prehook
  if (!SNA_SetLockState('prehook')) LOG(`${RED}lockstate 'prehook' fail${NRM}`);

  // run phase groups in order
  if (DBG) LOG(`SNA Node Lifecycle Starting`);
  await RunPhaseGroup('SNA/PHASE_INIT');
  await RunPhaseGroup('SNA/PHASE_LOAD');
  await RunPhaseGroup('SNA/PHASE_CONNECT');
  await RunPhaseGroup('SNA/PHASE_RUN');
  await RunPhaseGroup('SNA/PHASE_READY');

  // advance from prehook->locked
  if (!SNA_SetLockState('locked')) LOG(`${RED}lockstate 'prehook' fail${NRM}`);

  // check for unprocessed hooks due to unimplemented machines
  const dooks = GetDanglingHooks();
  if (dooks) {
    LOG(`${RED} *** ERROR *** dangling phase hooks detected${NRM}`, dooks);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current phase machine state */
function SNA_LifecycleStatus() {
  const status: { [key: string]: any } = {};
  const cfg_valid = SNA_GetLockState('preconfig');
  const hooks_valid = SNA_GetLockState('prehook');
  if (PM === undefined)
    Object.assign(status, {
      preconfig: cfg_valid,
      prehook: hooks_valid,
      phaseGroup: undefined,
      phase: undefined,
      message: 'SNA PhaseMachine is undefined'
    });
  else {
    const { cur_group, cur_phase } = PM;
    const lastPhaseGroup = PM.getPhaseList('PHASE_READY');
    const lastPhase = lastPhaseGroup[lastPhaseGroup.length - 1];
    Object.assign(status, {
      preconfig: cfg_valid,
      prehook: hooks_valid,
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
  SNA_NewComponent,
  SNA_UseComponent,
  SNA_HookServerPhase,
  SNA_LifecycleStart,
  SNA_LifecycleStatus,
  // ursys lifecycle
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
};
