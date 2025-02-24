/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Asset and Dataset Utility Module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

import { NormStringToValue } from './util-data-norm';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { ErrObj } from '../_types/ursys';
import type { DatasetOp, DataSyncReq, DatasetReq } from '../_types/dataset';
import type { DataBinType, DataSyncOp, DataSyncMode } from '../_types/dataset';
import type { UR_ManifestObj, DS_DataURI } from '../_types/dataset';
//
type DecodedManifest = UR_ManifestObj & ErrObj;
type DecodedDataURI = {
  orgDomain?: string;
  bucketID?: string;
  instanceID?: string;
  appID?: string; // first part of instanceID
  tags?: any;
} & ErrObj;
type DecodedSyncReq = {
  binID?: string;
  op?: DataSyncOp;
  accToken?: string;
  ids?: string[];
  items?: any[];
  searchOpt?: any;
} & ErrObj;
type DecodedDatasetReq = {
  dataURI?: DS_DataURI;
  authToken?: string;
  op?: DatasetOp;
} & ErrObj;
type DecodedSchema = {
  root?: string;
  name?: string;
  version?: string;
  tags?: { [tag: string]: any };
} & ErrObj;

/// DATASET CONSTANTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DSET_MODES: DataSyncMode[] = ['local', 'local-ro', 'sync', 'sync-ro'];
const DSET_FSMAP = {
  'itemdicts': { type: 'ItemDict', ext: 'json' },
  'itemlists': { type: 'ItemList', ext: 'json' }
  // 'schemas': { type: 'Schema', ext: 'json' },
  // 'stringlists': { type: 'StringList' },
  // 'filelists': { type: 'FileList' },
  // 'appconfigs': { type: 'AppConfig' },
  // 'runconfigs': { type: 'RunConfig' },
  // 'runstates': { type: 'RunState' },
  // 'runlogs': { type: 'RunLog' },
  // 'sessions': { type: 'RunSession' },
  // 'templates': { type: 'Template', ext: 'json' },
  // 'sprites': { type: 'Sprite', ext: 'png' },
};
/** derived constants - - - - - - - - - - - - - - - - - - - - - - - - - - - **/
const DATASET_BINS: DataBinType[] = Object.keys(DSET_FSMAP) as DataBinType[];
const DATASET_DIRS = Object.keys(DSET_FSMAP);

/// DATASYNC CONSTANTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA_SYNCOPS: DataSyncOp[] = [];
DATA_SYNCOPS.push('CLEAR', 'GET', 'ADD', 'UPDATE', 'WRITE', 'DELETE', 'REPLACE');
DATA_SYNCOPS.push('FIND', 'QUERY');
const DATASET_OPS: DatasetOp[] = [
  'LOAD',
  'UNLOAD',
  'PERSIST',
  'GET_MANIFEST',
  'GET_DATA'
];

/// ACCESSORS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return a copy of the dataset databin keys */
function GetDatasetObjectProps() {
  return [...DATASET_BINS];
}

