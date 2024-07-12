/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  WebPlay Addon CLI Build and Serve
  Conceptually similar to jsplay addon, except for the browser.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { FILE, PROMPTS, PR } from '@ursys/core';
import { APPSERV, APPBUILD } from '@ursys/core';
import PATH from 'node:path';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const { BLU, DIM, NRM } = PROMPTS.ANSI;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [AO_NAME, AO_DIR] = FILE.DetectedAddonDir();
const ADDON = AO_NAME.toUpperCase();
const LOG = PR(ADDON, 'TagCyan');

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SRC = AO_DIR; // point to addon dir
const HT_ASSETS = PATH.join(SRC, 'assets');
const HT_DOCS = FILE.AbsLocalPath('_ur_addons/_public');
const CLIENT_ENTRY_FILE = PATH.join(SRC, 'webplay-client-entry.ts');
const CLIENT_BUNDLE_NAME = 'client-bundle';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(`${ADDON} URNET Live Reload Playground for Browsers`);
  LOG(`${BLU}QUICKSTART: import source file(s) in 'scripts/_welcome.ts'${NRM}`);
  // define the hot reload callback function
  const notify_cb = payload => {
    const { changed } = payload || {};
    if (DBG && changed) LOG(`${DIM}notify change: ${JSON.stringify(changed)}${NRM}`);
    const EP = APPSERV.GetServerEndpoint();
    EP.netSignal('NET:UR_HOT_RELOAD_APP', { changed });
  };

  // A build consists of (1) building js bundle from CLIENT_ENTRY, and copying the
  // output to HT_DOCS/js followed by (2) copying assets from HT_ASSETS to HT_DOCS,
  // which includes an index.html file that loads the js bundle. You have to write
  // the index file yourself.
  const buildOpts = APPBUILD.SetBuildOptions({
    source_dir: SRC,
    asset_dir: HT_ASSETS,
    output_dir: HT_DOCS,
    entry_file: CLIENT_ENTRY_FILE,
    bundle_name: CLIENT_BUNDLE_NAME,
    //
    notify_cb // hot reload callback, added to esbuild events
  });
  const htdocs_short = FILE.ShortenPath(HT_DOCS);
  LOG(`Using esbuild to build website in ${BLU}${HT_DOCS}${NRM}`);
  await APPBUILD.BuildApp(buildOpts);
  // to support hot reload,
  LOG('Watching for changes in ${}...');
  await APPBUILD.WatchExtra({ watch_dirs: [`${SRC}/**`], notify_cb });
  const serverOpts = {
    http_port: 8080,
    http_host: 'localhost',
    http_docs: HT_DOCS,
    index_file: 'webplay-index.html',
    wss_path: 'webplay-ws'
  };
  await APPSERV.Start(serverOpts);
  LOG('CTRL-C TO EXIT. PRESS RETURN');
})();
