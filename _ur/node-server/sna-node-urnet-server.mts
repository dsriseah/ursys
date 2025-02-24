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
import { makeTerminalOut, ANSI } from '../common/util-prompts.js';

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
  const viewlib_dir = PATH.join(source_dir, 'viewlib');
  const webc_dir = PATH.join(viewlib_dir, 'webc');

  // first erase the output dir to purge it of old files
  FILE.RemoveDir(output_dir);

  // if these dirs don't exist, create them
  FILE.EnsureDirChecked(source_dir);
  FILE.EnsureDirChecked(asset_dir);
  FILE.EnsureDirChecked(output_dir);
  FILE.EnsureDirChecked(runtime_dir);
  FILE.EnsureDirChecked(config_dir);
  FILE.EnsureDirChecked(viewlib_dir);
  FILE.EnsureDirChecked(webc_dir);

  // save
  const CFG = CONTEXT.SNA_GetServerConfigUnsafe();
  CFG.runtime_dir = runtime_dir;
  CFG.config_dir = config_dir;
  CFG.source_dir = source_dir;
  CFG.asset_dir = asset_dir;
  CFG.viewlib_dir = viewlib_dir;
  CFG.webc_dir = webc_dir;

  return {
    source_dir,
    asset_dir,
    output_dir,
    runtime_dir,
    config_dir,
    viewlib_dir,
    webc_dir
  };
}

/// API: BUILD APPSERVER //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: SNA_Build imports scripts provided folder. Hide dependent scripts in
 *  subdirectories. It's assumed that .mts files are server-side and .ts files
 *  are app-client side. Client-side files are bundled into 'js/bundle.js'
 *  Can be called after URNET_READY (e.g. APP_READY)
 */
async function SNA_Build(rootDir: string): Promise<void> {
  LOG(`SNA Build: Transpiling and bundling javascript`);

  // ensure the required SNA APP directories exist
  const { source_dir, asset_dir, output_dir, webc_dir } = SNA_EnsureAppDirs(rootDir);

  // A build consists of (1) building js bundle from CLIENT_ENTRY, and copying the
  // output to HT_DOCS/js followed by (2) copying assets from HT_ASSETS to HT_DOCS,
  // which includes an index.html file that loads the js bundle. You have to write
  // the index file yourself.

  const bundle_name = 'bundle.js';
  const { entryFile, tsFiles } = await IMPORT.MakeAppImports(source_dir);
  if (tsFiles.length) {
    LOG(`Build: bundling ${BLU}${tsFiles.join(' ')}${NRM}`);
    LOG(`.. to ${BLU}${bundle_name}${NRM}`);
  } else LOG(`No client components found in ${source_dir}`);

  const { webcFile, webcFiles } = await IMPORT.MakeWebCustomImports(webc_dir);
  if (webcFiles.length) {
    LOG(`Found web components: ${BLU}${webcFiles.join(' ')}${NRM}`);
    LOG(`import as ${BLU}${webcFile}${NRM}`);
  } else LOG(`No web components found in ${webc_dir}`);

  /// BUILD APP ///

  // these are our abstraction of build options for an URSYS client-server project
  const notify_cb = m_NotifyCallback;
  const buildOpts: BuildOptions = {
    source_dir,
    asset_dir,
    output_dir,
    entry_file: entryFile, // relative to source_dir
    bundle_name,
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
  const mtsFiles = await IMPORT.FindServerModules(source_dir);
  const sdir = FILE.u_short(source_dir);
  if (mtsFiles.length)
    LOG(`Loaded server components: ${BLU}${mtsFiles.join(' ')}${NRM}`);
  else LOG(`No server components found in '${sdir}'`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: SNA_MultiBuild is a variant of SNA_Build. Found client ts files are
 *  are bundled into separate bundle files with the same root name */
async function SNA_MultiBuild(rootDir: string): Promise<void> {
  LOG(`SNA MultiBuild: Transpiling and bundling entry files`);
  // ensure the required SNA APP directories exist
  const { source_dir, asset_dir, output_dir, webc_dir } = SNA_EnsureAppDirs(rootDir);

  const entryFiles = await IMPORT.FindClientEntryFiles(source_dir);
  if (entryFiles.length) {
    LOG(`MultiBuild: bundling entry files: ${BLU}${entryFiles.join(' ')}${NRM}`);
  } else {
    LOG(`MultiBuild: No entry files found in ${source_dir}`);
    return;
  }

  const { webcFile, webcFiles } = await IMPORT.MakeWebCustomImports(webc_dir);
  if (webcFiles.length) {
    LOG(`Found web components: ${BLU}${webcFiles.join(' ')}${NRM}`);
    LOG(`import as ${BLU}${webcFile}${NRM}`);
  } else LOG(`No web components found in ${webc_dir}`);

  /// BUILD APP ///

  // these are our abstraction of build options for an URSYS client-server project
  const notify_cb = m_NotifyCallback;
  const buildOpts: BuildOptions = {
    source_dir,
    asset_dir,
    output_dir,
    entry_files: entryFiles, // relative to source_dir
    // hot reload callback, added to esbuild events
    notify_cb
  };
  LOG(`Using esbuild to assemble website -> ${BLU}${FILE.u_short(output_dir)}${NRM}`);
  APPBUILD.SetBuildOptions(buildOpts);
  await APPBUILD.MultiBuildApp(buildOpts);

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
  const mtsFiles = await IMPORT.FindServerModules(source_dir);
  const sdir = FILE.u_short(source_dir);
  if (mtsFiles.length)
    LOG(`Loaded server components: ${BLU}${mtsFiles.join(' ')}${NRM}`);
  else LOG(`No server components found in '${sdir}'`);
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
    EP.netSignal('NET:UR_HOT_RELOAD_APP', { changed });
    return;
  }
  if (DBG) LOG(`${DIM}unhandled notify change: ${FILE.u_short(changed)}${NRM}`);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna process
  SNA_Build,
  SNA_MultiBuild,
  SNA_RuntimeInfo
};
export {
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  ServerEndpoint
} from './appserver.mts';
