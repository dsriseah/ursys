/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  main entry point for web application

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DeclareComponents, AttachRouter } from './webview';
import { SNA } from '@ursys/core';

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  DeclareComponents();
  AttachRouter(document.getElementById('shell-view'));
  await SNA.Start();
})();
