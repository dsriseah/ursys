/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  main entry point for web application

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DeclareComponents } from './lib/components.ts';
import { AttachRouter } from './lib/router.ts';
import { SNA } from '@ursys/core';

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  DeclareComponents();
  AttachRouter(document.getElementById('app'));
  await SNA.Start();
})();
