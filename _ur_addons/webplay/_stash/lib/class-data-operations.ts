/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Data Operations One Big Ass Bunch of Functions

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_Item,
  UR_Doc,
  UR_EntID,
  UR_ItemList,
  UR_DocFolder,
  SearchOptions,
  SortOptions
} from '../../../../_ur/_types/dataset.d.ts';

/// DATA OPERATIONS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// these are implemented by ListManager and DocManager classes and use
/// the same UR_Item and UR_Item[] objects as input and output
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface I_ListManager {
  // list instance management
  createItemList(listName: string): UR_ItemList;
  clearItemList(listName: string): UR_ItemList;
  getItemList(listName: string): UR_ItemList;
  // list operations
  listAdd(listName: string, items: UR_Item[]): UR_Item[];
  listRead(listName: string): UR_Item[];
  listUpdate(listName: string, items: UR_Item[]): UR_Item[];
  listUpdateOrAdd(listName: string, items: UR_Item[]): UR_Item[];
  listReplace(listName: string, items: UR_Item[]): UR_Item[];
  listDelete(listName: string): UR_Item[];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface I_DocManager {
  // doc folder management
  createDocFolder(folderName: string): UR_DocFolder;
  clearDocFolder(folderName: string): UR_DocFolder;
  getDocFolder(folderName: string): UR_DocFolder;
  // single document operations
  docAdd(folderName: string, doc: UR_Doc): UR_Doc;
  docRead(folderName: string, id: UR_EntID): UR_Doc;
  docUpdate(folderName: string, doc: UR_Doc): UR_Doc;
  docReplace(folderName: string, doc: UR_Doc): UR_Doc;
  docUpdateOrAdd(folderName: string, doc: UR_Doc): UR_Doc;
  docDelete(folderName: string, id: UR_EntID): UR_Doc;
  // multiple document operations
  docsAdd(folderName: string, doc: UR_Doc[]): UR_Doc[];
  docsRead(folderName: string, ids: UR_EntID[]): UR_Doc[];
  docsUpdate(folderName: string, docs: UR_Doc[]): UR_Doc[];
  docsReplace(folderName: string, docs: UR_Doc[]): UR_Doc[];
}

/// QUERY OPERATIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Find the first item that matches the criteria, returning the item or
 *  undefined if no item is found */
function findOne(dataset, criteria: SearchOptions): UR_Item {
  // find one matching field (case sensitive or not)
  // throw error if more than one
  // return the matching item
  return undefined || { _id: '1', name: 'item1' };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Find all items that match the criteria, returning a list of items or
 *  undefined if no items are found */
function findAll(dataset, criteria: SearchOptions): UR_Item[] {
  // find all matching field (case sensitive or not)
  // return the list of matching items
  return undefined || [{ _id: '1', name: 'item1' }];
}

/// RESULTSET OPERATIONS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return just the ids of the items in the provided set */
function ids(items: UR_Item[]): UR_EntID[] {
  return items.map(item => item._id);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return the items in the resultset as-is, or retrieve a
 *  cached set of items by by setName */
function items(setName?: string): UR_Item[] {
  const currentItems = [{ _id: '1', name: 'item1' }];
  return currentItems;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** save the current set of items for later retrieval by name */
function cacheCurrent(setName: string): UR_Item[] {
  // save the current set of items for later retrieval by name
  const currentItems = [{ _id: '1', name: 'item1' }];
  return currentItems;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** clear the cache of items by name or all of them */
function cacheClear(setName?: string): UR_Item[] {
  // clear the cache of items by name or all of them
  const clearedItems = [{ _id: '1', name: 'item1' }];
  return clearedItems;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** special dispose of the current set of items and its caches to recoverer
 *  memory...ordinarily probably not needed */
function _dispose(): UR_Item[] {
  // dispose all data structures
  const disposedItems = [{ _id: '1', name: 'item1' }];
  return disposedItems;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** clone the current set of items and its caches */
function clone(): UR_Item[] {
  // clone the current set of items
  const currentItems = [{ _id: '1', name: 'item1' }];
  return currentItems.map(item => ({ ...item }));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Count the number of items in the provided set */
function count(items: UR_Item[]): number {
  // count all the options in the provided set
  return items.length;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Sort the items in the provided set by the criteria provided, in
 *  order of defined criteria */
function sort(items: UR_Item[], criteria: SortOptions): UR_Item[] {
  // sort the items by the criteria provided
  return items;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Filter the items in the provided set by the criteria provided */
function filter(items: UR_Item[], criteria: SearchOptions): UR_Item[] {
  // filter the items by the criteria provided, returning a new set
  // of items that match the criteria
  return items;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return a subset of the items in the provided set, starting at the
 *  index provided and including the count provided if defined */
function from(items: UR_Item[], index: number, count?: number): UR_Item[] {
  // filter the items by the criteria provided, returning a new set
  // of items that match the criteria
  return items;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return a subset of the items in the provided set, starting at the
 *  page number provided and including the page size provided */
function page(items: UR_Item[], pageNum: number, pageSize: number): UR_Item[] {
  // filter the items by the criteria provided, returning a new set
  // of items that match the criteria
  return items;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
