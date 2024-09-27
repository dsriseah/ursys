/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Sri's New Architecture (SNA) 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';
import { SNA_Build } from './sna-node-serve.mts';
import {
  SNA_Hook,
  SNA_LifecycleStatus,
  SNA_LifecycleStart,
  GetDanglingHooks
} from './sna-node-hooks.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpReturn } from '../_types/dataset.d.ts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA', 'TagCyan');
const DBG = true;

/// API: BUILD APPSERVER //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: SNA_Build imports scripts provided folder. Hide dependent scripts in
 *  subdirectories. It's assumed that .mts files are server-side and .ts files
 *  are app-client side. Imported from sna-node-urnet
 */

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_Start() {
  const fn = 'SNA_Start:';
  SNA_LifecycleStart();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current phase machine state */
function SNA_Status(): OpReturn {
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
  SNA_Hook as Hook
};
export {
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
} from './sna-node-hooks.mts';
export {
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  GetServerEndpoint
} from './sna-node-serve.mts';
