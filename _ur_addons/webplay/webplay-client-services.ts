/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Webplay Client Services

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler, CLASS } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type EventType = 'connect' | 'disconnect';
type EventCallback = (data: any) => void;
type EventHandlers = Set<EventCallback>;
type EventMap = Map<EventType, EventHandlers>;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('WCS', 'TagPurple');
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { NetEndpoint, NetSocket, PhaseMachine } = CLASS;
const TIMEOUT = 360; // seconds before client closes connection
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_LINK: WebSocket;
let EP: typeof NetEndpoint = new NetEndpoint();
let PM: typeof PhaseMachine;

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_Sleep(ms: number, resolve?: Function): Promise<void> {
  return new Promise(localResolve =>
    setTimeout(() => {
      if (typeof resolve === 'function') resolve();
      localResolve();
    }, ms)
  );
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { HookPhase, RunPhaseGroup, GetMachine } = PhaseMachine;

/// CLIENT API ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create a client connection to the HTTP/WS server */
function PromiseConnect(): Promise<boolean> {
  const wss_url = '/webplay-ws';
  const promiseConnect = new Promise<boolean>(resolve => {
    SERVER_LINK = new WebSocket(wss_url);
    SERVER_LINK.addEventListener('open', async () => {
      const send = pkt => SERVER_LINK.send(pkt.serialize());
      const onData = event => EP._ingestServerPacket(event.data, client_sock);
      const close = () => SERVER_LINK.close();
      const client_sock = new NetSocket(SERVER_LINK, { send, onData, close });
      SERVER_LINK.addEventListener('message', onData);
      SERVER_LINK.addEventListener('close', () => {
        EP.disconnectAsClient();
      });
      // needed on chrome, which doesn't appear to send a websocket closeframe
      window.addEventListener('beforeunload', EP.disconnectAsClient);
      // 2. start client; EP handles the rest
      const auth = { identity: 'my_voice_is_my_passport', secret: 'crypty' };
      const resdata = await EP.connectAsClient(client_sock, auth);
      if (resdata.error) {
        console.error(resdata.error);
        resolve(false);
        return;
      }
      // 3. register client with server
      const info = { name: 'WebClient', type: 'client' };
      const regdata = await EP.declareClientProperties(info);
      if (regdata.error) {
        console.error(regdata.error);
        resolve(false);
        return;
      }
      resolve(true);
    }); // end createConnection
  });
  return promiseConnect;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** delare message handlers and register after authentation to be added to
 *  URNET message network
 */
async function RegisterMessages() {
  // declare messages to server
  const resdata = await EP.declareClientMessages();
  LOG(...PR(`RegisterMessages: ${resdata.error || 'success'}`));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** force close the client connection, after waiting for the prescribed number
 *  of seconds (see beforeunload event listener in PromiseConnect() also)
 */
function Disconnect(seconds = TIMEOUT) {
  return new Promise((resolve, reject) => {
    window.removeEventListener('beforeunload', EP.disconnectAsClient);
    m_Sleep(seconds * 1000, () => {
      resolve(true);
      SERVER_LINK.close();
    });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return the NetEndpoint instance */
function GetEndpoint() {
  return EP;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function AddMessageHandler(message: string, callback: Function) {
  EP.addMessageHandler(message, callback);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** initialize the client connection */
async function Initialize() {
  const fn = 'Initialize:';
  PM = new PhaseMachine('WEBPLAY', {
    PHASE_INIT: [
      'SYS_BOOT', // boot the system
      'SYS_INIT', // initialize the system
      'DOM_READY' // web page has rendered
    ],
    PHASE_CONNECT: [
      'NET_CONNECT', // connected to URNET
      'NET_AUTH', // authenticate with URNET
      'NET_REGISTER', // register with URNET
      'NET_DECLARE' // declare messages to URNET
    ],
    PHASE_LOAD: [
      'LOAD_DATA', // load data from server
      'LOAD_CONFIG', // load configuration
      'LOAD_ASSETS' // load assets
    ],
    PHASE_CONFIG: ['APP_CONFIG'],
    PHASE_READY: ['APP_READY'],
    PHASE_RUN: ['APP_RUN']
  });
  LOG(...PR(`${fn} Hooking Phase Selectors`));
  HookPhase('WEBPLAY/DOM_READY', (p, m) => {
    LOG(...PR(`${p}/${m} DOM Ready`));
    const promise = PromiseConnect();
    LOG(...PR(`...initiating connection`));
    return promise;
  });
  HookPhase('WEBPLAY/NET_CONNECT', (p, m) => {
    AddMessageHandler('NET:UR_HOT_RELOAD_APP', () => {
      LOG(...PR(`UR_HOT_RELOAD_APP`));
      window.location.reload();
    });
    RegisterMessages();
    LOG(...PR(`${p}/${m} Connecting to URNET`));
  });

  LOG(...PR(`${fn} Executing Phase Groups`));
  await RunPhaseGroup('WEBPLAY/PHASE_INIT');
  await RunPhaseGroup('WEBPLAY/PHASE_CONNECT');
  await RunPhaseGroup('WEBPLAY/PHASE_LOAD');
  await RunPhaseGroup('WEBPLAY/PHASE_CONFIG');
  await RunPhaseGroup('WEBPLAY/PHASE_READY');
  await RunPhaseGroup('WEBPLAY/PHASE_RUN');
}

/// EXPORTS ////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Initialize, // initialize the client connection
  PromiseConnect, // create a client connection to the HTTP/WS server
  Disconnect, // force close the client connection
  RegisterMessages, // declare message handlers and register with server
  AddMessageHandler, // add a message handler to the NetEndpoint instance
  //
  GetEndpoint, // return the NetEndpoint instance
  HookPhase // add a callback to an event
};
