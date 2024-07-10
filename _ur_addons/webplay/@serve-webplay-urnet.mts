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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(`${ADDON} URNET Live Reload Playground for Browsers`);
  LOG(`${BLU}QUICKSTART: import source file(s) in 'scripts/_welcome.ts'${NRM}`);
  const notify_cb = payload => {
    const { changed } = payload || {};
    if (DBG && changed) LOG(`${DIM}notify change: ${JSON.stringify(changed)}${NRM}`);
    const EP = APPSERV.GetServerEndpoint();
    EP.netSignal('NET:UR_HOT_RELOAD_APP', { changed });
  };
  const buildOpts = APPBUILD.SetBuildOptions({
    source_dir: SRC,
    asset_dir: HT_ASSETS,
    output_dir: HT_DOCS,
    entry_file: 'webplay-init.ts',
    bundle_name: 'webplay',
    //
    notify_cb
  });
  LOG('Building app...');
  await APPBUILD.BuildApp(buildOpts);
  LOG('Watching for changes...');
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
