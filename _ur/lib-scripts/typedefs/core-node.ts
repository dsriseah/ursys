/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
    
  Master Type Definition for URSYS CORE NODE
  this file is copied into the _ur/_dist/types folder by 'ur dist' command

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import type {
  Start,
  Status,
  HookAppPhase,
  UseComponent,
  SetAppConfig,
  GetAppConfig,
  //
  HookPhase,
  RunPhaseGroup,
  GetMachine,
  GetDanglingHooks,
  NewComponent,
  //
  AddMessageHandler,
  DeleteMessageHandler,
  RegisterMessages,
  ClientEndpoint
} from './web-client/sna-web.d.ts';

import type MOD_DataClient from './web-client/sna-dataclient.d.ts';

declare const SNA: {
  Start: typeof Start;
  Status: typeof Status;
  HookAppPhase: typeof HookAppPhase;
  UseComponent: typeof UseComponent;
  SetAppConfig: typeof SetAppConfig;
  GetAppConfig: typeof GetAppConfig;
  //
  HookPhase: typeof HookPhase;
  RunPhaseGroup: typeof RunPhaseGroup;
  GetMachine: typeof GetMachine;
  GetDangling: typeof GetDanglingHooks;
  NewComponent: typeof NewComponent;
  //
  AddMessageHandler: typeof AddMessageHandler;
  DeleteMessageHandler: typeof DeleteMessageHandler;
  RegisterMessages: typeof RegisterMessages;
  ClientEndpoint: typeof ClientEndpoint;
};

declare const ConsoleStyler: {
  log: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
};

import type { TerminalLog } from './common/util-prompts.d.ts';

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { SNA, TerminalLog };
export type { MOD_DataClient };
export type { DataObj, ErrObj, StatusObj, OpResult } from './_types/ursys.d.ts';
