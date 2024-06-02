/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URNET EXPRESS/WS (HTTP) CLIENT MODULE

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import { NetEndpoint } from '../../net/class-urnet-endpoint.ts';
import { NetSocket } from '../../net/class-urnet-socket.ts';
import { GetClientInfoFromWindowLocation } from '../../net/urnet-constants-webclient.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('URNET', 'TagBlue');
const LOG = console.log.bind(console);
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const EP = new NetEndpoint();
let SERVER_LINK: WebSocket;

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_Sleep(ms, resolve?): Promise<void> {
  return new Promise(localResolve =>
    setTimeout(() => {
      if (typeof resolve === 'function') resolve();
      localResolve();
    }, ms)
  );
}

/// CLIENT API ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create a client connection to the HTTP/WS server */
function Connect(): Promise<boolean> {
  const { wss_url } = GetClientInfoFromWindowLocation(window.location);
  const promiseConnect = new Promise<boolean>(resolve => {
    LOG(...PR(`websocket connect to ${wss_url}`));
    SERVER_LINK = new WebSocket(wss_url);
    SERVER_LINK.addEventListener('open', async () => {
      LOG(...PR('Connected to server'));
      const send = pkt => SERVER_LINK.send(pkt.serialize());
      const onData = event => EP._ingestServerMessage(event.data, client_sock);
      const close = () => SERVER_LINK.close();
      const client_sock = new NetSocket(SERVER_LINK, { send, onData, close });
      SERVER_LINK.addEventListener('message', onData);
      SERVER_LINK.addEventListener('close', () => {
        LOG(...PR('server closed connection'));
        EP.disconnectAsClient();
      });
      // needed on chrome, which doesn't appear to send a websocket closeframe
      window.addEventListener('beforeunload', () => {
        EP.disconnectAsClient();
      });
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
      const regdata = await EP.registerClient(info);
      if (DBG) LOG(...PR('EP.registerClient returned', regdata));
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
/** define message handlers and register after authentation to be added to
 *  URNET message network
 */
async function RegisterMessages() {
  const EP_UADDR = EP.urnet_addr;
  //
  EP.registerMessage('NET:CLIENT_TEST_CHAT', data => {
    const { message, uaddr } = data;
    const chatWindow = document.getElementById('chat-history');
    const chatMessage = document.createElement('div');
    chatMessage.innerText = `${uaddr}: ${message}`;
    chatWindow.appendChild(chatMessage);
  });
  //
  EP.registerMessage('NET:HOT_RELOAD_APP', data => {
    LOG(...PR(`HOT_RELOAD_APP`));
    window.location.reload();
  });
  //
  EP.registerMessage('NET:CLIENT_TEST', data => {
    LOG(...PR(`CLIENT_TEST ${EP_UADDR} received`, data));
    const { uaddr } = data;
    return { status: `CLIENT_TEST ${EP_UADDR} responding to ${uaddr}` };
  });
  //
  const resdata = await EP.clientDeclare();
  if (DBG) LOG(...PR('EP.clientDeclare returned', resdata));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Disconnect(seconds = 360) {
  return new Promise((resolve, reject) => {
    LOG(...PR(`waiting for ${seconds} seconds...`));
    m_Sleep(seconds * 1000, () => {
      resolve(true);
      SERVER_LINK.close();
      LOG(...PR(`closing client connection after ${seconds}s...`));
    });
  });
}

/// MAIN APP //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Start() {
  const chatWindow: HTMLElement = document.getElementById('chat-history');
  const chatInput: HTMLInputElement = document.getElementById(
    'chat-input'
  ) as HTMLInputElement;
  // send chat message
  chatInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      const message = chatInput.value;
      chatInput.value = '';
      EP.netSignal('NET:CLIENT_TEST_CHAT', { message });
    }
  });
}

/// TEST METHODS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Test() {
  TestClientMessage();
  // TestServerReflect();
  // TestServerService();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function TestClientMessage() {
  const EP_UADDR = EP.urnet_addr;
  // test client-to-client netcall CLIENT_TEST
  LOG(...PR(`CLIENT_TEST ${EP_UADDR} invocation`));
  EP.netCall('NET:CLIENT_TEST', { uaddr: EP_UADDR }).then(retdata => {
    LOG(...PR(`CLIENT TEST ${EP_UADDR} resolved with `, retdata));
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function TestServerReflect() {
  let count = 0;
  let foo = setInterval(() => {
    if (count > 3) {
      clearInterval(foo);
      return;
    }
    EP.netCall('SRV:REFLECT', { foo: 'bar' }).then(refdata => {
      if (refdata.foo !== 'bar') LOG(...PR('REFLECT foo failed', refdata));
      else LOG(...PR(`REFLECT return success`, refdata));
    });
    count++;
  }, 1500);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function TestServerService() {
  let count = 0;
  let foo = setInterval(() => {
    if (count > 3) {
      clearInterval(foo);
      return;
    }
    EP.netCall('SRV:FAKE_SERVICE', { hello: 'world' }).then(res => {
      if (res.memo === undefined) LOG(...PR('FAKE_SERVICE memo failed', res));
      else LOG(...PR(`FAKE_SERVICE return success`, res));
    });
    count++;
  }, 2000);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default {
  Endpoint: EP // endpoint implement calls
};
export {
  Connect, // await Connect() to start URNET client
  RegisterMessages, // await RegisterMessages() to declare client messages
  Start, // start the app
  Disconnect, // await Disconnect() to close client connection
  Test // await Test() to run client tests
};
