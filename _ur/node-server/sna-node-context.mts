/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-NODE-CONTEXT manages shared configuration and state across an SNA App and
  its associated servers. It's maintained on the server

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';
import {
  ServerEndpoint,
  AddMessageHandler,
  RegisterMessages
} from './sna-node-urnet-server.mts';
import { SNA_NewComponent, SNA_HookServerPhase } from './sna-node-hooks.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult, DataObj } from '../_types/dataset.d.ts';
type LockState = 'init' | 'preconfig' | 'prehook' | 'locked';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = makeTerminalOut('SNA.HOOK', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SERVER_CFG: DataObj = {}; // pre-provided configuration object
let CFG_STATE: Set<LockState> = new Set();

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*** return lockstate if state successfully changed, undefined otherwise */
function SNA_SetLockState(state: LockState): LockState {
  if (CFG_STATE.has(state)) return undefined;
  // enforce order of state progression
  if (state === 'init' && CFG_STATE.size !== 0) return undefined;
  if (state === 'preconfig' && !CFG_STATE.has('init')) return undefined;
  if (state === 'prehook' && !CFG_STATE.has('preconfig')) return undefined;
  if (state === 'locked' && !CFG_STATE.has('prehook')) return undefined;
  CFG_STATE.add(state);
  return state;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return true if state is set, false otherwise */
function SNA_GetLockState(state: LockState): boolean {
  return CFG_STATE.has(state);
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: register a global configuration object for server, merging with the
 *  existing configuration */
function SNA_SetServerConfig(config: DataObj): DataObj {
  // when no config is provided, return the current global config
  if (config === undefined) return SERVER_CFG;
  // otherwise merge the new config with the existing global config
  if (Object.keys(SERVER_CFG).length === 0) {
    if (DBG) LOG(`Setting SNA Global Configuration`);
  } else if (DBG) LOG(`Updating SNA Global Configuration`);
  SERVER_CFG = Object.assign(SERVER_CFG, config);
  // return a copy of the global config
  return { ...SERVER_CFG };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current global configuration object for server after start */
function SNA_GetServerConfig(): DataObj {
  const fn = 'SNA_GetServerConfig:';
  if (SNA_GetLockState('preconfig') === false) {
    console.warn(`${fn} Derived config should be set in PreHook at earliest.`);
    console.warn(`Complete config is guaranteed at lifecycle start.`);
  }
  return { ...SERVER_CFG };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** PRIVATE API: return the current global configuration object for server */
function SNA_GetServerConfigUnsafe(): DataObj {
  return SERVER_CFG;
}

/// SNA COMPONENT SETUP ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function PreHook() {
  SNA_HookServerPhase('SRV_START', async () => {
    AddMessageHandler('SYNC:SRV_CONTEXT', data => {
      // handle server context messages
      const { op } = data;
    });
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_NewComponent('context', {
  PreHook
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  SNA_SetLockState, // set locks state
  SNA_GetLockState, // get lock state
  SNA_SetServerConfig, // set global server config
  SNA_GetServerConfig, // get copy global server config
  // direct access to global config object
  SNA_GetServerConfigUnsafe // get direct global server config
};
