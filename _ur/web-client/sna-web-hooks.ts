/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA WEB HOOKS - Shared PhaseMachine module for SNA client-side apps

  This is a utility module used for client-side system components that need to
  access the SNA lifecycle. User components can use sna-web.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PhaseMachine } from '../common/class-phase-machine.ts';
import { ConsoleStyler } from '../common/util-prompts.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { PhaseID, HookFunction } from '../common/class-phase-machine.ts';
import type { OpResult } from '../_types/dataset';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('SNA.HOOK', 'TagCyan');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let PM: PhaseMachine;

/// DEREFERENCED STATIC METHODS ///////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks } = PhaseMachine;

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
        'NET_ACTIVE' // system is listen for messages
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

  // run phase groups in order
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
