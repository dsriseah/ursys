/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Main Application Entry Point

  The SNA web app compiler will dynamically bundle any .ts file into the
  __app_imports.ts file and use it as an entry point for esbuild.

  Since this is the first module to load, we load other SNA components
  here and initialize them before starting the SNA lifecycle.
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, ConsoleStyler } from '@ursys/core';
import COMMENTS from './datacore/dc-comments.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(this);
const PR = ConsoleStyler('app', 'TagGreen');

/// LIFECYCLE HOOKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.HookAppPhase('LOAD_CONFIG', () => {});

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(...PR('Initializing Web App'));

  // 0. the app is hosted at a url that provides app context
  // 1. the initial socket connection returns a user-salt and uaddr
  const user_salt = 'salt-provided-by-server';
  const uaddr = 'UA001';
  // 2. the user submits their salted username and password
  const user_ident = 'salted-username';
  const user_auth = 'salted-password';
  // 3. the server looks-up the user and returns a user-token
  //    and dataURI
  const auth_token = 'server-provided-jwt';
  const dataURI = 'sri.org:bucket-1234/sna-app/project-one';
  const datasetMode = 'sync';

  // Set the global configuration object
  SNA.GlobalConfig({ dataset: { dataURI: dataURI, syncMode: datasetMode } });

  // Register all SNA components
  SNA.RegisterComponent(SNA.MOD_DataClient);
  SNA.RegisterComponent(COMMENTS);

  // After all modules are initialized, start the SNA lifecycle this will
  // call PreConfig() and PreHook() all all registered modules.
  await SNA.Start();
})();
