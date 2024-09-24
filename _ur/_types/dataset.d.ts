/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Types related to managing a collection of standardized items

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// BASE TYPES ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** identifier strings for types of collections in the URSYS ecosystem */
type PropName = string; // camelCase for user, _snake_case for internal

/// UNIVERSAL IDENTIFIERS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Identify ownership and schema uniquely across the world */
type SchemaRoot = string; // e.g. 'ursys', 'rapt'
type SchemaName = string; // e.g. 'resource_type', 'meme', 'netcreate'
type SchemaVersion = `version=${string}`; // e.g. 'version=1.0.0'
type SchemaTag = string; // colon separated list of tags
export type UR_SchemaID = `${SchemaRoot}:${SchemaName}:${SchemaVersion}:${SchemaTag}`;

/// DATASET CONVENTIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// data models have objects with an _id field that uniquely identifies
/// each entity in the dataset called a UID.
type IntString = `${string}`; // this is an integer padding string
export type UR_EntID = `${string}${IntString}`; // a unique identifier
export type UR_EntID_Obj = { _id: UR_EntID };
/// we use various object conventions
export type DataObj = { [key: string]: any };
export type ErrObj = { error?: string; errorCode?: string; errorInfo?: string };
export type ReturnObj = DataObj & ErrObj;
/// we use UR_DataMethod functions to modify data and datasets
export type UR_DataMethod = (data: DataObj, options?: DataObj) => ReturnObj;
export type UR_DataSyncObj = {
  cName: BagName;
  cType: BagClass;
  seqNum: number;
  //
  status?: string;
  error?: string;
  skipped?: UR_EntID[];
  //
  items?: UR_Item[];
  updated?: UR_Item[];
  added?: UR_Item[];
  deleted?: UR_Item[];
  replaced?: UR_Item[];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an UR_Item is a union of MatchObj with UR_EntID
export type UR_NewItem = DataObj; // { [key: string]: any }
export type UR_Item = UR_EntID_Obj & DataObj; // { _id: UR_EntID; [key: string]: any }
/// an UR_Doc is an object with an _id field and a set of properties
export type UR_Doc = UR_EntID_Obj & DataObj; // doc is a single item
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// BinRefID identifies a unique "bin" of items of the same data type.
export type UR_BinRefID = string; // snake_case
/// a UR_Dataset is a collection of multiple bags of items, organized by
/// type of bag (e.g. documents, itemlists, etc.)
export type UR_ItemList = UR_Item[];
export type UR_DocFolder = { [_id: UR_EntID]: UR_Doc };
export type UR_BinType = 'DocFolder' | 'ItemList';
export type UR_Dataset = {
  Schema?: UR_SchemaID; // see https://github.com/dsriseah/ursys/discussions/22
  DocFolders?: { [foldername: UR_BinRefID]: UR_DocFolder };
  ItemLists?: { [listname: UR_BinRefID]: UR_ItemList };
  // additional items
  // see https://github.com/dsriseah/ursys/discussions/25
  // files
  // state
  // logs
  // templates
  // config
};

/// DATASET OP TYPES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type RangeType =
  | `gt ${string | number}`
  | `lt ${string | number}`
  | `gte ${string | number}`
  | `lte ${string | number}`
  | `eq ${string | number}`
  | `ne ${string | number}`
  | `between ${string | number} ${string | number}`;
export type MatchObj = { [key: string]: string | number };
export type RangeObj = { [key: string]: RangeType };
export type SortType = `none` | `sort_asc` | `sort_desc` | `random`;

/// ITEM SEARCH OPERATIONS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SearchOptions = {
  _lowercaseProps?: boolean; // false
  _forceNull?: boolean; // false
  _forceValue?: 'number' | 'string'; // true
  _cloneItems?: boolean; // true
  preFilter?: (items: UR_Item[]) => UR_Item[];
  missingFields?: string[];
  hasFields?: string[];
  matchCount?: number; // when set, limits the number of matches
  matchExact?: MatchObj;
  matchRange?: RangeObj;
  postFilter?: (items: UR_Item[]) => UR_Item[];
};
export type SearchFlags = {
  _flcp?: boolean; // force lowercase
  _fval?: 'number' | 'string' | undefined;
  _fnul?: boolean; // force null
  _clone?: boolean; // make clone
  b_miss?: string[]; // missing fields
  b_has?: string[]; // has fields
  count?: number;
  match_exact?: MatchObj;
  match_range?: RangeObj;
  f_pre?: (items: UR_Item[]) => UR_Item[];
  f_post?: (items: UR_Item[]) => UR_Item[];
};
export type SearchProps = { found?: string[]; missing?: string[]; extra?: string[] };
export type SearchState = {
  criteria: SearchOptions;
  flags: SearchFlags;
  props: SearchProps;
};

/// ITEM SORT OPS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SortOptions = {
  _cloneItems?: boolean; //
  preFilter?: (items: UR_Item[]) => UR_Item[];
  sortBy?: { [field: string]: SortType };
  postFilter?: (items: UR_Item[]) => UR_Item[];
};

/// ITEM TRANSFORM OPS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type ItemTransformFunction = (item: UR_Item) => UR_Item;
export type ItemFormatOptions = {
  includeFields?: string[];
  excludeFields?: string[];
  transformBy?: { [field: string]: ItemTransformFunction };
};

/// ITEM TEST OPS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type ItemsMapFunction = (items: UR_Item[]) => any;
export type ItemStatsOptions = {
  groupBy?: { [test: string]: ItemsMapFunction };
  statTests?: { [stat: string]: ItemsMapFunction };
};
export type ItemStatsResult = {
  groups?: { [test: string]: UR_Item[] };
  [stat: string]: any;
};

/// RESOURCE TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Resources are file-based data structures that conform to a schema */
export type ResourceUID = string; // unique snake_case resource identifier
export type ResourceKey = string; // non-unique resource URI
export type ManifestItem = {
  res_name: ResourceKey; // type of resource
  uri: string; // location of resource
  [propertyName: PropName]: any; // related properties for resource
};
export type TemplateUID = string; // must be unique within a schema

/// TEMPLATE TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A template is a collection of properties defined in schema */
type UR_Template = {
  _schema: UR_SchemaID;
  template_name: BagName;
  fields: {
    [templateProperty: PropName]: any;
  };
};
