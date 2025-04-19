/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  NODE CLI TOOL - TYPESCRIPT BUILD URSYS ADDONS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import esbuild from 'esbuild';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';
import FSE from 'fs-extra';
import PROMPTS from '../common/util-prompts.ts';
import { GetRootDirs } from '../node-server/file.mts';

/// CONSTANTS AND DECLARATIONS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ROOT, DIR_UR_ADDS, DIR_UR_ADDS_OUT } = GetRootDirs();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = PROMPTS.TerminalLog('BUILD-MOD', 'TagSystem');

/// ESBUILD API ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function _short(path) {
  if (path.startsWith(ROOT)) return path.slice(ROOT.length);
  return path;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** build the UR libraries for server and client */
async function ESBuildModules() {
  FSE.ensureDir(DIR_UR_ADDS_OUT);
  /** SERVER CLIENT SHARED BUILD SETTINGS **/
  const nodeBuild = {
    entryPoints: [`${DIR_UR_ADDS}/@addons-node.mts`],
    bundle: true,
    platform: 'node',
    target: ['node18', 'esnext'],
    sourcemap: true,
    packages: 'external'
  };

  /* build the server library for nodejs */
  // @ts-ignore - build options
  await esbuild.build({
    ...nodeBuild,
    outfile: `${DIR_UR_ADDS_OUT}/addons-node.mjs`,
    format: 'esm'
  });
  if (DBG) LOG('built addons-node mjs');

  // @ts-ignore - build options
  await esbuild.build({
    ...nodeBuild,
    outfile: `${DIR_UR_ADDS_OUT}/addons-node.cjs`,
    format: 'cjs'
  });
  if (DBG) LOG('built addons-node.cjs');

  /** BROWSER CLIENT SHARED BUILD SETTINGS **/
  const browserBuild = {
    entryPoints: [`${DIR_UR_ADDS}/@addons-web.ts`],
    bundle: true,
    platform: 'browser',
    target: ['es2018'], // brunch can't handle features beyond this date
    sourcemap: true
  };

  // @ts-ignore - build options
  await esbuild.build({
    ...browserBuild,
    outfile: `${DIR_UR_ADDS_OUT}/addons-web-esm.js`,
    format: 'esm'
  });
  if (DBG) LOG('built addons-web-esm.js');

  // @ts-ignore - build options
  await esbuild.build({
    ...browserBuild,
    outfile: `${DIR_UR_ADDS_OUT}/addons-web-cjs.js`,
    format: 'cjs'
  });
  if (DBG) LOG('built addons-web-cjs.js');

  await esbuild.build({
    ...browserBuild,
    plugins: [umdWrapper()],
    outfile: `${DIR_UR_ADDS_OUT}/addons-web-umd.js`,
    // @ts-ignore - esbuild-plugin-umd-wrapper
    format: 'umd' // esbuild-plugin-umd-wrapper
  });
  if (DBG) LOG('built addons-web-umd.js');

  // if !DBG, print simpler built message
  if (!DBG) console.log(`${LOG.DIM}info: built ursys addons${LOG.RST}`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** TEST **/
(async () => {
  await ESBuildModules();
})();
