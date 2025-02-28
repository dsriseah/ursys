/** Handle ?manifest url requests. If the directory exists, return or generate
 *  the manifest file. If the directory doesn't exist, check the remote master
 *  asset repo for the manifest file. If it exists, return it, otherwise
 *  download the remote manifest directory and generate it. */
declare function DeliverManifest(req: any, res: any, next: any): Promise<void>;
/** return Express middleware function that serves manifest if ?manifest query
 *  is present in the URL */
declare function AssetManifest_Middleware(opts: {
    assetPath: string;
    assetURI: string;
}): (req: any, res: any, next: any) => void;
/** create the asset server directory and write id text file */
declare function SetupServer(): void;
export { SetupServer, AssetManifest_Middleware, DeliverManifest };
