import type { NP_Address, NP_Msg, NM_Handler } from '../_types/urnet.d.ts';
type HandlerSet = Set<NM_Handler>;
type HandlerMap = Map<NP_Msg, HandlerSet>;
type AddressSet = Set<NP_Address>;
type AddressMap = Map<NP_Msg, AddressSet>;
declare class ServiceMap {
    service_addr: NP_Address;
    handled_svcs: HandlerMap;
    proxied_svcs: AddressMap;
    /** constructor: identifier is generally the same as the endpoint UADDR
     *  when used by NetEndpoint e.g. SRV01, SRV02, etc.
     */
    constructor(addr: NP_Address);
    /** call to make this ServiceMap handle proxies */
    enableProxies(): void;
    /** API: add a protocol handler for a given service name, which
     *  are reserved for special services */
    addProtocolHandler(pmsg: NP_Msg, handler: NM_Handler): void;
    /** API: declare a service handler for a given service name */
    addServiceHandler(msg: NP_Msg, handler: NM_Handler): void;
    /** API: remove a previously declared service handler for a given service name */
    deleteServiceHandler(msg: NP_Msg, handler: NM_Handler): void;
    /** return list of local handlers for given service name */
    getServiceHandlers(msg: NP_Msg): NM_Handler[];
    /** return handler list for this endpoint */
    getServiceNames(): NP_Msg[];
    /** get list of services allocated to a uaddr */
    getServicesForAddress(uaddr: NP_Address): NP_Msg[];
    /** get list of UADDRs that a service name is forwarded to */
    getServiceAddress(msg: NP_Msg): NP_Address[];
    /** register a service handler for a given service name to passed uaddr */
    registerServiceToAddress(uaddr: NP_Address, msgList: NP_Msg[]): void;
    /** unregister service handlers for a given service name to passed uaddr */
    deleteServicesForAddress(uaddr: NP_Address): NP_Msg[];
    /** utility: return true if this service map has proxies */
    hasProxies(): boolean;
    /** utility: return array of proxied services */
    proxiesList(): NP_Msg[];
    /** utility: return true if this service map has handlers */
    hasHandlers(): boolean;
    /** utility: return array of handled service names */
    handlersList(): NP_Msg[];
}
export default ServiceMap;
export { ServiceMap };
export type { NM_Handler as THandlerFunc };