/// ASSET API METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** returns true if the given dirname is a valid asset directory name */
function IsAssetDirname(dirname: string): boolean {
  return DATASET_DIRS.includes(dirname);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function IsDataSyncOp(op: DataSyncOp): boolean {
  return DATA_SYNCOPS.includes(op);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function IsDatasetOp(op: DatasetOp): boolean {
  return DATASET_OPS.includes(op);
}

/// SCHEMA DECODE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** inspect schema for validity */
function DecodeSchemaID(schemaID: string): DecodedSchema {
  if (typeof schemaID !== 'string') return { error: 'schema must be a string' };
  const [root, name, param3, ...extra] = schemaID.split(':');
  if (extra.length > 0) return { error: `extra segment(s) '${extra.join(':')}'` };
  const [version, ...param4] = param3.split(';');
  if (version === undefined) return { error: 'missing version tag' };
  const tags = {};
  if (param4) {
    param4.forEach(tag => {
      if (tag.length === 0) return;
      let [key, val] = tag.split('=');
      tags[key] = NormStringToValue(val);
    });
  }
  return {
    root,
    name,
    version,
    tags
  };
}

/// MANIFEST DECODE ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** decode and validate the manifest object */
function DecodeManifest(manifest: UR_ManifestObj): DecodedManifest {
  const { _dataURI, _meta } = manifest;
  if (typeof _dataURI !== 'string') return { error: 'bad _dataURI' };
  if (typeof _meta !== 'object') return { error: 'bad _metaInfo' };
  const { itemlists, itemdicts } = manifest;
  return {
    _dataURI,
    _meta,
    itemlists,
    itemdicts
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** reverse lookup of assetDir to contained type, where dirname is
 *  a pluralized version of the type name */
function GetBinPropsByDirname(dirname: string) {
  const entry = DSET_FSMAP[dirname];
  if (entry) return entry;
}

/// DATASET API METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** decode a dataURI into its components */
function DecodeDataURI(dataURI: string): DecodedDataURI {
  // rapt:bucketID/path/to/data:version=1;tag1=foo;tag2
  // ${OrgDomain}:${BucketID}/${InstanceID}::${TagString}
  if (typeof dataURI !== 'string') return { error: 'not a string' };
  const [orgDomain, param2, param3, ...extra] = dataURI.split(':');
  if (extra.length > 0) return { error: `extra segment '${extra.join(':')}'` };
  if (param2 === undefined) return { error: 'missing bucketID' };
  const [bucketID, ...instancePath] = param2.split('/');
  if (instancePath && instancePath.length < 1) return { error: 'missing instanceID' };
  const instanceID = instancePath.join('/');
  const appID = instancePath[0];
  const tags = {};
  if (param3 !== undefined) {
    param3.split(';').forEach(tag => {
      if (tag.length === 0) return;
      let [key, val] = tag.split('=');
      tags[key] = NormStringToValue(val);
    });
  }
  return {
    orgDomain,
    bucketID,
    instanceID,
    appID,
    tags
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check the values of DataClient config object */
function DecodeDataConfig(configObj: any) {
  if (configObj === undefined) return { error: 'missing configObj' };
  const { mode } = configObj;
  if (!DSET_MODES.includes(mode)) return { error: 'invalid mode' };
  return { mode };
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return true if the dataURI is a valid dataset URI */
function IsValidDataURI(dataURI: string): boolean {
  return DecodeDataURI(dataURI).error === undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function IsValidDataConfig(configObj: any): boolean {
  return DecodeDataConfig(configObj).error === undefined;
}

/// DATASET and DATA PACKETS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** confirm that parameters are correct for synchronizing data */
function DecodeSyncReq(syncReq: DataSyncReq): DecodedSyncReq {
  const { accToken, op, binID, ids, items, searchOpt } = syncReq;
  // required params
  // TODO: if (accToken === undefined) return { error: 'accToken is required' };
  if (IsDataSyncOp(op) === false) return { error: `op ${op} not recognized` };
  if (!binID) return { error: 'binID is required' };
  if (typeof binID !== 'string') return { error: 'binID must be a string' };
  // optional params
  if (ids) {
    if (!Array.isArray(ids)) return { error: 'ids must be an array' };
    if (ids.some(id => typeof id !== 'string'))
      return { error: 'ids must be an array of string IDs' };
  }
  if (items) {
    if (!Array.isArray(items)) return { error: 'items must be an array' };
    if (items.some(item => typeof item !== 'object'))
      return { error: 'items must be an array of objects' };
  }
  if (searchOpt) {
    if (typeof searchOpt !== 'object')
      return { error: 'searchOpt must be an object' };
    if (Object.keys(searchOpt).length === 0)
      return { error: 'searchOpt must have at least one key' };
    if (searchOpt.preFilter || searchOpt.postFilter) {
      return { error: 'filters not supported for remote ops' };
    }
  }
  // everything good, then return the data
  return { binID, op, accToken, ids, items, searchOpt };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** confirm that parameters are correct for connecting to a datastore */
function DecodeDatasetReq(req: DatasetReq): DecodedDatasetReq {
  const fn = 'DecodeDatasetReq:';
  const { dataURI, authToken, op } = req;
  if (!dataURI) return { error: `${fn} dataURI is required` };
  // TODO: check authToken?
  if (!op) return { error: `${fn} op is required` };
  if (!IsDatasetOp(op)) return { error: `${fn} op [${op}] not recognized` };
  if (typeof dataURI !== 'string') return { error: `${fn} dataURI must be a string` };
  return { dataURI: dataURI as DS_DataURI, authToken, op };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  IsDataSyncOp,
  IsDatasetOp,
  DecodeDataURI,
  DecodeManifest,
  DecodeSchemaID,
  DecodeDataConfig,
  DecodeDatasetReq,
  DecodeSyncReq,
  GetDatasetObjectProps,
  GetBinPropsByDirname
};
