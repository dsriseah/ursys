/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, APPSERV } from '@ursys/core';
import * as LOKI from './lib/mod-loki.mts';

/// TEMP TYPE DECLARATIONS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type ObjID = string;
type ObjREF = string;
type ObjItem = { id?: ObjID; [key: string]: any };
type SchemaType = string;
type Dataset = {
  dicts: {
    [ref: ObjREF]: ObjItem;
  };
  lists: {
    [ref: ObjREF]: ObjItem[];
  };
};

/// DUMMY DATA ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DUMMY_DATASET: Dataset = { dicts: {}, lists: {} };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('COMMENT', 'TagYellow');

/// EXTERNAL API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { AddMessageHandler } = APPSERV;
const { PromiseUseDatabase } = LOKI;

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an array of objects, return a new array of objects that are
 *  guaranteed to have an _id field, or undefined if any object doesn't have
 *  an _id field. The copied objects are also filtered for suspicious
 *  property strings that are HTML or script tags
 *  Returns [ obj[], error ] */
function m_NormalizeObjs(objs: ObjItem[], schema?: any): [ObjItem[], error?: string] {
  const fn = 'm_NormalizeObjs:';
  // if any object is missing an _id, return undefined
  if (objs.some(obj => obj._id === undefined))
    return [[undefined], `${fn} missing _id field`];
  // copy the objects
  const norm_objs = [];
  for (const obj of objs) {
    const norm_obj = { _id: obj._id };
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // htmlencode strings before storing them
        norm_obj[key] = encodeURIComponent(obj[key]);
      } else {
        norm_obj[key] = obj[key];
      }
    }
    norm_objs.push(norm_obj);
  }
  return [norm_objs];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an array of ids, return a new array of ids that are guaranteed to be
 *  strings, or undefined if any id is not a string */
function m_NormalizeIDs(ids: ObjID[]): [ObjID[], error?: string] {
  const fn = 'm_NormalizeIDs:';
  if (ids.some(id => typeof id !== 'string'))
    return [[undefined], `${fn} id must be a string`];
  return [ids];
}

/// MANAGERS //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, create a new list and return the list
 *  instance */
