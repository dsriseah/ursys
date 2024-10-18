/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Types related to managing a collection of standardized items

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import type { DataObj, OpResult } from './ursys.d.ts';
export type * from './ursys.d.ts';
export type { DataBin } from './class-data-databin.ts';
export type { Dataset, ConfigOptions } from './class-data-dataset.ts';
export type { RecordSet } from './class-data-recordset.ts';

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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Identify a dataset uniquely across the world */
type OrgDomain = string; // e.g. 'ursys.org', 'rapt
type BucketID = string; // e.g. a UUID using / separators
type InstanceID = string; // e.g. a path to a dataset resource
type SetQuery = string; // e.g. a query string
export type UR_DatasetURI = `${OrgDomain}:${BucketID}/${InstanceID}?${SetQuery}`;

/// DATASET CONVENTIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// data models have objects with an _id field that uniquely identifies
/// each entity in the dataset called a UID.
type IntString = `${string}`; // this is an integer padding string
export type UR_EntID = `${string}${IntString}`; // a unique identifier
export type UR_EntID_Obj = { _id: UR_EntID };
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an UR_Item is a union of MatchObj with UR_EntID
export type UR_NewItem = DataObj; // { [key: string]: any }
export type UR_Item = UR_EntID_Obj & DataObj; // { _id: UR_EntID; [key: string]: any }
/// an UR_Doc is an object with an _id field and a set of properties
export type UR_Doc = UR_EntID_Obj & DataObj; // doc is a single item
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// BinRefID identifies a unique "bin" of items of the same data type.
export type DataBinID = string; // snake_case
export type DataBinType = 'DocFolder' | 'ItemList';
export type UR_ItemList = UR_Item[];
export type UR_DocFolder = { [_id: UR_EntID]: UR_Doc };
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// a UR_DatasetObj is a collection of multiple bags of items, organized by
/// type of bag (e.g. documents, itemlists, etc.)
export type UR_DatasetObj = {
  _schema?: UR_SchemaID; // see https://github.com/dsriseah/ursys/discussions/22
  _dataURI: UR_DatasetURI;
  // see https://github.com/dsriseah/ursys/discussions/25 for more on this list
  DocFolders?: { [foldername: DataBinID]: UR_DocFolder };
  ItemLists?: { [listname: DataBinID]: UR_ItemList };
  // stringlist
  // filelist
  // appconfig
  // runconfig
  // runstate
  // runlogs
  // runsessions
  // templates
};

/// DATASET SYNC TYPES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** SyncOp is the operations that can be performed on a dataset via
 *  the SYNC:SRV_DATA protocol. */
export type SyncOp =
  | 'DATA_INIT' // SYNC:SRV_DATA_INIT clears data
  | 'DATA_GET' // SYNC:SRV_DATA_GET ( ids? )
  | 'DATA_ADD' // SYNC:SRV_DATA_ADD ( items )
  | 'DATA_UPDATE' // SYNC:SRV_DATA_UPDATE ( items )
  | 'DATA_WRITE' // SYNC:SRV_DATA_WRITE ( items )
  | 'DATA_DELETE' // SYNC:SRV_DATA_DELETE ( ids )
  | 'DATA_REPLACE'; // SYNC:SRV_DATA_REPLACE ( items )
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sent to dataset source by inquiring clients SYNC:SRV */
export type DatastoreReq = {
  dataURI: string;
  authToken?: string;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sent from dataset source to inquiring clients SYNC:CLI */
export type DatastoreRes = {
  dataURI?: string;
  accToken?: string;
  // meta
  status?: string;
  error?: string;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sent from a dataset source by inquiring clients SYNC:SRV */
export type SyncDataReq = {
  binID: DataBinID;
  accToken?: string;
  items?: UR_Item[];
  ids?: UR_EntID[];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sent from a dataset source to a inquiring client SYNC:CLI */
export type SyncDataRes = {
  binID: DataBinID;
  binType: DataBinType;
  op: SyncOp;
  seqNum: number;
  // meta
  status?: string;
  error?: string;
  skipped?: UR_EntID[];
  //
  items?: UR_Item[];
  added?: UR_Item[];
  updated?: UR_Item[];
  deleted?: UR_Item[];
  replaced?: UR_Item[];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** implement functions needed to write data to a remote datastore
 *  . writeData is the async method that writes data to remote datastore
 *  . handleError is the method that handles the return object from writeData
 */
export type RemoteStoreAdapter = {
  accToken: string;
  writeData: (op: SyncOp, data: SyncDataReq) => Promise<OpResult>;
  handleError: (opResult: OpResult) => OpResult;
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
