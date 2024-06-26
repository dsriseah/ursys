/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Main Entry Point for WebPlay Browser Client
  see @webplay-cli.mts for build and serve code

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import './scripts/_welcome.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('WebPlay', 'TagPurple');
const LOG = console.log.bind(console);
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_LINK: WebSocket;

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  SERVER_LINK = new WebSocket('ws://localhost:8080/webplay-ws');
  SERVER_LINK.addEventListener('open', async () => {
    LOG(...PR('connected to server/webplay-ws control server'));
    SERVER_LINK.addEventListener('message', async event => {
      const { data } = event;
      if (data === 'rebuild') location.reload();
    });
  });
})();
