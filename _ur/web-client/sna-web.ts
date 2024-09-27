/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Sri's New Architecture (SNA) Main Client Component

  This can be imported by user components to start the SNA lifecyle on the
  client side. It uses the MSG network to communicate with the server.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '../common/util-prompts.ts';
import {
  SNA_NetConnect,
  Endpoint,
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages
} from './sna-web-urnet.ts';
import {
  SNA_LifecycleStart,
  SNA_LifecycleStatus,
  SNA_Hook,
  GetDanglingHooks
} from './sna-web-hooks.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('SNA', 'TagCyan');

/// SNA LIFECYCLE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_Start() {
  // prepare hooks before starting the lifecycle
  SNA_Hook('DOM_READY', SNA_NetConnect);
  SNA_Hook('NET_CONNECT', async (p, m) => {
    AddMessageHandler('NET:UR_HOT_RELOAD_APP', () => {
      window.location.reload();
    });
  });
  SNA_Hook('APP_CONFIG', async (p, m) => {
    await RegisterMessages();
  });

  // now start the lifecycle
  SNA_LifecycleStart();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: retrieve SNA status object */
function SNA_Status() {
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
  // sna process
  SNA_Start as Start,
  SNA_Status as Status,
  SNA_Hook as Hook,
  // ursys api
  Endpoint,
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages
};
