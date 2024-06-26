/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  WebPlay Addon CLI Build and Serve
  Conceptually similar to jsplay addon, except for the browser.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, FILE } from '@ursys/core';
import FSE from 'fs-extra';
import { copy } from 'esbuild-plugin-copy';
import esbuild from 'esbuild';
// http server
import http from 'node:http';
import express from 'express';
import serveIndex from 'serve-index';
import PATH from 'node:path';
import CHOKIDAR from 'chokidar';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const BLU = '\x1b[34;1m';
const DIM = '\x1b[2m';
const NRM = '\x1b[0m';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [AO_NAME, AO_DIR] = FILE.DetectedAddonDir();
const ADDON = AO_NAME.toUpperCase();
const LOG = PR(ADDON, 'TagCyan');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SRC = AO_DIR; // point to addon dir
const HT_DOCS = PATH.join(SRC, `serve-${AO_NAME}`);
const HT_ASSETS = PATH.join(HT_DOCS, 'assets');
const DST = FILE.AbsLocalPath('_ur_addons/_public');

/// BUILD FILES ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function BuildApp() {
  FSE.ensureDir(DST);
  // build the webapp and stuff it into public
  const context = await esbuild.context({
    entryPoints: [`${SRC}/${AO_NAME}-init.ts`],
    bundle: true,
    loader: { '.js': 'jsx' },
    target: 'es2020',
    platform: 'browser',
    format: 'iife',
    sourcemap: true,
    outfile: `${DST}/${AO_NAME}-bundle.js`,
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`${HT_DOCS}/${AO_NAME}-index.html`],
            to: [`${DST}`]
          },
          {
            from: [`${HT_ASSETS}/**/*`],
            to: [`${DST}/assets`]
          },
          {
            from: [`${HT_DOCS}/css/*`],
            to: [`${DST}/css`]
          },
          {
            from: [`${HT_DOCS}/js/*`],
            to: [`${DST}/js`]
          }
        ],
        watch: true
      }),
      {
        name: 'rebuild-notify',
        setup(build) {
          build.onEnd(() => {
            LOG('.. rebuild notify');
          });
        }
      }
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
  const http_port = 8080;
  const http_host = '127.0.0.1';

  httpServer.listen(http_port, () => {
    console.log(`HTTP Server running on ${http_host}:${http_port}`);
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG(`${AO_NAME} esbuild, html5`);
await BuildApp();
LOG.info('control-c to exit');
