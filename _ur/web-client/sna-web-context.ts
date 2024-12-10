/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-WEB-CONTEXT manages shared configuration and state across an SNA App
  instance. It is synchronized with selected elements of server-side context
  in a read-only manner.

  This module is similar to SNA-NODE-CONTEXT.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '../common/util-prompts.ts';
import { SNA_NewComponent, SNA_HookAppPhase } from './sna-web-hooks.ts';
import {
  AddMessageHandler,
  ClientEndpoint,
  RegisterMessages
} from './sna-web-urnet-client.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult, DataObj } from '../_types/dataset.d.ts';
type LockState = 'init' | 'preconfig' | 'prehook' | 'locked';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('sna.ctxt', 'TagGray');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let APP_CFG: DataObj = {}; // pre-provided configuration object
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
function SNA_SetAppConfig(config: DataObj): DataObj {
  // when no config is provided, return the current global config
  if (config === undefined) return APP_CFG;
  // otherwise merge the new config with the existing global config
  if (Object.keys(APP_CFG).length === 0) {
    if (DBG) LOG(`Setting SNA Global Configuration`);
  } else if (DBG) LOG(`Updating SNA Global Configuration`);
  APP_CFG = Object.assign(APP_CFG, config);
  // return a copy of the global config
  console.log('*** SNA_SetAppConfig:', APP_CFG);
  return { ...APP_CFG };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current global configuration object for server after start */
function SNA_GetAppConfig(): DataObj {
  const fn = 'SNA_GetAppConfig:';
  if (SNA_GetLockState('preconfig') === false) {
    console.warn(`${fn} Derived config should be set in PreHook at earliest.`);
    console.warn(`Complete config is guaranteed at lifecycle start.`);
  }
  return { ...APP_CFG };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** PRIVATE API: return the current global configuration object for server */
function SNA_GetAppConfigUnsafe(): DataObj {
  return APP_CFG;
}

/// SNA COMPONENT SETUP ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function PreHook() {
  const EP = ClientEndpoint();
  SNA_HookAppPhase('NET_ACTIVE', async () => {
    AddMessageHandler('SYNC:CLI_CONTEXT', data => {});
    await RegisterMessages();
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_NewComponent('context', {
  PreHook
});
export {
  SNA_SetLockState, // set locks state
  SNA_GetLockState, // get lock state
  SNA_SetAppConfig, // set global server config
  SNA_GetAppConfig, // get copy global server config
  // direct access to global config object
  SNA_GetAppConfigUnsafe // get direct global server config
};
