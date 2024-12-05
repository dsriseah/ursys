/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-NODE-DATASERVER is the server-side Dataset Manager that handles
  requests from SNA-WEB-DATACLIENT. It uses URNET to handle incoming
  data requests and optionally sync changes back to the client.

  A Dataset contains several named "bins" of DataBin collections which are
  formally as a bucket with a schema. Datasets are in-memory object stores
  intended for real-time manipulation of data. The server is responsible for
  persisting data between sessions.

  Method Summary

  - LoadDataset, CloseDataset, PersistDataset
  - OpenBin, CloseBin
  - DecodeSyncReq, _signalClientDataUpdate

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { Dataset } from '../common/class-data-dataset.ts';
import { DataBin } from '../common/abstract-data-databin.ts';
import { DecodeDatasetReq, DecodeSyncReq } from '../common/util-data-ops.ts';
import { SNA_DataObjAdapter } from './sna-dataobj-adapter.mts';
import { AddMessageHandler, ServerEndpoint } from './sna-node-urnet-server.mts';
import { SNA_HookServerPhase, SNA_DeclareComponent } from './sna-node-hooks.mts';
import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpResult,
  DataBinID,
  DataBinType,
  DataSyncReq,
  DatasetReq,
  DS_DatasetObj,
  DS_DataURI
} from '../_types/dataset.d.ts';
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
type DatasetCache = {
  [dataset_name: string]: Dataset;
};
type BinOpRes = OpResult & { bin?: DataBin; binName?: DataBinID };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = makeTerminalOut('SNA.DSRV', 'TagBlue');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// to start, we just have one dataset, but for the future we could support
/// multiple ones in a DatasetCache
const DATASETS: DatasetCache = {};
const DSFS = new SNA_DataObjAdapter();
let cur_data_uri = ''; // a dataURI
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SEQ_NUM = 0; // predictable sequence number to order updates

