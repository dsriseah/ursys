/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Webplay Client Services

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler, CLASS } from '@ursys/core';
const { NetEndpoint, NetSocket } = CLASS;

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type EventType = 'connect' | 'disconnect';
type EventCallback = (data: any) => void;
type EventHandlers = Set<EventCallback>;
type EventMap = Map<EventType, EventHandlers>;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('URNET', 'TagPurple');
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const EP = new NetEndpoint();
const EVENT_MAP: EventMap = new Map();
const TIMEOUT = 360; // seconds before client closes connection
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_LINK: WebSocket;

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_AddEventListener(event: EventType, callback: EventCallback) {
  if (!EVENT_MAP.has(event)) EVENT_MAP.set(event, new Set());
  EVENT_MAP.get(event).add(callback);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_RemoveEventListener(event: EventType, callback?: EventCallback) {
  if (!EVENT_MAP.has(event)) return;
  if (callback) EVENT_MAP.get(event).delete(callback);
  else EVENT_MAP.get(event).clear();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_DispatchEvent(event: EventType, data: any) {
  if (!EVENT_MAP.has(event)) return;
  EVENT_MAP.get(event).forEach(cb => cb(data));
}
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
/** called when the browser window is closed or forced disconnect */
function m_DisconnectListener() {
  EP.disconnectAsClient();
}

/// CLIENT API ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create a client connection to the HTTP/WS server */
function Connect(): Promise<boolean> {
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
      window.addEventListener('beforeunload', m_DisconnectListener);
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
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** force close the client connection, after waiting for the prescribed number
 *  of seconds (see beforeunload event listener in Connect() also)
 */
function Disconnect(seconds = TIMEOUT) {
  return new Promise((resolve, reject) => {
    window.removeEventListener('beforeunload', m_DisconnectListener);
    m_RemoveEventListener('connect');
    m_Sleep(seconds * 1000, () => {
      resolve(true);
      m_DispatchEvent('disconnect', EP);
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
/** initialize the client connection */
function Initialize() {
  const fn = 'Initialize:';
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function OnConnect(cb: EventCallback) {
  m_AddEventListener('connect', cb);
}

/// RUNTIME INIT //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  await Connect();
  m_DispatchEvent('connect', EP);
  EP.addMessageHandler('NET:UR_HOT_RELOAD_APP', data => {
    LOG(...PR(`UR_OT_RELOAD_APP`));
    window.location.reload();
  });
  await RegisterMessages();
})();

/// EXPORTS ////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Initialize, // initialize the client connection
  Connect, // create a client connection to the HTTP/WS server
  Disconnect, // force close the client connection
  RegisterMessages, // declare message handlers and register with server
  //
  GetEndpoint, // return the NetEndpoint instance
  //
  OnConnect // callback for when the client connects
};
