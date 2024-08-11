/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ServiceMap manages a list of named services and their associated
  handlers and addresses. 
  It's used as a support class for NetEndpoint. A service name is
  the same as an URNET message of form `CHAN:MESSAGE` with payload of
  NP_Data.

  Additionally, it enforces the categoziation of services into groups, and
  knows how to recognize and decode service names.

  -- CROSS PLATFORM IMPORT TRICKS -------------------------------------------

  When using from nodejs mts file, you can only import 'default', which is the
  NetEndpoint class. If you want to import other exports, you need to
  destructure the .default prop; to access the NetPacket class do this:

    import EP_DEFAULT from './my-class.ts';
    const { NetSocket } = EP_DEFAULT.default; // note .default

  You can import the types through dereferencing as usual:

    import EP_DEFAULT, { I_NetSocket } from './my-module.ts';

  This is not required when importing from another .ts typescript file.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NormalizeMessage, DecodeMessage } from './util-urnet.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { NP_Address, NP_Msg, NM_Handler } from '~ur/types/urnet.d.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HandlerSet = Set<NM_Handler>; // set(handler1, handler2, ...)
type HandlerMap = Map<NP_Msg, HandlerSet>; // msg->handler functions
type AddressSet = Set<NP_Address>; // ['UA001', 'UA002', ...]
type AddressMap = Map<NP_Msg, AddressSet>; // msg->set of uaddr

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const PR =
  // @ts-ignore - multiplatform definition check
  typeof process !== 'undefined'
    ? 'ServiceMap'.padEnd(13) // nodejs
    : 'ServiceMap'.padEnd(11); // browser
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PROTOCOLS = {
  'APP': ['HOT_RELOAD']
};

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** helper: decode a protocol name into a normalized form. A protocol
 *  name is a special formatted message name that is used to identify.
 *  If it begins with _, then it is a protocol message. The protocol
 *  is defined as the first part of the message name and is delimited
 *  by another underscore
 */