function CreateListInstance(listName: string) {
  const fn = 'CreateListInstance:';
  if (DUMMY_DATASET.lists[listName] !== undefined)
    throw Error(`${fn} list '${listName}' already exists`);
  const listInstance = [];
  DUMMY_DATASET.lists[listName] = listInstance;
  return listInstance;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, clear the list of all items and retain the
 *  same list instance */
function ClearListInstance(listName: string) {
  const fn = 'ClearListInstance:';
  const listInstance = DUMMY_DATASET.lists[listName];
  if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
  listInstance.length = 0;
  return listInstance;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, return the entire list */
function GetListInstance(listName: string) {
  return DUMMY_DATASET.lists[listName];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a dict, create a new dict and return the dict
 *  instance */
function CreateDict(dictName: string) {
  const fn = 'CreateDict:';
  if (DUMMY_DATASET.dicts[dictName] !== undefined)
    throw Error(`${fn} dict '${dictName}' already exists`);
  const dictInstance = {};
  DUMMY_DATASET.dicts[dictName] = dictInstance;
  return dictInstance;
}

/// API LIST METHODS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given the name of a list and an array of objects, add the objects to the
 *  list and return the list if successful, undefined otherwise */
function ListAdd(listName: string, items: ObjItem[]): ObjItem[] {
  const fn = 'ListAdd:';
  const listInstance = DUMMY_DATASET.lists[listName];
  if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
  // normalize the objects and add them to the list
  const [norm_objs, norm_error] = m_NormalizeObjs(items);
  if (norm_error) throw Error(`${fn} ${norm_error}`);
  listInstance.push(...norm_objs);
  return [...listInstance]; // return a copy of the list
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, return the entire list or the subset of ids
 *  identified in the ids array, in order of the ids array. Return a COPY
 *  of the objects, not the original objects */
function ListRead(listName: string, ids?: ObjID[]): ObjItem[] {
  const fn = 'ListRead:';
  const listInstance = DUMMY_DATASET.lists[listName];
  if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
  // if no ids are provided, return the entire list
  if (ids === undefined) {
    return [...listInstance]; // return a copy of the list
  }
  // otherwise, return the specific objects in the order of the ids array
  // as a copy of the objects
  return ids.map(id => listInstance.find(obj => obj._id === id));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, update the objects in the list with the items
 *  provided through shallow merge. If there items that don't have an _id field
 *  or if the _id field doesn't already exist in the list, throw an Error.
 *  Return a copy of list if successful */
function ListUpdate(listName: string, items: ObjItem[]) {
  const fn = 'ListUpdate:';
  const listInstance = DUMMY_DATASET.lists[listName];
  if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
  if (!Array.isArray(items) || items === undefined)
    throw Error(`${fn} items must be an array`);
  if (items.length === 0) throw Error(`${fn} items array is empty`);
  const [norm_items, norm_error] = m_NormalizeObjs(items);
  if (norm_error) throw Error(`${fn} ${norm_error}`);
  // got this far, items are normalized and we can merge them.
  for (const item of norm_items) {
    const idx = listInstance.findIndex(obj => obj._id === item._id);
    if (idx === -1) throw Error(`${fn} item ${item._id} not found in list`);
    Object.assign(listInstance[idx], item);
  }
  return [...listInstance]; // return a copy of the list
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, overwrite the objects. Unlike ListUpdate, this
 *  will not merge but replace the items. The items must exist to be
 *  replaced */
function ListReplace(listName: string, items: ObjItem[]) {
  const fn = 'ListReplace:';
  const listInstance = DUMMY_DATASET.lists[listName];
  if (listInstance === undefined) throw Error(`${fn} list '${listName}' not found`);
  if (!Array.isArray(items) || items === undefined)
    throw Error(`${fn} items must be an array`);
  if (items.length === 0) throw Error(`${fn} items array is empty`);
  const [norm_items, norm_error] = m_NormalizeObjs(items);
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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, add the items to the list. If an already
 *  exists in the list, update it instead. Return a copy of the list */
function ListUpdateOrAdd(listName: string, items: ObjItem[]) {
  const fn = 'ListUpdateOrAdd:';
  const listInstance = DUMMY_DATASET.lists[listName];
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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given the name of a list, delete the objects in the list with the ids
 *  provided. If there are any ids that don't exist in the list, throw an
 *  Error. Return a copy of the deleted items if successful */
function ListDelete(listName: string, ids: ObjID[]) {
  const fn = 'ListDelete:';
  const list = DUMMY_DATASET.lists[listName];
  if (list === undefined) throw Error(`${fn} list '${listName}' not found`);
  if (!Array.isArray(ids) || ids === undefined)
    throw Error(`${fn} ids must be an array of _id strings`);
  const [del_ids, del_error] = m_NormalizeIDs(ids);
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

/// API DICT METHODS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DictRead(dictName: string, ids?: ObjID[]) {
  const dict = DUMMY_DATASET.dicts[dictName];
  if (dict === undefined) return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DictAdd(dictName: string, items: ObjItem[]) {
  const dict = DUMMY_DATASET.dicts[dictName];
  if (dict === undefined) return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DictUpdate(dictName: string, items: ObjItem[]) {
  const dict = DUMMY_DATASET.dicts[dictName];
  if (dict === undefined) return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DictDelete(dictName: string, ids: ObjID[]) {
  const dict = DUMMY_DATASET.dicts[dictName];
  if (dict === undefined) return undefined;
}

/// ACCESSORS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return the instances of all lists */
function GetListInstances(): ObjItem[][] {
  return Object.values(DUMMY_DATASET.lists);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return the instances of all dictionaries */
function GetDictInstances(): ObjItem[] {
  return Object.values(DUMMY_DATASET.dicts);
}

/// LIFECYCLE /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Init() {
  await PromiseUseDatabase('comments.loki');
  AddMessageHandler('NET:DC_HANDLER', data => {
    LOG(`DC_HANDLER`, data);
    data = { status: 'OK' };
    LOG('returning data', data);
    return data;
  });
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // LIFECYCLE
  Init,
  // LIST by-reference methods
  CreateListInstance,
  GetListInstance,
  GetListInstances,
  ClearListInstance,
  // LIST by-value methods
  ListRead,
  ListAdd,
  ListUpdate,
  ListUpdateOrAdd,
  ListReplace,
  ListDelete,
  // DICT by-reference methods
  CreateDict,
  GetDictInstances,
  // DICT by-value methods
  DictRead,
  DictAdd,
  DictUpdate,
  DictDelete
};
