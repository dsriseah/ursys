/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  EventMachine is the URSYS version of EventEmitter, which implements these
  functions for compatibility. It is a class that manages a set of named
  events for pub/sub communication between modules. 

  .on(event, listener) - add a listener for an event
  .once(event, listener) - add a one-time listener for an event
  .off(event, listener) - remove a listener for an event
  .emit(event, ...args) - emit an event with optional arguments

  For comparison, these are all the current types of named invocations that
  are part of URSYS

  'NET:MESSAGE_NAME' - used for URNET messages
  'URSYS/PHASE_NAME:eventName' - used for phase machine hooks
  'eventName' - used by event machine events

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPES & INTERFACES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj } from '../_types/ursys.d.ts';
import type { DataEncoding } from './declare-encodings.ts';
import type { SNA_EvtName, SNA_EvtHandler } from '../_types/sna.d.ts';

type EVM_Class = string; // lower_snake_case
type EVM_Descriptor = {
  name: SNA_EvtName; // name of the event
  description?: string; // description of the event
  [prop: DataEncoding]: string; // description of each prop
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
const WARN = console.warn.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const m_machines: Map<EVM_Class, EventMachine> = new Map();

/// PRIVATE HELPERS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// URSYS PhaseMachine CLASS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class EventMachine {
  //
  emClass: EVM_Class;
  listeners: Map<SNA_EvtName, Set<SNA_EvtHandler>>;
  eventNames: Map<SNA_EvtName, EVM_Descriptor>;

  /// INITIALIZATION ///

  /** require a unique class name for the event machine */
  constructor(emClass: EVM_Class) {
    if (!this._okClass(emClass)) throw Error(`bad emClass ${emClass}`);
    this.emClass = emClass;
    this.listeners = new Map();
    m_machines.set(emClass, this);
  }

  /** validate event class name, which must be lower_snake_case */
  _okClass(eventClass: EVM_Class) {
    let validClass = typeof eventClass === 'string' && eventClass.length > 0;
    validClass = validClass && eventClass.indexOf('_') !== -1;
    validClass = validClass && eventClass === eventClass.toLowerCase();
    return validClass;
  }

  /// EVENT NAME REGISTRATION ///

  /** validate event names  */
  _okEvent(eventName: SNA_EvtName) {
    let validType = typeof eventName === 'string' && eventName.length > 0;
    validType = validType && eventName[0] === eventName[0].toLowerCase();
    if (this.eventNames !== undefined)
      validType = validType && this.eventNames.has(eventName);
    return validType;
  }

  /** define event descriptions for the event machine */
  defineEvent(eventName: SNA_EvtName, eventDesc: EVM_Descriptor) {
    if (!this._okEvent(eventName)) throw Error(`bad event name ${eventName}`);
    if (this.eventNames.has(eventName)) throw Error('Event name already defined');
    if (this.eventNames === undefined) this.eventNames = new Map();
    this.eventNames.set(eventName, eventDesc);
  }

  /// EVENT MACHINE METHODS ///

  /** Add a listener for an event */
  on(eventName: SNA_EvtName, listener: SNA_EvtHandler) {
    if (!this._okEvent(eventName)) throw Error(`bad event name ${eventName}`);
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName).add(listener);
  }

  /** Remove a listener for an event */
  off(eventName: SNA_EvtName, listener: SNA_EvtHandler) {
    if (!this._okEvent(eventName)) throw Error(`bad event name ${eventName}`);
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).delete(listener);
    }
  }

  /** Add a one-time listener for an event */
  once(eventName: SNA_EvtName, listener: SNA_EvtHandler) {
    if (!this._okEvent(eventName)) throw Error(`bad event name ${eventName}`);
    const onceListener = (eventName: SNA_EvtName, param: DataObj) => {
      listener(eventName, param);
      this.off(eventName, onceListener);
    };
    this.on(eventName, onceListener);
  }

  /** Emit an event with optional arguments */
  emit(eventName: SNA_EvtName, param: DataObj) {
    if (!this._okEvent(eventName)) throw Error(`bad event name ${eventName}`);
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach(listener => {
        listener(eventName, param);
      });
    }
  }
}

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// accessible from ts files via import EM from 'class-event-machine.ts'
export default EventMachine;
/// accessible from mts files via import EM from './class-event-machine.ts'
export { EventMachine };
export type { SNA_EvtName, SNA_EvtHandler };
