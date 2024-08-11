/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  AppServer with URNET WebSocket support

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import express from 'express';
import serveIndex from 'serve-index';
import { WebSocketServer } from 'ws';
import http from 'node:http';
import * as FILE from './file.mts';
import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';
import { NetEndpoint } from '../common/class-urnet-endpoint.ts';
import { NetSocket } from '../common/class-urnet-socket.ts';
import { NetPacket } from '../common/class-urnet-packet.ts';

/// TYPE DEFINITIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { NP_Msg, NP_Address, NM_Handler } from '~ur/types/urnet.d.ts';
type AddressInfo = { port: number; family: string; address: string };
type RequestHandler = express.RequestHandler; // (req,res,next)=>void
type PacketHandler = (pkt: NetPacket) => void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HTOptions = {
  server_name?: string; // name of the server
  wss_name?: string; // name of the websocket server
  http_port?: number; // default is 8080
  http_host?: string; // default is localhost
  http_docs?: string; // path to serve files
  index_file?: string; // use if set, otherwise show directory listing
  error?: string; // (opt) error message...if present, options are invalid
};
type WSOptions = {
  wss_path?: string; // default is 'urnet-ws'
  srv_addr?: NP_Address; // servers UADDR
  error?: string; // (opt) error message...if present, options are invalid
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const { DIM, NRM } = ANSI;
const LOG = makeTerminalOut('UR.SERVE', 'TagBlue');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let APP: express.Application; // express app instance, init by ListenHTTP
let SERVER: http.Server; // http server instance, init by ListenHTTP
let WSS: WebSocketServer; // websocket server, init by ListenWSS
let EP: NetEndpoint; // server endpoint, init by ListenWSS

/// CONFIGURATION /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_NAME: string;
let SERVER_PORT: number;
let SERVER_HOST: string;
let SRV_UADDR: NP_Address;
let WSS_PATH: string;
let INDEX_FILE: string;
let HTTP_DOCS: string;
let WSS_NAME: string;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SaveHTOptions(opt: HTOptions): HTOptions {
  const fn = 'SaveHTOptions:';
  const { server_name, http_port, http_host } = opt;
  let { index_file, http_docs } = opt;
  // error checking of required elements
  const valid = http_host && http_port;
  if (!valid) return { error: `${fn} missing http_host or http_port` };
  if (typeof http_docs !== 'string') return { error: `${fn} missing http_docs` };
  if (!FILE.DirExists(http_docs)) return { error: `${fn} http_docs not found` };
  // error checking of optional elements
  if (typeof index_file !== 'string') throw Error(`${fn} index_file is invalid`);
  // everything good, so save the options
  INDEX_FILE = index_file;
  HTTP_DOCS = http_docs;
  SERVER_NAME = server_name || 'AppServer';
  WSS_NAME = `${SERVER_NAME}-URNET`;
  SERVER_PORT = http_port || 8080;
  SERVER_HOST = http_host || 'localhost';
  return GetHTOptions();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetHTOptions(): HTOptions {
  return {
    server_name: SERVER_NAME, //
    wss_name: WSS_NAME,
    http_port: SERVER_PORT,
    http_host: SERVER_HOST,
    index_file: INDEX_FILE,
    http_docs: HTTP_DOCS
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SaveWSOptions(opt: WSOptions): WSOptions {
  const fn = 'SaveWSOptions:';
  const { wss_path, srv_addr } = opt;
  if (typeof wss_path !== 'string') return { error: `${fn} wss_path is invalid` };
  WSS_PATH = wss_path || 'urnet-ws';
  SRV_UADDR = srv_addr || ('SRV01' as NP_Address);
  return GetWSOptions();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetWSOptions(): WSOptions {
  return {
    srv_addr: SRV_UADDR, //
    wss_path: WSS_PATH //
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function CheckConfiguration(opt: HTOptions & WSOptions) {
  const htOpts = SaveHTOptions(opt);
  const wsOpts = SaveWSOptions(opt);
  return { ...htOpts, ...wsOpts };
}

/// SERVER INIT ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Start the HTTP server. The WebSocket server uses the same
 *  http server instance, which allows it to tunnel websocket traffic after
 *  the initial handshake. This allows nginx (if running) to proxy forward
 *  http traffic as https.
 */
function ListenHTTP(opt: HTOptions) {
  const fn = 'ListenHTTP:';
  const { error, http_port, http_host, http_docs, index_file, server_name } =
    SaveHTOptions(opt);
  if (typeof server_name === 'string') SERVER_NAME = server_name;
  return new Promise<void>((resolve, reject) => {
    // sanity checks
    if (error) {
      reject(error);
      return;
    }
    if (SERVER) {
      reject('HTTP server already started');
      return;
    }
    if (!FILE.DirExists(http_docs)) {
      LOG.info(`Creating directory: ${http_docs}`);
      FILE.EnsureDir(http_docs);
    }
    // configure HTTP server
    APP = express();
    // serve index or directory listing
    if (index_file === undefined) APP.get('/', serveIndex(http_docs));
    else {
      const file = `${http_docs}/${index_file}`;
      APP.get('/', (req, res) => res.sendFile(file));
    }
    // serve static files
    APP.use(express.static(http_docs));
    SERVER = APP.listen(http_port, http_host, () => {
      LOG.info(`${SERVER_NAME} started on http://${http_host}:${http_port}`);
      resolve();
    });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Start the websocket server. Must be called after the http server is started
 *  to use the same server instance's address and port.
 */
function ListenWSS(opt: WSOptions) {
  const fn = 'ListenWSS:';
  let { wss_path, srv_addr } = SaveWSOptions(opt);
  if (EP === undefined) EP = new NetEndpoint();
  EP.configAsServer(srv_addr);
  return new Promise<void>((resolve, reject) => {
    if (SERVER === undefined) {
      reject(`${fn} ${SERVER_NAME} HTTP not started`);
      return;
    }
    const { port, address } = SERVER.address() as AddressInfo;
    /** START WEBSOCKET SERVER with EXISTING HTTP SERVER **/
    const config = {
      clientTracking: true
    };
    WSS = new WebSocketServer({
      server: SERVER,
      path: `/${wss_path}`, // requires leading slash
      clientTracking: true
    });
    /** Initialize the endpoint **/
    WSS.on('connection', (client_link, request) => {
      if (DBG) LOG(`${DIM}${WSS_NAME} connect ${request.socket.remoteAddress}${NRM}`);
      const send = pkt => client_link.send(pkt.serialize());
      const onData = data => {
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
        if (DBG) LOG(`${uaddr} client disconnect (ended)`);
      });
      client_link.on('close', () => {
        const uaddr = EP.removeClient(client_sock);
        if (DBG) LOG(`${uaddr} client disconnect (closed)`);
      });
      client_link.on('error', err => {
        LOG.error(`.. socket error: ${err}`);
      });
    });
    /** resolve and exit **/
    const location = `ws://${address}:${port}/${wss_path}`;
    LOG.info(`${WSS_NAME} listening on ${location}`);
    resolve();
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Stop the HTTP server */
function StopHTTP() {
  const fn = 'StopHTTP:';
  LOG.info(`Stopping ${SERVER_NAME}`);
  return new Promise<void>((resolve, reject) => {
    if (SERVER === undefined) {
      // no server to stop
      resolve();
      return;
    }
    SERVER.close(() => {
      SERVER = undefined;
      LOG.info(`${SERVER_NAME} stopped`);
      resolve();
    });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Stop the WebSocket server */
function StopWSS() {
  const fn = 'StopWSS:';
  LOG.info(`Stopping ${WSS_NAME}`);
  return new Promise<void>((resolve, reject) => {
    if (WSS === undefined) {
      resolve();
      return;
    }
    WSS.close(() => {
      WSS = undefined;
      LOG.info(`${WSS_NAME} stopped`);
      resolve();
    });
  });
}

/// MIDDLEWARE ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** To implement a service, add a packet handler to the endpoint. */
function AddMessageHandler(message: NP_Msg, msgHandler: NM_Handler) {
  EP.addMessageHandler(message, msgHandler);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: To remove a service, remove the packet handler from the endpoint.
 *  If the handler is not provided, all handlers for the message are removed.
 */
function RemoveMessageHandler(message: NP_Msg, pktHandlr?: PacketHandler) {
  EP.deleteMessageHandler(message, pktHandlr);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Get the APP instance for adding middleware */
function GetAppInstance(): express.Application {
  return APP;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Get the ENDPOINT instance for inspection */
function GetServerEndpoint(): NetEndpoint {
  return EP;
}

/// CONVENIENCE METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Convenience method to start HTTP and WS servers */
async function Start(opt: HTOptions & WSOptions) {
  const fn = 'Start:';
  try {
    CheckConfiguration(opt);
    await ListenHTTP(opt);
    await ListenWSS(opt);
  } catch (err) {
    LOG.error(`${fn} ${err}`);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Convenience method to stop HTTP and WS servers */
async function Stop() {
  const fn = 'Stop:';
  try {
    await StopWSS();
    await StopHTTP();
  } catch (err) {
    LOG.error(`${fn} ${err}`);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // simple lifecycle
  Start, // start the http and websocket servers
  Stop,
  // startup
  ListenHTTP, // start the http server
  ListenWSS, // start the websocket server (after ListenHTTP)
  StopHTTP, // stop the http server
  StopWSS, // stop the websocket server
  // register URNET services
  AddMessageHandler,
  RemoveMessageHandler,
  // expose instances
  GetAppInstance,
  GetServerEndpoint
};
