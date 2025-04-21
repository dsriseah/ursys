/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  test generate a manifest from a dataURI

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NORM, FILE, ASSET, SNA } from 'ursys/server';
import * as PATH from 'path';
// module dereferences
const { DSFS: MOD_DatasetFS } = SNA;

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// DATASET BUCKET WRITING ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** get the runtime directory */
function m_GetRuntimeDir(): string {
  const rootDir = FILE.FindParentDir('package.json', process.cwd());
  return PATH.join(rootDir, '_runtime');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_GetBucketDir(): string {
  const rootDir = m_GetRuntimeDir();
  const org = 'sri.org';
  const bucket = 'bucket-1234';
  return PATH.join(rootDir, org, bucket);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetBucketDatasetDir(subdir: string = '') {
  if (typeof subdir !== 'string') throw Error(`subdir must be a string`);
  if (subdir && !ASSET.IsAssetDirname(subdir))
    throw Error(`'${subdir}' is not a valid asset dirname (see util-data-asset.ts)`);
  const bucketDir = m_GetBucketDir();
  const dsDir = PATH.join(bucketDir, 'sna-app/project-one', subdir);
  FILE.EnsureDir(dsDir);
  return dsDir;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** write the JSON data to a file */
function WriteCommentJSON(filename: string, data: any) {
  const outDir = GetBucketDatasetDir('itemlists');
  console.log(`*** writing ${outDir}${filename}`);
  FILE.WriteJSON(PATH.join(outDir, filename), data);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
console.log('would generate manifest from dataURI');
