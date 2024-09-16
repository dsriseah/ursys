/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ItemList Class - Manage a list of UR_Items

  When instancing an Itemlist without an ItemListOptions object, the ids
  will be simple integers. If you define an idPrefix, then the ids will be
  the prefix + zero-padded number. See ItemListOptions for more details.

  Its sibbling class is DocFolder. Its parent manager is DataManager.
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NORM } from '@ursys/core';
const { NormItems, NormIDs } = NORM;

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_NewItem,
  UR_Item,
  UR_ItemList
} from '../../../../_ur/_types/dataset.d.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type ItemListOptions = {
  idPrefix?: string; // prefix to use for ids, otherwise simple ids
  startOrd?: number; // starting number (default 0)
  ordDigits?: number; // number of digits (default 3)
};

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class ItemList {
  //
  name: string; // name of this collection
  _type: string; // type of this collection (.e.g ItemList);
  _list: UR_ItemList; // list storage
  _prefix: string; // when set, this is the prefix for the ids
  _ord_digits: number; // if _prefix is set, then number of zero-padded digits
  //
  _ord_highest: number; // current highest ordinal

  /** constuctor takes ItemListOptions. If there are no options defined,
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name: string, opt?: ItemListOptions) {
    const fn = 'ItemList:';
    this._list = [];
    this._type = this.constructor.name;
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

  /// LIST ID METHODS ///
  /// note: these are slow routines that could be cached for performance if listmanager is
  /// split into two classes

  /** decode an id into its _prefix and number */
  decodeID(id: UR_EntID): [string, number] {
    const fn = 'decodeID:';
    // get the part of id after _prefix
    if (!id.startsWith(this._prefix))
      throw Error(`${fn} id ${id} does not match _prefix ${this._prefix}`);
    const ord = id.slice(this._prefix.length);
    return [this._prefix, parseInt(ord)];
  }

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
      let maxID = 0;
      for (const li of this._list) {
        const [_prefix, ord] = this.decodeID(li._id);
        if (ord > maxID) maxID = ord;
      }
      this._ord_highest = maxID;
      id = (++this._ord_highest).toString();
    }
    const idstr = this._prefix ? id.padStart(this._ord_digits, '0') : id;
    return `${this._prefix}${idstr}`;
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
    // add the items to the _list
    this._list.push(...(copies as UR_Item[]));
    return { added: [...this._list] }; // return a copy of the _list
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
    const error = items.includes(undefined)
      ? `${fn} one or more ids not found in ${this.name}`
      : undefined;
    return { items, error };
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
    return { updated: [...this._list] }; // return a copy of the _list
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
    return { replaced, skipped, error }; // return a copy of the _list
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
    return { added, updated }; // return a copy of the _list
  }

  /** Delete the objects in the _list with the ids provided. If there are any
   *  ids that don't exist in the _list, return { error }. Return a copy of the
   *  deleted items if successful */
  deleteIDs(ids: UR_EntID[]): { deleted?: UR_Item[]; error?: string } {
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
    const deleted = [];
    for (const id of itemIDs) {
      const idx = this._list.findIndex(obj => obj._id === id);
      const item = this._list.splice(idx, 1);
      deleted.push(...item);
    }
    return { deleted }; // return a copy of the _list
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
    return { deleted }; // return a copy of the _list
  }

  /** erase all the entries in the _list, but do not reset the max_ord or _prefix */
  clear() {
    this._list = [];
    this._ord_highest = 0;
  }

  /** alternative getter returning unwrapped items */
  getItems(ids?: UR_EntID[]): UR_Item[] {
    const { items } = this.read(ids);
    return items;
  }

  /** getter for the _list, returning unwrapped items */
  get items() {
    const { items } = this.read();
    return items;
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ItemList; // the class
export {
  ItemList // the class
};
export type { ItemListOptions }; // the options type