function m_DecodeProtocolName(msg: NP_Msg) {
  const fn = 'm_DecodeProtocolName:';
  let [channel, tmp_msg] = DecodeMessage(msg);
  // example protocol message: _UR_HOT_RELOAD
  if (!tmp_msg.startsWith('_')) return [undefined, tmp_msg];
  tmp_msg = tmp_msg.slice(1); // remove leading underscore
  let [protocol, message] = tmp_msg.split('_');
  // look up protocol in protocol map
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** add a protocol to the protocol map */
function m_AddProtocol(protoName: string, protoMsgs: NP_Msg[]) {}

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class ServiceMap {
  service_addr: NP_Address; // unique identifier for this map
  handled_svcs: HandlerMap; // map of services with local handler functions
  proxied_svcs: AddressMap; // map of services forwarded to other addresses

  /** constructor: identifier is generally the same as the endpoint UADDR
   *  when used by NetEndpoint e.g. SRV01, SRV02, etc.
   */
  constructor(addr: NP_Address) {
    this.service_addr = addr;
    this.handled_svcs = new Map<NP_Msg, HandlerSet>();
    // proxied services are not enabled by default
    this.proxied_svcs = undefined;
  }

  /** call to make this ServiceMap handle proxies */
  enableProxies() {
    const fn = 'initializeRemotes:';
    if (this.proxied_svcs !== undefined) throw Error(`${fn} already initialized`);
    this.proxied_svcs = new Map<NP_Msg, AddressSet>();
  }

  /// UTILITIES FOR SPECIAL SERVICES ///

  /** API: add a protocol handler for a given service name, which
   *  are reserved for special services */
  addProtocolHandler(pmsg: NP_Msg, handler: NM_Handler) {
    const fn = 'addProtocolHandler:';
    if (typeof pmsg !== 'string') throw Error(`${fn} invalid pmsg`);
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(pmsg);
  }

  /// HANDLED SERVICES are LOCAL FUNCTIONS ///

  /** API: declare a service handler for a given service name */
  addServiceHandler(msg: NP_Msg, handler: NM_Handler) {
    const fn = 'addServiceHandler:';
    // LOG(PR,this.uaddr, `reg handler '${msg}'`);
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    if (!this.handled_svcs.has(key))
      this.handled_svcs.set(key, new Set<NM_Handler>());
    const handler_set = this.handled_svcs.get(key);
    handler_set.add(handler);
  }

  /** API: remove a previously declared service handler for a given service name */
  deleteServiceHandler(msg: NP_Msg, handler: NM_Handler) {
    const fn = 'deleteServiceHandler:';
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    const handler_set = this.handled_svcs.get(key);
    if (!handler_set) throw Error(`${fn} unexpected empty set '${key}'`);
    handler_set.delete(handler);
  }

  /** return list of local handlers for given service name */
  getServiceHandlers(msg: NP_Msg): NM_Handler[] {
    const fn = 'getServiceHandlers:';
    if (this.handled_svcs === undefined) return [];
    const key = NormalizeMessage(msg);
    if (!this.handled_svcs.has(key))
      this.handled_svcs.set(key, new Set<NM_Handler>());
    const handler_set = this.handled_svcs.get(key);
    if (!handler_set) throw Error(`${fn} unexpected empty set '${key}'`);
    const handler_list = Array.from(handler_set);
    return handler_list;
  }

  /** return handler list for this endpoint */
  getServiceNames(): NP_Msg[] {
    // get service name keys from handled_svcs
    const list = [];
    this.handled_svcs.forEach((handler_set, key) => {
      list.push(key);
    });
    return list;
  }

  /// PROXIED SERVICES are handled by REMOTE ADDRESSES ///

  /** get list of services allocated to a uaddr */
  getServicesForAddress(uaddr: NP_Address): NP_Msg[] {
    const fn = 'getServicesForAddress:';
    if (typeof uaddr !== 'string') throw Error(`${fn} invalid uaddr`);
    // proxied_svcs is msg->set of uaddr, so iterate over all services
    const msg_list: NP_Msg[] = [];
    if (this.proxied_svcs === undefined) return msg_list;
    this.proxied_svcs.forEach((addr_set, msg) => {
      if (addr_set.has(uaddr)) msg_list.push(msg);
    });
    return msg_list;
  }

  /** get list of UADDRs that a service name is forwarded to */
  getServiceAddress(msg: NP_Msg): NP_Address[] {
    const fn = 'getServiceAddress:';
    const key = NormalizeMessage(msg);
    if (this.proxied_svcs === undefined) return [];
    if (!this.proxied_svcs.has(key))
      this.proxied_svcs.set(key, new Set<NP_Address>());
    const addr_set = this.proxied_svcs.get(key);
    const addr_list = Array.from(addr_set);
    return addr_list;
  }

  /** register a service handler for a given service name to passed uaddr */
  registerServiceToAddress(uaddr: NP_Address, msgList: NP_Msg[]) {
    const fn = 'registerServiceToAddress:';
    if (typeof uaddr !== 'string') throw Error(`${fn} invalid uaddr`);
    msgList.forEach(msg => {
      const key = NormalizeMessage(msg);
      if (this.proxied_svcs === undefined) {
        LOG(PR, `${fn} auto-enabling proxies`);
        this.enableProxies();
      }
      if (!this.proxied_svcs.has(key))
        this.proxied_svcs.set(key, new Set<NP_Address>());
      const msg_set = this.proxied_svcs.get(key);
      msg_set.add(uaddr);
      // LOG(PR,this.uaddr, `reg remote ${key} for ${uaddr}`);
    });
  }

  /** unregister service handlers for a given service name to passed uaddr */
  deleteServicesForAddress(uaddr: NP_Address): NP_Msg[] {
    const fn = 'deleteServicesForAddress:';
    if (typeof uaddr !== 'string') throw Error(`${fn} invalid uaddr`);
    const removed = [];
    this.proxied_svcs.forEach((msg_set, key) => {
      if (msg_set.has(uaddr)) removed.push(key);
      msg_set.delete(uaddr);
    });
    return removed;
  }

  /** utility: return true if this service map has proxies */
  hasProxies(): boolean {
    if (this.proxied_svcs === undefined) return false;
    return this.proxied_svcs.size > 0;
  }

  /** utility: return array of proxied services */
  proxiesList(): NP_Msg[] {
    if (this.proxied_svcs === undefined) return [];
    return [...Object.keys(this.proxied_svcs)] as NP_Msg[];
  }

  /** utility: return true if this service map has handlers */
  hasHandlers(): boolean {
    if (this.handled_svcs === undefined) return false;
    return this.handled_svcs.size > 0;
  }
  /** utility: return array of handled service names */
  handlersList(): NP_Msg[] {
    if (this.handled_svcs === undefined) return [];
    return [...Object.keys(this.handled_svcs)] as NP_Msg[];
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ServiceMap;
export { ServiceMap };
export type { NM_Handler as THandlerFunc };
