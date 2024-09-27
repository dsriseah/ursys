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

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { PhaseID, HookFunction } from '../common/class-phase-machine.ts';
import type { OpReturn } from '../_types/dataset.d.ts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let PM: PhaseMachine;

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
      PHASE_RUN: ['SRV_START', 'SRV_RUN'],
      PHASE_READY: ['SRV_READY']
    });
  LOG(`${fn} Executing Phase Groups`);
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
function SNA_LifecycleStatus(): OpReturn {
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
    const lastPhase = PM.getLastPhase();
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
  SNA_LifecycleStatus,
  // ursys lifecycle
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
};
