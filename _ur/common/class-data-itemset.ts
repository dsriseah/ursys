/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ItemSet is the base class for all collection classes.
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { RecordSet } from './class-data-recordset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_NewItem,
  UR_Item,
  UR_BinRefID,
  UR_BinType,
  //
  SearchOptions,
  OpReturn
} from '../_types/dataset';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** SyncOp is the operations that can be performed on a dataset via
 *  the SYNC:SRV_DATA protocol. */
type SyncOp =
  | 'DATA_INIT' // SYNC:SRV_DATA_INIT clears data
  | 'DATA_GET' // SYNC:SRV_DATA_GET ( ids? )
  | 'DATA_ADD' // SYNC:SRV_DATA_ADD ( items )
  | 'DATA_UPDATE' // SYNC:SRV_DATA_UPDATE ( items )
  | 'DATA_WRITE' // SYNC:SRV_DATA_WRITE ( items )
  | 'DATA_DELETE' // SYNC:SRV_DATA_DELETE ( ids )
  | 'DATE_REPLACE'; // SYNC:SRV_DATA_REPLACE ( items )
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** SyncData is sent from a dataset source to a client that implements
 *  the SYN:CLI_SYNC protocol. */
type SyncData = {
  cName: UR_BinRefID;
  accToken: string;
  items?: UR_Item[];
  ids?: UR_EntID[];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** implement functions needed to write data to a remote datastore
 *  . writeData is the async method that writes data to remote datastore
 *  . handleError is the method that handles the return object from writeData
 */
type RemoteStoreAdapter = {
  writeData: (op: SyncOp, data: SyncData) => Promise<OpReturn>;
  handleError: (opResult: OpReturn) => OpReturn;
};

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
abstract class ItemSet {
  //
  name: UR_BinRefID; // name of this collection
  _type: UR_BinType; // type of this collection (.e.g ItemList);
  _prefix: string; // when set, this is the prefix for the ids
  _ord_digits: number; // if _prefix is set, then number of zero-padded digits
  _ord_highest: number; // current highest ordinal
  _actions: { op: SyncOp; data: SyncData }[]; // list of actions to be performed on the server
  _remote: RemoteStoreAdapter; // adapter to write data to the server

  /// INITIALIZE ///

  /** base constuctor. call with super(). by default, the _prefix is empty and
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name: string) {
    this.name = col_name;
    this._prefix = '';
    this._ord_digits = 3;
    this._ord_highest = 0;
    this._actions = [];
  }

  /// SERIALIZATION METHODS ///

  /** API: serialize JSON into the appropriate data structure */
  abstract serializeToJSON(): string;

  /** API: deserialize data structure into the appropriate JSON */
  abstract deserializeFromJSON(json: string): void;

  /// ADAPTER METHODS ///

  /** API: define the remote data adapter */
  setRemoteDataAdapter(adapter: RemoteStoreAdapter): void {
    const fn = 'setRemoteDataAdapter:';
    // check adapter integrity
    if (!adapter) throw Error(`${fn} adapter must be type RemoteStoreAdapter`);
    const { writeData, handleError } = adapter;
    if (typeof writeData !== 'function')
      throw Error(`${fn} adapter must have writeData method`);
    if (typeof handleError !== 'function')
      throw Error(`${fn} adapter must have handleError method`);
    this._remote = adapter;
  }

  /** API: queue an operation to persist data to the server, if this itemset
   *  has a server-side data store. */
  queueRemoteDataOp(op: SyncOp, data: SyncData): void {
    const fn = 'queueRemoteDataOp:';
    if (!this._remote) {
      console.error(`${fn} no remote data adapter set`);
      return;
    }
    this._actions.push({ op, data });
    this.processOpQueue();
  }

  /** SUPPORT: process the operation queue until it is clear */
  private async processOpQueue(): Promise<void> {
    const fn = 'processOpQueue:';
    if (!this._remote) {
      console.error(`${fn} no remote data adapter set`);
      return;
    }
    if (this._actions.length === 0) return;
    // process all actions in the queue
    while (this._actions.length > 0) {
      const { op, data } = this._actions.shift();
      // wait for the result of the writeData operation
      const result = await this._remote.writeData(op, data);
      // if there is an error, use implementation-specific error handling
      // to determine if the error is fatal or not. it's up to the
      // handleError method return error if it couldn't handle it.
      if (result.error) {
        const errHandled = this._remote.handleError(result);
        if (!errHandled.error) return;
        throw Error(`${fn} fatal writeData error: ${errHandled.error}`);
      }
    }
  }

  /// ID METHODS ///

  /** decode an id into its _prefix and number */
  decodeID(id: UR_EntID): [string, number] {
    const fn = 'decodeID:';
    // get the part of id after _prefix
    if (!id.startsWith(this._prefix))
      throw Error(`${fn} id ${id} does not match _prefix ${this._prefix}`);
    const ord = id.slice(this._prefix.length);
    return [this._prefix, parseInt(ord)];
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
  abstract getItems(ids?: UR_EntID[]): any[];

  /// SEARCH METHODS ///

  /** Search for matching items in the list using options, return found items */
  abstract find(items: UR_Item[], criteria?: SearchOptions): UR_Item[];

  /** Search for matching items in the list, return Recordset */
  abstract query(items: UR_Item[], criteria?: SearchOptions): RecordSet;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ItemSet; // the class
export {
  ItemSet // the class
};
export type { SyncOp, SyncData };
