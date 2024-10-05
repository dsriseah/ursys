/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA NODE URNET - Shared NetEndpoint module for SNA server-side moodules

  This is a utility module is used for server-side system components that need to 
  connect to URNET. User components can use sna-node.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import PATH from 'node:path';
import * as FILE from './file.mts';
import * as APPSERV from './appserver.mts';
import * as APPBUILD from './appbuilder.mts';
import * as IMPORT from './util-dynamic-import.mts';
import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { BuildOptions } from './appbuilder.mts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA.NET', 'TagCyan');
const DBG = true;

/// API: BUILD APPSERVER //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: SNA_Build imports scripts provided folder. Hide dependent scripts in
 *  subdirectories. It's assumed that .mts files are server-side and .ts files
 *  are app-client side.
 *  Can be called after URNET_READY (e.g. APP_READY)
 */
async function SNA_Build(rootDir: string): Promise<void> {
  const fn = 'SNA_Build:';
  LOG(`${fn} Building SNA Sources`);
  const source_dir = PATH.join(rootDir, 'app-source');
  const asset_dir = PATH.join(rootDir, 'app-static');
  const output_dir = PATH.join(rootDir, '_public');

  // A build consists of (1) building js bundle from CLIENT_ENTRY, and copying the
  // output to HT_DOCS/js followed by (2) copying assets from HT_ASSETS to HT_DOCS,
  // which includes an index.html file that loads the js bundle. You have to write
  // the index file yourself.

  const { entryFile, tsFiles } = await IMPORT.ImportClientModules(source_dir);
  if (tsFiles.length)
    LOG(`${fn} Client Components: ${YEL}${tsFiles.join(' ')}${NRM}`);
  else LOG(`${fn} No client components found in ${source_dir}`);

  /// BUILD APP ///

  // these are our abstraction of build options for an URSYS client-server project
  const notify_cb = m_NotifyCallback;
  const buildOpts: BuildOptions = {
    source_dir,
    asset_dir,
    output_dir,
    entry_file: entryFile, // relative to source_dir
    bundle_name: 'bundle.js',
    // hot reload callback, added to esbuild events
    notify_cb
  };
  LOG(`Using esbuild to assemble website -> ${BLU}${FILE.u_short(output_dir)}${NRM}`);
  APPBUILD.SetBuildOptions(buildOpts);
  await APPBUILD.BuildApp(buildOpts);

  /// SERVE AND WATCH APP ///

  const htdocs_short = FILE.u_short(buildOpts.output_dir);
  LOG(`Live Reload Service is monitoring ${htdocs_short}`);
  await APPBUILD.WatchExtra({
    watch_dirs: [`${source_dir}/**`],
    ignored: /_app_dist/,
    notify_cb
  });
  const HT_DOCS = FILE.AbsLocalPath('example-sna/_public');
  const serverOpts = {
    http_port: 8080,
    http_host: 'localhost',
    http_docs: HT_DOCS,
    index_file: 'index.html',
    wss_path: 'sna-ws'
  };
  await APPSERV.Start(serverOpts);

  /// IMPORT DYNAMIC SERVER MODULES ///
  /// this happens after APPSERV.Start() because SNA relies on the Express
  /// server being up and running to handle URNET messages
  const mtsFiles = await IMPORT.ImportServerModules(source_dir);
  if (mtsFiles.length)
    LOG(`${fn} Server Components: ${YEL}${mtsFiles.join(' ')}${NRM}`);
  else LOG(`${fn} No server components found in ${source_dir}`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: used by SNA_Build() to configure watch dirs for hot reload */
function m_NotifyCallback(payload: { changed: string }) {
  const { changed } = payload || {};
  if (changed === undefined) return;
  if (DBG) LOG(`${DIM}notify change: ${changed}${NRM}`);
  // is this a file on the server?
  if (changed.endsWith('.mts')) {
    // do nothing
  }
  // is this a file in the client?
  if (changed.endsWith('.ts')) {
    const EP = APPSERV.ServerEndpoint();
    EP.netSignal('NET:UR_HOT_RELOAD_APP', { changed });
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna process
  SNA_Build
};
export {
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  ServerEndpoint
} from './appserver.mts';