/// DATASET OPERATIONS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Load a dataset from the dataURI, return the data object */
async function LoadDataset(dataURI: DS_DataURI): Promise<OpResult> {
  let dset = DATASETS[dataURI];
  if (dset) return { status: 'already loaded', manifest: dset.manifest };
  const { manifest, error } = await DSFS.getManifest(dataURI);
  if (error) return { error };
  dset = new Dataset(dataURI, manifest);
  DATASETS[dataURI] = dset;
  // now load the dataset data
  const dataObj = await DSFS.readDatasetObj(dataURI);
  DATASETS[dataURI]._setFromDataObj(dataObj);
  cur_data_uri = dataURI;
  return {};
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: */
async function CloseDataset(dataURI: DS_DataURI) {
  return { error: 'not implemented' };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: given  tell the current dataset to persist (write) to disk */
async function PersistDataset(dataURI: DS_DataURI): Promise<OpResult> {
  const dset = DATASETS[dataURI];
  if (dset === undefined) return { error: `dataset [${dataURI}] not found` };
  const dataObj = dset._getDataObj();
  const { manifest, error } = await DSFS.writeDatasetObj(dataURI, dataObj);
  return { error };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: */
async function GetDatasetData(dataURI?: DS_DataURI): Promise<DS_DatasetObj> {
  const dset = DATASETS[dataURI || cur_data_uri];
  if (dset === undefined) return { error: `dataset [${dataURI}] not found` };
  const dataObj = {
    _dataURI: dset._dataURI,
    ...dset._getDataObj()
  };
  return dataObj;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: */
async function GetManifest(dataURI?: string) {
  const dset = DATASETS[dataURI || cur_data_uri];
  return dset.getManifest();
}

/// DATASET BIN OPERATIONS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: given a bin reference, open the bin and return the DataBin */
function OpenBin(binName: DataBinID, options: BinOptions): BinOpRes {
  const { binType, autoCreate } = options;
  const DSET = DATASETS[cur_data_uri];
  let bin = DSET.openDataBin(binName);
  // todo: subscribe to bin updates
  return { bin };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: given an databin, close the bin and return the bin name if successful */
function CloseBin(bin: DataBin): BinOpRes {
  const { name } = bin;
  const DSET = DATASETS[cur_data_uri];
  let binName = DSET.closeDataBin(name);
  // todo: unsubscribe to bin updates
  return { binName };
}

/// DSYNC_STORE OBJECT OPERATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: data initialization of dataset */
const InitializeDatasetFromObj = (dataset: Dataset, inputData: DS_DatasetObj) => {
  dataset._setFromDataObj(inputData);
};

/// DSYNC_STORE PROTOCOL OPERATIONS //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** signal clients to update their data */
function _signalClientDataUpdate(binID: DataBinID, binType: string, data: any) {
  const EP = ServerEndpoint();
  const seqNum = SEQ_NUM++;
  EP.netSignal('SYNC:CLI_DATA', { binID, binType, seqNum, ...data });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** async handler for SYNC:SRV_DSET messages */
async function _handleDatasetOp(opParams: DatasetReq) {
  const fn = '_handleDatasetOp:';
  const { dataURI, authToken, op, error } = DecodeDatasetReq(opParams);
  if (error) return { error };

  // TODO: check authToken against dataURI

  /** mock data initialization of dataset, decide where it goes later */
  const mock_InitializeDatasetFromData = (
    dataset: Dataset,
    inputData: DS_DatasetObj
  ) => {
    const { _dataURI, ItemDicts, ItemLists } = inputData;
    if (_dataURI) dataset._dataURI = _dataURI;
    LOG(`.. initializing dataset: ${dataset.dataset_name} from ${_dataURI}`);
    if (ItemLists) {
      for (const [name, dataBinObj] of Object.entries(ItemLists)) {
        // LOG(`.. 185 dataObj`, dataObj);
        const bin = dataset.createDataBin(name, 'ItemList');
        // add the items to the bin
        const { error, items: i } = bin._setFromDataObj(dataBinObj);
        if (error) {
          LOG(`.. error adding items to ItemList [${name}]`, error, bin);
        } else {
          LOG(`.. set data objects ${i.length} items to ItemList [${name}]`);
        }
      }
    }
    LOG('.. dataset initialized', Object.keys(dataset._getDataObj()).join(', '));
  };
  let data;
  let result: OpResult;
  switch (op) {
    case 'LOAD':
      result = LoadDataset(dataURI);
      break;
    case 'UNLOAD':
      result = CloseDataset(dataURI);
      break;
    case 'PERSIST':
      result = PersistDataset(dataURI);
      break;
    case 'GET_DATA':
      result = GetDatasetData(dataURI);
      break;
    case 'GET_MANIFEST':
      result = GetManifest(dataURI);
      LOG('** would return manifest');
      result = { manifest: '{}' };
      break;
    default:
      result = { error: `${fn} op [${op}] not recognized` };
  } // switch
  return result;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handler for SYNC:SRV_DATA databin operations */
async function _handleDataOp(opParams: DataSyncReq) {
  const { binID, op, items, ids, searchOpt, error } = DecodeSyncReq(opParams);
  if (error) return { error };
  const DSET = DATASETS[cur_data_uri];
  const bin = DSET.getDataBin(binID);
  if (bin === undefined) return { error: `DSRV: bin [${binID}] not found` };
  // todo: add notification handling
  // todo: change to return 'success' rather than the data
  switch (op) {
    case 'GET':
      if (ids) return bin.read(ids);
      return bin.get();
    case 'ADD':
      if (items) return bin.add(items);
      return { error: 'DSRV: items required for ADD operation' };
    case 'UPDATE':
      if (items) return bin.update(items);
      return { error: 'DSRV: items required for UPDATE operation' };
    case 'WRITE':
      if (items) return bin.write(items);
      return { error: 'DSRV: items required for WRITE operation' };
    case 'DELETE':
      if (ids) return bin.deleteIDs(ids);
      if (items) return bin.delete(items);
      return { error: 'DSRV: ids or items required for DELETE operation' };
    case 'REPLACE':
      if (items) return bin.replace(items);
      return { error: 'DSRV: items required for REPLACE operation' };
    case 'CLEAR':
      return bin.clear();
    case 'FIND':
      if (searchOpt) return bin.find(searchOpt);
      return { error: 'DSRV: searchOpt required for FIND operation' };
    case 'QUERY':
      if (searchOpt) return bin.query(searchOpt);
      return { error: 'DSRV: searchOpt required for QUERY operation' };
    default:
      return { error: `DSRV: operation ${op} not recognized` };
  }
}

/// SNA MODULE API ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** PreConfig is called before PreHook before SNALifecycle is started. We
 *  want to grab the runtime_dir and set up the data object adapter */
function PreConfig(config) {
  const { runtime_dir } = config;
  DSFS.setDataDir(runtime_dir);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** PreHook is called just before the SNA Lifecycle is started, so here is
 *  where your module can declare where it needs to do something */
function PreHook() {
  SNA_HookServerPhase('EXPRESS_READY', () => {
    AddMessageHandler('SYNC:SRV_DSET', _handleDatasetOp);
    AddMessageHandler('SYNC:SRV_DATA', _handleDataOp);
  });
}
/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_DeclareComponent('dataserver', {
  PreConfig,
  PreHook
});
export {
  LoadDataset, // pathToDataset => void
  CloseDataset, // dataURI => void
  PersistDataset, // pathToZip => void
  OpenBin, // binName, options => BinOpRes
  CloseBin // databin => BinOpRes
};
