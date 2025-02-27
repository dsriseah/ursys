/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URNET EXPRESS/WS (HTTP) CLIENT MODULE

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler, CLASS } from '@ursys/core';
const { NetEndpoint, NetSocket } = CLASS;
import { GetClientInfoFromWindowLocation } from '../../net/urnet-constants-webclient.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('URNET', 'TagBlue');
const LOG = console.log.bind(console);
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const EP = new NetEndpoint();
let EP_UADDR = EP.uaddr;
let SERVER_LINK: WebSocket;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const InputPrompt: HTMLInputElement = document.querySelector('#chat-input label');
const InputText: HTMLInputElement = document.querySelector('#chat-input input');
const ChatText: HTMLInputElement = document.querySelector('#chat-history');
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
function ui_AddChatLine(line: string) {
  ChatText.value += line + '\n';
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ui_SetPrompt(text: string) {
  InputPrompt.innerText = text;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ui_DisableInput() {
  InputText.disabled = true;
  InputText.placeholder = 'Disconnected. Reload page to reconnect.';
  InputText.value = '';
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ui_EnableInput() {
  InputText.disabled = false;
  InputText.placeholder = 'Enter chat message';
}

/// CLIENT API ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create a client connection to the HTTP/WS server */
function Connect(): Promise<boolean> {
  const { wss_url } = GetClientInfoFromWindowLocation(window.location);
  const promiseConnect = new Promise<boolean>(resolve => {
    SERVER_LINK = new WebSocket(wss_url);
    SERVER_LINK.addEventListener('open', async () => {
      let out = `Connected to ${wss_url}`;
      LOG(...PR(out));
      ui_AddChatLine(out);
      const send = pkt => SERVER_LINK.send(pkt.serialize());
      const onData = event => EP._ingestServerPacket(event.data, client_sock);
      const close = () => SERVER_LINK.close();
      const client_sock = new NetSocket(SERVER_LINK, { send, onData, close });
      SERVER_LINK.addEventListener('message', onData);
      SERVER_LINK.addEventListener('close', () => {
        out = `Server closed connection.`;
        LOG(...PR(out));
        ui_AddChatLine(out);
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
  // add message handler for incoming chat messages
  EP.addMessageHandler('NET:CLIENT_TEST_CHAT', data => {
    const { message, uaddr } = data;
    const prompt = uaddr === EP_UADDR ? 'you say: ' : `${uaddr} says: `;
    ui_AddChatLine(`${prompt}${message}`);
  });
  // add message handler used for client tests
  EP.addMessageHandler('NET:CLIENT_TEST', data => {
    LOG(...PR(`CLIENT_TEST ${EP_UADDR} received`, data));
    const { uaddr } = data;
    return { status: `CLIENT_TEST ${EP_UADDR} responding to ${uaddr}` };
  });
  // add message handler to respond to hot reload requests
  EP.addMessageHandler('NET:HOT_RELOAD_APP', data => {
    LOG(...PR(`HOT_RELOAD_APP`));
    window.location.reload();
  });
  // now declare messages to server
  const resdata = await EP.declareClientMessages();
  if (DBG) LOG(...PR('EP.declareClientMessages returned', resdata));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** close the client connection, after waiting for the prescribed number of
 *  seconds
 */
function Disconnect(seconds = TIMEOUT) {
  return new Promise((resolve, reject) => {
    ui_AddChatLine(`Client will autoclose in ${seconds} seconds.`);
    LOG(...PR(`waiting for ${seconds} seconds...`));
    m_Sleep(seconds * 1000, () => {
      resolve(true);
      SERVER_LINK.close();
      let out = `Client closing connection.`;
      LOG(...PR(out));
      ui_AddChatLine(out);
      ui_SetPrompt('---');
      ui_DisableInput();
    });
  });
}

/// MAIN APP //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** start the application */
function Start() {
  // send chat message
  InputText.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      const message = InputText.value;
      InputText.value = '';
      EP.netSignal('NET:CLIENT_TEST_CHAT', { uaddr: EP.uaddr, message });
    }
  });
  ui_SetPrompt(EP_UADDR);
  ui_EnableInput();
}

/// TEST METHODS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** catch-all simple test runner. results are in the browser console */
async function Test() {
  TestClientMessage();
  // TestServerReflect();
  // TestServerService();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** netCall all implementors of NET:CLIENT_TEST, which will return results for
 *  every implementor EXCEPT the calling endpoint
 */
function TestClientMessage() {
  // test client-to-client netcall CLIENT_TEST
  LOG(...PR(`CLIENT_TEST ${EP_UADDR} invocation`));
  EP.netCall('NET:CLIENT_TEST', { uaddr: EP_UADDR }).then(retdata => {
    LOG(...PR(`CLIENT TEST ${EP_UADDR} resolved with `, retdata));
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** netCall the built-in SRV:REFLECT service on the server, which returns the
 *  data that was sent to it */
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
/** netCall SRV:FAKE_SERVICE which is a fake "service" that will return some
 *  data simulating an RPC call */
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
