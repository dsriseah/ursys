/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Sri's New Architecture (SNA) Main Client Component

  This can be imported by user components to start the SNA lifecyle on the
  client side. It uses the MSG network to communicate with the server.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '../common/util-prompts';
import {
  SNA_NetConnect,
  AddMessageHandler,
  RegisterMessages
} from './sna-web-urnet-client';
import {
  SNA_UseComponent,
  SNA_LifecycleStart,
  SNA_LifecycleStatus,
  SNA_HookAppPhase,
  GetDanglingHooks
} from './sna-web-hooks';
import { SNA_NewComponent } from '../common/class-sna-component';
import { SNA_SetAppConfig, SNA_GetAppConfig } from './sna-web-context';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type StartOptions = {
  no_urnet?: boolean;
  no_hmr?: boolean;
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('sna', 'TagGray');

/// SNA LIFECYCLE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_Start(config: StartOptions) {
  // get configuration flags
  const { no_urnet, no_hmr } = config || {};
  // prepare net hooks before starting the lifecycle
  if (!no_urnet) {
    SNA_HookAppPhase('DOM_READY', SNA_NetConnect);
    SNA_HookAppPhase('NET_READY', async () => {
      if (!no_hmr) {
        AddMessageHandler('NET:UR_HOT_RELOAD_APP', async () => {
          LOG(
            '%cHot Reload Requested. Complying in 1 sec...',
            'color: #f00; font-size: larger; font-weight: bold;'
          );
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      } else {
        LOG(
          `%cHot Module Reload disabled`,
          'color: #f00; font-size: larger; font-weight: bold;'
        );
      }
    });
    SNA_HookAppPhase('NET_DECLARE', async () => {
      await RegisterMessages();
    });
  } else {
    const css =
      'color: #ff0000;padding:4px 8px;' +
      'background-color:#ff000020;font-weight:bold;';

    LOG(`%cSTANDALONE MODE (URNET DISABLED)`, css);
  }

  // log when the app is running
  SNA_HookAppPhase('APP_RUN', () => {
    const css =
      'color: #008000;padding:4px 8px;' +
      'background-color:#00800020;font-weight:bold;';
    LOG(`%cSNA App Initialization Complete`, css);
  });

  // now start the lifecycle
  await SNA_LifecycleStart();
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

/// SNA MODULES PACKAGING /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// remember to import SNA_Component default, which has _name property set
import MOD_DataClient from './sna-dataclient';
import MOD_AppContext from './sna-web-context';
/// export the actual module API
export * as DATACLIENT from './sna-dataclient';
export * as APPCONTEXT from './sna-web-context';

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna process
  SNA_UseComponent as UseComponent,
  SNA_SetAppConfig as SetAppConfig,
  SNA_GetAppConfig as GetAppConfig,
  SNA_Start as Start,
  SNA_Status as Status,
  SNA_HookAppPhase as HookAppPhase,
  // sna modules
  SNA_NewComponent as NewComponent,
  // included modules
  MOD_DataClient,
  MOD_AppContext
};
export {
  // phase machine static methods
  HookPhase as HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks
} from './sna-web-hooks';
export {
  // urnet static methods
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  ClientEndpoint
} from './sna-web-urnet-client';
