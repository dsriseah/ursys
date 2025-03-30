/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  main entry point for web application

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DeclareComponents, AttachRouter } from './viewlib/router.ts';
import { SNA } from 'ursys';
import * as UR from 'ursys';

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
