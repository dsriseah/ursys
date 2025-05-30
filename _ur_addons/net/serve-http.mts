/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URNET EXPRESS/WS (HTTP) NODE SERVER

  This is an URNET host that is spawned as a standalone process by 
  cli-serve-control.mts.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import { watch } from 'chokidar';
import serveIndex from 'serve-index';
import chokidar from 'chokidar';
import esbuild from 'esbuild';
import { copy } from 'esbuild-plugin-copy';
import { WebSocketServer } from 'ws';
//
import { PROMPTS, PROC, FILE, CLASS } from 'ursys/server';
const { NetEndpoint, NetSocket } = CLASS;

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { BuildOptions } from 'esbuild';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import { HTTP_INFO, ESBUILD_INFO } from './urnet-constants.mts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PROMPTS.TerminalLog('HTTP', 'TagBlue');
const [m_script, m_addon, ...m_args] = PROC.DecodeAddonArgs(process.argv);
let m_proxy_locations: Array<any>;
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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// this might not be necessary; check nohup.out log for this message when
/// invoking ur with nohup net cmd &
process.on('SIGHUP', () => LOG(`ignoring SIGHUP received by serve-http.mts`));

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
  if (!FILE.FileExists(entryFile)) throw Error(`${fn} missing entry ${entryFile}`);
  const indexFile = `${app_src}/${app_index}`;
  if (!FILE.FileExists(indexFile)) throw Error(`${fn} missing index ${indexFile}`);
  // esbuild build options
  LOG.info(`HTTP Building Site'${app_entry}' from '${app_index}'`);
  const contextBuild: BuildOptions = {
    entryPoints: [entryFile], // js file to start bundling
    target: [es_target], // js version to target
    platform: 'browser', // environment to run in
    bundle: true,
    sourcemap: true,
    plugins: [
      // @ts-ignore - esbuild-plugin-copy not in types
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
          },
          {
            from: [`${app_src}/favicon.svg`],
            to: [`${http_docs}`]
          }
        ]
      })
    ]
  };

  // build for browser
  // https://github.com/evanw/esbuild/releases/tag/v0.17.0 for notes
  const context = await esbuild.context({
    ...contextBuild,
    outfile: `${http_docs}/${app_bundle}`,
    format: 'esm'
  });
  // context doesn't build, so we call rebuild()
  await context.rebuild();
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
/** Parse ursys.dsri.xyz nginx config for locations */
function m_PromiseProxyLocations(): Promise<Array<any>> {
  const nginxConf = '/etc/nginx/sites-enabled/ursys_dsri_xyz';
  // local install? then just return root
  if (!FILE.FileExists(nginxConf)) {
    const base = path.basename(nginxConf);
    LOG.info(`HTTP URNET Server nginx config '${base}' not present`);
    return Promise.resolve(['/']);
  }
  // otherwise, parse nginx config
  return new Promise((resolve, reject) => {
    if (m_proxy_locations !== undefined) {
      resolve(m_proxy_locations);
    } else {
      fs.readFile(nginxConf, 'utf8', (err, data) => {
        if (err) reject(`error reading ${nginxConf}`);
        const locationBlockRegex = /location\s+([^\s]+)\s*\{([^}]+)\}/g;
        let match;
        const locations = [];
        // Collect and process all location blocks
        while ((match = locationBlockRegex.exec(data)) !== null) {
          const locationPath = match[1];
          const blockContent = match[2];
          // Extract proxy_pass value within the block
          const proxyPortRegex = /proxy_pass\s+http:\/\/[^:]+:(\d+)\/;/;
          const proxPortMatch = blockContent.match(proxyPortRegex);
          if (proxPortMatch)
            locations.push({ location: locationPath, proxyPort: proxPortMatch[1] });
        }
        m_proxy_locations = locations;
        resolve(locations);
      });
    }
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** helper to return url on reverse proxy front end */
async function m_PromiseProxyURL(http_port): Promise<string> {
  if (http_port === undefined) return undefined;
  const locations = await m_PromiseProxyLocations();
  if (locations.length === 0) return undefined;
  const found = locations.find(item => item.proxyPort === `${http_port}`);
  if (!found) return undefined;
  const { location } = found;
  return `https://ursys.dsri.xyz${location}`;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** looks at nginx configutation of locations, returning html listing */
async function ServeProxyLocations(req: express.Request, res: express.Response) {
  try {
    const locations = await m_PromiseProxyLocations();
    if (locations.length === 0) {
      res.send(`<pre>error: no nginx proxy locations found</pre>`);
      return;
    }
    let out = '<ul>';
    locations.forEach(loc => {
      const { location, proxyPort } = loc;
      out += `<li>location:${location} proxy_pass:${proxyPort}</li>`;
    });
    out += `</ul>`;
    res.send(out);
  } catch {
    res.send(`<pre>internal error in ServeProxyLocations()</pre>`);
  }
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Start the HTTP and WebSocket servers. The WebSocket server uses the same
 *  http server instance, which allows it to tunnel websocket traffic after
 *  the initial handshake. This allows nginx (if running) to proxy forward
 *  http traffic as https.
 */
async function Listen() {
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
  // sneaky locations list (as app/list)
  APP.get('/list', (req, res) => {
    ServeProxyLocations(req, res);
  });

  // apply static files middleware
  APP.use(express.static(http_docs));

  /** START HTTP SERVER **/
  const proxy_url = await m_PromiseProxyURL(http_port);

  SERVER = APP.listen(http_port, http_host, () => {
    LOG.info(`HTTP AppServer started on http://${http_host}:${http_port}`);
    if (proxy_url) LOG.info(`HTTP AppServer is proxied from ${proxy_url}`);
  });
  /** START WEBSOCKET SERVER with EXISTING HTTP SERVER **/
  WSS = new WebSocketServer({
    server: SERVER,
    path: `/${wss_path}`, // requires leading slash
    clientTracking: true
  });
  LOG.info(`HTTP URNET WSS started on ws://${http_host}:${http_port}/${wss_path}`);
  WSS.on('connection', (client_link, request) => {
    const send = pkt => client_link.send(pkt.serialize());
    const onData = data => {
      const returnPkt = EP._ingestClientPacket(data, client_sock);
      if (returnPkt) client_link.send(returnPkt.serialize());
    };
    const close = () => client_link.close();
    const client_sock = new NetSocket(client_link, { send, onData, close });
    if (EP.isNewSocket(client_sock)) {
      EP.addClient(client_sock);
      const uaddr = client_sock.uaddr;
      LOG(`${uaddr} client socket 'connection'`);
    }
    // handle incoming data and return on wire
    client_link.on('message', onData);
    client_link.on('end', () => {
      const uaddr = EP.removeClient(client_sock);
      LOG(`${uaddr} client socket 'end'`);
    });
    client_link.on('close', () => {
      const uaddr = EP.removeClient(client_sock);
      LOG(`${uaddr} client socket 'close'`);
    });
    client_link.on('error', err => {
      LOG.error(`.. socket error: ${err}`);
    });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Watch for changes with chokidar, rebuilding app with esbuild when a change
 *  to any source file is detected
 */
async function Watch() {
  const { app_src } = HTTP_INFO;
  const src_dir_glob = `${app_src}/**`;
  // Initialize watcher.
  const watcher = chokidar.watch([src_dir_glob], {
    persistent: true
  });
  watcher.on('change', async changed => {
    LOG(`watcher: path changed ${path.basename(changed)}`);
    await BuildApp();
    LOG('.. hot reload');
    EP.netSignal('NET:HOT_RELOAD_APP', { memo: 'hot reload' });
  });
  LOG.info(`HTTP URNET Server watching ${path.basename(app_src)}/**`);
  return Promise.resolve();
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Placeholder to register test messages services for this  server for use
 *  by the demo client app
 */
function X_RegisterServices() {
  // SRV:REFLECT is built into URSYS, so don't define
  EP.addMessageHandler('SRV:FAKE_SERVICE', data => {
    LOG('FAKE_SERVICE received', data);
    return { memo: `defined in ${m_script}.X_RegisterServices` };
  });
  LOG.info(`HTTP URNET Server registered services`);
  // note that default services are also registered in Endpoint
  // configAsServer() method
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Start() {
  // first time build
  await BuildApp(); // this completes
  X_RegisterServices(); // build services
  await Listen(); // start app and web server
  await Watch(); // start watcher
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
