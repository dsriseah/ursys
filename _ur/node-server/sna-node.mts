/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Sri's New Architecture (SNA) 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { TerminalLog, ANSI } from '../common/util-prompts.js';
import {
  SNA_Build,
  SNA_MultiBuild,
  SNA_RuntimeInfo
} from './sna-node-urnet-server.mts';
import {
  SNA_HookServerPhase,
  SNA_UseComponent,
  SNA_LifecycleStatus,
  SNA_LifecycleStart,
  GetDanglingHooks
} from './sna-node-hooks.mts';
import { SNA_SetServerConfig, SNA_GetServerConfig } from './sna-node-context.mts';
import { SNA_NewComponent } from '../common/class-sna-component.js';

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
const LOG = TerminalLog('SNA', 'TagCyan');
const DBG = true;

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_Start() {
  SNA_UseComponent(MOD_DataServer);
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

/// SYSTEM HELPERS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return information related to running script and args. it should be
 *  called only by the main script that's been invoked, otherwise the info
 *  returned will likely by incorrect. */
function SNA_GetProcessInfo(proc = process) {
  const scriptPath = proc.argv[1]; // full path to the script
  const scriptDir = scriptPath.split('/').slice(0, -1).join('/'); // just the dir
  const scriptName = scriptPath.split('/').pop(); // just the script name
  const args = proc.argv.slice(2); // array of arguments
  return [scriptDir, scriptName, args];
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna system helpers
  SNA_GetProcessInfo as GetProcessInfo,
  SNA_Build as Build,
  SNA_MultiBuild as MultiBuild,
  SNA_Start as Start,
  SNA_Status as Status,
  // sna hook methods
  SNA_HookServerPhase as HookServerPhase,
  SNA_RuntimeInfo as RuntimeInfo,
  // sna modules
  SNA_SetServerConfig as SetServerConfig,
  SNA_GetServerConfig as GetServerConfig,
  SNA_UseComponent as UseComponent,
  SNA_NewComponent as NewComponent
};
/** named: LoadDataset, CloseDataset, PersistDataset, OpenBin, CloseBin,
 *  default export registers 'dataserver' SNA Component */
export * as MOD_DataServer from './sna-dataserver.mts';
//
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
