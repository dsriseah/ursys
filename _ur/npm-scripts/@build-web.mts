/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  NODE CLI TOOL - TYPESCRIPT BUILD URSYS WEBAPP

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import PATH from 'node:path';
import { FILE } from '@ursys/core';

// build-web can not use URSYS library because it's BUILDING it!
// so we yoink the routines out of the source directly
import { TerminalLog } from '../common/util-prompts.ts';

/// CONSTANTS AND DECLARATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = TerminalLog('BUILD-APP', 'TagSystem');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ROOT, DIR_PUBLIC } = FILE.GetRootDirs();
const ENTRY_JS = PATH.join(ROOT, 'app/init.jsx');
const APP_PORT = 3000;

/// ESBUILD API ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function _short(path) {
  if (path.startsWith(ROOT)) return path.slice(ROOT.length);
  return path;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function ESBuildWebApp() {
  // make sure DIR_PUBLIC exists
  FILE.EnsureDir(DIR_PUBLIC);

  // build the webapp and stuff it into public
  const context = await esbuild.context({
    entryPoints: [ENTRY_JS],
    bundle: true,
    loader: { '.js': 'jsx' },
    target: 'es2022',
    platform: 'browser',
    format: 'cjs',
    sourcemap: true,
    outfile: PATH.join(DIR_PUBLIC, 'scripts/netc-app.js'),
    plugins: [
      // @ts-ignore - esbuild-plugin-copy not in types
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`app/assets/**/*`],
            to: [DIR_PUBLIC]
          },
          {
            from: [`app-config/**/*`],
            to: [PATH.join(DIR_PUBLIC, 'config')]
          },
          {
            from: [`app-data/**/*`],
            to: [PATH.join(DIR_PUBLIC, 'data')]
          },
          {
            from: [`app-htmldemos/**/*`],
            to: [PATH.join(DIR_PUBLIC, 'htmldemos')]
          }
        ],
        watch: true
      })
    ]
  });
  // done!
  if (!DBG)
    console.log(
      `${LOG.DIM}info: built @ursys web from ${_short(ENTRY_JS)}${LOG.RST}`
    );

  // enable watching
  if (DBG) LOG('watching', _short(DIR_PUBLIC));
  await context.watch();
  // The return value tells us where esbuild's local server is
  if (DBG) LOG('serving', _short(DIR_PUBLIC));
  const { host, port } = await context.serve({
    servedir: DIR_PUBLIC,
    port: APP_PORT
  });
  LOG('appserver at', `http://${host}:${port}`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** TEST **/
(async () => {
  ESBuildWebApp();
})();
