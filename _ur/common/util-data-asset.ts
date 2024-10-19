/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Asset and Dataset Utility Module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult } from '../_types/dataset';
import type { DataBinID, DataBinType } from '../_types/dataset';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATASET_MODES = ['local', 'sync', 'sync-read', 'sync-write'];
const DATASET_INFO = {
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
const DATASET_BINS = Object.keys(DATASET_INFO) as DataBinType[];
const DATASET_DIRS = Object.values(DATASET_INFO).map(v => v.dir);

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
function DecodeDataConfig(configObj: any): OpResult {
  if (configObj === undefined) return { error: 'missing configObj' };
  const { mode } = configObj;
  if (!DATASET_MODES.includes(mode)) return { error: 'invalid mode' };
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

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const MOD = {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  DecodeDataURI,
  DecodeDataConfig,
  GetDatasetObjectProps
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default MOD;
export {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  DecodeDataURI,
  DecodeDataConfig,
  GetDatasetObjectProps
};
