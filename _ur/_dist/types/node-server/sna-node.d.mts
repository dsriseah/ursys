import { SNA_Build, SNA_MultiBuild, SNA_RuntimeInfo } from './sna-node-urnet-server.mts';
import { SNA_HookServerPhase, SNA_UseComponent } from './sna-node-hooks.mts';
import { SNA_SetServerConfig, SNA_GetServerConfig } from './sna-node-context.mts';
import { SNA_NewComponent } from '../common/class-sna-component.ts';
/** API: initialize the server's lifecycle */
declare function SNA_Start(): Promise<void>;
/** API: return the current phase machine state */
declare function SNA_Status(): {
    dooks: any[];
};
/** return information related to running script and args. it should be
 *  called only by the main script that's been invoked, otherwise the info
 *  returned will likely by incorrect. */
declare function SNA_GetProcessInfo(proc?: NodeJS.Process): (string | string[])[];
export { SNA_GetProcessInfo as GetProcessInfo, SNA_Build as Build, SNA_MultiBuild as MultiBuild, SNA_Start as Start, SNA_Status as Status, SNA_HookServerPhase as HookServerPhase, SNA_RuntimeInfo as RuntimeInfo, SNA_SetServerConfig as SetServerConfig, SNA_GetServerConfig as GetServerConfig, SNA_UseComponent as UseComponent, SNA_NewComponent as NewComponent };
/** named: LoadDataset, CloseDataset, PersistDataset, OpenBin, CloseBin,
 *  default export registers 'dataserver' SNA Component */
export * as MOD_DataServer from './sna-dataserver.mts';
export { HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks } from './sna-node-hooks.mts';
export { AddMessageHandler, DeleteMessageHandler, RegisterMessages, ServerEndpoint } from './sna-node-urnet-server.mts';
