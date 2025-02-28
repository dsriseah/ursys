import { DataBin } from './abstract-data-databin.ts';
import { RecordSet } from './class-data-recordset.ts';
import type { UR_EntID, UR_NewItem, UR_Item, UR_ItemList, DataObj, OpResult, IDS_Serialize, SearchOptions } from '../_types/dataset.ts';
type ItemListOptions = {
    idPrefix?: string;
    startOrd?: number;
    ordDigits?: number;
};
declare class ItemList extends DataBin implements IDS_Serialize {
    _list: UR_ItemList;
    /** constuctor takes ItemListOptions. If there are no options defined,
     *  the ids created will be simple integers. If you define an idPrefix,
     *  then the ids will be the prefix + zero-padded number */
    constructor(col_name: string, opt?: ItemListOptions);
    /** implement search for max_id in the current list */
    _findMaxID(): number;
    /** API: create a new instance from a compatible state object */
    _setFromDataObj(data: DataObj): {
        error: string;
        items?: undefined;
    } | {
        items: UR_Item[];
        error?: undefined;
    };
    /** API: return a data object that represents the current state */
    _getDataObj(): {
        error: string;
    } | {
        items: UR_Item[];
        error?: string;
        errorCode?: string;
        errorInfo?: string;
        status?: string;
        statusCode?: number;
        statusInfo?: string;
    };
    /** API: serialize JSON into the appropriate data structure */
    _serializeToJSON(): string;
    /** API: deserialize data structure into the appropriate JSON */
    _deserializeFromJSON(json: string): OpResult;
    /** given the name of a _list and an array of objects, add the objects to the
     *  _list and return the _list if successful, undefined otherwise */
    add(items: UR_NewItem[]): {
        added?: UR_Item[];
        error?: string;
    };
    /** return the entire _list or the subset of ids
     *  identified in the ids array, in order of the ids array. Return a COPY
     *  of the objects, not the original objects */
    read(ids?: UR_EntID[]): {
        items?: UR_Item[];
        error?: string;
    };
    /** Update the objects in the _list with the items provided through shallow
     *  merge. If there items that don't have an _id field or if the _id field
     *  doesn't already exist in the _list, return { error }. Return a copy of _list
     *  if successful */
    update(items: UR_Item[]): {
        updated?: UR_Item[];
        error?: string;
    };
    /** Overwrite the objects. Unlike ListUpdate, this will not merge but replace
     *  the items. The items must exist to be replaced */
    replace(items: UR_Item[]): {
        replaced?: UR_Item[];
        skipped?: UR_Item[];
        error?: string;
    };
    /** Add the items to the _list. If an already exists in the _list, update it
     *  instead. Return a copy of the _list */
    write(items: UR_Item[]): {
        added?: UR_Item[];
        updated?: UR_Item[];
        error?: string;
    };
    /** Delete the objects in the _list with the ids provided. If there are any
     *  ids that don't exist in the _list, return { error }. Return a copy of the
     *  deleted items if successful */
    deleteIDs(ids: UR_EntID[]): {
        deletedIDs?: UR_Item[];
        error?: string;
    };
    /** Given a set of objects, delete them from the _list by looking-up their id
     *  fields. Return a copy of the _list */
    delete(items: UR_Item[]): {
        deleted?: UR_Item[];
        error?: string;
    };
    /** erase all the entries in the _list, but do not reset the max_ord or _prefix */
    clear(): void;
    /** alternative getter returning unwrapped items */
    get(ids?: UR_EntID[]): UR_Item[];
    /** Search for matching items in the list using options, return found items */
    find(criteria?: SearchOptions): UR_Item[];
    /** Search for matching items in the list, return Recordset */
    query(criteria?: SearchOptions): RecordSet;
}
export default ItemList;
export { ItemList };
export type { ItemListOptions };
