/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  entrypoint for client

  when making live changes, make sure that the ur builder is also running and
  users of this library are watching for changes to the ur library

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

// utility modules
import * as PROMPTS from '../common/util-prompts.ts';
import * as TEXT from '../common/util-text.js';
import * as NORM from '../common/util-data-norm.ts';
// typescript classes
import * as CLIENT_EP from './urnet-browser.ts';
import * as UID from '../common/module-uid.ts';
import OpSequencer from '../common/class-op-seq.ts';
import StateMgr from '../common/class-state-mgr.ts';
import NetSocket from '../common/class-urnet-socket.ts';
import NetEndpoint from '../common/class-urnet-endpoint.ts';
import NetPacket from '../common/class-urnet-packet.ts';
import PhaseMachine from '../common/class-phase-machine.ts';
import * as SNA from './sna-web.ts';
// constants
import {
  HTTP_CLIENT_INFO,
  GetClientInfoFromWindowLocation
} from '../common/constants-urnet-web.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { makeStyleFormatter } = PROMPTS;
const PR = makeStyleFormatter('UR', 'TagCyan');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CLASS = {
  OpSequencer,
  StateMgr,
  NetSocket,
  NetEndpoint,
  NetPacket,
  PhaseMachine
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LIB = {
  UID
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CONSTANT = {
  URNET: { ...HTTP_CLIENT_INFO, GetClientInfoFromWindowLocation }
};

/// TEST METHODS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ClientTest(): void {
  console.log(...PR('System Integration of new URSYS module successful!'));
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // moduiles
  PROMPTS,
  TEXT,
  NORM,
  SNA,
  // typescript classes, libraries
  CONSTANT,
  CLASS,
  LIB,
  // services
  CLIENT_EP, // endpoint for browsers (deprecated by SNA)
  // classes
  StateMgr,
  OpSequencer,
  NetSocket,
  NetEndpoint,
  NetPacket,
  PhaseMachine
};
/// debugging helpers
export {
  makeStyleFormatter as ConsoleStyler // style formatter for browser
};
/// PhaseMachine Interface
export {
  NewPhaseMachine,
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetMachineStates
} from '../common/class-phase-machine.ts';
