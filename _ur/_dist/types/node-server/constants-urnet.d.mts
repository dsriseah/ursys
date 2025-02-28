type TServerType = 'uds' | 'wss' | 'http';
type T_UDS = {
    sock_file: string;
    sock_path: string;
};
type T_WSS = {
    wss_host: string;
    wss_port: number;
    wss_path: string;
    wss_url: string;
};
type T_HTTP = {
    http_host: string;
    http_port: number;
    app_src: string;
    app_index: string;
    app_bundle: string;
    app_bundle_map: string;
    app_entry: string;
    http_url: string;
    http_docs: string;
    wss_path: string;
    wss_url: string;
};
type TESBUILD = {
    es_target: string;
};
declare function UseServer(serverType: TServerType): boolean;
declare const UDS_INFO: T_UDS;
declare const WSS_INFO: T_WSS;
declare const HTTP_INFO: T_HTTP;
declare const ESBUILD_INFO: TESBUILD;
export { UDS_INFO, // used for net:node unix domain socket server and client
WSS_INFO, // used for ws websocket server and client
HTTP_INFO, // used for http and https server
UseServer, // check if a server type is enabled
ESBUILD_INFO };
export type { TServerType };
