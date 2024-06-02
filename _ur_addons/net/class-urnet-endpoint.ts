/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  NetEndpoint implements a connection to URNET as an implementation-
  independent object. It provides the API for sending and receiving messages
  in conjunction with the NetPacket class.

  NetEndpoint makes use of NetSockets, an abstraction of a "socketish" object

  CROSS PLATFORM USAGE --------------------------------------------------------

  When using from nodejs mts file, you can only import 'default', which is the
  NetEndpoint class. If you want to import other exports, you need to
  destructure the .default prop; to access the NetPacket class do this:

    import EP_DEFAULT from './class-urnet-endpoint.ts';
    const NetEndpoint = EP_DEFAULT.default; // note .default

  You can import the types as usual, though:

    import EP_DEFAULT, { I_NetSocket } from './urnet-types.ts';

  This is not required when importing from another .ts typescript file.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR } from '@ursys/core';
import { NetPacket } from './class-urnet-packet.ts';
import {
  NP_ID,
  NP_Address,
  NP_Msg,
  NP_Data,
  NP_Hash,
  UADDR_NONE
} from './urnet-types.ts';
import type { I_NetSocket } from './class-urnet-socket.ts';
import { GetPacketHashString } from './urnet-types.ts';
import {
  IsLocalMessage,
  IsNetMessage,
  IsValidAddress,
  SkipOriginType,
  AllocateAddress,
  NormalizeMessage,
  NormalizeData
} from './urnet-types.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const PR =
  typeof process !== 'undefined' ? 'EndPoint'.padEnd(13) : 'EndPoint'.padEnd(11);
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let AGE_INTERVAL = 1000; // milliseconds
let AGE_MAX = 60 * 30; // 30 minutes

