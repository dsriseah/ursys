/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  entrypoint for server

  when making live changes, make sure that the ur builder is also running and
  users of this library are watching for changes to the ur library

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: GetProcessInfo, Build, MultiBuild, Start, Status
 *  -      HookServerPhase, GetServerConfig, UseComponent, NewComponent
 * -       HookPhase, RunPhaseGroup, GetMachine,GetDanglingHooks
 *  -      MOD_DataServer */
export * as SNA from './sna-node.mts';

/** named: SetBuildOptions, GetBuildOptions,
 *         BuildApp, MultiBuildApp, WatchExtra
 *  types: BuildOptions, WatchOptions, NotifyCallback */
export * as APPBUILD from './appbuilder.mts';

/** named: Start, Stop, ListenHTTP, ListenWSS, StopHTTP, StopWSS,
 *         AddMessageHandler, DeleteMessageHandler, RegisterMessages,
 *         GetAppInstance, ServerEndpoint */
export * as APPSERV from './appserver.mts';

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

/** named: DecodeAddonArgs, ValidateAddon */
export * as PROC from './process.mts'; // merge into ADDON?

/** named: UR_Fork, ProcTest */
export * as ADDON from './ur-addon-mgr.mts'; // merge with PROC?

/// FORWARDED COMMON EXPORTS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export * from '../common/@common.ts';
import * as CLASS from '../common/@classes.ts';
export { CLASS };
