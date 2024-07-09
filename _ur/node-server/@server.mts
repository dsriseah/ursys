/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  entrypoint for server

  when making live changes, make sure that the ur builder is also running and
  users of this library are watching for changes to the ur library

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as ADDON from './ur-addon-mgr.mts';
import * as APPSERV from './appserver.mts';
import * as APPBUILD from './appbuilder.mts';
import * as ENV from './env-node.mts'; /* might be deprecated in future */
import * as FILE from './files.mts';
import * as PROC from './processes.mts';
import * as TEXT from '../common/util-text.ts';
import * as PROMPTS from '../common/util-prompts.ts';
// typescript classes
import UrModule from './class-urmodule.mts';
import OpSequencer from '../common/class-op-seq.ts';
import StateMgr from '../common/class-state-mgr.ts';
import NetSocket from '../common/class-urnet-socket.ts';
import NetEndpoint from '../common/class-urnet-endpoint.ts';
import NetPacket from '../common/class-urnet-packet.ts';
// typescript library modules
import * as UID from '../common/lib-uid.ts';
import * as CONSTANTS from './constants-urnet.mts';

/// TYPES /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** used for runtime initialization of the server-side URSYS library */
type InitOptions = {
  rootDir: string;
};

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
  NetPacket
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
function Initialize(options: InitOptions): void {
  const { rootDir } = options;
  ENV.SetRootPaths(rootDir);
}

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
  ENV,
  FILE,
  PROC,
  TEXT,
  // server-based services
  APPSERV, // application server
  APPBUILD, // application builder
  //
  ADDON, // ur module manager
  // formatting
  makeTerminalOut as PR // prompt style formatter
};
