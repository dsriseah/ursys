/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  WIP:

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// BASE TYPES ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** identifier strings for types of collections in the URSYS ecosystem */
type CollectionName = string; // snake_case for a name of a collection
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
export type ReturnObj = DataObj | ErrObj;
/// we use UR_DataMethod functions to modify data and datasets
export type UR_DataMethod = (data: DataObj, options?: DataObj) => ReturnObj;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an UR_Item is a union of MatchObj with UR_EntID
export type UR_NewItem = DataObj; // { [key: string]: any }
export type UR_Item = UR_EntID_Obj & DataObj; // { _id: UR_EntID; [key: string]: any }
export type UR_Doc = UR_EntID_Obj & DataObj; // doc is a single item
/// there are multiple ways to organize UR_Items into a "bag"
export type UR_ItemList = UR_Item[];
export type UR_DocFolder = { [_id: UR_EntID]: UR_Doc };
// the document manager has named Documents that are in a
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// REFS identify a unique "bag" of items in a data model, despite the type
/// of bag it is (e.g. documents, itemlists, etc.)
export type UR_BagRef = string;
/// a UR_Dataset is a collection of multiple bags of items, organized by
/// type of bag (e.g. documents, itemlists, etc.)
export type UR_Dataset = {
  schema?: UR_SchemaID; // see https://github.com/dsriseah/ursys/discussions/22
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

/// REQUESTING DATA ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type BagRequest = {
  bagRef: UR_BagRef;
  ids?: UR_EntID[];
  items?: UR_Item[];
};
export type BagResponse = {
  bagRef: UR_BagRef;
  items: UR_Item[];
};

/// DATASET OPERATIONS ///////////////////////////////////////////////////////
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
export type SortOptions = {
  _cloneItems?: boolean; //
  preFilter?: (items: UR_Item[]) => UR_Item[];
  sortBy?: { [field: string]: SortType };
  postFilter?: (items: UR_Item[]) => UR_Item[];
};

/// QUERY OPERATIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type QueryOptions = {
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
export type QueryFlags = {
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
export type QueryProps = { found?: string[]; missing?: string[]; extra?: string[] };
export type QueryState = {
  criteria: QueryOptions;
  flags: QueryFlags;
  props: QueryProps;
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
  template_name: CollectionName;
  fields: {
    [templateProperty: PropName]: any;
  };
};

/// DATABASE TYPE DECLARATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** settings for initializing a collection on create */
type CollectionOptions = {
  [key: string]: any;
};
/** settings for initializing a database on create or load */
type DatabaseOptions = {
  [key: string]: any;
};

/// DATABASE RECORD TYPES /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Records are stored in Collections */
type RecordID = string; // the id of a record
type RecordFields = {
  [field: string]: any; // fields of a record
};
type Record = {
  _id?: RecordID; // may not be defined on create
  fields: RecordFields;
};

/// DATABASE OPERATIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** returned by whole-database operations */
type DatabaseStatus = 'loaded' | 'saved' | 'flushed' | 'closed';
