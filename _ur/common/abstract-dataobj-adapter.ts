/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  DataObjectAdapters are the bridge between the SNA Dataset API and the
  underlying data storage mechanism. This adapter provides access to
  pure data objects inside a Dataset pointed-to by a DataURI. 

  A Dataset is a collection of DataBins that organize their content with
  a _id key such as lists or dictionaries. The DataObjectAdapter provides
  the means to read/write the entire dataset or its data bins. 

  A dataset is not the same as a dataobjectstore, though they are related.
  The dataURI is the unique identifier for a dataset. The  dataobjectstore
  is the persisted data for the dataset. In the reference implementation,
  the dataobject store is a directory of JSON files, each file representing
  a data bin in serialized form. 

  To convert that identifier to a particular storage location that contains
  the actual contents of the dataset, the dataobjectstore adapter is used. 
  Its API performs read/write operations based on the dataURI, providing 
  the means to read/write the dataset files.

  The reference implementation is a filesystem-based adapter that works
  with JSON files in a directory, described by a manifest file that declares
  what storage resources are assigned to the dataset.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DecodeDataURI, IsAssetDirname } from './util-data-ops';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  IDS_DataObjectAdapter,
  IDS_Serialize,
  DS_DatasetObj,
  UR_ManifestObj,
  DS_DataURI,
  DataBinID
} from '../_types/dataset.js';
type DSObj = DS_DatasetObj;
type DSMan = UR_ManifestObj;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type DOA_Options = {
  dataURI?: DS_DataURI;
  accToken?: string;
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const MANIFEST_FILENAME = '00-manifest';
let manifest_id_counter = 1000; // asset id counter

/// DATA STORAGE ADAPTER //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
abstract class DataObjAdapter implements IDS_DataObjectAdapter {
  //
  dataURI: DS_DataURI;
  accToken: string; // access token
  //
  constructor(opt?: DOA_Options) {
    if (typeof opt === 'object') {
      const { dataURI, accToken } = opt;
      this.dataURI = dataURI;
      this.accToken = accToken;
    }
  }

  abstract getManifest(dataURI: DS_DataURI): Promise<UR_ManifestObj>;
  abstract readDatasetObj(dataURI: string): Promise<DS_DatasetObj>;
  abstract writeDatasetObj(dataURI: string, dsObj: DS_DatasetObj): Promise<any>;
  abstract readDataBinObj(dataURI: string, binID: DataBinID): Promise<any>;
  abstract writeDataBinObj(
    dataURI: string,
    binID: DataBinID,
    dataObj: any
  ): Promise<any>;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DataObjAdapter;
export { DataObjAdapter };
