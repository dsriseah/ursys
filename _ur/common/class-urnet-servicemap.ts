/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ServiceMap manages a list of named services and their associated
  handlers and addresses. 
  It's used as a support class for NetEndpoint. A service name is
  the same as an URNET message of form `CHAN:MESSAGE` with payload of
  NP_Data.

  Additionally, it enforces the categoziation of services into groups, and
  knows how to recognize and decode service names.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR } from '@ursys/core';
import { IsNetMessage, NormalizeMessage } from './types-urnet.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { NP_Address, NP_Msg, NP_Data } from './types-urnet.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HandlerFunc = (data: NP_Data) => NP_Data | void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HandlerSet = Set<HandlerFunc>; // set(handler1, handler2, ...)
type HandlerMap = Map<NP_Msg, HandlerSet>; // msg->handler functions
type AddressSet = Set<NP_Address>; // ['UA001', 'UA002', ...]
type AddressMap = Map<NP_Msg, AddressSet>; // msg->set of uaddr

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const PR =
  typeof process !== 'undefined'
    ? 'ServiceMap'.padEnd(13) // nodejs
    : 'ServiceMap'.padEnd(11); // browser
const LOG = console.log.bind(console);

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class ServiceMap {
  service_addr: string; // unique identifier for this map
  handled_svcs: HandlerMap; // msg->handlers[]
  proxied_svcs: AddressMap; // msg->uaddr[] (if set, then this is a proxy)

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

  /// HANDLED MESSAGES are LOCAL FUNCTIONS ///

  /** API: declare a service handler for a given service name */
  addServiceHandler(msg: NP_Msg, handler: HandlerFunc) {
    const fn = 'addServiceHandler:';
    // LOG(PR,this.uaddr, `reg handler '${msg}'`);
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    if (!this.handled_svcs.has(key))
      this.handled_svcs.set(key, new Set<HandlerFunc>());
    const handler_set = this.handled_svcs.get(key);
    handler_set.add(handler);
  }

  /** API: remove a previously declared service handler for a given service name */
  deleteServiceHandler(msg: NP_Msg, handler: HandlerFunc) {
    const fn = 'deleteServiceHandler:';
    if (typeof handler !== 'function') throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    const handler_set = this.handled_svcs.get(key);
    if (!handler_set) throw Error(`${fn} unexpected empty set '${key}'`);
    handler_set.delete(handler);
  }

  /** return list of local handlers for given service name */
  getServiceHandlers(msg: NP_Msg): HandlerFunc[] {
    const fn = 'getServiceHandlers:';
    if (this.handled_svcs === undefined) return [];
    const key = NormalizeMessage(msg);
    if (!this.handled_svcs.has(key))
      this.handled_svcs.set(key, new Set<HandlerFunc>());
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

  /** return only net services */
  getNetServiceNames(): NP_Msg[] {
    const list = [];
    this.handled_svcs.forEach((handler_set, key) => {
      if (IsNetMessage(key)) list.push(key);
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
  proxyServiceToAddress(uaddr: NP_Address, msgList: NP_Msg[]) {
    const fn = 'proxyServiceToAddress:';
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
  _deleteProxiesForAddress(uaddr: NP_Address): NP_Msg[] {
    const fn = '_deleteProxiesForAddress:';
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
    return [...Object.keys(this.proxied_svcs)];
  }

  /** utility: return true if this service map has handlers */
  hasHandlers(): boolean {
    if (this.handled_svcs === undefined) return false;
    return this.handled_svcs.size > 0;
  }
  /** utility: return array of handled service names */
  handlersList(): NP_Msg[] {
    if (this.handled_svcs === undefined) return [];
    return [...Object.keys(this.handled_svcs)];
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ServiceMap;
export { ServiceMap };
export type { HandlerFunc as THandlerFunc };
