type T_HTTP_CLIENT = {
    http_host: string;
    http_port: number;
    http_url: string;
    wss_path: string;
    wss_url: string;
};
declare let HTTP_CLIENT_INFO: T_HTTP_CLIENT;
/** Return new client info for a different hostname/path, which can not access
 *  to default localhost but needs a real domain name-based server address.
 *  Assumptions:
 *  - nginx is proxying http to https on the server side
 *  - no port is required, as this is handled by proxy
 */
declare function GetClientInfoFromWindowLocation(winLocation: Location): {
    http_host: string;
    http_url: string;
    wss_url: string;
    http_port: number;
    wss_path: string;
};
export { HTTP_CLIENT_INFO, GetClientInfoFromWindowLocation };
