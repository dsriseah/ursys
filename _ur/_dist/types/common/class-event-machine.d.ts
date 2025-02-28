import type { DataObj } from '../_types/ursys.d.ts';
import type { DataEncoding } from './declare-encodings.d.ts';
import type { SNA_EvtName, SNA_EvtHandler } from '../_types/sna.d.ts';
type EVM_Descriptor = {
    name: SNA_EvtName;
    description?: string;
    [prop: DataEncoding]: string;
};
declare class EventMachine {
    emClass: string;
    listeners: Map<SNA_EvtName, Set<SNA_EvtHandler>>;
    eventNames: Map<SNA_EvtName, EVM_Descriptor>;
    /** require a unique class name for the event machine */
    constructor(emClass: string);
    /** validate event class name, which must be lower_snake_case */
    _okClassName(eventClass: string): boolean;
    /** validate event names  */
    _okEventName(eventName: SNA_EvtName): boolean;
    /** define event descriptions for the event machine */
    defineEvent(eventName: SNA_EvtName, eventDesc: EVM_Descriptor): void;
    /** Add a listener for an event. You can subscribe '*' wildcard event handlers */
    on(eventName: SNA_EvtName, listener: SNA_EvtHandler): void;
    /** Remove a listener for an event. Remove '*' wildcard events here too */
    off(eventName: SNA_EvtName, listener: SNA_EvtHandler): void;
    /** Add a one-time listener for an event. Wildcard '*' listeners are disallowed. */
    once(eventName: SNA_EvtName, listener: SNA_EvtHandler): void;
    /** Emit an event with optional arguments. Wildcard event listeners are registered to
     *  '*' and fired on every event */
    emit(eventName: SNA_EvtName, param?: DataObj): void;
}
export default EventMachine;
export { EventMachine };
export type { SNA_EvtName, SNA_EvtHandler };
