/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ** EXAMPLE ** Main Application Entry Point

  The SNA web app compiler will dynamically bundle any .ts file into the
  auto-app-imports.ts file and use it as an entry point for esbuild.

  Since this is the first module to load, we load other SNA components
  here and initialize them before starting the SNA lifecycle.
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, ConsoleStyler } from 'ursys';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(this);
const PR = ConsoleStyler('app', 'TagGreen');

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(...PR('Initializing Web App'));
  await SNA.Start({ no_hmr: false, no_urnet: false });
})();
