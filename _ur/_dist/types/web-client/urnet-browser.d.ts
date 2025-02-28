import type { NP_Msg, NM_Handler } from '../_types/urnet.d.ts';
/** API: Create a client connection to the HTTP/WS server */
declare function Connect(wsPath?: string): Promise<boolean>;
/** API: Declare message handlers and register after authentation to be added to
 *  URNET message network
 */
declare function RegisterMessages(): Promise<void>;
/** API: Force close the client connection, after waiting for the prescribed
 *  number of seconds (see beforeunload event listener in Connect() also)
 */
declare function Disconnect(seconds?: number): Promise<unknown>;
/** API: Add a message handler to the URNET endpoint, which can be registered
 *  with the server with RegisterMessages()
 */
declare function AddMessageHandler(msg: NP_Msg, callback: NM_Handler): void;
/** Example of starting the client and registering messages */
declare function EX_Start(): Promise<void>;
export { Connect, // create a client connection to the HTTP/WS server
AddMessageHandler, // add a message handler to the URNET endpoint
RegisterMessages, // delare message handlers and register after authentation
Disconnect, // force close the client connection
EX_Start };
