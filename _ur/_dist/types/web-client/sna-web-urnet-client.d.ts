import { NetEndpoint } from '../common/class-urnet-endpoint.ts';
import type { NM_Handler } from '../_types/urnet.d.ts';
/** resolves to true if the connection is successful, false if not */
declare function SNA_NetConnect(): Promise<boolean>;
/** API: return the NetEndpoint instance */
declare function ClientEndpoint(): NetEndpoint;
/** API:delare message handlers and register after authentation to be added to
 *  URNET message network */
declare function RegisterMessages(): Promise<any>;
/** API: add the message handler */
declare function AddMessageHandler(message: string, handler: NM_Handler): void;
/** API: delete the message handler */
declare function DeleteMessageHandler(message: string, handler: NM_Handler): void;
export { SNA_NetConnect, ClientEndpoint, RegisterMessages, AddMessageHandler, DeleteMessageHandler };
