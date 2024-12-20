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
import * as CONTEXT from './sna-node-context.mts';
import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { BuildOptions } from './appbuilder.mts';

/// IMPORTED CLASSES & CONSTANTS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA.UNET', 'TagCyan');
const DBG = true;

/// API: SERVER RUNTIME ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the root directory, runtime directory */
function SNA_RuntimeInfo() {
  const { asset_dir, output_dir, runtime_dir } = APPBUILD.GetBuildOptions();
  return { asset_dir, output_dir, runtime_dir };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: ensure that the required SNA APP directories exist */
function SNA_EnsureAppDirs(rootDir: string) {
  const source_dir = PATH.join(rootDir, 'app-source');
  const asset_dir = PATH.join(rootDir, 'app-static');
  const output_dir = PATH.join(rootDir, '_public');
  const runtime_dir = PATH.join(rootDir, '_runtime');
  const config_dir = PATH.join(rootDir, '_config');

  // if these dirs don't exist, create them
  FILE.EnsureDirChecked(source_dir);
  FILE.EnsureDirChecked(asset_dir);
  FILE.EnsureDirChecked(output_dir);
  FILE.EnsureDirChecked(runtime_dir);
  FILE.EnsureDirChecked(config_dir);

  // save
  const CFG = CONTEXT.SNA_GetServerConfigUnsafe();
  CFG.runtime_dir = runtime_dir;
  CFG.config_dir = config_dir;
  CFG.source_dir = source_dir;
  CFG.asset_dir = asset_dir;

  return { source_dir, asset_dir, output_dir, runtime_dir, config_dir };
}

/// API: BUILD APPSERVER //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: SNA_Build imports scripts provided folder. Hide dependent scripts in
 *  subdirectories. It's assumed that .mts files are server-side and .ts files
 *  are app-client side.
 *  Can be called after URNET_READY (e.g. APP_READY)
 */
async function SNA_Build(rootDir: string): Promise<void> {
  LOG(`SNA Build: Transpiling and bundling components`);

  // ensure the required SNA APP directories exist
  const { source_dir, asset_dir, output_dir, runtime_dir, config_dir } =
    SNA_EnsureAppDirs(rootDir);

  // A build consists of (1) building js bundle from CLIENT_ENTRY, and copying the
  // output to HT_DOCS/js followed by (2) copying assets from HT_ASSETS to HT_DOCS,
  // which includes an index.html file that loads the js bundle. You have to write
  // the index file yourself.

  const { entryFile, tsFiles } = await IMPORT.ImportClientModules(source_dir);
  if (tsFiles.length)
    LOG(`Bundled client components: ${YEL}${tsFiles.join(' ')}${NRM}`);
  else LOG(`No client components found in ${source_dir}`);

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
  const watch_dirs = [`${source_dir}/**/*`, `${asset_dir}/**/*`];
  LOG(`Live Reload Service is monitoring ${htdocs_short}`);
  await APPBUILD.WatchExtra({
    watch_dirs,
    notify_cb
  });
  const serverOpts = {
    http_port: 8080,
    http_host: 'localhost',
    http_docs: output_dir,
    index_file: 'index.html',
    wss_path: 'sna-ws',
    get_client_cfg: () => {
      const { dataURI } = CONTEXT.SNA_GetServerConfig();
      return { dataURI };
    }
  };
  await APPSERV.Start(serverOpts);

  /// IMPORT DYNAMIC SERVER MODULES ///
  /// this happens after APPSERV.Start() because SNA relies on the Express
  /// server being up and running to handle URNET messages
  const mtsFiles = await IMPORT.ImportServerModules(source_dir);
  if (mtsFiles.length)
    LOG(`Loaded server components: ${YEL}${mtsFiles.join(' ')}${NRM}`);
  else LOG(`No server components found in ${source_dir}`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: used by SNA_Build() to configure watch dirs for hot reload */
function m_NotifyCallback(data) {
  const { changed } = data || {};
  if (changed === undefined || changed === 'rebuild-notify') {
    return;
  }
  // is this a file on the server? skip it
  if (changed.endsWith('.mts')) {
    // if (DBG) LOG(`${DIM}skipping .mts files: ${FILE.u_short(changed)}${NRM}`);
    return;
  }
  // otherwise check if it's a hot reloadable file
  let hot = ['.ts', '.css', '.html'].some(e => changed.endsWith(e));
  if (hot) {
    const EP = APPSERV.ServerEndpoint();
    if (DBG) LOG(`${DIM}notify change: ${FILE.u_short(changed)}${NRM}`);
    EP.netCall('NET:UR_HOT_RELOAD_APP', { changed });
    return;
  }
  if (DBG) LOG(`${DIM}unhandled notify change: ${FILE.u_short(changed)}${NRM}`);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna process
  SNA_Build,
  SNA_RuntimeInfo
};
export {
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  ServerEndpoint
} from './appserver.mts';
