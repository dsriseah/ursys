import express from 'express';
import { NetEndpoint } from '../common/class-urnet-endpoint.ts';
import { NetPacket } from '../common/class-urnet-packet.ts';
import type { NP_Msg, NP_Address, NM_Handler } from '../_types/urnet.d.ts';
import type { DataObj } from '../_types/dataset.ts';
type PacketHandler = (pkt: NetPacket) => void;
type HTOptions = {
    server_name?: string;
    wss_name?: string;
    http_port?: number;
    http_host?: string;
    http_docs?: string;
    index_file?: string;
    error?: string;
};
type WSOptions = {
    wss_path?: string;
    srv_addr?: NP_Address;
    error?: string;
};
type DataReturn = () => DataObj;
type HookOptions = {
    get_client_cfg?: DataReturn;
    error?: string;
};
/** API: Start the HTTP server. The WebSocket server uses the same
 *  http server instance, which allows it to tunnel websocket traffic after
 *  the initial handshake. This allows nginx (if running) to proxy forward
 *  http traffic as https.
 */
declare function ListenHTTP(opt: HTOptions): Promise<void>;
/** API: Start the websocket server. Must be called after the http server is started
 *  to use the same server instance's address and port.
 */
declare function ListenWSS(opt: WSOptions): Promise<void>;
/** API: Stop the HTTP server */
declare function StopHTTP(): Promise<void>;
/** API: Stop the WebSocket server */
declare function StopWSS(): Promise<void>;
/** To implement a service, add a packet handler to the endpoint. */
declare function AddMessageHandler(message: NP_Msg, msgHandler: NM_Handler): void;
/** API: To remove a service, remove the packet handler from the endpoint.
 *  If the handler is not provided, all handlers for the message are removed.
 */
declare function DeleteMessageHandler(message: NP_Msg, pktHandlr?: PacketHandler): void;
/** API:delare message handlers and register after authentation to be added to
 *  URNET message network */
declare function RegisterMessages(): Promise<void>;
/** API: Get the APP instance for adding middleware */
declare function GetAppInstance(): express.Application;
/** API: Get the ENDPOINT instance for inspection */
declare function ServerEndpoint(): NetEndpoint;
/** API: Convenience method to start HTTP and WS servers */
declare function Start(opt: HTOptions & WSOptions & HookOptions): Promise<void>;
/** API: Convenience method to stop HTTP and WS servers */
declare function Stop(): Promise<void>;
export { Start, // start the http and websocket servers
Stop, ListenHTTP, // start the http server
ListenWSS, // start the websocket server (after ListenHTTP)
StopHTTP, // stop the http server
StopWSS, // stop the websocket server
AddMessageHandler, DeleteMessageHandler, RegisterMessages, GetAppInstance, ServerEndpoint };
