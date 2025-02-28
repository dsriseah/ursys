type NotifyCallback = (payload?: {
    changed: any;
}) => void;
type BuildOptions = {
    source_dir?: string;
    asset_dir?: string;
    output_dir?: string;
    runtime_dir?: string;
    entry_file?: string;
    entry_files?: string[];
    index_file?: string;
    bundle_name?: string;
    notify_cb?: NotifyCallback;
    error?: string;
};
type WatchOptions = {
    watch_dirs: string[];
    ignored?: RegExp;
    notify_cb?: NotifyCallback;
};
/** API: cache the build options to use throughout build process */
declare function GetBuildOptions(): BuildOptions;
/** API: return build options if they have been saved */
declare function SetBuildOptions(opts: BuildOptions): BuildOptions;
/** API: Use ESBUILD to build a webapp from source files, also copying assets
 *  from a separate asset directory to the output directory.
 */
declare function BuildApp(opts: BuildOptions): Promise<void>;
/** API: Similar to BuildApp, except using multiple entry points and outputting
 *  as esm module format (rather than iife)
 */
declare function MultiBuildApp(opts: BuildOptions): Promise<void>;
/** API: Watch for changes with chokidar, rebuilding app with esbuild when a
 *  change to any source file is detected. This used for catching changes
 *  outside of the source directory, such as changes to assets.
 */
declare function WatchExtra(opts: WatchOptions): Promise<void>;
export { SetBuildOptions, // save the build options for later use
GetBuildOptions, // return the saved build options
BuildApp, // build a webapp from source/assets, watching for changes
MultiBuildApp, // build multiple entry files as separate bundles, watching
WatchExtra };
export type { BuildOptions, WatchOptions, NotifyCallback };
