/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Master Entrypoint for Public UR Server Library (node, ts-node runtimes)

  A currated set of server-related exports, used to build an URSYS server
  in the addon system. For non-addon uses, it's recommended to us the SNA
  export to build the server; see example-app/ for a working code template.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: GetProcessInfo, Build, MultiBuild, Start, Status
 *  -      HookServerPhase, GetServerConfig, UseComponent, NewComponent
 * -       HookPhase, RunPhaseGroup, GetMachine,GetDanglingHooks
 *  -      MOD_DataServer */
export * as SNA from './sna-node.mts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: SetBuildOptions, GetBuildOptions,
 *         BuildApp, MultiBuildApp, WatchExtra
 *  types: BuildOptions, WatchOptions, NotifyCallback */
export * as APPBUILD from './appbuilder.mts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: Start, Stop, ListenHTTP, ListenWSS, StopHTTP, StopWSS,
 *         AddMessageHandler, DeleteMessageHandler, RegisterMessages,
 *         GetAppInstance, ServerEndpoint */
export * as APPSERV from './appserver.mts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: SetupServer, AssetManifest_Middleware, DeliverManifest */
export * as ASSETSERV from './assetserver.mts';

/** named: u_path, u_short
 *         FileExists, DirExists, IsDir, IsFile,
 *         EnsureDir, EnsureDirChecked, RemoveDir,
 * -       GetRootDirts, DetectedRootDir, DetectedAddonDir,
 *         FindParentDir, AbsLocalPath, RelLocalPath, TrimPath,
 *         GetPathInfo, AsyncFileHash,
 * -       GetDirContent, Files, FilesHashInfo, Subdirs
 * -       ReadFile, AsyncReadFile, UnsafeWriteFile, ReadJSON,
 *         WriteJSON, AsyncReadJSON, AsyncWriteJSON,
 * -       UnlinkFile */
export * as FILE from './file.mts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: DecodeAddonArgs, ValidateAddon */
export * as PROC from './process.mts'; // merge into ADDON?
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: UR_Fork, ProcTest */
export * as ADDON from './ur-addon-mgr.mts'; // merge with PROC?

/// FORWARDED COMMON EXPORTS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export * from '../common/@common.ts';
import * as CLASS from '../common/@classes.ts';
export { CLASS };
export { TerminalLog } from '../common/util-prompts.ts';
