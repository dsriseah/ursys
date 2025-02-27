/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  AppBuilder with Live Reload and WatchExtra services

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import fse from 'fs-extra';
import path from 'node:path';
import chokidar from 'chokidar';
import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { TerminalLog } from '../common/util-prompts.js';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type NotifyCallback = (payload?: { changed: any }) => void;
type BuildOptions = {
  source_dir?: string; // base directory for javascript sources
  asset_dir?: string; // path to static assets to copy
  output_dir?: string; // path to write bundle and assets
  runtime_dir?: string; // (opt) path to runtime data directory
  //
  entry_file?: string; // main entry file for the app
  entry_files?: string[]; // (alt) multiple entry files for the app
  index_file?: string; // default index file for web server
  bundle_name?: string; // (opt) short name for the bundle
  notify_cb?: NotifyCallback; // (opt) callback to notify on build
  //
  error?: string; // (opt) error message...if present, options are invalid
};
type WatchOptions = {
  watch_dirs: string[]; // directories to watch for changes
  ignored?: RegExp; // regex to ignore files
  notify_cb?: NotifyCallback; // callback to notify on change
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SRC_JS: string; // javascript sources to build
let SRC_ASSETS: string; // asset sources
let PUBLIC: string; // destination for built files, copied assets
let RUNTIME: string; // convenience runtime data directory
let BUNDLE_NAME: string; // name of the bundle file
let NOTIFY_CB: NotifyCallback; // callback to notify on build
let ENTRY_FILE: string; // default entry file for the app
let ENTRY_FILES: string[]; // multiple entry files for the app
let INDEX_FILE: string; // default index file for the app
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { ANSI_COLORS } from '../common/declare-colors.js';
const { DIM, NRM } = ANSI_COLORS;
const LOG = TerminalLog('URBUILD', 'TagBlue');

/// CONFIGURATION /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: cache the build options to use throughout build process */
function GetBuildOptions(): BuildOptions {
  const fn = 'm_SavedBuildOptions:';
  const valid = SRC_JS && SRC_ASSETS && PUBLIC;
  if (!valid) return { error: 'missing saved build options' };
  return {
    // required values
    source_dir: SRC_JS,
    asset_dir: SRC_ASSETS,
    output_dir: PUBLIC,
    runtime_dir: RUNTIME,
    //
    entry_file: ENTRY_FILE,
    entry_files: ENTRY_FILES,
    index_file: INDEX_FILE,
    // optional values
    bundle_name: BUNDLE_NAME,
    notify_cb: NOTIFY_CB
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return build options if they have been saved */
function SetBuildOptions(opts: BuildOptions) {
  const fn = 'SetBuildOptions:';
  const {
    source_dir,
    asset_dir,
    output_dir,
    runtime_dir,
    entry_file,
    entry_files,
    index_file,
    bundle_name,
    notify_cb
  } = opts;
  const valid = source_dir && asset_dir && output_dir;
  if (!valid) throw Error(`${fn} source, asset, and output are all required`);
  SRC_JS = source_dir;
  SRC_ASSETS = asset_dir;
  PUBLIC = output_dir;
  RUNTIME = runtime_dir || `${source_dir}/_runtime`;
  ENTRY_FILE = entry_file;
  ENTRY_FILES = entry_files;
  INDEX_FILE = index_file;
  BUNDLE_NAME = bundle_name;
  NOTIFY_CB = notify_cb;
  return GetBuildOptions();
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Use ESBUILD to build a webapp from source files, also copying assets
 *  from a separate asset directory to the output directory.
 */
async function BuildApp(opts: BuildOptions) {
  const fn = 'BuildApp:';
  // save options for later. these are NOT esbuild-specific options
  let { bundle_name, entry_file, notify_cb } = SetBuildOptions(opts);
  // option: default bundle name to entry file name if not set
  if (!bundle_name) bundle_name = path.basename(entry_file);
  // ensure the output directory exists
  fse.ensureDir(PUBLIC);
  // build the webapp and stuff it into public
  const context = await esbuild.context({
    entryPoints: [`${SRC_JS}/${entry_file}`],
    bundle: true,
    loader: { '.js': 'jsx' },
    target: 'es2020',
    platform: 'browser',
    format: 'iife',
    sourcemap: true,
    outfile: `${PUBLIC}/js/${bundle_name}`,
    plugins: [
      // @ts-ignore - esbuild-plugin-copy not in types
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`${SRC_ASSETS}/**/*`],
            to: [`${PUBLIC}/`]
          }
        ],
        watch: true
      }),
      {
        name: 'rebuild-notify',
        setup(build) {
          build.onStart(() => {
            // LOG(`BuildApp: ${DIM}building app${NRM}`);
          });
          build.onEnd(() => {
            // LOG(`BuildApp: ${DIM}app built${NRM}`);
            if (notify_cb) notify_cb({ changed: 'rebuild-notify' });
          });
        }
      }
    ]
  });
  // activate rebuild on change
  await context.watch();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Similar to BuildApp, except using multiple entry points and outputting
 *  as esm module format (rather than iife)
 */
