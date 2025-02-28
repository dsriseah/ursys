import type { DataObj } from '../_types/dataset.ts';
import type { NetEndpoint } from '../common/class-urnet-endpoint.d.ts';
type LockState = 'init' | 'preconfig' | 'prehook' | 'locked';
/*** return lockstate if state successfully changed, undefined otherwise */
declare function SNA_SetLockState(state: LockState): LockState;
/** return true if state is set, false otherwise */
declare function SNA_GetLockState(state: LockState): boolean;
/** API: register a global configuration object for server, merging with the
 *  existing configuration */
declare function SNA_SetAppConfig(config: DataObj): DataObj;
/** API: return the current global configuration object for server after start */
declare function SNA_GetAppConfig(): DataObj;
/** PRIVATE API: return the current global configuration object for server */
declare function SNA_GetAppConfigUnsafe(): DataObj;
/** API: app startup should invoke this during SNA/NET_ACTIVE,
 *  passing the NetEndpoint instance */
declare function AddMessageHandlers(EP: NetEndpoint): void;
export { SNA_SetLockState, // set locks state
SNA_GetLockState, // get lock state
SNA_SetAppConfig, // set global server config
SNA_GetAppConfig, // get copy global server config
SNA_GetAppConfigUnsafe, // get direct global server config
AddMessageHandlers };
