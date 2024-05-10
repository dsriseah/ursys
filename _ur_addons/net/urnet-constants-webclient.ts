/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URNET RUNTIME CONSTANTS for HTTP BROWSER CLIENTS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPES & INTERFACES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// HTTP servers are combined app and websocket servers on the same port!
/// They build their webapp from a source directory before serving it.
type T_HTTP_CLIENT = {
  http_host: string; // http server host
  http_port: number; // http server port
  http_url: string; // full app url address
  wss_path: string; // websocket server path rel to host url:port
  wss_url: string; // wss connection string
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const http_host = '127.0.0.1'; // http server host
const http_port = 8080; // http server port
const wss_path = 'urnet-http'; // websocket server path rel to host url:port
const HTTP_CLIENT_INFO: T_HTTP_CLIENT = {
  http_host,
  http_port,
  http_url: `http://${http_host}:${http_port}`, //
  wss_path: wss_path,
  wss_url: `ws://${http_host}:${http_port}/${wss_path}`
};

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  HTTP_CLIENT_INFO // used for http and https server
};
