/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA Server Component

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, PR } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('server', 'TagGreen');

/// LIFECYCLE HOOKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.Hook('LOAD_CONFIG', () => {
  LOG('SNA Server Component LOAD_CONFIG');
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.Hook('EXPRESS_READY', () => {
  LOG('SNA Server Component EXPRESS_READY');
  SNA.AddMessageHandler('NET:RECEIVE_DATA', data => {
    LOG(`SNA Server Component Received Data: ${data}`);
  });
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.Hook('SRV_READY', () => {
  LOG('SNA Server Component SRV_READY');
});

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('SNA Server Component Loaded');