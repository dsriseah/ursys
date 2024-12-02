/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Sri's New Architecture (SNA) 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';
import { SNA_Build, SNA_RuntimeInfo } from './sna-node-urnet-server.mts';
import {
  SNA_HookServerPhase,
  SNA_RegisterComponent,
  SNA_LifecycleStatus,
  SNA_LifecycleStart,
  SNA_GlobalConfig,
  GetDanglingHooks
} from './sna-node-hooks.mts';
import { SNA_DeclareModule } from '../common/class-sna-module.ts';

/// SNA MODULES PACKAGING /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import MOD_DataServer from './sna-dataserver.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult, DataObj } from '../_types/dataset.d.ts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA', 'TagCyan');
const DBG = true;

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_Start() {
  SNA_RegisterComponent(MOD_DataServer);
  // prepare own hooks before starting the lifecycle
  SNA_HookServerPhase('SRV_READY', LOG('Server Ready'));
  // now start the lifecycle
  await SNA_LifecycleStart();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current phase machine state */
function SNA_Status() {
  const fn = 'SNA_Status:';
  const dooks = GetDanglingHooks();
  const status = SNA_LifecycleStatus();
  return {
    dooks,
    ...status
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  SNA_Build as Build,
  SNA_Start as Start,
  SNA_Status as Status,
  // sna hook methods
  SNA_HookServerPhase as HookServerPhase,
  SNA_RuntimeInfo as RuntimeInfo,
  // sna modules
  SNA_GlobalConfig as GlobalConfig,
  SNA_DeclareModule as DeclareModule,
  // included modules
  MOD_DataServer
};
export {
  // sna hook methods
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
} from './sna-node-hooks.mts';
export {
  // sna network endpoint methods
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  ServerEndpoint
} from './sna-node-urnet-server.mts';
