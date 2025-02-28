/** API: return the root directory, runtime directory */
declare function SNA_RuntimeInfo(): {
    asset_dir: string;
    output_dir: string;
    runtime_dir: string;
};
/** API: SNA_Build imports scripts provided folder. Hide dependent scripts in
 *  subdirectories. It's assumed that .mts files are server-side and .ts files
 *  are app-client side. Client-side files are bundled into 'js/bundle.js'
 *  Can be called after URNET_READY (e.g. APP_READY)
 */
type Options = {
    port: number;
};
declare function SNA_Build(rootDir: string, opt?: Options): Promise<void>;
/** API: SNA_MultiBuild is a variant of SNA_Build. Found client ts files are
 *  are bundled into separate bundle files with the same root name */
declare function SNA_MultiBuild(rootDir: string): Promise<void>;
export { SNA_Build, SNA_MultiBuild, SNA_RuntimeInfo };
export { AddMessageHandler, DeleteMessageHandler, RegisterMessages, ServerEndpoint } from './appserver.mts';
