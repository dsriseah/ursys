/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA WEB URNET - Shared NetEndpoint module for SNA client-side apps

  This is a utility module is used for client-side system components that need to 
  connect to URNET. User components can use sna-web.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NetEndpoint } from '../common/class-urnet-endpoint.ts';
import { NetSocket } from '../common/class-urnet-socket.ts';
import { ConsoleStyler } from '../common/util-prompts.ts';
import * as CONTEXT from './sna-web-context.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { NM_Handler } from '../_types/urnet.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('sna.unet', 'TagGray');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_LINK: WebSocket;
let EP: NetEndpoint = new NetEndpoint();

/// CONNECT TO URNET SERVER ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** resolves to true if the connection is successful, false if not */
function SNA_NetConnect(): Promise<boolean> {
  const wss_url = '/sna-ws';
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
      // 3a. set app config if provided
      const { config } = regdata;
      if (config) CONTEXT.SNA_SetAppConfig(config);

      // 4. all done! declareClientProperties() and declareClientMessages()
      // can happen any time after auth succeeds.
      resolve(true);
    }); // end createConnection
  });
  return promiseConnect;
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the NetEndpoint instance */
function ClientEndpoint() {
  if (!EP) throw Error('ClientEndpoint not initialized');
  return EP;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API:delare message handlers and register after authentation to be added to
 *  URNET message network */
async function RegisterMessages() {
  const resdata = await EP.declareClientMessages();
  return resdata;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: add the message handler */
function AddMessageHandler(message: string, handler: NM_Handler) {
  EP.addMessageHandler(message, handler);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: delete the message handler */
function DeleteMessageHandler(message: string, handler: NM_Handler) {
  EP.deleteMessageHandler(message, handler);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  //
  SNA_NetConnect,
  //
  ClientEndpoint,
  RegisterMessages,
  AddMessageHandler,
  DeleteMessageHandler
};