async function MultiBuildApp(opts: BuildOptions) {
  const fn = 'MultiBuildApp:';
  // save options for later. these are NOT esbuild-specific options
  let { entry_files, notify_cb } = SetBuildOptions(opts);
  entry_files = entry_files.map(file => `${SRC_JS}/${file}`);
  // ensure the output directory exists
  fse.ensureDir(PUBLIC);
  // build the webapp and stuff it into public
  const context = await esbuild.context({
    entryPoints: entry_files,
    bundle: true,
    loader: { '.js': 'jsx' },
    target: 'es2020',
    platform: 'browser',
    format: 'esm',
    splitting: true,
    sourcemap: true,
    outdir: `${PUBLIC}/js/`,
    plugins: [
      // @ts-ignore - esbuild-plugin-copy not in types
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`${SRC_ASSETS}/**/*`],
            to: [`${PUBLIC}/`]
          }
        ],
        watch: true
      }),
      {
        name: 'rebuild-notify',
        setup(build) {
          build.onStart(() => {
            // LOG(`BuildApp: ${DIM}building app${NRM}`);
          });
          build.onEnd(() => {
            // LOG(`BuildApp: ${DIM}app built${NRM}`);
            if (notify_cb) notify_cb({ changed: 'rebuild-notify' });
          });
        }
      }
    ]
  });
  // activate rebuild on change
  await context.watch();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Watch for changes with chokidar, rebuilding app with esbuild when a
 *  change to any source file is detected. This used for catching changes
 *  outside of the source directory, such as changes to assets.
 */
async function WatchExtra(opts: WatchOptions) {
  const { watch_dirs, notify_cb } = opts;
  // Initialize watcher.
  const watcher = chokidar.watch(watch_dirs, {
    persistent: true
  });
  // watcher.on('all', (event, path) => {
  //   const shortPath = path.replace(process.cwd(), '.');
  //   LOG(`WatchExtra: ${event} ${shortPath}`);
  // });
  watcher.on('change', async changed => {
    const opts = GetBuildOptions();
    LOG(`${DIM}watch-extra: rebuilding app...${NRM}`);
    if (opts.entry_file) await BuildApp(opts);
    else if (opts.entry_files) await MultiBuildApp(opts);
    if (notify_cb) notify_cb({ changed });
    else LOG(`watch-extra: no notify_cb set`);
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  SetBuildOptions, // save the build options for later use
  GetBuildOptions, // return the saved build options
  //
  BuildApp, // build a webapp from source/assets, watching for changes
  MultiBuildApp, // build multiple entry files as separate bundles, watching
  WatchExtra // watch for changes outside of the source directory
};
export type { BuildOptions, WatchOptions, NotifyCallback };
