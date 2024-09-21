/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  entrypoint for server

  when making live changes, make sure that the ur builder is also running and
  users of this library are watching for changes to the ur library

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as ADDON from './ur-addon-mgr.mts';
import * as APPSERV from './appserver.mts';
import * as APPBUILD from './appbuilder.mts';
import * as FILE from './file.mts';
import * as PROC from './process.mts';
import * as TEXT from '../common/util-text.ts';
import * as PROMPTS from '../common/util-prompts.ts';
import * as NORM from '../common/util-data-norm.ts';
import * as SNA from './sna-node.mts';

// typescript classes
import UrModule from './class-urmodule.mts';
import OpSequencer from '../common/class-op-seq.ts';
import StateMgr from '../common/class-state-mgr.ts';
import NetSocket from '../common/class-urnet-socket.ts';
import NetEndpoint from '../common/class-urnet-endpoint.ts';
import NetPacket from '../common/class-urnet-packet.ts';
import PhaseMachine from '../common/class-phase-machine.ts';
// typescript library modules
import * as UID from '../common/module-uid.ts';
import * as CONSTANTS from './constants-urnet.mts';

/// TYPES /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { PhaseID, PhaseDefinition } from '../common/class-phase-machine.ts';
type InitOptions = {};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { makeTerminalOut } = PROMPTS;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CLASS = {
  OpSequencer,
  StateMgr,
  UrModule,
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
const { UDS_INFO, WSS_INFO, HTTP_INFO } = CONSTANTS;
const { ESBUILD_INFO } = CONSTANTS;
const CONSTANT = {
  URNET: {
    UDS_INFO,
    WSS_INFO,
    HTTP_INFO
  },
  BUILD: {
    ESBUILD_INFO
  }
};

/// RUNTIME API ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** first time initialization */
function Initialize(options: InitOptions): void {}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // ursys control
  Initialize,
  // common typescript classes, libraries
  CONSTANT,
  CLASS,
  LIB,
  // basic server modules
  FILE,
  PROC,
  TEXT,
  NORM,
  // server-based services
  APPSERV, // application server
  APPBUILD, // application builder
  //
  SNA, // Sri New Architecture (SNA)
  ADDON, // ur module manager,
  PROMPTS // prompt style formatter
};
// debugging helpers
export {
  makeTerminalOut as PR // makes a styled console.log for node
};
// PhaseMachine interface
export {
  NewPhaseMachine,
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetMachineStates
} from '../common/class-phase-machine.ts';

// export types
export type { BuildOptions, WatchOptions, NotifyCallback } from './appbuilder.mts';
export type { InitOptions };
export type { PhaseID, PhaseDefinition };
