/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Sri's New Architecture (SNA) Client Component

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '../common/util-prompts.ts';
import { EventMachine } from '../common/class-event-machine.ts';
import { PhaseMachine } from '../common/class-phase-machine.ts';
import { NetEndpoint } from '../common/class-urnet-endpoint.ts';
import { NetSocket } from '../common/class-urnet-socket.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  PhaseID,
  HookFunction,
  HookEvent
} from '../common/class-phase-machine.ts';
import type { OpReturn } from '../_types/dataset';
import type { NM_Handler } from '../_types/urnet';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('SNA', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_LINK: WebSocket;
let EP: NetEndpoint = new NetEndpoint();
let PM: PhaseMachine;

/// DEREFERENCED METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks } = PhaseMachine;
const { addMessageHandler, deleteMessageHandler } = EP;

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** resolves to true if the connection is successful, false if not */
function m_PromiseConnect(): Promise<boolean> {
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
      resolve(true);
    }); // end createConnection
  });
  return promiseConnect;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** add these hooks before running SNA_StartLifecycle */
function m_HookNetworkPhases() {
  const fn = 'HookPhases:';
  HookPhase('SNA/DOM_READY', m_PromiseConnect);
  HookPhase('SNA/NET_CONNECT', async (p, m) => {
    AddMessageHandler('NET:UR_HOT_RELOAD_APP', () => {
      window.location.reload();
    });
  });
  HookPhase('SNA/APP_CONFIG', async (p, m) => {
    await RegisterMessages();
  });
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the NetEndpoint instance */
function Endpoint() {
  if (!EP) throw Error('Endpoint not initialized');
  return EP;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API:delare message handlers and register after authentation to be added to
 *  URNET message network
 */
async function RegisterMessages() {
  // declare messages to server
  const resdata = await EP.declareClientMessages();
  // LOG(...PR(`RegisterMessages: ${resdata.error || 'success'}`));
  // LOG(resdata);
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

/// SNA LIFECYCLE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: initialize the server's lifecycle */
async function SNA_Start() {
  const fn = 'SNA_Start:';
  if (PM === undefined)
    PM = new PhaseMachine('SNA', {
      PHASE_BOOT: [
        'APP_PAGE', // app initial page load complete
        'APP_BOOT' // for minimal initialization of data structure
      ],
      PHASE_INIT: [
        'DOM_READY' // the app's initial page has rendered fully
      ],
      PHASE_CONNECT: [
        'NET_CONNECT', // start the network connection
        'NET_AUTH', // hook for authentication setup
        'NET_REGISTER', // hook for registration info
        'NET_READY', // ursys network is active and registered
        'NET_DECLARE', // hook for declaring messages to URNET
        'NET_ACTIVE' // system is listen for messages
      ],
      PHASE_LOAD: [
        'LOAD_DATA', // load data from server
        'LOAD_CONFIG', // load configuration
        'LOAD_ASSETS' // load assets
      ],
      PHASE_CONFIG: [
        'APP_CONFIG', // app configure based on loaded data, config, etc
        'APP_READY' // app is completely configured
      ],
      PHASE_RUN: [
        'APP_RESET', // app sets initial settings
        'APP_START', // app starts running
        'APP_RUN' // app is running (terminal phase)
      ]
    });

  // add network connectivity phase hooks
  m_HookNetworkPhases();
  // run phase groups in order
  await RunPhaseGroup('SNA/PHASE_BOOT');
  await RunPhaseGroup('SNA/PHASE_INIT');
  await RunPhaseGroup('SNA/PHASE_CONNECT');
  await RunPhaseGroup('SNA/PHASE_LOAD');
  await RunPhaseGroup('SNA/PHASE_CONFIG');
  await RunPhaseGroup('SNA/PHASE_RUN');
  // check for mystery hooks due to typos or dependency issues
  const dooks = GetDanglingHooks();
  if (dooks) {
    LOG(...PR(`*** ERROR *** dangling phase hooks detected`), dooks);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: shortcut hook for SNA machine */
function SNA_Hook(phase: PhaseID, fn: HookFunction) {
  HookPhase(`SNA/${phase}`, fn);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current phase machine state */
function SNA_Status(): OpReturn {
  const fn = 'SNA_Status:';
  const status: { [key: string]: any } = {};

  if (PM === undefined)
    Object.assign(status, {
      phaseGroup: undefined,
      phase: undefined,
      message: 'SNA PhaseMachine is undefined'
    });
  else {
    const { cur_group, cur_phase } = PM;
    const lastPhase = PM.getLastPhase();
    Object.assign(status, {
      phaseGroup: PM.cur_group,
      phase: PM.cur_phase,
      completed: cur_phase === lastPhase
    });
    status.message = `SNA current lifecycle: '${cur_group}/${cur_phase}'`;
    if (status.completed) status.message += ' [completed]';
  }
  return status;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  SNA_Start as Start,
  SNA_Status as Status,
  SNA_Hook as Hook,
  // ursys hooks
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  // ursys messaging
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  Endpoint
};
