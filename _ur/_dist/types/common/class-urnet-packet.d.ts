import type { I_NetMessage, I_NetSocket, NP_Address } from '../_types/urnet.d.ts';
import type { NP_ID, NP_Type, NP_Dir, NP_Msg, NP_Data } from '../_types/urnet.d.ts';
import type { NP_Options } from '../_types/urnet.d.ts';
declare class NetPacket implements I_NetMessage {
    id: NP_ID;
    msg_type: NP_Type;
    msg: NP_Msg;
    data: any;
    auth: string;
    src_addr: NP_Address;
    hop_seq: NP_Address[];
    hop_log: string[];
    hop_dir: NP_Dir;
    hop_rsvp?: boolean;
    err?: string;
    constructor(msg?: NP_Msg, data?: NP_Data);
    /** after creating a new packet, use setMeta() to assign id and envelope
     *  meta used for routing and return packets
     */
    setMeta(msg_type: NP_Type, opt?: NP_Options): void;
    /** add hop to the hop sequence */
    addHop(hop: NP_Address): void;
    /** utility setters w/ checks - - - - - - - - - - - - - - - - - - - - - - **/
    /** manually set the source address, with check */
    setSrcAddr(s_addr: NP_Address): NetPacket;
    /** manually set direction */
    setDir(dir: NP_Dir): NetPacket;
    /** set the authorization token */
    setAuth(auth: string): NetPacket;
    /** set message and data */
    setMsgData(msg: NP_Msg, data: NP_Data): NetPacket;
    /** set message */
    setMsg(msg: NP_Msg): NetPacket;
    /** set data */
    setData(data: NP_Data): NetPacket;
    /** merge data */
    mergeData(data: NP_Data): NetPacket;
    /** packet reconstruction - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** make a packet from existing JSON */
    setFromJSON(json: string): NetPacket;
    /** make a packet from existing object */
    setFromObject(pktObj: any): this;
    /** packet transport  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** rsvp required? */
    hasRsvp(): boolean;
    lastHop(): `???${number}` | `UR_${number}` | `WSS${number}` | `UDS${number}` | `MQT${number}` | `SRV${number}`;
    hasAuth(): boolean;
    /** types that begin with _ are protocol messages that bypass dispatchPacket() */
    isSpecialPkt(): boolean;
    /** authorization packets are the first packet sent on a client connection to
     *  the message gateway server. They must not have a src_addr aassigned, using
     *  the special UADDR_NONE value instead.
     */
    isBadAuthPkt(): string;
    /** registration packets are sent on a client connection after
     *  authentication. They must have a src_addr assigned, which was returned
     *  by the server in the response to the auth packet, and this must match
     *  the server's stored uaddr for the client connection.
     */
    isBadRegPkt(socket: I_NetSocket): string;
    authenticate(socket: I_NetSocket): boolean;
    isRequest(): boolean;
    isResponse(): boolean;
    /** serialization - - - - - - - - - - - - - - - - - - - - - - - - - - - - **/
    serialize(): string;
    deserialize(data: string): NetPacket;
    /** information utilities - - - - - - - - - - - - - - - - - - - - - - - - **/
    isValidType(type: NP_Type): boolean;
    isValidMessage(msg: NP_Msg): boolean;
    decodeMessage(msg: NP_Msg): [chan: string, msg: string];
    /** debugging - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** add error string to packet error */
    error(msg: string): string;
    /** manually add a transport-related message eto the hog log. this is not
     *  the same as hop_seq which is used to track the routing of the packet.
     */
    hopLog(msg: string): string;
}
export default NetPacket;
export { NetPacket };
