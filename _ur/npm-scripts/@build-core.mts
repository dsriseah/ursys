/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  NODE CLI TOOL - TYPESCRIPT BUILD URSYS CORE

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import esbuild from 'esbuild';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';
import FSE from 'fs-extra';
import PROMPTS from '../common/util-prompts.ts';
import { GetRootDirs } from '../node-server/file.mts';

/// CONSTANTS AND DECLARATIONS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = PROMPTS.TerminalLog('BuildCore', 'TagSystem');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ROOT, DIR_UR_OUT } = GetRootDirs();

/// ESBUILD API ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** build the UR libraries for server and client */
async function ESBuildLibrary() {
  // FSE.removeSync(DIR_UR_OUT); // don't do this because brunch watch will break
  FSE.ensureDir(DIR_UR_OUT);

  /** SERVER CLIENT SHARED BUILD SETTINGS **/
  const nodeBuild = {
    entryPoints: [`${ROOT}/_ur/node-server/@node-index.mts`],
    bundle: true,
    platform: 'node',
    target: ['node18', 'esnext'],
    logOverride: {
      'empty-import-meta': 'silent'
    },
    sourcemap: true,
    packages: 'external'
  };

  /* build the server library for nodejs */
  // @ts-ignore - build options
  await esbuild.build({
    ...nodeBuild,
    outfile: `${DIR_UR_OUT}/core-node.mjs`,
    format: 'esm'
  });
  if (DBG) LOG('built core-node.mjs');

  // @ts-ignore - build options
  await esbuild.build({
    ...nodeBuild,
    outfile: `${DIR_UR_OUT}/core-node.cjs`,
    format: 'cjs'
  });
  if (DBG) LOG('built core-node.cjs');

  /** BROWSER CLIENT SHARED BUILD SETTINGS **/
  const browserBuild = {
    entryPoints: [`${ROOT}/_ur/web-client/@web-index.ts`],
    bundle: true,
    platform: 'browser',
    target: ['es2018'], // brunch can't handle features beyond this date
    sourcemap: true
  };

  // @ts-ignore - build options
  await esbuild.build({
    ...browserBuild,
    outfile: `${DIR_UR_OUT}/core-web-esm.js`,
    format: 'esm'
  });
  if (DBG) LOG('built core-web-esm.js');

  // @ts-ignore - build options
  await esbuild.build({
    ...browserBuild,
    outfile: `${DIR_UR_OUT}/core-web-cjs.js`,
    format: 'cjs'
  });
  if (DBG) LOG('built core-web-cjs.js');

  await esbuild.build({
    ...browserBuild,
    plugins: [umdWrapper()],
    outfile: `${DIR_UR_OUT}/core-web-umd.js`,
    // @ts-ignore - esbuild-plugin-umd-wrapper option
    format: 'umd' // esbuild-plugin-umd-wrapper
  });
  if (DBG) LOG('built core-web-umd.js');

  // if !DBG just emit a simpler message
  if (!DBG) console.log(`${LOG.DIM}info: built @ursys core${LOG.RST}`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** TEST **/
(async () => {
  await ESBuildLibrary();
})();
