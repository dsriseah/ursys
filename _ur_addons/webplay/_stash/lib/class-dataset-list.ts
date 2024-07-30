/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset List Manager Class

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NORM } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_EntID_Obj,
  UR_BagRef,
  UR_Item,
  UR_ItemList
} from '~ur/types/ursys.d.ts';
type ListsCollection = { [ref_name: UR_BagRef]: UR_ItemList };
const { NormalizeObjs, NormalizeIDs } = NORM;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let LISTS: ListsCollection;

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class ItemListMgr {
  constructor() {
    if (LISTS === undefined) LISTS = {};
  }
  /** Given the name of a list, create a new list and return the list
   *  instance */
  createListInstance(listName: string) {
    const fn = 'createListInstance:';
    if (LISTS[listName] !== undefined)
      throw Error(`${fn} list '${listName}' already exists`);
    const listInstance = [];
    LISTS[listName] = listInstance;
    return listInstance;
  }

  /** Given the name of a list, clear the list of all items and retain the
   *  same list instance */
  clearListInstance(listName: string) {
    const fn = 'clearListInstance:';
    const listInstance = LISTS[listName];
    if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
    listInstance.length = 0;
    return listInstance;
  }

  /** Given the name of a list, return the entire list */
  getListInstance(listName: string) {
    return LISTS[listName];
  }

  /** given the name of a list and an array of objects, add the objects to the
   *  list and return the list if successful, undefined otherwise */
  listAdd(listName: string, items: UR_Item[]): UR_Item[] {
    const fn = 'listAdd:';
    const listInstance = LISTS[listName];
    if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
    // normalize the objects and add them to the list
    const [norm_objs, norm_error] = NormalizeObjs(items);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    listInstance.push(...norm_objs);
    return [...listInstance]; // return a copy of the list
  }

  /** Given the name of a list, return the entire list or the subset of ids
   *  identified in the ids array, in order of the ids array. Return a COPY
   *  of the objects, not the original objects */
  listRead(listName: string, ids?: UR_EntID[]): UR_Item[] {
    const fn = 'listRead:';
    const listInstance = LISTS[listName];
    if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
    // if no ids are provided, return the entire list
    if (ids === undefined) {
      return [...listInstance]; // return a copy of the list
    }
    // otherwise, return the specific objects in the order of the ids array
    // as a copy of the objects
    return ids.map(id => listInstance.find(obj => obj._id === id));
  }

  /** Given the name of a list, update the objects in the list with the items
   *  provided through shallow merge. If there items that don't have an _id field
   *  or if the _id field doesn't already exist in the list, throw an Error.
   *  Return a copy of list if successful */
  listUpdate(listName: string, items: UR_Item[]) {
    const fn = 'listUpdate:';
    const listInstance = LISTS[listName];
    if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
    if (!Array.isArray(items) || items === undefined)
      throw Error(`${fn} items must be an array`);
    if (items.length === 0) throw Error(`${fn} items array is empty`);
    const [norm_items, norm_error] = NormalizeObjs(items);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    // got this far, items are normalized and we can merge them.
    for (const item of norm_items) {
      const idx = listInstance.findIndex(obj => obj._id === item._id);
      if (idx === -1) throw Error(`${fn} item ${item._id} not found in list`);
      Object.assign(listInstance[idx], item);
    }
    return [...listInstance]; // return a copy of the list
  }

  /** Given the name of a list, overwrite the objects. Unlike ListUpdate, this
   *  will not merge but replace the items. The items must exist to be
   *  replaced */
  listReplace(listName: string, items: UR_Item[]) {
    const fn = 'listReplace:';
    const listInstance = LISTS[listName];
    if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
    if (!Array.isArray(items) || items === undefined)
      throw Error(`${fn} items must be an array`);
    if (items.length === 0) throw Error(`${fn} items array is empty`);
    const [norm_items, norm_error] = NormalizeObjs(items);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    // got this far, items are normalized and we can overwrite them.
    const replaced = [];
    for (const item of norm_items) {
      const idx = listInstance.findIndex(obj => obj._id === item._id);
      if (idx === -1) throw Error(`${fn} item ${item._id} not found in list`);
      const old_obj = { ...listInstance[idx] };
      replaced.push(old_obj);
      listInstance[idx] = item;
    }
    return replaced; // return a copy of the list
  }

  /** Given the name of a list, add the items to the list. If an already
   *  exists in the list, update it instead. Return a copy of the list */
  listUpdateOrAdd(listName: string, items: UR_Item[]) {
    const fn = 'listUpdateOrAdd:';
    const listInstance = LISTS[listName];
    // update the items that already exist in the list
    for (const item of items) {
      const idx = listInstance.findIndex(obj => obj._id === item._id);
      if (idx === -1) {
        listInstance.push(item);
      } else {
        Object.assign(listInstance[idx], item);
      }
    }
    return [...listInstance]; // return a copy of the list
  }

  /** Given the name of a list, delete the objects in the list with the ids
   *  provided. If there are any ids that don't exist in the list, throw an
   *  Error. Return a copy of the deleted items if successful */
  listDelete(listName: string, ids: UR_EntID[]) {
    const fn = 'listDelete:';
    const list = LISTS[listName];
    if (list === undefined) throw Error(`${fn} list '${listName}' not found`);
    if (!Array.isArray(ids) || ids === undefined)
      throw Error(`${fn} ids must be an array of _id strings`);
    const [del_ids, del_error] = NormalizeIDs(ids);
    if (del_error) throw Error(`${fn} ${del_error}`);
    // got this far, ids are normalized and we can delete them
    const deleted = [];
    for (const id of del_ids) {
      const idx = list.findIndex(obj => obj._id === id);
      if (idx === -1) throw Error(`${fn} item ${id} not found in list`);
      deleted.push(list[idx]);
      list.splice(idx, 1);
    }
    return deleted; // return a copy of the list
  }

  /** return the instances of all lists */
  static GetListInstances(): UR_Item[][] {
    return Object.values(LISTS);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ItemListMgr; // the class
export {
  ItemListMgr // the class
};
