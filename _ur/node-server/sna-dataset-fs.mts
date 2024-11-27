/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Reference Dataset Storage Module using Filesystem



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as FILE from './file.mts';
import * as PATH from 'node:path';
import { DecodeDataURI, IsAssetDirname } from '../common/util-data-ops.ts';
import { SNA_DeclareModule } from './sna-node-hooks.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DS_DatasetObj,
  DS_DataURI,
  DataBinID,
  DataObj,
  OpResult
} from '../_types/dataset.d.ts';
///
type DatasetInfo = { manifest?: any; error?: string };
interface IDS_DataObjectAdapter {
  readDatasetInfo(dataURI: DS_DataURI): Promise<DatasetInfo>;
  readDatasetObj(dataURI: DS_DataURI): Promise<DS_DatasetObj>;
  readDataBinObj(dataURI: DS_DataURI, binID: DataBinID): Promise<DataObj>;
  writeDatasetObj(dataURI: DS_DataURI, dsObj: DS_DatasetObj): Promise<OpResult>;
}

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const MANIFEST_FILENAME = '00-manifest';
let manifest_id_counter = 1000; // asset id counter

/// DUMMY STORAGE CLASS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function mock_GetDataFromFilesystem() {
  // dummy hardcoded load
  const rootDir = FILE.DetectedRootDir();
  const dataPath = PATH.join(rootDir, '_ur/tests/data/');
  const jsonFile = PATH.join(dataPath, 'mock-dataset.json');
  const data = FILE.ReadJSON(jsonFile);
  return data;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Knows how to retrieve dataobjs from a dataURI */
class DataStorageAdapter implements IDS_DataObjectAdapter {
  ///
  constructor() {}

  /// PRIVATE HELPERS ///

  async _getPredefinedManifests(dataPath: string) {
    const allfiles = FILE.Files(dataPath);
    const mfiles = allfiles
      .filter(f => f.startsWith(MANIFEST_FILENAME) && f.endsWith('.json'))
      .sort();
    // case 1: 1 more more manifest files exist
    if (mfiles.length > 0) {
      const manifestObjs = [];
      for (let f of mfiles) {
        const obj = FILE.ReadJSON(`${dataPath}/${f}`);
        manifestObjs.push(obj);
      }
      return manifestObjs;
    }
    // case 2: no manifest files found
    return [];
  }

  async _getManifestFromPath(dataPath: string) {
    // bail if the requested path isn't a directory
    const pathInfo = FILE.GetPathInfo(dataPath);
    if (pathInfo.isFile) {
      return { error: `${dataPath} appears to be a file request, not a directory` };
    }
    if (FILE.DirExists(dataPath)) {
      /* is there an predefined manifest file? */
      const manifestObjs = await this._getPredefinedManifests(dataPath);
      if (manifestObjs.length > 0) return { manifest: manifestObjs[0] };
      /* otherwise, generate the manifest from dataPath */
      const { dirs } = FILE.GetDirContent(dataPath);
      const assetDirs = dirs.filter(d => IsAssetDirname(d));
      if (assetDirs.length > 0) {
        return { manifest: await this._makeManifestObj(assetDirs) };
      }
      // no asset dirs found
      return { error: `${dataPath} contains no asset directories` };
    }
    return { error: `${dataPath} does not exist` };
  }

  async _getAssetFileInfo(assetPath: string) {
    const files = FILE.Files(assetPath);
    const assetInfo = await FILE.FilesHashInfo(files);
    return assetInfo;
  }

  async _makeManifestObj(assetDirs: string[]) {
    const manifest = {};
    for (const subdir of assetDirs) {
      const assetInfo = await this._getAssetFileInfo(subdir);
      const entries = [];
      for (let info of assetInfo) {
        const assetId = manifest_id_counter++;
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
    return manifest;
  }

  /// MAIN API ///

  async readDatasetInfo(dataURI: DS_DataURI) {
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
    const { manifest, error } = await this._getManifestFromPath(dataPath);
    if (error) return { error };
    return { manifest };
  }
  async readDatasetObj(dataURI: string) {
    // console.log('DatasetFS: GetData');
    return mock_GetDataFromFilesystem();
  }
  async readDataBinObj(dataURI: string, binID: DataBinID) {
    console.log('would get databin obj');
    return {};
  }
  async writeDatasetObj(dataURI: string, dsObj: DS_DatasetObj) {
    console.log('would save dataset');
    return {};
  }
}

/// MAIN API ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DSFS = new DataStorageAdapter();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: given a dataPath, return the manifest object */
async function GetManifest(dataURI: DS_DataURI): Promise<DatasetInfo> {
  const result = await DSFS.readDatasetInfo(dataURI);
  return result;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function GetDatasetObj(dataURI: DS_DataURI): Promise<DS_DatasetObj> {
  return DSFS.readDatasetObj(dataURI);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function GetDataBinObj(
  dataURI: DS_DataURI,
  binID: DataBinID
): Promise<DataObj> {
  return DSFS.readDataBinObj(dataURI, binID);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function SaveDataset(
  dataURI: DS_DataURI,
  dsObj: DS_DatasetObj
): Promise<OpResult> {
  return DSFS.writeDatasetObj(dataURI, dsObj);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** SNA_Module defines a component that can participate in the SNA Lifecycle
 *  by "hooking" into it. Once a SNA_Module is registered, it will be called
 *  with the PreConfig() and PreHook() methods to allow the module to
 *  independently manage itself and its data */
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_DeclareModule('dataset_fs', {});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  GetManifest, //
  GetDatasetObj,
  GetDataBinObj,
  SaveDataset
};
