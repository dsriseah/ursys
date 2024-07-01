/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  WebPlay Addon CLI Build and Serve
  Conceptually similar to jsplay addon, except for the browser.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, FILE, CLASS, CONSTANT } from '@ursys/core';
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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { NetEndpoint, NetSocket } = CLASS;

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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { HTTP_INFO } = CONSTANT.URNET;

/// DATA INIT /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let APP: express.Application; // express app instance
let SERVER: http.Server; // http server instance
let WSS: WebSocketServer; // websocket client_link instance
const EP = new NetEndpoint(); // server endpoint
EP.configAsServer('SRV04'); // hardcode arbitrary server address

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
            const { count } = WSS.clients.size;
            if (count === undefined) return;
            EP.netSignal('NET:HOT_RELOAD_APP', { memo: 'hot reload' });
            LOG(`${DIM}'NET:HOT_RELOAD_APP' send to ${count} clients${NRM}`);
          });
        }
      }
    ]
  });
  // activate rebuild on change
  await context.watch();
}

/// SERVER INIT ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Start the HTTP and WebSocket servers. The WebSocket server uses the same
 *  http server instance, which allows it to tunnel websocket traffic after
 *  the initial handshake. This allows nginx (if running) to proxy forward
 *  http traffic as https.
 */
function Listen() {
  FILE.EnsureDir(FILE.AbsLocalPath(DST));

  const http_port = 8080;
  const http_host = '127.0.0.1';
  const wss_path = 'webplay-ws';
  const http_docs = DST;

  return new Promise<void>((resolve, reject) => {
    // configure HTTP server
    APP = express();
    APP.get('/', serveIndex(http_docs));
    APP.use(express.static(http_docs));
    SERVER = APP.listen(http_port, http_host, () => {
      LOG.info(`WEBPLAY AppServer started on http://${http_host}:${http_port}`);
      resolve();
    });
    /** START WEBSOCKET SERVER with EXISTING HTTP SERVER **/
    WSS = new WebSocketServer({
      server: SERVER,
      path: `/${wss_path}`, // requires leading slash
      clientTracking: true
    });
    LOG.info(
      `WEBPLAY URNET WSS started on ws://${http_host}:${http_port}/${wss_path}`
    );
    WSS.on('connection', (client_link, request) => {
      if (DBG) LOG(`${DIM}client connect ${request.socket.remoteAddress}${NRM}`);
      const send = pkt => client_link.send(pkt.serialize());
      const onData = data => {
        const { message } = data;
        if (DBG) LOG(`${DIM}client message ${message}${NRM}`);
        const returnPkt = EP._ingestClientPacket(data, client_sock);
        if (returnPkt) client_link.send(returnPkt.serialize());
      };
      const close = () => {
        if (DBG) LOG(`${DIM}client disconnect${NRM}`);
        client_link.close();
      };
      const client_sock = new NetSocket(client_link, { send, onData, close });
      if (EP.isNewSocket(client_sock)) {
        EP.addClient(client_sock);
        const uaddr = client_sock.uaddr;
        if (DBG) LOG(`${uaddr} client connected`);
      }
      // handle incoming data and return on wire
      client_link.on('message', onData);
      client_link.on('end', () => {
        const uaddr = EP.removeClient(client_sock);
        if (DBG) LOG(`${uaddr} client 'end' disconnect`);
      });
      client_link.on('close', () => {
        const uaddr = EP.removeClient(client_sock);
        if (DBG) LOG(`${uaddr} client 'close' disconnect`);
      });
      client_link.on('error', err => {
        LOG.error(`.. socket error: ${err}`);
      });
    });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Watch for changes with chokidar, rebuilding app with esbuild when a change
 *  to any source file is detected
 */
async function Watch() {
  const src_dir_glob = `${SRC}/**`;
  // Initialize watcher.
  const watcher = CHOKIDAR.watch([src_dir_glob], {
    persistent: true
  });
  watcher.on('change', async changed => {
    LOG(`${DIM}watcher: path changed ${NRM}${PATH.basename(changed)}`);
    await BuildApp();
    EP.netSignal('NET:HOT_RELOAD_APP', { memo: 'hot reload' });
  });
  LOG.info(`WEBPLAY URNET Server watching ${PATH.basename(SRC)}/**`);
  return Promise.resolve();
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(`${ADDON} URNET Live Reload Playground for Browsers`);
  LOG(`${BLU}QUICKSTART: import source file(s) in 'scripts/_welcome.ts'${NRM}`);
  await BuildApp();
  await Listen();
  await Watch();
  LOG('CTRL-C TO EXIT. PRESS RETURN');
})();
