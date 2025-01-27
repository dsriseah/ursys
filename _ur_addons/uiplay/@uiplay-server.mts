/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  WebPlay Addon CLI Build and Serve
  Conceptually similar to jsplay addon, except for the browser.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, PROMPTS, PR } from '@ursys/core';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = PROMPTS.ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
const [AO_DIR, AO_NAME] = SNA.GetProcessInfo(process);
const ADDON = AO_NAME.toUpperCase();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR(ADDON, 'TagCyan');

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(`${ADDON} SNA Live Reload Playground for Browsers`);
  await SNA.MultiBuild(AO_DIR); // index.html should load [entryfile].js
  await SNA.Start();
})();
