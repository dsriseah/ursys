/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Master Entrypoint for Public UR Client Library (client web browsers)

  A currated set of client-related exports, used to build client-side apps and
  support modules. 
  
  Most of the useful constructs are exposed through the SNA object; see
  the example-app/ for a working code template.
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: DATACLIENT, APPCONTEXT,
 * -       UseComponent, SetAppConfig, GetAppConfig, NewComponent
 *         Start, Status, HookAppPhase,
 * -       HookPhase, RunPhaseGroup, GetMachine, GetDangling
 * -       AddMessageHandler, DeleteMessageHandler, RegisterMessages,
 *         ClientEndpoint
 * -       MOD_DATACLIENT */
export * as SNA from './sna-web.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: Connect, AddMessageHandler, RegisterMessages,Disconnect */
/// export * as CLIENT_EP from './urnet-browser.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: DecodeID, NewID, NewFullID, PrefixShortID,
 *         IsValidFormat, IsValidSchema, IsValidPrefix,
 *         SetDefaultSchema, GetDefaultSchema */
/// export * as UID from '../common/module-uid.ts';

/// FORWARDED COMMON EXPORTS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export * from '../common/@common.ts';
import * as CLASS from '../common/@classes.ts';
export { CLASS };
export { ConsoleStyler } from '../common/util-prompts.ts';
