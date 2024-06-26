/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Main Entry Point for WebPlay Browser Client
  see @webplay-cli.mts for build and serve code

  Put your files into the scripts directory and import them to test in
  the browser. Changes to source files will trigger a rebuild and reload.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import './scripts/_welcome.ts';

/** --- your imports here --- **/

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
    const connect_ok = 'server/webplay-ws control server connected';
    SERVER_LINK.addEventListener('message', async event => {
      const { data } = event;
      if (data === 'rebuild') location.reload();
      if (data === 'connect') LOG(...PR(connect_ok));
    });
  });
})();
