/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Asset and Dataset Utility Module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult, DatasetOp, SyncDataReq, DatasetReq } from '../_types/dataset';
import type { DataBinType, SyncDataOp, SyncDataMode } from '../_types/dataset';

/// DATASET CONSTANTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DSET_MODES: SyncDataMode[] = ['local', 'local-ro', 'sync', 'sync-ro'];
const DSET_FSMAP = {
  'DocFolders': { dir: 'docfolders', type: 'DocFolder' },
  'ItemLists': { dir: 'itemlists', type: 'ItemList' }
  // 'StringLists': { dir: 'StringList' },
  // 'FileLists': { dir: 'filelists' },
  // 'AppConfig': { dir: 'appconfig' },
  // 'RunConfig': { dir: 'runconfig' },
  // 'RunState': { dir: 'runstate' },
  // 'RunLogs': { dir: 'runlogs' },
  // 'RunSessions': { dir: 'runsessions' },
  // 'Templates': { dir: 'templates' }
};
/** derived constants - - - - - - - - - - - - - - - - - - - - - - - - - - - **/
const DATASET_BINS: DataBinType[] = Object.keys(DSET_FSMAP) as DataBinType[];
const DATASET_DIRS = Object.values(DSET_FSMAP).map(v => v.dir);

/// DATASYNC CONSTANTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA_SYNCOPS: SyncDataOp[] = [];
DATA_SYNCOPS.push('CLEAR', 'GET', 'ADD', 'UPDATE', 'WRITE', 'DELETE', 'REPLACE');
DATA_SYNCOPS.push('FIND', 'QUERY');
const DATASET_OPS: DatasetOp[] = ['LOAD', 'UNLOAD', 'PERSIST', 'GET_MANIFEST', 'GET'];

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
function IsDataSyncOp(op: SyncDataOp): boolean {
  return DATA_SYNCOPS.includes(op);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function IsDatasetOp(op: DatasetOp): boolean {
  return DATASET_OPS.includes(op);
}

/// DATASET API METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** decode a dataURI into its components */
function DecodeDataURI(dataURI: string): OpResult {
  // `${OrgDomain}:${BucketID}/${InstanceID}?${SetQuery}`
  if (typeof dataURI !== 'string') return { error: 'not a string' };
  const [param1, param2, ...extra] = dataURI.split(':');
  if (extra.length > 0) {
    console.log('extra', extra);
    return { error: 'unexpected extra segments in dataURI' };
  }
  if (param2 === undefined) return { error: 'missing bucket/instance' };
  const [param3, queryTags] = param2.split('?');
  if (param3 === undefined) return { error: 'missing uri segment' };
  const [bucketID, ...instanceID] = param3.split('/');
  return {
    orgDomain: param1,
    bucketID,
    instanceID,
    queryTags
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check the values of DataClient config object */
function DecodeDataConfig(configObj: any): OpResult {
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
function DecodeSyncReq(syncReq: SyncDataReq) {
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
function DecodeDatasetReq(req: DatasetReq) {
  const fn = 'DecodeDatasetReq:';
  const { dataURI, authToken, op } = req;
  if (!dataURI) return { error: `${fn} dataURI is required` };
  // TODO: check authToken?
  if (!op) return { error: `${fn} op is required` };
  if (!IsDatasetOp(op)) return { error: `${fn} op [${op}] not recognized` };
  if (typeof dataURI !== 'string') return { error: `${fn} dataURI must be a string` };
  return { dataURI, authToken, op };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const MOD = {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  IsDataSyncOp,
  IsDatasetOp,
  DecodeDataURI,
  DecodeDataConfig,
  GetDatasetObjectProps,
  DecodeSyncReq
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default MOD;
export {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  IsDataSyncOp,
  IsDatasetOp,
  DecodeDataURI,
  DecodeDataConfig,
  GetDatasetObjectProps,
  DecodeSyncReq,
  DecodeDatasetReq
};
