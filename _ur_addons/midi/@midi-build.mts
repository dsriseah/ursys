/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  mini app demo

  this runs when running the 'ur midi' command.
  It launches an esbuild process to build the midi app bundle,
  which is loaded by the index-midi.html file in the assets directory.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, FILE } from '@ursys/core';
import FSE from 'fs-extra';
import { copy } from 'esbuild-plugin-copy';
import esbuild from 'esbuild';
// http server
import http from 'node:http';
import https from 'node:https';
import express from 'express';
import serveIndex from 'serve-index';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('MIDI', 'TagPurple');

/// BUILD FILES ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function ESBuildApp() {
  const SRC = FILE.AbsLocalPath('_ur_addons/midi');
  const DST = FILE.AbsLocalPath('_ur_addons/_dist/_public');
  FSE.ensureDir(DST);

  // build the webapp and stuff it into public
  const context = await esbuild.context({
    entryPoints: [`${SRC}/midi-init.ts`],
    bundle: true,
    loader: { '.js': 'jsx' },
    target: 'es2020',
    platform: 'browser',
    format: 'iife',
    sourcemap: true,
    outfile: `${DST}/scripts/midi-bundle.js`,
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`assets/**/*`],
            to: [DST]
          }
        ],
        watch: true
      })
    ]
  });
  // activate rebuild on change
  await context.watch();

  // add express
  const APP = express();
  APP.get('/', serveIndex(DST));
  APP.use(express.static(DST));

  // Listen both http & https ports
  const httpServer = http.createServer(APP);
  const httpsServer = https.createServer(
    {
      key: FSE.readFileSync('/etc/letsencrypt/live/ursys.dsri.xyz/privkey.pem'),
      cert: FSE.readFileSync('/etc/letsencrypt/live/ursys.dsri.xyz/fullchain.pem')
    },
    APP
  );

  const http_port = 8080;
  const https_port = 8443;
  const http_host = '127.0.0.1';
  const https_host = 'ursys.dsri.xyz';

  httpServer.listen(http_port, () => {
    console.log(`HTTP Server running on ${http_host}:${http_port}`);
  });

  httpsServer.listen(https_port, () => {
    console.log(`HTTPS Server running on ${https_host}:${https_port}`);
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('mini app demo using esbuild, html5');
await ESBuildApp();
LOG.info('control-c to exit');
