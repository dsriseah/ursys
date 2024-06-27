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
import { WebSocketServer } from 'ws';

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
            if (WSS.clients.size === 0) return;
            LOG(`${DIM}rebuild send to ${WSS.clients.size} clients${NRM}`);
            WSS.clients.forEach(client => {
              if (client.readyState === 1) {
                client.send('rebuild');
              }
            });
          });
        }
      }
    ]
  });
  // activate rebuild on change
  await context.watch();
  // configure express middleware
  const APP = express();
  APP.get('/', serveIndex(DST));
  APP.use(express.static(DST));
  // create http server with express middleware
  const httpServer = http.createServer(APP);
  const http_port = 8080;
  const http_host = '127.0.0.1';
  // configure websocket server
  const WSS = new WebSocketServer({
    server: httpServer,
    path: '/webplay-ws', // requires leading slash
    clientTracking: true
  });
  // handle websocket client connections
  WSS.on('connection', (client_link, request) => {
    if (DBG) LOG(`${DIM}client connect ${request.socket.remoteAddress}${NRM}`);
    client_link.on('message', message => {
      if (DBG) LOG(`${DIM}client message ${message}${NRM}`);
    });
    client_link.on('close', () => {
      if (DBG) LOG(`${DIM}client disconnect${NRM}`);
    });
    client_link.send('connect');
  });
  // start appserver
  httpServer.listen(http_port, () => {
    LOG(`${DIM}starting http/wss servers on ${http_host}:${http_port}${NRM}`);
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG(`${ADDON} Live Reload AppServer`);
await BuildApp();
LOG('CTRL-C TO EXIT. PRESS RETURN');
