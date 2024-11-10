/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Reference Datasync Storage Module using Filesystem

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as FILE from './file.mts';
import * as PATH from 'node:path';
import { DecodeDataURI } from '../common/util-data-ops.ts';
import * as ASSETMGR from './assetserver.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type ManifestReturn = { manifest?: any; error?: string };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// METHODS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** mock data loading from filesystem, decide where it goes later */
function mock_GetDataFromFilesystem() {
  // dummy hardcoded load
  const rootDir = FILE.DetectedRootDir();
  const dataPath = PATH.join(rootDir, '_ur/tests/data/');
  const jsonFile = PATH.join(dataPath, 'mock-dataset.json');
  const data = FILE.ReadJSON(jsonFile);
  return data;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given dataURI, return the manifest object */
async function GetManifest(dataURI: string): Promise<ManifestReturn> {
  const { orgDomain, bucketID, instanceID } = DecodeDataURI(dataURI);
  // 1. reference implementation of this reference datastore adapter
  //    knows how to convert the dataURI into a filesystem path
  const orgPath = orgDomain;
  const bucketPath = bucketID;
  const instancePath = instanceID;
  const dataPath = PATH.join(
    FILE.DetectedRootDir(),
    orgPath,
    bucketPath,
    instancePath
  );
  // read manifest from filesystem
  const { manifest, error } = await ASSETMGR.GetManifestFromDataPath(dataPath);
  if (error) return { error };
  return { manifest };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default {
  GetManifest
};
export { GetManifest };
