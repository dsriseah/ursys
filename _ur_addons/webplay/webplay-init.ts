/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Main Entry Point for WebPlay Browser Client
  see @webplay-cli.mts for build and serve code

  QUICK START:
  Put your files into the scripts directory and import them to test in
  the browser. Changes to source files will trigger a rebuild and reload.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler, CLASS, CONSTANT } from '@ursys/core';
import './scripts/_welcome.ts';
//
const { NetEndpoint, NetSocket } = CLASS;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('WebPlay', 'TagPurple');
const LOG = console.log.bind(console);
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const EP = new NetEndpoint();
let EP_UADDR = EP.uaddr;
let SERVER_LINK: WebSocket;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const TIMEOUT = 360; // seconds before client closes connection

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
      let out = `Connected to ${wss_url}`;
      LOG(...PR(out));
      const send = pkt => SERVER_LINK.send(pkt.serialize());
      const onData = event => EP._ingestServerPacket(event.data, client_sock);
      const close = () => SERVER_LINK.close();
      const client_sock = new NetSocket(SERVER_LINK, { send, onData, close });
      SERVER_LINK.addEventListener('message', onData);
      SERVER_LINK.addEventListener('close', () => {
        out = `Server closed connection.`;
        LOG(...PR(out));
        EP.disconnectAsClient();
      });
      // needed on chrome, which doesn't appear to send a websocket closeframe
      window.addEventListener('beforeunload', m_DisconnectListener);
      // 2. start client; EP handles the rest
      const auth = { identity: 'my_voice_is_my_passport', secret: 'crypty' };
      const resdata = await EP.connectAsClient(client_sock, auth);
      if (DBG) LOG(...PR('EP.connectAsClient returned', resdata));
      if (resdata.error) {
        console.error(resdata.error);
        resolve(false);
        return;
      }
      // 3. register client with server
      const info = { name: 'UDSClient', type: 'client' };
      const regdata = await EP.declareClientProperties(info);
      if (DBG) LOG(...PR('EP.declareClientProperties returned', regdata));
      if (regdata.error) {
        console.error(regdata.error);
        resolve(false);
        return;
      }
      // 4. save global uaddr
      EP_UADDR = EP.uaddr;
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
  if (DBG) LOG(...PR('EP.declareClientMessages returned', resdata));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** force close the client connection, after waiting for the prescribed number
 *  of seconds (see beforeunload event listener in Connect() also)
 */
function Disconnect(seconds = TIMEOUT) {
  return new Promise((resolve, reject) => {
    LOG(...PR(`waiting for ${seconds} seconds...`));
    window.removeEventListener('beforeunload', m_DisconnectListener);
    m_Sleep(seconds * 1000, () => {
      resolve(true);
      SERVER_LINK.close();
      let out = `Client closing connection.`;
      LOG(...PR(out));
    });
  });
}

/// RUNTIME CONTROL ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  await Connect();
  EP.addMessageHandler('NET:HOT_RELOAD_APP', data => {
    LOG(...PR(`HOT_RELOAD_APP`));
    window.location.reload();
  });
  await RegisterMessages();
})();
