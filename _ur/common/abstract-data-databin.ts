/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  DataBin is the abstract base class for all collection classes.

  abstract class DataBin
    add, read, update, replace, write, deleteIDs, delete, clear, get
  find, query
    decodeID, _maxID, newID
    on, off, notifyChange
    _serializeToJSON, _deserializeFromJSON
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { RecordSet } from './class-data-recordset.ts';
import { EventMachine } from './class-event-machine.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_NewItem,
  UR_Item,
  //
  DataBinID,
  DataBinType,
  //
  SearchOptions,
  DataObj,
  OpResult
} from '../_types/dataset';
import type { SNA_EvtName, SNA_EvtHandler } from '../_types/sna.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { IDS_DataBin, IDS_Serialize } from '../_types/dataset';
abstract class DataBin implements IDS_DataBin, IDS_Serialize {
  //
  name: DataBinID; // name of this collection
  _type: DataBinType; // type of this collection (.e.g ItemList);
  _prefix: string; // when set, this is the prefix for the ids
  _ord_digits: number; // if _prefix is set, then number of zero-padded digits
  _ord_highest: number; // current highest ordinal
  _notifier: EventMachine; // event machine for listeners

  /// INITIALIZE ///

  /** base constuctor. call with super(). by default, the _prefix is empty and
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name: string) {
    this.name = col_name;
    this._init();
  }

  _init(): void {
    this._prefix = '';
    this._ord_digits = 3;
    this._ord_highest = 0;
  }

  /// SERIALIZATION METHODS ///

  /** API: create a new instance from a compatible state object */
  _setFromDataObj(data: DataObj): OpResult {
    let { name, _prefix, _ord_digits, _ord_highest } = data;
    // assign defaults if undefined
    if (_prefix === undefined) _prefix = '';
    if (_ord_digits === undefined) _ord_digits = 3;
    if (_ord_highest === undefined) _ord_highest = 0; // todo: scan for highest
    // required name
    if (name === undefined) return { error: 'name missing' };
    if (typeof name !== 'string') return { error: 'name must be a string' };
    // type checks
    if (typeof _prefix !== 'string') return { error: '_prefix must be a string' };
    if (typeof _ord_digits !== 'number')
      return { error: '_ord_digits must be a number' };
    if (typeof _ord_highest !== 'number')
      return { error: '_ord_highest must be a number' };
    // assign
    this.name = name;
    this._prefix = _prefix;
    this._ord_digits = _ord_digits;
    this._ord_highest = _ord_highest;
    return { name, _prefix, _ord_digits, _ord_highest };
  }

  /** API: return a data object that represents the current state */
  _getDataObj(): OpResult {
    return {
      name: this.name,
      _prefix: this._prefix,
      _ord_digits: this._ord_digits,
      _ord_highest: this._ord_highest
    };
  }

  /** API: serialize JSON into the appropriate data structure */
  abstract _serializeToJSON(): string;

  /** API: deserialize data structure into the appropriate JSON */
  abstract _deserializeFromJSON(json: string): OpResult;

  /// ID METHODS ///

  /** decode an id into its _prefix and number */
  decodeID(id: UR_EntID): OpResult {
    const fn = 'decodeID:';
    // get the part of id after _prefix
    if (!id.startsWith(this._prefix))
      return { error: `${fn} id ${id} does not match _prefix ${this._prefix}` };
    const ord = id.slice(this._prefix.length);
    return { _prefix: this._prefix, _ord: parseInt(ord) };
  }

  /** abstract method to return the highest id in the _list, which may
   *  mean using decodeID() to find the highest ordinal number */
  abstract _maxID(): number;

  /** find the highest id in the _list. EntityIDs are _prefix string + padded number, so
   *  we can just sort the _list and return the last one */
  newID(): UR_EntID {
    const fn = 'newID:';
    let id;
    // if ord_highest is set, we can just increment it since we don't reuse ids
    if (this._ord_highest > 0) {
      id = (++this._ord_highest).toString();
    } else {
      // otherwise, we need to scan the existing list
      let maxID = this._maxID();
      this._ord_highest = maxID;
      id = (++this._ord_highest).toString();
    }
    const idstr = this._prefix ? id.padStart(this._ord_digits, '0') : id;
    return `${this._prefix}${idstr}`;
  }

  /// COLLECTION METHODS ///

  /** given the name of a _list and an array of objects, add the objects to the
   *  _list and return the _list if successful, undefined otherwise */
  abstract add(items: UR_NewItem[]): { added?: UR_Item[]; error?: string };

  /** return the entire _list or the subset of ids
   *  identified in the ids array, in order of the ids array. Return a COPY
   *  of the objects, not the original objects */
  abstract read(ids?: UR_EntID[]): { items?: UR_Item[]; error?: string };

  /** Update the objects in the _list with the items provided through shallow
   *  merge. If there items that don't have an _id field or if the _id field
   *  doesn't already exist in the _list, return { error }. Return a copy of _list
   *  if successful */
  abstract update(items: UR_Item[]): { updated?: UR_Item[]; error?: string };

  /** Overwrite the objects. Unlike ListUpdate, this will not merge but replace
   *  the items. The items must exist to be replaced */
  abstract replace(items: UR_Item[]): {
    replaced?: UR_Item[];
    skipped?: UR_Item[];
    error?: string;
  };

  /** Add the items to the _list. If an already exists in the _list, update it
   *  instead. Return a copy of the _list */
  abstract write(items: UR_Item[]): {
    added?: UR_Item[];
    updated?: UR_Item[];
    error?: string;
  };

  /** Delete the objects in the _list with the ids provided. If there are any
   *  ids that don't exist in the _list, return { error }. Return a copy of the
   *  deleted items if successful */
  abstract deleteIDs(ids: UR_EntID[]): { deleted?: UR_Item[]; error?: string };

  /** Given a set of objects, delete them from the _list by looking-up their id
   *  fields. Return a copy of the _list */
  abstract delete(items: UR_Item[]): { deleted?: UR_Item[]; error?: string };

  /** erase all the entries in the _list, but do not reset the max_ord or _prefix */
  abstract clear(): void;

  /** alternative getter returning unwrapped items */
  abstract get(ids?: UR_EntID[]): any[];

  /// NOTIFIER METHODS ///

  /** add a listener to the event machine */
  on(event: SNA_EvtName, lis: SNA_EvtHandler): OpResult {
    if (!this._notifier) this._notifier = new EventMachine(`databin_${this.name}`);
    this._notifier.on(event, lis);
    return {};
  }

  /** remove a listener from the event machine */
  off(event: SNA_EvtName, lis: SNA_EvtHandler): OpResult {
    if (this._notifier) this._notifier.off(event, lis);
    return { error: `off: no notifier for listener ${lis.name}` };
  }

  /** notify listeners of 'change' event */
  notify(evt: SNA_EvtName, data: DataObj): OpResult {
    if (typeof evt !== 'string') return { error: 'notify: evt must be a string' };
    if (this._notifier) this._notifier.emit(evt, data);
    return {};
  }

  /// SEARCH METHODS ///

  /** Search for matching items in the list using options, return found items.
   *  The implementor should provide the items from the instance */
  abstract find(criteria?: SearchOptions): UR_Item[];

  /** Search for matching items in the list, return Recordset,
   *  The implementor should provide the items from the instance */
  abstract query(criteria?: SearchOptions): RecordSet;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DataBin; // the class
export {
  DataBin // the class
};
