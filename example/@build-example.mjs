/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Example App Build Script
  Using esbuild to build and watch an example app
  This script is referred to in the root package.json

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { FILE, PROMPTS, PR } from '@ursys/core';
import { APPSERV, APPBUILD } from '@ursys/core';

/// CONSTANTS AND DECLARATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const __dirname = dirname(fileURLToPath(import.meta.url));
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DIR_SRC = join(__dirname, 'src');
const DIR_ASSETS = join(__dirname, 'assets-static');
const DIR_PUBLIC = join(__dirname, '_public');
const ENTRY_JS = '@init.js'; // relative to DIR_SRC
const BUNDLE_JS = 'bundle.js'; // copied to DIR_PUBLIC/js
const APP_PORT = 3000;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = PROMPTS.ANSI;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = PR('Example', 'TagBlue');

/// MAIN BUILD FUNCTION ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function BuildAndServe() {
  // STEP 0: CREATE NOTIFY FUNCTION for CHANGE DETECTION
  const notify_cb = payload => {
    const { changed } = payload || {};
    if (DBG && changed) LOG(`${DIM}notify change: ${JSON.stringify(changed)}${NRM}`);
    const EP = APPSERV.GetServerEndpoint();
    if (EP === undefined) return;
    EP.netSignal('NET:UR_HOT_RELOAD_APP', { changed });
  };

  // STEP 1: BUILD THE APP
  const buildOpts = {
    source_dir: DIR_SRC, // source code directory
    asset_dir: DIR_ASSETS, // copied as-is assets directory
    output_dir: DIR_PUBLIC, // output directory
    entry_file: ENTRY_JS, // entry file name
    bundle_file: BUNDLE_JS, // bundle file name loaded by copied index.html
    notify_cb // defined at top of function
  };
  APPBUILD.SetBuildOptions(buildOpts);
  LOG(`Using esbuild to assemble website -> ${BLU}${FILE.u_short(DIR_PUBLIC)}${NRM}`);
  await APPBUILD.BuildApp(buildOpts);

  // STEP 2: WATCH THE APP DEPENDENCIES FOR LIVE RELOAD
  const htdocs_short = FILE.u_short(DIR_PUBLIC);
  LOG(`Live Reload Service is monitoring ${htdocs_short}`);
  await APPBUILD.WatchExtra({ watch_dirs: [`${DIR_SRC}/**`], notify_cb });

  // STEP 3: SERVE THE APP
  const serverOpts = {
    http_port: APP_PORT,
    http_host: 'localhost',
    http_docs: DIR_PUBLIC,
    index_file: 'index.html'
  };
  await APPSERV.Start(serverOpts);
}
/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  await BuildAndServe();
})();
