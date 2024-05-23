/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URNET EXPRESS/WS (HTTP) NODE SERVER

  This is an URNET host that is spawned as a standalone process by 
  cli-serve-control.mts.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import http from 'node:http';
import express from 'express';
import serveIndex from 'serve-index';
import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { WebSocketServer } from 'ws';
import { PR, PROC, FILE } from '@ursys/core';
import CLASS_EP from './class-urnet-endpoint.ts';
import CLASS_NS from './class-urnet-socket.ts';
const { NetEndpoint } = CLASS_EP;
const { NetSocket } = CLASS_NS;

import { HTTP_INFO, ESBUILD_INFO } from './urnet-constants.mts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('HTTP', 'TagBlue');
const [m_script, m_addon, ...m_args] = PROC.DecodeAddonArgs(process.argv);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SHOW_INDEX = false; // set to true to show index of htdocs

/// PROCESS SIGNAL HANDLING ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
process.on('SIGTERM', () => {
  (async () => {
    LOG(`SIGTERM received by '${m_script}' (pid ${process.pid})`);
    await Stop();
  })();
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
process.on('SIGINT', () => {
  (async () => {
    LOG(`SIGINT received by '${m_script}' (pid ${process.pid})`);
    await Stop();
  })();
});

/// DATA INIT /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let APP: express.Application; // express app instance
let SERVER: http.Server; // http server instance
let WSS: WebSocketServer; // websocket client_link instance
const EP = new NetEndpoint(); // server endpoint
EP.configAsServer('SRV03'); // hardcode arbitrary server address

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Use esbuild to create the app bundle and copy static assets to the
 *  public http_docs directory. */
async function BuildApp() {
  const fn = 'BuildApp';
  const { http_docs, app_src, app_index } = HTTP_INFO;
  const { app_entry, app_bundle, app_bundle_map } = HTTP_INFO;
  const { es_target } = ESBUILD_INFO;
  FILE.EnsureDir(http_docs);
  const entryFile = `${app_src}/${app_entry}`;
  console.log(`entryFile: ${entryFile}`);
  if (!FILE.FileExists(entryFile)) throw Error(`${fn} missing entry ${entryFile}`);
  const indexFile = `${app_src}/${app_index}`;
  if (!FILE.FileExists(indexFile)) throw Error(`${fn} missing index ${indexFile}`);
  // esbuild build options
  LOG.info(`HTTP Building Site'${app_entry}' from '${app_index}'`);
  const browserBuild: esbuild.BuildOptions = {
    entryPoints: [entryFile], // js file to start bundling
    target: [es_target], // js version to target
    platform: 'browser', // environment to run in
    bundle: true,
    sourcemap: true,
    plugins: [
      copy({
        resolveFrom: 'cwd',
        assets: [
          {
            from: [`${app_src}/assets/**/*`],
            to: [`${http_docs}/assets`]
          },
          {
            from: [`${app_src}/js/**/*`],
            to: [`${http_docs}/js`]
          },
          {
            from: [`${app_src}/css/**/*`],
            to: [`${http_docs}/css`]
          },
          {
            from: [`${app_src}/${app_index}`],
            to: [`${http_docs}`]
          }
        ],
        watch: true
      })
    ]
  };
  // build for browser
  await esbuild.build({
    ...browserBuild,
    outfile: `${http_docs}/${app_bundle}`,
    format: 'esm'
  });
  //
  // console.log(`${LOG.DIM}info: built ${app_entry} ${LOG.RST}`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Serve the app index file for this app */
function ServeAppIndex(req: express.Request, res: express.Response) {
  const { http_docs, app_index } = HTTP_INFO;
  const indexFile = `${http_docs}/${app_index}`;
  if (FILE.FileExists(indexFile)) {
    res.sendFile(app_index, { root: http_docs });
  } else {
    res.send(`<pre>error: missing indexfile ${app_index}</pre>`);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Start the HTTP and WebSocket servers. The WebSocket server uses the same
 *  http server instance, which allows it to tunnel websocket traffic after
 *  the initial handshake. This allows nginx (if running) to proxy forward
 *  http traffic as https.
 */
function Listen() {
  const { http_port, http_host, http_docs, wss_path } = HTTP_INFO;
  FILE.EnsureDir(FILE.AbsLocalPath(http_docs));

  // configure HTTP server
  APP = express();

  if (SHOW_INDEX) {
    // show index of the directory if SHOW_INDEX true
    APP.get('/', serveIndex(http_docs));
  } else {
    // handle /
    APP.get('/', (req, res) => {
      ServeAppIndex(req, res);
    });
  }

  // apply static files middleware
  APP.use(express.static(http_docs));

  //
  /** START HTTP SERVER **/
  SERVER = APP.listen(http_port, http_host, () => {
    LOG.info(`HTTP AppServer started on http://${http_host}:${http_port}`);
  });
  /** START WEBSOCKET SERVER with EXISTING HTTP SERVER **/
  WSS = new WebSocketServer({
    server: SERVER,
    path: `/${wss_path}`, // requires leading slash
    clientTracking: true
  });
  LOG.info(
    `HTTP WebSocketServer started on ws://${http_host}:${http_port}/${wss_path}`
  );
  WSS.on('connection', (client_link, request) => {
    const send = pkt => client_link.send(pkt.serialize());
    const onData = data => {
      const returnPkt = EP._clientDataIngest(data, client_sock);
      if (returnPkt) client_link.send(returnPkt.serialize());
    };
    const client_sock = new NetSocket(client_link, { send, onData });
    if (EP.isNewSocket(client_sock)) {
      EP.addClient(client_sock);
      const uaddr = client_sock.uaddr;
      LOG(`${uaddr} client connected`);
    }
    // handle incoming data and return on wire
    client_link.on('message', onData);
    client_link.on('end', () => {
      const uaddr = EP.removeClient(client_sock);
      LOG(`${uaddr} client disconnected`);
    });
    client_link.on('close', () => {
      const { uaddr } = client_sock;
      LOG(`${uaddr} client disconnected`);
    });
    client_link.on('error', err => {
      LOG.error(`.. socket error: ${err}`);
    });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Placeholder to register test messages services for this  server for use
 *  by the demo client app
 */
function X_RegisterServices() {
  EP.registerMessage('SRV:MYSERVER', data => {
    return { memo: `defined in ${m_script}.X_RegisterServices` };
  });
  LOG.info(`HTTP URNET Server registered services`);
  // note that default services are also registered in Endpoint
  // configAsServer() method
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Start() {
  await BuildApp();
  X_RegisterServices();
  Listen();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Stop() {
  return new Promise<void>(resolve => {
    const { http_url, wss_path } = HTTP_INFO;
    LOG.info(`.. stopping HTTP WebSocketServer on ${http_url}/${wss_path}`);
    WSS.clients.forEach(client => client.close());
    WSS.close();
    LOG.info(`.. stopping HTTP AppServer on ${http_url}`);
    SERVER.close();
    const _checker = setInterval(() => {
      if (typeof WSS.clients.every !== 'function') {
        clearInterval(_checker);
        process.exit(0); // force exit...
        return;
      }
      if (WSS.clients.every(client => client.readyState === WebSocketServer.CLOSED)) {
        clearInterval(_checker);
        resolve();
      }
    }, 1000);
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Start();
