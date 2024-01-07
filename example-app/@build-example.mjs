/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Example App Build Script
  Using esbuild to build and watch an example app
  This script is referred to in the root package.json

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import esbuild from 'esbuild';
import copy from 'esbuild-plugin-copy';
import * as PATH from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { FILES, PR } from '@ursys/core';

/// CONSTANTS AND DECLARATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const __dirname = dirname(fileURLToPath(import.meta.url));
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const APP_PORT = 3000;
const DIR_SRC = PATH.join(__dirname, 'src');
const DIR_STATIC = PATH.join(__dirname, 'assets-static');
const DIR_PUBLIC = PATH.join(__dirname, '_public');
const ENTRY_JS = PATH.join(DIR_SRC, '@init.ts');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const LOG = PR('Example', 'TagBlue');

/// ESBUILD API ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** removes the __dirname from the path to shorten it */
function _short(path) {
  if (path.startsWith(__dirname)) return path.slice(__dirname.length);
  return path;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function ESBuildWebApp() {
  // make sure DIR_PUBLIC exists
  FILES.EnsureDir(DIR_PUBLIC);

  // build the webapp and stuff it into public
  const context = await esbuild.context({
    entryPoints: [ENTRY_JS],
    bundle: true,
    loader: { '.js': 'jsx' },
    target: 'es2020',
    platform: 'browser',
    format: 'cjs',
    sourcemap: true,
    outfile: PATH.join(DIR_PUBLIC, 'script/bundle.js'),
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`${DIR_STATIC}/**/*`],
            to: [DIR_PUBLIC]
          }
        ],
        watch: true
      })
    ]
  });
  // done!
  if (!DBG) LOG('built example-app from', _short(ENTRY_JS));

  // enable watching
  if (DBG) LOG('watching', _short(DIR_PUBLIC));
  await context.watch();

  // start the development server
  if (DBG) LOG('serving', _short(DIR_PUBLIC));
  const { host, port } = await context.serve({
    servedir: DIR_PUBLIC,
    port: APP_PORT
  });

  // done!
  const appName = PATH.basename(__dirname);
  const hostName = host !== '0.0.0.0' || 'localhost';
  LOG.warn(`browse to ${appName} at http://${hostName}:${port}`);
  LOG.info(`.. press ctrl-c to stop`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** TEST **/
(async () => {
  ESBuildWebApp();
})();
