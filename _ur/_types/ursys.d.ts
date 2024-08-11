/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS CORE TYPES

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// DATASET CONVENTIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// data models have objects with an _id field that uniquely identifies
/// each entity in the dataset called a UID.
export type UR_EntID = `${string}`;
export type UR_EntID_Obj = { _id: UR_EntID };
/// we use various object conventions
export type DataObj = { [key: string]: any };
export type ErrObj = { error?: string; errorCode?: string; errorInfo?: string };
export type ReturnObj = DataObj | ErrObj;
/// we use UR_DataMethod functions to modify data and datasets
export type UR_DataMethod = (...any, data: DataObj, options?: DataObj) => ReturnObj;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an UR_Item is a union of DataObj with UR_EntID
export type UR_Item = UR_EntID_Obj & DataObj; // { _id: UR_EntID; [key: string]: any }
export type UR_Doc = UR_Item; // doc is a single item
/// there are multiple ways to organize UR_Items into a "bag"
export type UR_ItemList = UR_Item[];
export type UR_DocFolder = { [_id: UR_EntID]: UR_Doc };
// the document manager has named Documents that are in a
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// REFS identify a unique "bag" of items in a data model, despite the type
/// of bag it is (e.g. documents, itemlists, etc.)
export type UR_BagRef = `${string}`;
/// a UR_Dataset is a collection of multiple bags of items, organized by
/// type of bag (e.g. documents, itemlists, etc.)
export type UR_Dataset = {
  schema?: UR_Schema; // see https://github.com/dsriseah/ursys/discussions/22
  docFolders?: { [foldername: UR_BagRef]: UR_DocFolder };
  itemlists?: { [listname: UR_BagRef]: UR_ItemList };
  // additional items
  // see https://github.com/dsriseah/ursys/discussions/25
  // files
  // state
  // logs
  // templates
  // config
};

/// DATASET OPERATIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type RangeType = `gt ${any}` | `lt ${any}` | `between ${any}, ${any}`;
export type RangeParams = { [field: string]: RangeType };
export type SearchParams = { [field: string]: any };
export type SortType = `none` | `ascending` | `descending` | `random`;
export type SearchOptions = {
  _caseSensitive?: boolean; // false
  _forceNull?: boolean; // false
  _forceNumAsString?: boolean; // true
  _deepMatch?: boolean; // false
  _cloneResults?: boolean; // true
  preFilter?: (items: UR_Item[]) => Promise<UR_Item[]>;
  missingFields?: string[];
  hasFields?: string[];
  matchExact?: DataObj;
  matchRange?: RangeObj;
  postFilter?: (items: UR_Item[]) => Promise<UR_Item[]>;
};
export type SortOptions = {
  _cloneResults?: boolean; //
  preFilter?: (items: UR_Item[]) => Promise<UR_Item[]>;
  sortBy?: { [field: string]: SortType };
  postFilter?: (items: UR_Item[]) => Promise<UR_Item[]>;
};
