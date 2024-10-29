/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ItemList Class - Manage a list of UR_Items

  When instancing an Itemlist without an ItemListOptions object, the ids
  will be simple integers. If you define an idPrefix, then the ids will be
  the prefix + zero-padded number. See ItemListOptions for more details.

  Its sibling class is DocFolder. Its parent manager is Dataset.
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NormItems, NormIDs } from './util-data-norm.ts';
import { Find, Query } from './util-data-search.ts';
import { DataBin } from './abstract-data-databin.ts';
import { RecordSet } from './class-data-recordset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_NewItem,
  UR_Item,
  UR_ItemList,
  DataObj,
  OpResult,
  DataBinID,
  DataBinType,
  I_DataSerialize,
  //
  SearchOptions
} from '../_types/dataset';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type ItemListOptions = {
  idPrefix?: string; // prefix to use for ids, otherwise simple ids
  startOrd?: number; // starting number (default 0)
  ordDigits?: number; // number of digits (default 3)
};

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class ItemList extends DataBin {
  // from base class
  // name: DataBinID; // name of this collection
  // _type: DataBinType; // type of this collection (.e.g ItemList);
  // _prefix: string; // when set, this is the prefix for the ids
  // _ord_digits: number; // if _prefix is set, then number of zero-padded digits
  // _ord_highest: number; // current highest ordinal
  _list: UR_ItemList; // list storage

  /// INITIALIZATION ///

  /** constuctor takes ItemListOptions. If there are no options defined,
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name: string, opt?: ItemListOptions) {
    super(col_name);
    const fn = 'ItemList:';
    this._list = [];
    this._type = this.constructor.name as DataBinType;
    let { idPrefix, startOrd, ordDigits } = opt || {};
    if (col_name === undefined) throw Error(`${fn} collection name is required`);
    if (typeof col_name !== 'string')
      throw Error(`${fn} collection name must be a string`);
    this.name = col_name;
    if (idPrefix === undefined) idPrefix = '';
    if (typeof idPrefix !== 'string')
      throw Error(`${fn} idPrefix must be a string when specified`);
    this._prefix = idPrefix || ''; // default to no prefix
    // optional
    this._ord_digits = ordDigits || 3;
    this._ord_highest = startOrd || 0;
  }

  /// SERIALIZATION METHODS ///

  /** API: create a new instance from a compatible state object */
  _setFromDataObj(data: DataObj): OpResult {
    const fn = 'ItemList._setFromDataObj:';
    let result = super._setFromDataObj(data);
    if (result.error) return { error: `${fn} ${result.error}` };
    const { items } = data;
    if (!Array.isArray(items)) return { error: `${fn} _list must be an array` };
    const [norm_list, norm_error] = NormItems(items);
    if (norm_error) return { error: `${fn} ${norm_error}` };
    this._list = norm_list;
    return { items: [...this._list] };
  }

  /** API: return a data object that represents the current state */
  _getDataObj(): OpResult {
    const data = super._getDataObj();
    if (data.error) return { error: data.error };
    return { ...data, items: [...this._list] };
  }

  /** API: serialize JSON into the appropriate data structure */
  _serializeToJSON(): string {
    const data = this._getDataObj();
    return JSON.stringify(data);
  }

  /** API: deserialize data structure into the appropriate JSON */
  _deserializeFromJSON(json: string): OpResult {
    const fn = '_deserializeFromJSON:';
    try {
      const sobj = JSON.parse(json);
      const { error } = this._setFromDataObj(sobj);
      if (error) throw Error(error);
      return { instance: this };
    } catch (err) {
      return { error: `${fn} ${err.message}` };
    }
  }

  /// LIST ID METHODS ///

  // DataBin base methods: decodeID, newID
  _maxID(): number {
    let id: number;
    // if ord_highest is set, we can just increment it since we don't reuse ids
    if (this._ord_highest > 0) {
      id = ++this._ord_highest;
    } else {
      // otherwise, we need to scan the existing list
      let maxID = 0;
      for (const li of this._list) {
        const { _prefix, ord } = this.decodeID(li._id);
        if (ord > maxID) maxID = ord;
      }
      this._ord_highest = maxID;
    }
    return this._ord_highest;
  }

  /// LIST METHODS ///

  /** given the name of a _list and an array of objects, add the objects to the
   *  _list and return the _list if successful, undefined otherwise */
  add(items: UR_NewItem[]): { added?: UR_Item[]; error?: string } {
    const fn = 'add:';
    if (!Array.isArray(items))
      return { error: `${fn} items must be an array of objects` };
    if (items.length === 0) return { error: `${fn} items array is empty` };

    // make sure that items do not have _id fields and assign new ones
    const copies = items.map(item => ({ ...item }));
    for (let item of copies) {
      if (item._id !== undefined)
        return { error: `${fn} item already has an _id ${item._id}` };
      item._id = this.newID();
    }
    // add the items to the _list
    // make sure that the _list doesn't have these items already
    for (let item of items) {
      if (this._list.find(obj => obj._id === item._id))
        return { error: `${fn} item ${item._id} already exists in ${this.name}` };
    }
    // add the items to the _list if no remote
    const added = [...(copies as UR_Item[])];
    this._list.push(...added);
    // notify subs
    this.notify('add', { added });
    return { added }; // return a copy of the _list
  }

  /** return the entire _list or the subset of ids
   *  identified in the ids array, in order of the ids array. Return a COPY
   *  of the objects, not the original objects */
  read(ids?: UR_EntID[]): { items?: UR_Item[]; error?: string } {
    const fn = 'read:';
    // if no ids are provided, return the entire _list
    if (ids === undefined) {
      return { items: [...this._list] }; // return a copy of the _list
    }
    // otherwise, return the specific objects in the order of the ids array
    // as a copy of the objects
    const items = ids.map(id => this._list.find(obj => obj._id === id));
    if (items.includes(undefined)) {
      return { error: `${fn} one or more ids not found in ${this.name}` };
    }
    return { items }; // return found items
  }

  /** Update the objects in the _list with the items provided through shallow
   *  merge. If there items that don't have an _id field or if the _id field
   *  doesn't already exist in the _list, return { error }. Return a copy of _list
   *  if successful */
  update(items: UR_Item[]): { updated?: UR_Item[]; error?: string } {
    const fn = 'update:';
    if (!Array.isArray(items) || items === undefined)
      return { error: `${fn} items must be an array` };
    if (items.length === 0) return { error: `${fn} items array is empty` };
    const [norm_items, norm_error] = NormItems(items);
    if (norm_error) return { error: `${fn} ${norm_error}` };
    // got this far, items are normalized and we can merge them.
    for (const item of norm_items) {
      const idx = this._list.findIndex(obj => obj._id === item._id);
      if (idx === -1)
        return { error: `${fn} item ${item._id} not found in ${this.name}` };
      Object.assign(this._list[idx], item);
    }
    // notify subs
    const updated = [...this._list]; // use a copy of the list
    this.notify('update', { updated });
    return { updated };
  }

  /** Overwrite the objects. Unlike ListUpdate, this will not merge but replace
   *  the items. The items must exist to be replaced */
  replace(items: UR_Item[]): {
    replaced?: UR_Item[];
    skipped?: UR_Item[];
    error?: string;
  } {
    const fn = 'replace:';
    if (!Array.isArray(items) || items === undefined)
      return { error: `${fn} items must be an array` };
    if (items.length === 0) return { error: `${fn} items array is empty` };
    const [norm_items, norm_error] = NormItems(items);
    if (norm_error) return { error: `${fn} ${norm_error}` };
    // got this far, items are normalized and we can overwrite them.
    const replaced = [];
    const skipped = [];
    for (const item of norm_items) {
      const idx = this._list.findIndex(obj => obj._id === item._id);
      if (idx === -1) {
        skipped.push({ ...item });
        continue;
      }
      const old_obj = { ...this._list[idx] };
      replaced.push(old_obj);
      this._list[idx] = item;
    }
    const error =
      skipped.length > 0
        ? `${fn} ${skipped.length} items not found in ${this.name}`
        : undefined;

    // notify subs
    this.notify('replace', { replaced, skipped, error });
    return { replaced, skipped, error }; // return results
  }

  /** Add the items to the _list. If an already exists in the _list, update it
   *  instead. Return a copy of the _list */
  write(items: UR_Item[]): {
    added?: UR_Item[];
    updated?: UR_Item[];
    error?: string;
  } {
    const fn = 'write:';
    const added = [];
    const updated = [];
    // update the items that already exist in the _list
    for (const item of items) {
      const idx = this._list.findIndex(obj => {
        if (obj._id === undefined) return false;
        return obj._id === item._id;
      });
      if (idx === -1) {
        item._id = this.newID();
        this._list.push(item);
        added.push({ ...item });
      } else {
        Object.assign(this._list[idx], item);
        updated.push({ ...this._list[idx] });
      }
    }
    // notify subs
    this.notify('write', { updated, added });
    return { added, updated }; // return a copy of the _list
  }

  /** Delete the objects in the _list with the ids provided. If there are any
   *  ids that don't exist in the _list, return { error }. Return a copy of the
   *  deleted items if successful */
  deleteIDs(ids: UR_EntID[]): { deletedIDs?: UR_Item[]; error?: string } {
    const fn = 'deleteIDs:';
    if (!Array.isArray(ids) || ids === undefined)
      return { error: `${fn} ids must be an array` };
    const del_ids = NormIDs(ids);
    // got this far, ids are normalized and we can delete them
    const itemIDs = [];
    for (const id of del_ids) {
      const idx = this._list.findIndex(obj => obj._id === id);
      if (idx === -1) return { error: `${fn} item ${id} not found in ${this.name}` };
      itemIDs.push(id);
    }
    // good to go, delete the items
    const deletedIDs = [];
    for (const id of itemIDs) {
      const idx = this._list.findIndex(obj => obj._id === id);
      const item = this._list.splice(idx, 1);
      deletedIDs.push(...item);
    }
    // notify subs
    this.notify('deleteID', { deletedIDs });
    return { deletedIDs }; // return a copy of the _list
  }

  /** Given a set of objects, delete them from the _list by looking-up their id
   *  fields. Return a copy of the _list */
  delete(items: UR_Item[]): { deleted?: UR_Item[]; error?: string } {
    const fn = 'delete:';
    if (!Array.isArray(items) || items === undefined)
      return { error: `${fn} items must be an array of objects` };
    if (items.length === 0) return { error: `${fn} items array is empty` };
    const [norm_items, norm_error] = NormItems(items);
    if (norm_error) return { error: `${fn} ${norm_error}` };
    // got this far, items are normalized and we can delete them
    const deleted = [];
    for (const item of norm_items) {
      const idx = this._list.findIndex(obj => obj._id === item._id);
      if (idx === -1)
        return { error: `${fn} item ${item._id} not found in ${this.name}` };
      const del_item = this._list.splice(idx, 1);
      deleted.push(...del_item);
    }
    // notify subs
    this.notify('delete', { deleted });
    return { deleted }; // return a copy of the _list
  }

  /** erase all the entries in the _list, but do not reset the max_ord or _prefix */
  clear() {
    this._list = [];
    this._ord_highest = 0;
    // notify subs
    this.notify('clear', {});
  }

  /** alternative getter returning unwrapped items */
  get(ids?: UR_EntID[]): UR_Item[] {
    const { items } = this.read(ids);
    return items;
  }

  /// SEARCH METHODS ///

  /** Search for matching items in the list using options, return found items */
  find(criteria?: SearchOptions): UR_Item[] {
    const items = this._list;
    return Find(items, criteria);
  }

  /** Search for matching items in the list, return Recordset */
  query(criteria?: SearchOptions): RecordSet {
    const items = this._list;
    return Query(items, criteria);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ItemList; // the class
export {
  ItemList // the class
};
export type { ItemListOptions }; // the options type
