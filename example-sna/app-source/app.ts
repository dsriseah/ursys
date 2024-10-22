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
const PR = ConsoleStyler('App.ts', 'TagGreen');

/// LIFECYCLE HOOKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.Hook('LOAD_CONFIG', () => {});

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(...PR('SNA Client Component Loaded'));

  // 0. the app is hosted at a url that provides app context
  // 1. the initial socket connection returns a user-salt and uaddr
  const user_salt = 'salt-provided-by-server';
  const uaddr = 'UA001';
  // 2. the user submits their salted username and password
  const user_ident = 'salted-username';
  const user_auth = 'salted-password';
  // 3. the server looks-up the user and returns a user-token
  //    and datasetURI
  const auth_token = 'server-provided-jwt';
  const datasetURI = 'sri.org:bucket-1234/sna-app/project-one';
  const datasetMode = 'local';

  // 4. register all SNA components
  SNA.RegisterComponent(COMMENTS);
  SNA.GlobalConfigure({ dataset: { uri: datasetURI, mode: datasetMode } });

  // 5. after all modules are initialized, start the SNA lifecycle
  await SNA.Start();

  // system is started
  LOG(...PR(SNA.Status().message));
})();
