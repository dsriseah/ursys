/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset Manager

  A top-level manager for interacting with datasets on both the client
  and server. A Dataset contains several named "bins" of a particular data type
  that can be opened and closed. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataSet } from './class-data-dataset.ts';
import { ItemSet } from './class-abstract-itemset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpReturn,
  UR_BinRefID,
  UR_BinType
} from '../../../../_ur/_types/dataset';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type SyncOptions = {
  syncType: 'pull' | 'push' | 'both';
  syncURI: string;
  autoSync: boolean;
};
type BinOptions = SyncOptions & {
  binType: UR_BinType;
  autoCreate: boolean;
};
type DatasetStore = {
  [dataset_name: string]: DataSet;
};
type BinOpResult = OpReturn & { bin?: ItemSet; binName?: UR_BinRefID };

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
/** given a bin reference, open the bin and return the ItemSet */
function Open(ref: UR_BinRefID, options: BinOptions): BinOpResult {
  const DS = DS_DICT.default;
  let bin = DS.openBin(ref);
  return { bin };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an itemset, close the bin and return the bin name if successful */
function Close(itemset: ItemSet): BinOpResult {
  const { name } = itemset;
  const DS = DS_DICT.default;
  let binName = DS.closeBin(name);
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
