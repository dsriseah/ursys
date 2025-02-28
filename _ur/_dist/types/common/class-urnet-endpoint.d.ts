import NetPacket from './class-urnet-packet.ts';
import ServiceMap from './class-urnet-servicemap.ts';
import TransactionMgr from './class-urnet-transaction.ts';
import type { NP_Address, NP_Msg, NP_Data } from '../_types/urnet.d.ts';
import type { I_NetSocket } from './class-urnet-socket.d.ts';
import type { THandlerFunc } from './class-urnet-servicemap.d.ts';
type SocketMap = Map<NP_Address, I_NetSocket>;
type TClientAuth = {
    identity: string;
    secret: string;
};
type TClientReg = {
    name: string;
    type: string;
};
declare class NetEndpoint {
    svc_map: ServiceMap;
    trx_mgr: TransactionMgr;
    uaddr: NP_Address;
    client_socks: SocketMap;
    cli_counter: number;
    pkt_counter: number;
    cli_gateway: I_NetSocket;
    cli_sck_timer: any;
    cli_ident: any;
    cli_auth: any;
    cli_reg: TClientReg;
    constructor();
    /** SERVER API: initialize this endpoint's client server, providing a hardcoded
     *  server UADDR that is distinct from those used by client pools
     */
    configAsServer(srv_addr: NP_Address): void;
    /** SERVER API: Server data event handler for incoming data from a client connection.
     *  This is the mirror to _ingestServerPacket() function used by client endpoints.
     *  This is the entry point for incoming data from clients */
    _ingestClientPacket(jsonData: string, socket: I_NetSocket): NetPacket;
    /** SERVER API: when a client connects to this endpoint, register it as a socket and
     *  allocate a uaddr for it */
    addClient(socket: I_NetSocket): NP_Address;
    /** SERVER API: when a client disconnects from this endpoint, delete its socket and
     *  remove all message forwarding */
    removeClient(uaddr_obj: NP_Address | I_NetSocket): NP_Address;
    /** SERVER API: given a uaddr, return the socket */
    getClient(uaddr: NP_Address): I_NetSocket;
    /** SERVER API: start a timer to check for dead sockets */
    enableClientAging(activate: boolean): void;
    /** SERVER SUPPORT: handle auth packet if the session.auth is not defined */
    private _handleAuthRequest;
    /** SERVER SUPPORT: handle registration packet */
    private _handleRegRequest;
    /** SERVER SUPPORT: handle client dynamic definitions */
    private _handleDeclRequest;
    /** client connection handshaking - - - - - - - - - - - - - - - - - - - - **/
    /** CLIENT API: client endpoints need to have an "address" assigned to them,
     *  otherwise the endpoint will not work */
    connectAsClient(gateway: I_NetSocket, auth: TClientAuth): Promise<NP_Data>;
    /** CLIENT API: Client data event handler for incoming data from the gateway. This is
     *  the mirror to _ingestClientPacket() function that is used by servers. This
     *  is entry point for incoming data from server
     */
    _ingestServerPacket(jsonData: string, socket: I_NetSocket): void;
    /** CLIENT API: register client with client endpoint info */
    declareClientProperties(info: TClientReg): Promise<NP_Data>;
    /** CLIENT API: declare client messages */
    declareClientMessages(): Promise<any>;
    /** CLIENT SUPPORT: handle authentication response packet directly rather than through
     *  the netcall interface in dispatchPacket() */
    private _handleAuthResponse;
    /** CLIENT SUPPORT: handle registration response packet directly rather than through
     *  the netcall interface in dispatchPacket() */
    private _handleRegResponse;
    /** CLIENT SUPPORT: handle declaration packet */
    private _handleDeclResponse;
    /** message declaration and invocation - - - - - - - - - - - - - - - - - -**/
    /** API: declare a message handler for a given message */
    addMessageHandler(msg: NP_Msg, handler: THandlerFunc): void;
    /** API: remove a previously declared message handler for a given message */
    deleteMessageHandler(msg: NP_Msg, handler: THandlerFunc): void;
    /** API: call local message registered on this endPoint only */
    call(msg: NP_Msg, data: NP_Data): Promise<NP_Data>;
    /** API: send local message registered on this endPoint only, returning no data */
    send(msg: NP_Msg, data: NP_Data): Promise<NP_Data>;
    /** API: signal local message registered on this endPoint only, returning no data.
     */
    signal(msg: NP_Msg, data: NP_Data): Promise<NP_Data>;
    /** API: ping local message, return with number of handlers */
    ping(msg: NP_Msg): Promise<NP_Data>;
    /** API: call net message, resolves when packet returns from server with data */
    netCall(msg: NP_Msg, data: NP_Data): Promise<NP_Data>;
    /** API: send net message, returning promise that will resolve when the server has
     *  received and processed/forwarded the message */
    netSend(msg: NP_Msg, data: NP_Data): Promise<NP_Data>;
    /** API: signal net message, returning void (not promise)
     *  used for the idea of 'raising signals' as opposed to 'sending data'. It
     *  resolves immediately when the signal is sent, and does not check with the
     *  server  */
    netSignal(msg: NP_Msg, data: NP_Data): void;
    /** API: returns with a list of uaddr from the server which is the uaddr of the
     *  all clients that have registered for the message */
    netPing(msg: NP_Msg): Promise<NP_Data>;
    /** packet utilities  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** declare client attributes is a generic declaration packet that can contain
     *  any number of attributes that the client wants to declare to the server.
     *  for example, see declareClientMessages() */
    private _declareClientServices;
    /** shuts down the gateway to server, forcing close
     *  Chrome 125.0.6422.77 doesn't seem to send a close frame on reload
     *  Firefox 126.0 doesn't fire beforeunload
     */
    disconnectAsClient(): void;
    /** endpoint lookup tables - - - - - - - - - - - - - - - - - - - -  - - - **/
    /** return true if the message is handled anywhere */
    protected packetHasAnyHandler(pkt: NetPacket): boolean;
    /** get list of messages allocated to a uaddr */
    protected getMessagesForAddress(uaddr: NP_Address): NP_Msg[];
    /** get list of UADDRs that a message is forwarded to */
    protected getMessageAddresses(msg: NP_Msg): NP_Address[];
    /** return list of local handlers for given message */
    protected getMessageHandlers(msg: NP_Msg): THandlerFunc[];
    /** informational routing information - - - - - - - - - - - - - - - - - - **/
    /** return handler list for this endpoint */
    protected getMessageNames(): NP_Msg[];
    /** return only net messages */
    protected getNetMessageNames(): NP_Msg[];
    /** server endpoints manage list of messages in clients  - - - - -  - - - **/
    /** register a message handler for a given message to passed uaddr */
    protected registerRemoteMessagesToAddress(uaddr: NP_Address, msgList: NP_Msg[]): void;
    /** unregister message handlers for a given message to passed uaddr */
    protected deleteMessageForAddress(uaddr: NP_Address): NP_Msg[];
    /** packet interface  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** Receive a single packet from the wire, and determine what to do with it.
     *  It's assumed that _ingestClientPacket() has already handled
     *  authentication for clients before this method is received.
     *  The packet has several possible processing options!
     *  - packet is response to an outgoing transaction
     *  - packet is a message that we handle
     *  - packet is a message that we forward
     *  - packet is unknown message so we return it with error
     *  If the packet has the rsvp flag set, we need to return
     *  it to the source address in the packet with any data
     */
    private dispatchPacket;
    /** Start a transaction, which returns promises to await. This method
     *  is a queue that uses Promises to wait for the return, which is
     *  triggered by a returning packet in dispatchPacket(pkt).
     */
    private awaitProxiedHandlers;
    /** Start a handler call, which might have multiple implementors.
     *  Returns data from all handlers as an array or a single item
     */
    private awaitHandlers;
    /** Send a single packet on all available interfaces based on the
     *  message. Use for initial outgoing packets only from the
     *  netCall, netSend, netSignal, and netPing methods.
     */
    private initialSend;
    /** Used to forward a transaction from server to a remote client
     */
    private awaitRemoteHandler;
    /** Used to resolve a forwarded transaction received by server from
     *  a remote client
     */
    private resolveRemoteHandler;
    /** utility method for conducting transactions */
    private _proxySend;
    /** utility method for completing transactions */
    private _proxyReceive;
    /** Return a packet to its source address. If this endpoint is a server,
     *  then it might have the socket stored. Otherwise, if this endpoint is
     *  also a client of another server, pass the back through the gateway.
     *  This is used by server endpoints to return packets to clients.
     */
    private returnToSender;
    /** return array of sockets to use for sending packet,
     *  based on pkt.msg and pkt.src_addr
     */
    private getRoutingInformation;
    /** packet utility - - - - - - - - - - - - - - - - - - - - - - - - - - - -**/
    private assignPacketId;
    /** convert JSON to packet and return */
    private packetFromJSON;
    /** create a new packet with proper address */
    private newPacket;
    /** clone a packet with new id */
    private clonePacket;
    /** create an authentication packet, which is the first packet that must be sent
     *  after connecting to the server */
    private newAuthPacket;
    /** create a registration packet */
    private newRegPacket;
    /** create a declaration packet shell */
    private newDeclPacket;
    /** environment utilities - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** return true if this endpoint is managing connections */
    isServer(): boolean;
    /** socket utilities  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
    /** given a socket, see if it's already registered */
    isNewSocket(socket: I_NetSocket): boolean;
    /** client endpoints need to have an authentication token to
     *  access URNET beyond registration
     */
    authorizeSocket(auth: any): void;
}
export default NetEndpoint;
export { NetEndpoint };
