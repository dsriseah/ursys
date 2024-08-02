/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Data Operations One Big Ass Bunch of Functions

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { UR_Item, UR_Doc, UR_EntID } from '~ur/types/ursys.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type RangeType = `gt ${any}` | `lt ${any}` | `between ${any}, ${any}`;
type SortType = `ascending` | `descending` | `random`;
type SearchOptions = {
  _caseSensitive: boolean;
  _forceStrings: boolean;
  _deepMatch: boolean;
  _cloneResults: boolean;
  preFilter: (item: UR_Item[]) => Promise<UR_Item[]>;
  missingFields: string[];
  hasFields: string[];
  matchExact: { [field: string]: any };
  matchRange: { [field: string]: RangeType };
  postFilter: (item: UR_Item[]) => Promise<UR_Item[]>;
};
type SortOptions = {
  _cloneResults: boolean;
  preFilter: (item: UR_Item[]) => Promise<UR_Item[]>;
  sortBy: { [field: string]: SortType };
  postFilter: (item: UR_Item[]) => Promise<UR_Item[]>;
};

/// DATA OPERATIONS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// these are implemented by ListManager and DocManager classes and use
/// the same UR_Item and UR_Item[] objects as input and output
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface I_ListManager {
  listAdd(listName: string, items: UR_Item[]): UR_Item[];
  listRead(listName: string): UR_Item[];
  listUpdate(listName: string, items: UR_Item[]): UR_Item[];
  listUpdateOrAdd(listName: string, items: UR_Item[]): UR_Item[];
  listReplace(listName: string, items: UR_Item[]): UR_Item[];
  listDelete(listName: string): UR_Item[];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
interface I_DocManager {
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

/// SEARCH OPERATIONS /////////////////////////////////////////////////////////
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

/// RESULTS OPERATIONS ////////////////////////////////////////////////////////
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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return just the ids of the items in the provided set */
function ids(items: UR_Item[]): UR_EntID[] {
  return items.map(item => item._id);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
