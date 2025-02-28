import NetPacket from './class-urnet-packet.ts';
import type { I_NetSocket, NP_Address, NP_Msg } from '../_types/urnet.d.ts';
import type { NS_SendFunc, NS_DataFunc, NS_CloseFunc, NS_GetConfigFunc, NS_Options } from '../_types/urnet.d.ts';
/** wrapper class a socket connection */
declare class NetSocket implements I_NetSocket {
    connector: any;
    sendFunc: NS_SendFunc;
    closeFunc: NS_CloseFunc;
    onDataFunc: NS_DataFunc;
    getConfigFunc?: NS_GetConfigFunc;
    uaddr?: NP_Address;
    auth?: any;
    msglist?: NP_Msg[];
    age?: number;
    label?: string;
    constructor(connectObj: any, io: NS_Options);
    /** method for sending packets, using stored implementation-specific function */
    send(pkt: NetPacket): void;
    /** method for receiving packets, using stored implementation-specific function
     *  that invokes the NetEndpoint's appropriate ingest method
     */
    onData(pkt: NetPacket): void;
    /** method for closing the connection, using stored implementation-specific
     * function */
    close(): void;
    /** method for retrieving the configuration, if available */
    getConfig(): any;
    getConnector(): any;
    /** TODO: placeholder for authentication method */
    authenticated(): boolean;
}
export default NetSocket;
export { NetSocket };
export type { I_NetSocket, NS_SendFunc, NS_DataFunc, NS_Options };
