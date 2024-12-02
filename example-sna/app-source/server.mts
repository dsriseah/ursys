/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA Server Entry Point

  This is a server module entry point that's imported dynamically by
  @run-sna.mts. By the time this module is loaded, the webapp and appserver
  have already been built. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, PR } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('server', 'TagGreen');

/// LIFECYCLE HOOKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.HookServerPhase('SRV_READY', () => {
  LOG('SNA Server Component SRV_READY');
});

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG('SNA Server Entry Loaded');

  // Set extra global configuration
  // SNA.GlobalConfig({});
  // note: see @run-sna for more global configuration

  // Register extra components
  // SNA.RegisterComponent(Your_SNA_Module)

  // After all modules are initialized, start the SNA lifecycle this will
  // call PreConfig() and PreHook() all all registered modules.
  // SNA itself registers some modules (e.g. dataserver)
  await SNA.Start();
})();
