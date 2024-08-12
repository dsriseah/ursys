/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  The main @init.ts script is the entry point used by the bundler, in this
  case esbuild or tool that parses the import statements and builds a bundle
  from what it finds (e.g. webpack)

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { UR } from '@ursys/core';
import { ClientTest } from './lib/test-library';

/// RUNTIME INIT //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** globalThis is the global object in environment, like window in browsers.
    This is a Javascript feature from ES2020 **/
globalThis.ClientTest = ClientTest;

/** connect to the URNET server and register HOT RELOAD message handler **/
(async () => {
  await UR.Connect();
  UR.AddMessageHandler('NET:UR_HOT_RELOAD_APP', () => window.location.reload());
  await UR.RegisterMessages();
})();
