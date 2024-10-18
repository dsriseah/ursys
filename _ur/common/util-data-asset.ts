/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Asset and Dataset Utility Module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult } from '../_types/dataset';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATASET_DIRNAMES = [
  // see dataset.d.ts UR_Dataset
  'docfolders',
  'itemlists',
  'stringlists',
  'filelists',
  'appconfig',
  'runconfig',
  'runstate',
  'runlogs',
  'templates'
];
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATASET_MODES = ['local', 'sync', 'sync-read', 'sync-write'];

/// ASSET API METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** returns true if the given dirname is a valid asset directory name */
function IsAssetDirname(dirname: string): boolean {
  return DATASET_DIRNAMES.includes(dirname);
}

/// DATASET API METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** decode a dataURI into its components */
function DecodeDataURI(dataURI: string): OpResult {
  // `${OrgDomain}:${BucketID}/${InstanceID}?${SetQuery}`
  if (typeof dataURI !== 'string') return { error: 'not a string' };
  const [param1, param2, ...extra] = dataURI.split(':');
  if (extra) return { error: 'invalid segments in dataURI' };
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
  if (!mode.includes(DATASET_MODES)) return { error: 'invalid mode' };
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
export default {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  DecodeDataURI,
  DecodeDataConfig
};
export {
  IsAssetDirname,
  IsValidDataURI,
  IsValidDataConfig,
  DecodeDataURI,
  DecodeDataConfig
};
