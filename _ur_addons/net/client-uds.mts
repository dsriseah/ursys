/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URNET UNIX DOMAIN SOCKET (UDS) NODE CLIENT

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as FOO from 'ursys';
import { PROMPTS, FILE, PROC, CLASS } from 'ursys';
import { UDS_INFO } from './urnet-constants.mts';
import NET from 'node:net';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PROMPTS.TerminalLog('UDSClient', 'TagBlue');
const DBG = false;

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [m_script, m_addon, ...m_args] = PROC.DecodeAddonArgs(process.argv);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let UDS_DETECTED = false;

/// DATA INIT /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const EP = new CLASS.NetEndpoint();
let SERVER_LINK: NET.Socket;

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_Sleep(ms, resolve?): Promise<void> {
  return new Promise(localResolve =>
    setTimeout(() => {
      if (typeof resolve === 'function') resolve();
      localResolve();
    }, ms)
  );
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check for UDS host sock file, meaning UDS server is running */
function m_CheckForUDSHost() {
  const { sock_path } = UDS_INFO;
  UDS_DETECTED = FILE.FileExists(sock_path);
  return UDS_DETECTED;
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create a server connection to the UDS server */
function Connect(): Promise<boolean> {
  const fn = 'Connect';
  const { sock_path, sock_file } = UDS_INFO;
  const promiseConnect = new Promise<boolean>(resolve => {
    if (!m_CheckForUDSHost()) {
      resolve(false);
      return;
    }
    // got this far, the UDS pipe file exists so server is running
    SERVER_LINK = NET.createConnection({ path: sock_path }, async () => {
      // 1. wire-up SERVER_LINK to the endpoint via our netsocket wrapper
      LOG(`Connected to server '${sock_file}'`);
      const send = pkt => SERVER_LINK.write(pkt.serialize());
      const onData = data => EP._ingestServerPacket(data, client_sock);
      const close = () => SERVER_LINK.end();
      const client_sock = new CLASS.NetSocket(SERVER_LINK, { send, onData, close });
      SERVER_LINK.on('data', onData);
      SERVER_LINK.on('end', () => {
        EP.disconnectAsClient();
      });
      SERVER_LINK.on('close', () => {
        LOG('server closed connection');
      });
      // 2. start client; EP handles the rest
      const auth = { identity: 'my_voice_is_my_passport', secret: 'crypty' };
      const resdata = await EP.connectAsClient(client_sock, auth);
      if (DBG) LOG('EP.connectAsClient returned', resdata);
      if (resdata.error) {
        LOG.error(resdata.error);
        resolve(false);
        return;
      }
      // 3. register client with server
      const info = { name: 'UDSClient', type: 'client' };
      const regdata = await EP.declareClientProperties(info);
      if (DBG) LOG('EP.declareClientProperties returned', regdata);
      if (regdata.error) {
        LOG.error(regdata.error);
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
  // register some message handlers
  EP.addMessageHandler('NET:CLIENT_TEST', data => {
    LOG('NET:CLIENT_TEST got', data);
    return { 'NET:CLIENT_TEST': 'received' };
  });
  const resdata = await EP.declareClientMessages();
  if (DBG) LOG('EP.declareClientMessages returned', resdata);
  // test code below can be removed //
  let count = 0;
  let foo = setInterval(() => {
    if (count > 3) {
      clearInterval(foo);
      LOG('netCall test sequence complete');
      return;
    }
    if (count % 2) {
      EP.netCall('SRV:REFLECT', { foo: 'bar' }).then(res => {
        LOG('SRV:REFLECT returned', res);
      });
    } else {
      EP.netCall('SRV:MYSERVER', { hello: 'world' }).then(res => {
        LOG('SRV:MYSERVER returned', res);
      });
    }
    count++;
  }, 1000);
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Disconnect(seconds = 3) {
  return new Promise((resolve, reject) => {
    m_Sleep(seconds * 1000, () => {
      if (SERVER_LINK) SERVER_LINK.end();
      resolve(true);
    });
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// used by direct module import
export {
  // client interfaces (experimental wip, nonfunctional)
  Connect,
  RegisterMessages,
  Disconnect
};
