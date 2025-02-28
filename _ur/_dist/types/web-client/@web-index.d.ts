/** named: DATACLIENT, APPCONTEXT,
 * -       UseComponent, SetAppConfig, GetAppConfig, NewComponent
 *         Start, Status, HookAppPhase,
 * -       HookPhase, RunPhaseGroup, GetMachine, GetDangling
 * -       AddMessageHandler, DeleteMessageHandler, RegisterMessages,
 *         ClientEndpoint
 * -       MOD_DATACLIENT */
export * as SNA from './sna-web.ts';
/** named: Connect, AddMessageHandler, RegisterMessages,Disconnect */
/** named: DecodeID, NewID, NewFullID, PrefixShortID,
 *         IsValidFormat, IsValidSchema, IsValidPrefix,
 *         SetDefaultSchema, GetDefaultSchema */
export * from '../common/@common.ts';
import * as CLASS from '../common/@common-classes.ts';
export { CLASS };
export { ConsoleStyler } from '../common/util-prompts.ts';
