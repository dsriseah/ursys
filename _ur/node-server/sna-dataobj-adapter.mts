/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  DATA OBJECT ADAPTERS are the bridge between the SNA Dataset API and the
  underlying data storage mechanism. The DataObjAdapter class is the
  reference implementation of the Dataset Adapter for a filesystem-based

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as FILE from './file.mts';
import * as PATH from 'node:path';
import { DecodeDataURI, IsAssetDirname } from '../common/util-data-ops.ts';
import { DataObjAdapter } from '../common/abstract-dataobj-adapter.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DOA_Options } from '../common/abstract-dataobj-adapter.ts';
import type {
  DS_DatasetObj,
  DS_DataURI,
  DataBinID,
  DatasetInfo
} from '../_types/dataset.js';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const MANIFEST_FILENAME = '00-manifest';
let manifest_id_counter = 1000; // asset id counter

/// MOCK FUNCTIONS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function mock_GetDataFromFilesystem() {
  // dummy hardcoded load
  const rootDir = FILE.DetectedRootDir();
  const dataPath = PATH.join(rootDir, '_ur/tests/data/');
  const jsonFile = PATH.join(dataPath, 'mock-dataset.json');
  const data = FILE.ReadJSON(jsonFile);
  return data;
}

/// ADAPTER FUNCTIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return an array of manifest objects read from predefined manifest files */
async function m_GetPredefinedManifests(dataPath: string) {
  const allfiles = FILE.Files(dataPath);
  const mfiles = allfiles
    .filter(f => f.startsWith(MANIFEST_FILENAME) && f.endsWith('.json'))
    .sort();
  // case 1: 1 more more manifest files exist
  if (mfiles.length > 0) {
    const manifestObjs = [];
    for (let f of mfiles) {
      const obj = FILE.ReadJSON(`${dataPath}/${f}`);
      manifestObjs.push({ manifest: obj, manifest_src: f });
    }
    return manifestObjs;
  }
  // case 2: no manifest files found
  return [];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function m_GetAssetFileInfo(assetPath: string) {
  const files = FILE.Files(assetPath, { absolute: true });
  const assetInfo = await FILE.FilesHashInfo(files);
  return assetInfo;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function m_MakeManifestObj(dataPath: string) {
  const manifest = {};
  let manifest_src: string = 'auto-generated';
  const { dirs } = FILE.GetDirContent(dataPath);
  const assetDirs = dirs.filter(d => IsAssetDirname(d));
  if (assetDirs.length === 0)
    return {
      error: `no asset found in ${dataPath}`
    };
  for (const subdir of assetDirs) {
    console.log('*** reading asset dir:', subdir);
    const subdirPath = PATH.join(dataPath, subdir);
    const assetInfo = await m_GetAssetFileInfo(subdirPath);
    const entries = [];
    for (let info of assetInfo) {
      const assetId = manifest_id_counter++;
      console.log('*** asset info:', info);
      const { filename, ext, hash } = info;
      const asset = {
        assetId,
        assetName: filename,
        assetUrl: `${subdir}/${filename}`,
        assetType: ext,
        hash
      };
      entries.push(asset);
    }
    manifest[subdir] = entries;
  } // end subdir processing
  console.log('*** manifest:', manifest);
  return { manifest };
}

/// API HELPERS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: generate a manifest from the passed dataPath */
async function GetManifestFromPath(dataPath: string) {
  // bail if the requested path isn't a directory
  const pathInfo = FILE.GetPathInfo(dataPath);
  if (pathInfo.isFile)
    return { error: `${dataPath} appears to be a file request, not a directory` };

  if (FILE.DirExists(dataPath)) {
    /* is there an predefined manifest file? */
    const manifestObjs = await m_GetPredefinedManifests(dataPath);
    if (manifestObjs.length > 0) return manifestObjs[0];
    /* otherwise, generate the manifest from dataPath */
    return await m_MakeManifestObj(dataPath);
  }
  return { error: `${dataPath} does not exist` };
}

/// DATA STORAGE ADAPTER //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type ExtOptions = DOA_Options & { dataDir: string };
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class SNA_DataObjAdapter extends DataObjAdapter {
  //
  data_dir: string; // root data directory

  /// INITIALIZERS ///

  constructor(opt?: ExtOptions) {
    super(opt);
    if (opt?.dataDir) this.setDataDir(opt?.dataDir);
  }

  /// IMPLEMENTATION-SPECIFIC METHODS ///

  /** extended method to set the data directory for this filesystem-based
   *  data object adapter */
  setDataDir(dataDir: string) {
    if (typeof dataDir !== 'string') {
      throw new Error('dataDir must be a string');
    }
    if (!FILE.DirExists(dataDir)) {
      throw new Error(`dataDir ${dataDir} does not exist`);
    }
    this.data_dir = dataDir;
  }

  /// ABSTRACT API METHOD IMPLEMENTATION ///

  /** returns manifest object from the filesystem */
  async getDatasetInfo(dataURI: DS_DataURI): Promise<DatasetInfo> {
    const { orgDomain, bucketID, instanceID } = DecodeDataURI(dataURI);
    // 1. reference implementation of this reference datastore adapter
    //    knows how to convert the dataURI into a filesystem path
    const orgPath = orgDomain;
    const bucketPath = bucketID;
    const instancePath = instanceID;
    if (this.data_dir === undefined) throw Error(`getDatasetInfo: data_dir not set`);
    const dataPath = PATH.join(this.data_dir, orgPath, bucketPath, instancePath);
    // read manifest from filesystem
    const { manifest, manifest_src, error } = await GetManifestFromPath(dataPath);
    if (error) return { error };
    return { manifest, manifest_src, _dataURI: dataURI };
  }

  /** read dataset object from the filesystem */
  async readDatasetObj(dataURI: string) {
    // console.log('DatasetFS: GetData');
    return mock_GetDataFromFilesystem();
  }

  /** read databin object from the filesystem */
  async readDataBinObj(dataURI: string, binID: DataBinID) {
    console.log('would get databin obj');
    return {};
  }

  /** write dataset object to the filesystem */
  async writeDatasetObj(dataURI: string, dsObj: DS_DatasetObj) {
    console.log('would save dataset');
    return {};
  }

  /** write databin object to the filesystem */
  async writeDataBinObj(dataURI: string, binID: DataBinID, dataObj: any) {
    console.log('would save databin obj');
    return {};
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_DataObjAdapter;
export { SNA_DataObjAdapter };