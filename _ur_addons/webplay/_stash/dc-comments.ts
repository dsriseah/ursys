/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-comments is the client-side component of a comment module, which talks
  to srv-comments through URSYS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import { GetEndpoint, HookPhase } from '../webplay-client-services.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('COMMENT', 'TagYellow');
const LOG = console.log.bind(console);

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Initialize() {
  LOG(...PR('DC-Comments Initializing'));
  HookPhase('WEBPLAY/APP_READY', () => {
    LOG(...PR('DC-Comments Ready'));
  });
  HookPhase('WEBPLAY/APP_RUN', () => {
    LOG(...PR('DC-Comments Running'));
    const EP = GetEndpoint();
    EP.netCall('NET:DC_HANDLER', { data: 'hello' }).then(data => {
      LOG(...PR('DC-Handler Response'), data);
    });
  });
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Initialize();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { Initialize };
