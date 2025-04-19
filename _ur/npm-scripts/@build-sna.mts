/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  NODE CLI TOOL - BUILD URSYS SNA ONLY

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import esbuild from 'esbuild';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';
import FSE from 'fs-extra';
import PROMPTS from '../common/util-prompts.ts';
import { GetRootDirs } from '../node-server/file.mts';

/// CONSTANTS AND DECLARATIONS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = PROMPTS.TerminalLog('BuildSNA', 'TagSystem');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ROOT, DIR_UR_OUT } = GetRootDirs();

/// ESBUILD API ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** build the UR libraries for server and client */
async function ESBuildLibrary() {
  FSE.ensureDir(DIR_UR_OUT);

  /** SERVER CLIENT SHARED BUILD SETTINGS **/
  const nodeBuild = {
    entryPoints: [`${ROOT}/_ur/node-server/sna-node.mts`],
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
    outfile: `${DIR_UR_OUT}/sna-node.mjs`,
    format: 'esm'
  });
  if (DBG) LOG('built sna-node.mjs');

  // @ts-ignore - build options
  await esbuild.build({
    ...nodeBuild,
    outfile: `${DIR_UR_OUT}/sna-node.cjs`,
    format: 'cjs'
  });
  if (DBG) LOG('built sna-node.cjs');

  /** BROWSER CLIENT SHARED BUILD SETTINGS **/
  const browserBuild = {
    entryPoints: [`${ROOT}/_ur/web-client/sna-web.ts`],
    bundle: true,
    platform: 'browser',
    target: ['esnext'],
    sourcemap: true
  };

  // @ts-ignore - build options
  await esbuild.build({
    ...browserBuild,
    outfile: `${DIR_UR_OUT}/sna-web-esm.js`,
    format: 'esm'
  });
  if (DBG) LOG('built sna-web-esm.js');

  // @ts-ignore - build options
  await esbuild.build({
    ...browserBuild,
    outfile: `${DIR_UR_OUT}/sna-web-cjs.js`,
    format: 'cjs'
  });
  if (DBG) LOG('built sna-web-cjs.js');

  await esbuild.build({
    ...browserBuild,
    plugins: [umdWrapper()],
    outfile: `${DIR_UR_OUT}/sna-web-umd.js`,
    // @ts-ignore - esbuild-plugin-umd-wrapper option
    format: 'umd' // esbuild-plugin-umd-wrapper
  });
  if (DBG) LOG('built sna-web-umd.js');

  // if !DBG just emit a simpler message
  if (!DBG) console.log(`${LOG.DIM}info: built ursys sna${LOG.RST}`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** TEST **/
(async () => {
  await ESBuildLibrary();
})();
