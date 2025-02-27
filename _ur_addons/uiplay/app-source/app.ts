/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  main entry point for web application

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DeclareComponents, AttachRouter } from './viewlib/router.ts';
import { SNA } from '@ursys/core';
import * as UR from '@ursys/core';

/// ENVIRONMENT DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
globalThis.UR = UR;

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  DeclareComponents();
  AttachRouter(document.getElementById('shell-view'));
  await SNA.Start();
})();