/// LOCAL TYPES ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HandlerFunc = (data: NP_Data) => NP_Data | void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HandlerSet = Set<HandlerFunc>; // set(handler1, handler2, ...)
type AddressSet = Set<NP_Address>; // ['UA001', 'UA002', ...]
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type SocketMap = Map<NP_Address, I_NetSocket>; //
type ForwardMap = Map<NP_Msg, AddressSet>; // msg->set of uaddr
type HandlerMap = Map<NP_Msg, HandlerSet>; // msg->handler functions
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** transactions store promises for resolving sent packet with return values */
type TransactionMap = Map<NP_Hash, PktResolver>; // hash->resolver
type PktResolver = {
  msg: NP_Msg;
  uaddr: NP_Address;
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** returned by getRoutingInfo() for external users of this class */
type PktRoutingInfo = {
  msg: NP_Msg;
  src_addr: NP_Address;
  self_addr: NP_Address;
  gateway: I_NetSocket;
  clients: I_NetSocket[];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type TClientAuth = {
  identity: string;
  secret: string;
};
type TClientReg = {
  name: string;
  type: string;
};
type TClientDeclare = {
  msg_list: NP_Msg[];
};

/// UTILITY FUNCTIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** utility to dump packet info to console */
function _PKT(ep: NetEndpoint, fn: string, text: string, pkt: NetPacket) {
  let { id, msg, msg_type } = pkt;
  if (id === undefined && msg_type === '_reg') id = `pkt[${UADDR_NONE}:0]`;
  let out = `${ep.uaddr} ${text} '${msg}' `.padEnd(40, '~');
  out += ` ${id.padEnd(12)} ${fn}`;
  return out;
}

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class NetEndpoint {
  handled_msgs: HandlerMap; // msg->handlers[]
  //
  uaddr: NP_Address; // the address for this endpoint
  client_socks: SocketMap; // uaddr->I_NetSocket
  remoted_msgs: ForwardMap; // msg->uaddr[]
  transactions: TransactionMap; // hash->resolver
  //
  cli_counter: number; // counter for generating unique uaddr
  pkt_counter: number; // counter for generating packet ids
  //
  cli_gateway: I_NetSocket; // gateway to server
  cli_sck_timer: any; // timer for checking socket age
  cli_ident: any; // client credentials to request authentication
  cli_auth: any; // client access token for
  cli_reg: TClientReg; // client registration status

  constructor() {
    //
    this.uaddr = undefined; // assigned address
    // endpoint as client
    this.cli_ident = undefined; // client identity
    this.cli_auth = undefined; // client access token
    this.cli_reg = undefined; // client registration status
    this.cli_gateway = undefined; // client gateway
    // endpoint as server
    this.client_socks = undefined;
    this.remoted_msgs = undefined;
    // endpoint message handling support
    this.handled_msgs = new Map<NP_Msg, HandlerSet>();
    this.transactions = new Map<NP_Hash, PktResolver>();
    // runtime packet, socket counters
    this.pkt_counter = 0;
    this.cli_counter = 0;
    this.cli_sck_timer = null; // socket aging placeholder
  }

  /** client connection management  - - - - - - - - - - - - - - - - - - - - **/

  /** initialize this endpoint's client server, providing a hardcoded
   *  server UADDR that is distinct from those used by client pools
   */
  configAsServer(srv_addr: NP_Address) {
    const fn = 'configAsServer:';
    if (!IsValidAddress(srv_addr)) throw Error(`${fn} invalid srv_addr ${srv_addr}`);
    if (this.uaddr && this.uaddr !== srv_addr) {
      let err = `${fn} uaddr ${this.uaddr} already set.`;
      err += `currently, `;
      throw Error(err);
    }
    this.uaddr = srv_addr;
    // make sure we don't nuke
    if (this.client_socks !== undefined)
      LOG(PR, this.uaddr, `already configured`, [...this.client_socks.keys()]);
    this.client_socks = new Map<NP_Address, I_NetSocket>();
    if (this.remoted_msgs !== undefined)
      LOG(PR, this.uaddr, `already configured`, [...this.remoted_msgs.keys()]);
    this.remoted_msgs = new Map<NP_Msg, AddressSet>();
    // add default service message handlers here
    this.registerMessage('SRV:REFLECT', data => {
      data.info = `built-in service`;
      return data;
    });
  }

  /** return true if this endpoint is managing connections */
  isServer() {
    return this.client_socks !== undefined && this.remoted_msgs !== undefined;
  }

  /** socket utilities  - - - - - - - - - - - - - - - - - - - - - - - - - - **/

  /** given a socket, see if it's already registered */
  isNewSocket(socket: I_NetSocket): boolean {
    const fn = 'isNewSocket:';
    if (typeof socket !== 'object') return false;
    return socket.uaddr === undefined;
  }

  /** client endpoints need to have an authentication token to
   *  access URNET beyond registration
   */
  authorizeSocket(auth: any) {
    const fn = 'authorizeSocket:';
    LOG(PR, this.uaddr, 'would check auth token');
  }

  /** return true if this socket passes authentication status */
  isAuthorizedSocket(socket: I_NetSocket): boolean {
    const fn = 'authorizeSocket:';
    LOG(PR, fn, 'would check JWT in socket.auth');
    LOG(PR, this.uaddr, 'would check JWT in socket.auth');
    if (!socket.auth) return false;
    return true;
  }

  /** endpoint client management  - - - - - - - - - - - - - - - - - - - - - **/

  /** Server data event handler for incoming data from a client connection.
   *  This is the mirror to _ingestServerMessage() function used by client endpoints.
   * This is the entry point for incoming data from clients */
  _ingestClientMessage(jsonData, socket: I_NetSocket): NetPacket {
    let pkt = this.newPacket().deserialize(jsonData);
    let retPkt: NetPacket;

    // 1. protocol: authentication packet (once)
    retPkt = this.handleClientAuth(pkt, socket);
    if (retPkt) return retPkt;

    // 2. deny other packets until authentication was handled
    if (!pkt.hasAuth()) return this.handleClientAuthRejection(pkt, socket);
    if (!this.pktIsAuthenticated(pkt, socket))
      return this.handleClientAuthRejection(pkt, socket);

    /** from this point forward, packets are authenticated **/

    // 3. is this a special registration packet (anytime)
    retPkt = this.handleClientReg(pkt, socket);
    if (retPkt) return retPkt;

    // 4. is this a special declaration packet (anytime)
    retPkt = this.handleClientDeclare(pkt, socket);
    if (retPkt) return retPkt;

    // 5. otherwise, handle the packet normally through the message interface
    this.routeMessage(pkt);
  }

  /** check the auth field in the packet */
  pktIsAuthenticated(pkt: NetPacket, socket: I_NetSocket): boolean {
    const fn = 'pktAuthenticate:';
    const { msg, src_addr, hop_dir, hop_seq } = pkt;
    const seq = [...hop_seq].reverse().join('->');
    if (hop_dir === 'res') LOG(PR, `${this.uaddr} .. skip return ${seq} '${msg}'`);
    else LOG(PR, `${this.uaddr} would auth ${src_addr} '${msg}'`);
    return true;
  }

  /** send a rejection packet to the client */
  handleClientAuthRejection(pkt: NetPacket, socket: I_NetSocket): NetPacket {
    const fn = 'rejectAuth:';
    LOG(PR, this.uaddr, 'would send reject packet');
    pkt.data = { error: `${pkt.msg} has invalid authorization` };
    pkt.setDir('res');
    pkt.addHop(this.uaddr);
    return pkt;
  }

  /** handle auth packet if the session.auth is not defined */
  handleClientAuth(pkt: NetPacket, socket: I_NetSocket): NetPacket {
    if (!socket.authenticated()) {
      pkt.setDir('res');
      pkt.addHop(this.uaddr);
      const error = pkt.isBadAuthPkt();
      if (error) {
        console.error(PR, error);
        pkt.data = { error };
        return pkt;
      }
      /** placeholder authentication check **/
      const { identity, secret } = pkt.data;
      if (identity) {
        socket.auth = identity;
        pkt.data = { uaddr: socket.uaddr, cli_auth: 'ServerProvidedAuthToken' };
      } else {
        pkt.data = { error: 'invalid identity' };
      }
      /** end placeholder **/
      return pkt;
    }
    return undefined;
  }

  /** handle registration packet */
  handleClientReg(pkt: NetPacket, socket: I_NetSocket): NetPacket {
    if (!pkt.isBadRegPkt(socket)) {
      pkt.setDir('res');
      pkt.addHop(this.uaddr);
      if (pkt.msg !== 'SRV:REG') {
        pkt.data = { error: `invalid reg packet ${pkt.msg}` };
        return pkt;
      }
      if (pkt.src_addr !== socket.uaddr) {
        LOG(PR, 'src address mismatch', pkt.src_addr, '!= sock', socket.uaddr);
        pkt.data = { error: 'address mismatch' };
        return pkt;
      }
      const { name, type } = pkt.data;
      if (name) {
        const { uaddr } = socket;
        pkt.data = { ok: true, status: `registered name:${name} type:${type}` };
        return pkt;
      }
      pkt.data = { error: 'registration failed' };
      return pkt;
    }
    return undefined;
  }

  /** handle client dynamic definitions */
  handleClientDeclare(pkt: NetPacket, socket: I_NetSocket): NetPacket {
    if (pkt.msg_type === '_decl') {
      pkt.setDir('res');
      pkt.addHop(this.uaddr);
      if (pkt.msg !== 'SRV:DEF') {
        console.log('invalid def packet', pkt.msg);
        pkt.data = { error: `invalid def packet ${pkt.msg}` };
        return pkt;
      }
      // currently support msg_list only
      pkt.data.status = [];
      const { msg_list } = pkt.data;
      const { uaddr } = socket;
      if (Array.isArray(msg_list)) {
        this.registerRemoteMessages(uaddr, msg_list);
        pkt.data.status.push(`registered ${msg_list.length} messages`);
      }
      //
      // ... other definitions can go here
      //
      if (pkt.data.status.length === 0) {
        pkt.data = { error: 'no definitions' };
        return pkt;
      }
    }
    return undefined;
  }

  /** when a client connects to this endpoint, register it as a socket and
   *  allocate a uaddr for it */
  addClient(socket: I_NetSocket): NP_Address {
    const fn = 'addClient:';
    if (typeof socket !== 'object') throw Error(`${fn} invalid socket`);
    if (socket.uaddr !== undefined) throw Error(`${fn} socket already added`);
    const new_uaddr = AllocateAddress({ prefix: 'UR_' });
    socket.uaddr = new_uaddr;
    socket.age = 0;
    socket.auth = undefined; // filled-in by socket authorization
    socket.msglist = undefined; // filled-in by message registration
    this.client_socks.set(new_uaddr, socket);
    // LOG(PR,this.uaddr, `socket ${new_uaddr} registered`);
    return new_uaddr;
  }

  /** given a uaddr, return the socket */
  getClient(uaddr: NP_Address): I_NetSocket {
    const fn = 'getClient:';
    if (this.client_socks === undefined) return undefined;
    return this.client_socks.get(uaddr);
  }

  /** when a client disconnects from this endpoint, delete its socket and
   *  remove all message forwarding */
  removeClient(uaddr_obj: NP_Address | I_NetSocket): NP_Address {
    const fn = 'removeClient:';
    let uaddr = typeof uaddr_obj === 'string' ? uaddr_obj : uaddr_obj.uaddr;
    if (typeof uaddr !== 'string') {
      LOG(PR, `${fn} invalid uaddr ${typeof uaddr}`);
      return undefined;
    }
    if (!this.client_socks.has(uaddr)) throw Error(`${fn} unknown uaddr ${uaddr}`);
    // remoted_msgs is msg->set of uaddr, so iterate over all messages
    this._delRemoteMessages(uaddr);
    // delete the socket
    this.client_socks.delete(uaddr);
    // LOG(PR,this.uaddr, `socket ${uaddr} deleted`);
    return uaddr;
  }

  /** start a timer to check for dead sockets */
  enableClientAging(activate: boolean) {
    const fn = 'enableClientAging:';
    if (activate) {
      if (this.cli_sck_timer) clearInterval(this.cli_sck_timer);
      this.cli_sck_timer = setInterval(() => {
        this.client_socks.forEach((socket, uaddr) => {
          socket.age += AGE_INTERVAL;
          if (socket.age > AGE_MAX) {
            LOG(PR, this.uaddr, `socket ${uaddr} expired`);
            // put stuff here
          }
        });
      }, AGE_INTERVAL);
      return;
    }
    if (this.cli_sck_timer) clearInterval(this.cli_sck_timer);
    this.cli_sck_timer = null;
    LOG(PR, this.uaddr, `timer stopped`);
  }

  /** client connection handshaking - - - - - - - - - - - - - - - - - - - - **/

  /** Client data event handler for incoming data from the gateway.
   *  This is the mirror to _ingestClientMessage() function that is used by servers.
   *  This is entry point for incoming data from server */
  _ingestServerMessage(jsonData: any, socket: I_NetSocket): void {
    const fn = '_ingestServerMessage:';
    const pkt = this.newPacket().deserialize(jsonData);
    // 1. is this connection handshaking for clients?
    if (this.cli_gateway) {
      // only clients have a defined cli_gateway
      // these types of packets are never dispatched through the net message
      // API, and are handled directly by the client endpoint to connect
      if (this.handleAuthResponse(pkt)) return;
      if (this.handleRegResponse(pkt)) return;
    }
    // 2. otherwise handle the message interface normally
    this.routeMessage(pkt);
  }

  /** client endpoints need to have an "address" assigned to them, otherwise
   *  the endpoint will not work */
  async connectAsClient(gateway: I_NetSocket, auth: TClientAuth): Promise<NP_Data> {
    const fn = 'connectAsClient:';
    if (gateway && typeof gateway.send === 'function') {
      this.cli_gateway = gateway;
    } else throw Error(`${fn} invalid gateway`);
    if (auth) {
      const pkt = this.newAuthPacket(auth);
      const { msg } = pkt;
      // this will be intercepted by _ingestServerMessage and not go through
      // the normal netcall interface. It leverages the transaction code
      const requestAuth = new Promise((resolve, reject) => {
        const hash = GetPacketHashString(pkt);
        if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
        const meta = { msg, uaddr: this.uaddr };
        this.transactions.set(hash, { resolve, reject, ...meta });
        try {
          this.cli_gateway.send(pkt);
        } catch (err) {
          reject(err);
        }
      });
      /** MAGIC **/
      /** await promise, which resolves when server responds to the auth packet */
      let authData: NP_Data = await requestAuth;
      /** resumes when handleAuthResponse() resolves the transaction **/
      /** END MAGIC **/

      // handle authdata
      const { uaddr, cli_auth, error } = authData;
      if (error) {
        LOG(PR, `${fn} error:`, error);
        return false;
      }
      if (!IsValidAddress(uaddr)) throw Error(`${fn} invalid uaddr ${uaddr}`);
      this.uaddr = uaddr;
      if (cli_auth === undefined) throw Error(`${fn} invalid cli_auth`);
      this.cli_auth = cli_auth;
      LOG(PR, 'AUTHENTICATED', uaddr, cli_auth);
      this.cli_auth = cli_auth;
      return authData;
    }
    throw Error(`${fn} arg must be identity`);
  }

  /** create an authentication packet, which is the first packet that must be sent
   *  after connecting to the server */
  newAuthPacket(authObj: TClientAuth): NetPacket {
    const pkt = this.newPacket('SRV:AUTH', { ...authObj });
    pkt.setMeta('_auth', { rsvp: true });
    pkt.setSrcAddr(UADDR_NONE); // provide null address
    this.assignPacketId(pkt);
    return pkt;
  }

  /** handle authentication response packet directly rather than through
   *  the netcall interface in routeMessage() */
  handleAuthResponse(pkt: NetPacket): boolean {
    const fn = 'handleAuthResponse:';
    if (pkt.msg_type !== '_auth') return false;
    if (pkt.hop_dir !== 'res') return false;
    this.pktResolveRequest(pkt);
    // auth resumes in connectAsClient() magical await requestAuth
    return true;
  }

  /** register client with client endpoint info */
  async registerClient(info: TClientReg): Promise<NP_Data> {
    const fn = 'registerClient:';
    if (!this.cli_gateway) throw Error(`${fn} no gateway`);
    const pkt = this.newRegPacket();
    pkt.data = { ...info };
    const { msg } = pkt;
    const requestReg = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.uaddr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.cli_gateway.send(pkt);
      } catch (err) {
        reject(err);
      }
    });

    /** MAGIC **/
    /** suspend through transaction **/
    let regData: NP_Data = await requestReg;
    /** resumes when handleAuthResponse() resolves the transaction **/
    /** END MAGIC **/

    const { ok, status, error } = regData;
    if (error) {
      LOG(PR, `${fn} error:`, error);
      return regData;
    }
    if (ok) {
      LOG(PR, 'REGISTERED', status);
      this.cli_reg = info; // save registration info
      return regData;
    }
    throw Error(`${fn} unexpected response`, regData);
  }

  /** create a registration packet */
  newRegPacket(): NetPacket {
    const pkt = this.newPacket('SRV:REG');
    pkt.setMeta('_reg', { rsvp: true });
    return pkt;
  }

  /** handle registration response packet directly rather than through
   *  the netcall interface in routeMessage() */
  handleRegResponse(pkt: NetPacket): boolean {
    const fn = 'handleRegResponse:';
    if (pkt.msg_type !== '_reg') return false;
    if (pkt.hop_dir !== 'res') return false;
    if (pkt.src_addr !== this.uaddr) throw Error(`${fn} misaddressed packet???`);
    // resuming from registerClient() await requestReg
    this.pktResolveRequest(pkt);
    return true;
  }

  /** declare client messages */
  async clientDeclare() {
    const fn = 'clientDeclare:';
    const msg_list = this.listNetMessages();
    const response = await this.clientDeclareServices({ msg_list });
    const { msg_list: rmsg_list, error } = response;
    if (error) {
      LOG(PR, `${fn} error:`, error);
    } else {
      LOG(PR, `DECLARED ${rmsg_list.length} messages`);
      rmsg_list.forEach(msg => LOG(PR, `  '${msg}'`));
    }
    return response;
  }

  /** declare client attributes is a generic declaration packet that can contain
   *  any number of attributes that the client wants to declare to the server.
   *  for example, see clientDeclare() */
  async clientDeclareServices(def: TClientDeclare): Promise<NP_Data> {
    const fn = 'clientDeclareServices:';
    if (!this.cli_gateway) throw Error(`${fn} no gateway`);
    const pkt = this.newDeclPacket();
    pkt.data = { ...def };
    const { msg } = pkt;
    const decSvcs = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.uaddr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.cli_gateway.send(pkt);
      } catch (err) {
        reject(err);
      }
    });
    /** suspend through transaction **/
    let declared: NP_Data = await decSvcs;
    /** resumes when handleAuthResponse() resolves the transaction **/
    const { error, status } = declared;
    if (error) {
      LOG(PR, `${fn} error:`, error);
      return declared;
    }
    if (status) return declared;
    // neither error or status, so something went wrong
    throw Error(`${fn} unexpected response`, declared);
  }

  /** create a declaration packet shell */
  newDeclPacket(): NetPacket {
    const pkt = this.newPacket('SRV:DEF');
    pkt.setMeta('_decl', { rsvp: true });
    return pkt;
  }

  /** handle declaration packet */
  handleDeclResponse(pkt: NetPacket): boolean {
    const fn = 'handleDeclResponse:';
    if (pkt.msg_type !== '_decl') return false;
    if (pkt.hop_dir !== 'res') return false;
    if (pkt.src_addr !== this.uaddr) throw Error(`${fn} misaddressed packet???`);
    // resuming from clientDeclareServices() await requestReg
    this.pktResolveRequest(pkt);
    return true;
  }

  /** shuts down the gateway to server, forcing close
   *  Chrome 125.0.6422.77 doesn't seem to send a close frame on reload
   *  Firefox 126.0 doesn't fire beforeunload
   */
  disconnectAsClient() {
    if (this.cli_gateway === undefined) return;
    if (typeof this.cli_gateway.close === 'function') {
      this.cli_gateway.close();
    }
    this.cli_gateway = undefined;
  }

  /** endpoint lookup tables - - - - - - - - - - - - - - - - - - - -  - - - **/

  /** get list of messages allocated to a uaddr */
  getMessagesForAddress(uaddr: NP_Address): NP_Msg[] {
    const fn = 'getMessagesForAddress:';
    if (!this.isServer()) return []; // invalid for client-only endpoints
    if (typeof uaddr !== 'string') throw Error(`${fn} invalid uaddr`);
    if (!this.client_socks.has(uaddr)) throw Error(`${fn} unknown uaddr ${uaddr}`);
    // remoted_msgs is msg->set of uaddr, so iterate over all messages
    const msg_list: NP_Msg[] = [];
    this.remoted_msgs.forEach((addr_set, msg) => {
      if (addr_set.has(uaddr)) msg_list.push(msg);
    });
    return msg_list;
  }

  /** get list of UADDRs that a message is forwarded to */
  getAddressesForMessage(msg: NP_Msg): NP_Address[] {
    const fn = 'getAddressesForMessage:';
    if (!this.isServer()) return []; // invalid for client-only endpoints
    if (typeof msg !== 'string') throw Error(`${fn} invalid msg`);
    const key = NormalizeMessage(msg);
    if (!this.remoted_msgs.has(key))
      this.remoted_msgs.set(key, new Set<NP_Address>());
    const addr_set = this.remoted_msgs.get(key);
    const addr_list = Array.from(addr_set);
    return addr_list;
  }

  /** return list of local handlers for given message */
  getHandlersForMessage(msg: NP_Msg): HandlerFunc[] {
    const fn = 'getHandlersForMessage:';
    if (typeof msg !== 'string') throw Error(`${fn} invalid msg`);
    const key = NormalizeMessage(msg);
    if (!this.handled_msgs.has(key))
      this.handled_msgs.set(key, new Set<HandlerFunc>());
    const handler_set = this.handled_msgs.get(key);
    if (!handler_set) throw Error(`${fn} unexpected empty set '${key}'`);
    const handler_list = Array.from(handler_set);
    return handler_list;
  }

  /** informational routing information - - - - - - - - - - - - - - - - - - **/

  /** return handler list for this endpoint */
  listMessages(): NP_Msg[] {
    // get message keys from handled_msgs
    const list = [];
    this.handled_msgs.forEach((handler_set, key) => {
      list.push(key);
    });
    return list;
  }

  /** return only net messages */
  listNetMessages(): NP_Msg[] {
    const list = [];
    this.handled_msgs.forEach((handler_set, key) => {
      if (IsNetMessage(key)) list.push(key);
    });
    return list;
  }

  /** return list of active transactions for this endpoint */
  listTransactions(): { hash: NP_Hash; msg: NP_Msg; uaddr: NP_Address }[] {
    // return array of objects { hash, msg, uaddr }
    const fn = 'listTransactions:';
    const list = [];
    this.transactions.forEach((transaction, hash) => {
      const { msg, uaddr } = transaction;
      list.push({ hash, msg, uaddr });
    });
    return list;
  }

  /** server endpoints manage list of messages in clients  - - - - -  - - - **/

  /** register a message handler for a given message to passed uaddr */
  registerRemoteMessages(uaddr: NP_Address, msgList: NP_Msg[]) {
    const fn = 'registerRemoteMessages:';
    if (typeof uaddr !== 'string') throw Error(`${fn} invalid uaddr`);
    if (!this.client_socks.has(uaddr)) throw Error(`${fn} unknown uaddr ${uaddr}`);
    this._setRemoteMessages(uaddr, msgList);
  }

  /** secret utility function for registerRemoteMessages */
  _setRemoteMessages(uaddr: NP_Address, msgList: NP_Msg[]) {
    const fn = '_setRemoteMessages:';
    msgList.forEach(msg => {
      if (typeof msg !== 'string') throw Error(`${fn} invalid msg`);
      if (msg !== msg.toUpperCase()) throw Error(`${fn} msg must be uppercase`);
      const key = NormalizeMessage(msg);
      if (!this.remoted_msgs.has(key))
        this.remoted_msgs.set(key, new Set<NP_Address>());
      const msg_set = this.remoted_msgs.get(key);
      msg_set.add(uaddr);
      // LOG(PR,this.uaddr, `reg remote ${key} for ${uaddr}`);
    });
  }

  /** unregister message handlers for a given message to passed uaddr */
  _delRemoteMessages(uaddr: NP_Address): NP_Msg[] {
    const fn = '_delRemoteMessages:';
    if (typeof uaddr !== 'string') throw Error(`${fn} invalid uaddr`);
    if (!this.client_socks.has(uaddr)) throw Error(`${fn} unknown uaddr ${uaddr}`);
    const removed = [];
    this.remoted_msgs.forEach((msg_set, key) => {
      if (msg_set.has(uaddr)) removed.push(key);
      msg_set.delete(uaddr);
    });
    return removed;
  }

  /** packet utility - - - - - - - - - - - - - - - - - - - - - - - - - - - -**/

  assignPacketId(pkt: NetPacket): NP_ID {
    if (pkt.src_addr === undefined) pkt.src_addr = this.uaddr;
    const count = ++this.pkt_counter;
    pkt.id = `pkt[${pkt.src_addr}:${count}]`;
    return pkt.id;
  }

  /** convert JSON to packet and return */
  packetFromJSON(json: string): NetPacket {
    const pkt = new NetPacket();
    pkt.setFromJSON(json);
    return pkt;
  }

  /** create a new packet with proper address */
  newPacket(msg?: NP_Msg, data?: NP_Data): NetPacket {
    const fn = 'newPacket:';
    const pkt = new NetPacket(msg, data);
    pkt.setSrcAddr(this.uaddr || UADDR_NONE);
    if (this.cli_auth) pkt.setAuth(this.cli_auth);
    pkt.id = this.assignPacketId(pkt);
    return pkt;
  }

  /** clone a packet with new id */
  clonePacket(pkt: NetPacket): NetPacket {
    const clone = this.newPacket(pkt.msg, pkt.data);
    clone.setFromJSON(pkt.serialize());
    clone.src_addr = this.uaddr;
    clone.id = this.assignPacketId(clone);
    return clone;
  }

  /** message declaration and invocation - - - - - - - - - - - - - - - - - -**/

  /** declare a message handler for a given message */
  registerMessage(msg: NP_Msg, handler: HandlerFunc) {
    const fn = 'registerMessage:';
    // LOG(PR,this.uaddr, `reg handler '${msg}'`);
    if (typeof msg !== 'string') throw Error(`${fn} invalid msg`);
    if (msg !== msg.toUpperCase()) throw Error(`${fn} msg must be uppercase`);
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    if (!this.handled_msgs.has(key))
      this.handled_msgs.set(key, new Set<HandlerFunc>());
    const handler_set = this.handled_msgs.get(key);
    handler_set.add(handler);
  }

  /** remove a previously declared message handler for a given message */
  removeMessage(msg: NP_Msg, handler: HandlerFunc) {
    const fn = 'removeMessage:';
    if (typeof msg !== 'string') throw Error(`${fn} invalid msg`);
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    const handler_set = this.handled_msgs.get(key);
    if (!handler_set) throw Error(`${fn} unexpected empty set '${key}'`);
    handler_set.delete(handler);
  }

  /** call local message registered on this endPoint only */
  async call(msg: NP_Msg, data: NP_Data): Promise<NP_Data> {
    const fn = 'call:';
    if (!IsLocalMessage(msg)) throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    const promises = [];
    handlers.forEach(handler => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            resolve(handler({ ...data })); // copy of data
          } catch (err) {
            reject(err);
          }
        })
      );
    });
    if (promises.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    // wait for all promises to resolve
    const resData = await Promise.all(promises);
    return resData;
  }

  /** send local message registered on this endPoint only, returning no data */
  async send(msg: NP_Msg, data: NP_Data): Promise<NP_Data> {
    const fn = 'send:';
    if (!IsLocalMessage(msg)) throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    handlers.forEach(handler => {
      handler({ ...data }); // copy of data
    });
    return Promise.resolve(true);
  }

  /** signal local message registered on this endPoint only, returning no data.
   */
  async signal(msg: NP_Msg, data: NP_Data): Promise<NP_Data> {
    const fn = 'signal:';
    if (!IsLocalMessage(msg)) throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    handlers.forEach(handler => {
      handler({ ...data }); // copy of data
    });
    return Promise.resolve(true);
  }

  /** ping local message, return with number of handlers */
  async ping(msg: NP_Msg): Promise<NP_Data> {
    const fn = 'ping:';
    if (!IsLocalMessage(msg)) throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    return Promise.resolve(handlers.length);
  }

  /** call net message, resolves when packet returns from server with data */
  async netCall(msg: NP_Msg, data: NP_Data): Promise<NP_Data> {
    const fn = 'netCall:';
    if (!IsNetMessage(msg)) throw Error(`${fn} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta('call', {
      dir: 'req',
      rsvp: true
    });
    const p = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.uaddr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.pktSendRequest(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let resData = await p;
    return resData;
  }

  /** send net message, returning promise that will resolve when the server has
   *  received and processed/forwarded the message */
  async netSend(msg: NP_Msg, data: NP_Data): Promise<NP_Data> {
    const fn = 'netSend:';
    if (!IsNetMessage(msg)) throw Error(`${fn} '${msg}' missing NET prefix`);
    const p = new Promise((resolve, reject) => {
      const pkt = this.newPacket(msg, data);
      pkt.setMeta('send', {
        dir: 'req',
        rsvp: true
      });
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.uaddr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.pktSendRequest(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let resData = await p;
    return resData;
  }

  /** signal net message, returning void (not promise)
   *  used for the idea of 'raising signals' as opposed to 'sending data'. It
   *  resolves immediately when the signal is sent, and does not check with the
   *  server  */
  netSignal(msg: NP_Msg, data: NP_Data): void {
    const fn = 'netSignal:';
    if (!IsNetMessage(msg)) throw Error(`${fn} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta('signal', {
      dir: 'req',
      rsvp: false
    });
    this.pktSendRequest(pkt);
  }

  /** returns with a list of uaddr from the server which is the uaddr of the
   *  all clients that have registered for the message */
  async netPing(msg: NP_Msg): Promise<NP_Data> {
    const fn = 'netPing:';
    if (!IsNetMessage(msg)) throw Error(`${fn} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg);
    pkt.setMeta('ping', {
      dir: 'req',
      rsvp: true
    });
    const p = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.uaddr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.pktSendRequest(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let resData = await p;
    return resData;
  }

  /** packet interface  - - - - - - - - - - - - - - - - - - - - - - - - - - **/

  /** Receive a single packet from the wire, and determine what to do with it.
   *  It's assumed that _ingestClientMessage() has already handled
   *  authentication for clients before this method is received.
   *  The packet has several possible processing options!
   *  - packet is response to an outgoing transaction
   *  - packet is a message that we handle
   *  - packet is a message that we forward
   *  - packet is unknown message so we return it with error
   *  If the packet has the rsvp flag set, we need to return
   *  it to the source address in the packet with any data
   */
  async routeMessage(pkt: NetPacket): Promise<void> {
    try {
      const fn = 'routeMessage:';
      // is this a response to a transaction?
      if (pkt.isResponse()) {
        if (pkt.src_addr === this.uaddr) this.pktResolveRequest(pkt);
        else this.pktSendResponse(pkt);
        return;
      }
      // make sure if it's not a response, then it's a request
      if (!pkt.isRequest()) {
        LOG(PR, this.uaddr, fn, `invalid packet`, pkt);
        return;
      }

      // if it's a ping, we just want to return number of
      // messages this server knows about.
      if (pkt.msg_type === 'ping') {
        const pingArr = this.getAddressesForMessage(pkt.msg);
        const pingHandlers = this.getHandlersForMessage(pkt.msg);
        if (pingHandlers.length > 0) pingArr.push(this.uaddr);
        pkt.setData(pingArr);
        this.pktSendResponse(pkt);
        return;
      }
      // if it's a signal, this is not an rsvp, but log it for
      // internal debug purposes (doesn't affect function)
      if (pkt.msg_type === 'signal') {
        this.pktForward(pkt);
        return;
      }
      // check to see if there are any handlers defined in this
      // endpoint to process stuff. It first checks for client-side
      // message handlers, and then if there are none it checks for
      // server-defined handlers.
      // the behavior is different on servers (which also implement
      // a client) versus pure clients.
      const { msg } = pkt;
      let retData;
      if (this.handled_msgs.has(msg)) {
        retData = await this.pktAwaitHandlers(pkt);
      } else if (this.remoted_msgs.has(msg)) {
        retData = await this.pktAwaitRequest(pkt);
      } else {
        LOG(PR, this.uaddr, fn, `unknown message '${msg}'`, pkt);
        retData = { error: `unknown message '${msg}'` };
      }

      // if none of the above fired, then there were no handlers
      // on this instance of endpoint, so we have to send it
      // elsewhere. First,
      if (!pkt.isRsvp()) return;

      // remember at this point, we're still handling a
      // request packet. We already handled response
      // packets at the very top,

      // if this request isn't a call, then there
      // is no data to return. This is the case for
      // for signal, send, ping.
      if (pkt.msg_type !== 'call') pkt.data = true;
      else {
        retData = NormalizeData(retData);
        pkt.setData(retData);
      }
      // now send the response, eventually
      this.pktSendResponse(pkt);
    } catch (err) {
      // format the error message to be nicer to read
      LOG(PR, err.message);
      LOG(PR, err.stack.split('\n').slice(1).join('\n').trim());
    }
  }

  /** Send a single packet on all available interfaces based on the
   *  message. And endpoint can be a client (with gateway) or a server
   *  (with clients). Use for initial outgoing packets only.
   */
  pktSendRequest(pkt: NetPacket) {
    const fn = 'pktSendRequest:';
    // sanity checks
    if (pkt.src_addr === undefined) throw Error(`${fn}src_addr undefined`);
    if (this.uaddr === undefined) throw Error(`${fn} uaddr undefined`);
    if (pkt.hop_seq.length !== 0) throw Error(`${fn} pkt must have no hops yet`);
    if (pkt.msg_type !== 'ping' && pkt.data === undefined)
      throw Error(`${fn} data undefined`);
    // prep for sending
    // LOG(PR,_PKT(this, fn, '-send-req-', pkt), pkt.data);
    const { gateway, clients } = this.pktGetSocketRouting(pkt);
    // send on the wire
    pkt.addHop(this.uaddr);
    if (gateway) {
      if (this.cli_reg === undefined) throw Error(`${fn} endpoint not registered`);
      gateway.send(pkt);
    }
    if (Array.isArray(clients)) {
      clients.forEach(sock => sock.send(pkt));
    }
  }

  /** Given a packet and a socket, clone it and then return a
   *  promise that sends it out on all network interfaces. This
   *  is used by server endpoints as a utility to send a clone
   *  packet on a particular socket to a particular address.
   */
  pktQueueRequest(pkt: NetPacket, sock: I_NetSocket): Promise<any> {
    const fn = 'pktQueueRequest:';
    const clone = this.clonePacket(pkt);
    clone.id = this.assignPacketId(clone);
    const hash = GetPacketHashString(clone);
    if (this.transactions.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
    const { src_addr } = pkt;
    const { uaddr: dst_addr } = sock;
    // LOG(PR,`${pkt.msg} dst:${dst_addr} src:${src_addr}`);
    // for send and call packets, do not send to origin
    if (src_addr === dst_addr && SkipOriginType(pkt.msg_type)) {
      // LOG(PR,`.. skipping reflect '${pkt.msg}' to ${dst_addr}==${src_addr}`);
      return undefined;
    }
    // otherwise Promise
    const p = new Promise((resolve, reject) => {
      const meta = { msg: pkt.msg, uaddr: pkt.src_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      sock.send(clone);
    });
    return p;
  }

  /** Resolve a transaction when a packet is returned to it through
   *  routeMessage(pkt) which determines that it is a returning transaction
   */
  pktResolveRequest(pkt: NetPacket) {
    const fn = 'pktResolveRequest:';
    // LOG(PR,this.uaddr, 'resolving', pkt.msg);
    if (pkt.hop_rsvp !== true) throw Error(`${fn} packet is not RSVP`);
    if (pkt.hop_dir !== 'res') throw Error(`${fn} packet is not a response`);
    if (pkt.hop_seq.length < 2 && !pkt.isSpecialPkt())
      throw Error(`${fn} packet has no hops`);
    const hash = GetPacketHashString(pkt);
    const resolver = this.transactions.get(hash);
    if (!resolver) throw Error(`${fn} no resolver for hash ${hash}`);
    const { resolve, reject } = resolver;
    const { data } = pkt;
    // LOG(PR,_PKT(this, fn, '-recv-res-', pkt), pkt.data);
    if (pkt.err) reject(pkt.err);
    else resolve(data);
    this.transactions.delete(hash);
  }

  /** Return a packet to its source address. If this endpoint is a server,
   *  then it might have the socket stored. Otherwise, if this endpoint is
   *  also a client of another server, pass the back through the gateway.
   *  This is used by server endpoints to return packets to clients.
   */
  pktSendResponse(pkt: NetPacket) {
    const fn = 'pktSendResponse:';
    // check for validity
    if (pkt.hop_rsvp !== true) throw Error(`${fn} packet is not RSVP`);
    if (pkt.hop_seq.length < 1) throw Error(`${fn} packet has no hops`);
    // prep for return
    pkt.setDir('res');
    pkt.addHop(this.uaddr);
    // LOG(PR,_PKT(this, fn, '-send-res-', pkt), pkt.data);
    const { gateway, src_addr } = this.pktGetSocketRouting(pkt);
    if (this.isServer()) {
      // LOG(PR,this.uaddr, 'returning to', src_addr);
      const socket = this.getClient(src_addr);
      if (socket) socket.send(pkt);
      // responses go to a single address; if we found it here,
      // then we're done
      return;
    }
    // if we have a gateway, pass the buck onward and let it
    // find the client
    if (gateway) {
      gateway.send(pkt);
      return;
    }
    LOG(PR, `${fn} unroutable packet`, pkt);
  }

  /** broadcast a received signal packet to everyone, even the
   *  sender. This is used by endpoints to broadcast signals
   */
  pktForward(pkt: NetPacket) {
    const fn = 'pktForward:';
    // check for validity
    if (pkt.hop_rsvp !== false) throw Error(`${fn} packet is RSVP`);
    if (pkt.hop_seq.length < 1) throw Error(`${fn} packet has no hops`);
    // want to broadcast to everyone
    pkt.addHop(this.uaddr);
    const { gateway, clients } = this.pktGetSocketRouting(pkt);
    if (gateway) {
      const clone = this.clonePacket(pkt);
      clone.id = this.assignPacketId(clone);
      LOG(PR, _PKT(this, fn, '-signal-gatewat-', clone), clone.data);
      gateway.send(clone);
    }
    if (Array.isArray(clients)) {
      // LOG(PR,_PKT(this, fn, '-wait-req-', pkt), pkt.data);
      clients.forEach(sock => {
        const clone = this.clonePacket(pkt);
        clone.id = this.assignPacketId(clone);
        LOG(PR, _PKT(this, fn, '-signal-client-', clone), clone.data);
        sock.send(clone);
      });
    }
  }

  /** Start a transaction, which returns promises to await. This method
   *  is a queue that uses Promises to wait for the return, which is
   *  triggered by a returning packet in routeMessage(pkt).
   */
  async pktAwaitRequest(pkt: NetPacket) {
    const fn = 'pktAwaitRequest:';
    if (pkt.hop_dir !== 'req') throw Error(`${fn} packet is not a request`);
    // prep for return
    const { gateway, clients } = this.pktGetSocketRouting(pkt);
    const promises = [];
    if (gateway) {
      // LOG(PR,_PKT(this, fn, '-wait-req-', pkt), pkt.data);
      const p = this.pktQueueRequest(pkt, gateway);
      if (p) promises.push(p);
    }
    if (Array.isArray(clients)) {
      // LOG(PR,_PKT(this, fn, '-wait-req-', pkt), pkt.data);
      clients.forEach(sock => {
        // LOG(PR,this.uaddr, 'await remote', pkt.msg, sock.uaddr);
        const p = this.pktQueueRequest(pkt, sock);
        if (p) promises.push(p);
      });
    }
    let data = await Promise.all(promises);
    if (Array.isArray(data) && data.length === 1) data = data[0];
    // LOG(PR,_PKT(this, fn, '-retn-req-', pkt), pkt.data);
    return data;
  }

  /** Start a handler call, which might have multiple implementors.
   *  Returns data from all handlers as an array or a single item
   */
  async pktAwaitHandlers(pkt: NetPacket) {
    const fn = 'pktAwaitHandlers:';
    const { msg } = pkt;
    const handlers = this.getHandlersForMessage(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    const promises = [];
    // LOG(PR,_PKT(this, fn, '-wait-hnd-', pkt), pkt.data);
    handlers.forEach(handler => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            resolve(handler({ ...pkt.data })); // copy of data
          } catch (err) {
            reject(err);
          }
        })
      );
    });
    let data = await Promise.all(promises);
    if (Array.isArray(data) && data.length === 1) data = data[0];
    // LOG(PR,_PKT(this, fn, '-retn-hnd-', pkt), pkt.data);
    return data;
  }

  /** return array of sockets to use for sending packet,
   *  based on pkt.msg and pkt.src_addr
   */
  pktGetSocketRouting(pkt: NetPacket): PktRoutingInfo {
    const fn = 'pktGetSocketRouting:';
    const { msg, src_addr } = pkt;
    if (!IsNetMessage(msg)) throw Error(`${fn} '${msg}' is invalid message`);
    // check if there's a gateway first and add it
    const gateway = this.cli_gateway;
    const self_addr = this.uaddr;
    // check if we're a server
    const msg_list = this.getAddressesForMessage(msg);
    const clients = [];
    msg_list.forEach(uaddr => {
      if (uaddr === this.uaddr) return; // skip self
      const socket = this.getClient(uaddr);
      if (socket) clients.push(socket);
    });
    return {
      msg,
      src_addr,
      self_addr,
      gateway,
      clients
    };
  }
} // end NetEndpoint class

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { NetEndpoint };
