import { SNA_UseComponent, SNA_HookAppPhase } from './sna-web-hooks.ts';
import { SNA_SetAppConfig, SNA_GetAppConfig } from './sna-web-context.ts';
type StartOptions = {
    no_urnet?: boolean;
    no_hmr?: boolean;
};
/** API: initialize the server's lifecycle */
declare function SNA_Start(config: StartOptions): Promise<void>;
/** API: retrieve SNA status object */
declare function SNA_Status(): {
    dooks: any[];
};
import MOD_DataClient from './sna-dataclient.ts';
export * as DATACLIENT from './sna-dataclient.ts';
export * as APPCONTEXT from './sna-web-context.ts';
export { SNA_UseComponent as UseComponent, SNA_SetAppConfig as SetAppConfig, SNA_GetAppConfig as GetAppConfig, SNA_Start as Start, SNA_Status as Status, SNA_HookAppPhase as HookAppPhase, MOD_DataClient };
export { HookPhase as HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks, SNA_NewComponent as NewComponent } from './sna-web-hooks.ts';
export { AddMessageHandler, DeleteMessageHandler, RegisterMessages, ClientEndpoint } from './sna-web-urnet-client.ts';
