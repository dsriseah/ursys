/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Welcome Message for WebPlay Addon Scripts
  imported into the webplay-client-entry.ts file
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('WELCOME', 'TagBlue');
const LOG = console.log.bind(console);

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  let out = '';
  out += 'Put your scripts into the webplay/scripts folder and import them';
  out += ' into the webplay-init.ts file. All other files than this one';
  out += ' are gitignored.';
  LOG(...PR(out));
})();
