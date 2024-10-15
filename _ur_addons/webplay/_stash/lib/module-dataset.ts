/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset Manager

  A top-level manager for interacting with datasets on both the client
  and server. A Dataset contains several named "bins" of a particular data type
  that can be opened and closed. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataSet } from './class-data-dataset.ts';
import { DataBin } from './class-abstract-itemset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpResult,
  DataBinID,
  DataBinType
} from '../../../../_ur/_types/dataset';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type SyncOptions = {
  syncType: 'pull' | 'push' | 'both';
  syncURI: string;
  autoSync: boolean;
};
type BinOptions = SyncOptions & {
  binType: DataBinType;
  autoCreate: boolean;
};
type DatasetStore = {
  [dataset_name: string]: DataSet;
};
type BinOpRes = OpResult & { bin?: DataBin; binName?: DataBinID };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// to start, we just have one dataset, but for the future we could support
/// multiple ones.
const DS_DICT: DatasetStore = { 'default': new DataSet('default') };

/// INITIALIZATION METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function LoadFromDirectory(pathToDataset: string) {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function LoadFromURI(datasetURI: string) {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function LoadFromArchive(pathToZip: string) {}

/// DATASET ACCESS METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given a bin reference, open the bin and return the DataBin */
function Open(ref: DataBinID, options: BinOptions): BinOpRes {
  const DS = DS_DICT.default;
  let bin = DS.openDataBin(ref);
  return { bin };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an itemset, close the bin and return the bin name if successful */
function Close(itemset: DataBin): BinOpRes {
  const { name } = itemset;
  const DS = DS_DICT.default;
  let binName = DS.closeDataBin(name);
  return { binName };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  LoadFromDirectory, //
  LoadFromURI,
  LoadFromArchive,
  Open,
  Close
};
