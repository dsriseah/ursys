import type { NP_Chan, NP_Msg, NP_Data, NP_Hash, NP_Address, NP_AddrPre, I_NetMessage } from '../_types/urnet.d.ts';
/** note: these runtime checks have mirrored declarations in ursys.d.ts **/
declare const VALID_MSG_CHANNELS: readonly ["SYNC", "NET", "SRV", "LOCAL", ""];
declare const VALID_PKT_TYPES: readonly ["ping", "signal", "send", "call", "_auth", "_reg", "_decl"];
declare const VALID_ADDR_PREFIX: readonly ["???", "UR_", "WSS", "UDS", "MQT", "SRV"];
declare const SKIP_SELF_PKT_TYPES: string[];
declare const UADDR_DIGITS = 3;
declare const UADDR_NONE: NP_Address;
/** runtime check of NP_Type */
declare function IsValidType(msg_type: string): boolean;
/** some message types should not invoke back to the same pkt origin
 *  returning true 'call' and 'send'
 */
declare function SkipOriginType(msg_type: string): boolean;
/** runtime check of protocol-related NP_Type */
declare function isSpecialPktType(msg_type: string): boolean;
/** runtime check of NP_Chan */
declare function IsValidChannel(msg_chan: string): boolean;
/** runtime check of NP_Address */
declare function IsValidAddress(addr: string): boolean;
/** runtime check of NP_Msg, returns array if good otherwise it returns undefined */
declare function IsValidMessage(msg: NP_Msg): [NP_Chan, string];
type AllocateOptions = {
    prefix?: NP_AddrPre;
    addr?: NP_Address;
};
/** allocate a new address, optionally with a label */
declare function AllocateAddress(opt?: AllocateOptions): NP_Address;
/** given a CHANNEL:MESSAGE string, return the channel and message name in
 *  an array */
declare function DecodeMessage(msg: NP_Msg): [NP_Chan, string];
/** make sure that the message is always consistent. Officially, a local
 *  message begins with : and a network message begins with NET:
 */
declare function NormalizeMessage(msg: NP_Msg): NP_Msg;
/** make sure that degenerate arrays turn into single object */
declare function NormalizeData(data: NP_Data): NP_Data;
/** return true if message is a local request */
declare function IsLocalMessage(msg: NP_Msg): boolean;
/** return true if message is a network request */
declare function IsNetMessage(msg: NP_Msg): boolean;
/** return true if message is implemented by main URNET server */
declare function IsServerMessage(msg: NP_Msg): boolean;
/** given a packet, return a unique hash string */
declare function GetPacketHashString(pkt: I_NetMessage): NP_Hash;
export { IsValidType, SkipOriginType, isSpecialPktType, IsValidChannel, IsValidAddress, IsValidMessage, AllocateAddress, DecodeMessage, NormalizeMessage, NormalizeData, IsLocalMessage, IsNetMessage, IsServerMessage, GetPacketHashString };
export { VALID_MSG_CHANNELS, VALID_PKT_TYPES, VALID_ADDR_PREFIX, SKIP_SELF_PKT_TYPES, UADDR_DIGITS, UADDR_NONE };
