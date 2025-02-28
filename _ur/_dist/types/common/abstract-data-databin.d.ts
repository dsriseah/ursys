import { RecordSet } from './class-data-recordset.ts';
import { EventMachine } from './class-event-machine.ts';
import type { UR_EntID, UR_NewItem, UR_Item, DataBinID, DataBinType, SearchOptions, DataObj, OpResult } from '../_types/dataset.ts';
import type { SNA_EvtName, SNA_EvtHandler } from '../_types/sna.d.ts';
import type { IDS_DataBin, IDS_Serialize } from '../_types/dataset.ts';
declare abstract class DataBin implements IDS_DataBin, IDS_Serialize {
    name: DataBinID;
    _type: DataBinType;
    _prefix: string;
    _ord_digits: number;
    _ord_highest: number;
    _notifier: EventMachine;
    /** base constuctor. call with super(). by default, the _prefix is empty and
     *  the ids created will be simple integers. If you define an idPrefix,
     *  then the ids will be the prefix + zero-padded number */
    constructor(col_name: string);
    _init(): void;
    /** API: create a new instance from a compatible state object. note that
     *  OVERRIDING derived classes must handle the _ord_highest calculation */
    _setFromDataObj(data: DataObj): OpResult;
    /** API: return a data object that represents the current state */
    _getDataObj(): OpResult;
    /** API: serialize JSON into the appropriate data structure */
    abstract _serializeToJSON(): string;
    /** API: deserialize data structure into the appropriate JSON */
    abstract _deserializeFromJSON(json: string): OpResult;
    /** abstract method to return the highest id in the _list, since the
     *  _id may be stored differently depending on the bin type */
    abstract _findMaxID(): number;
    /** find the highest id in the _list. EntityIDs are _prefix string + padded number, so
     *  we can just sort the _list and return the last one */
    newID(): UR_EntID;
    /** decode an id into its _prefix and number */
    decodeID(id: UR_EntID): OpResult;
    /** given the name of a _list and an array of objects, add the objects to the
     *  _list and return the _list if successful, undefined otherwise */
    abstract add(items: UR_NewItem[]): {
        added?: UR_Item[];
        error?: string;
    };
    /** return the entire _list or the subset of ids
     *  identified in the ids array, in order of the ids array. Return a COPY
     *  of the objects, not the original objects */
    abstract read(ids?: UR_EntID[]): {
        items?: UR_Item[];
        error?: string;
    };
    /** Update the objects in the _list with the items provided through shallow
     *  merge. If there items that don't have an _id field or if the _id field
     *  doesn't already exist in the _list, return { error }. Return a copy of _list
     *  if successful */
    abstract update(items: UR_Item[]): {
        updated?: UR_Item[];
        error?: string;
    };
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
    abstract deleteIDs(ids: UR_EntID[]): {
        deleted?: UR_Item[];
        error?: string;
    };
    /** Given a set of objects, delete them from the _list by looking-up their id
     *  fields. Return a copy of the _list */
    abstract delete(items: UR_Item[]): {
        deleted?: UR_Item[];
        error?: string;
    };
    /** erase all the entries in the _list, but do not reset the max_ord or _prefix */
    abstract clear(): void;
    /** alternative getter returning unwrapped items */
    abstract get(ids?: UR_EntID[]): any[];
    /** add a listener to the event machine */
    on(event: SNA_EvtName, lis: SNA_EvtHandler): OpResult;
    /** remove a listener from the event machine */
    off(event: SNA_EvtName, lis: SNA_EvtHandler): OpResult;
    /** notify listeners of 'change' event */
    notify(evt: SNA_EvtName, data: DataObj): OpResult;
    /** Search for matching items in the list using options, return found items.
     *  The implementor should provide the items from the instance */
    abstract find(criteria?: SearchOptions): UR_Item[];
    /** Search for matching items in the list, return Recordset,
     *  The implementor should provide the items from the instance */
    abstract query(criteria?: SearchOptions): RecordSet;
}
export default DataBin;
export { DataBin };
