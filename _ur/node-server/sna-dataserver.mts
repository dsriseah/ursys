/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-NODE-DATASERVER is the server-side Dataset Manager that handles
  requests from SNA-WEB-DATACLIENT. It uses URNET to handle incoming
  data requests and optionally sync changes back to the client.

  A Dataset contains several named "bins" of DataBin collections which are
  formally as a bucket with a schema. Datasets are in-memory object stores
  intended for real-time manipulation of data. The server is responsible for
  persisting data between sessions.

  Method Summary

  - LoadFromDirectory, LoadFromURI, LoadFromArchive
  - OpenBin, CloseBin
  - DecodeSyncReq, _signalClientDataUpdate

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as FILE from './file.mts';
import * as PATH from 'node:path';
import { Dataset } from '../common/class-data-dataset.ts';
import { DataBin } from '../common/abstract-data-databin.ts';
import {
  DecodeDatasetReq,
  DecodeSyncReq,
  DecodeDataURI
} from '../common/util-data-ops.ts';
import { AddMessageHandler, ServerEndpoint } from './sna-node-urnet-server.mts';
import { IsDataSyncOp, IsDatasetOp } from '../common/util-data-ops.ts';
import { SNA_Hook } from './sna-node-hooks.mts';
import { makeTerminalOut, ANSI } from '../common/util-prompts.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpResult,
  DataBinID,
  DataBinType,
  SyncDataReq,
  DatasetReq,
  UR_DatasetObj
} from '../_types/dataset.d.ts';
import type { SNA_Module } from '../_types/sna.d.ts';
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
  [dataset_name: string]: Dataset;
};
type BinOpRes = OpResult & { bin?: DataBin; binName?: DataBinID };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = makeTerminalOut('SNA.DSRV', 'TagBlue');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// to start, we just have one dataset, but for the future we could support
/// multiple ones in a DatasetStore
let DSET: Dataset;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let SEQ_NUM = 0; // predictable sequence number to order updates

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
function OpenBin(binName: DataBinID, options: BinOptions): BinOpRes {
  const { binType, autoCreate } = options;
  let bin = DSET.openDataBin(binName);
  // todo: subscribe to bin updates
  return { bin };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an databin, close the bin and return the bin name if successful */
function CloseBin(bin: DataBin): BinOpRes {
  const { name } = bin;
  let binName = DSET.closeDataBin(name);
  // todo: unsubscribe to bin updates
  return { binName };
}

/// SIGNALING METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function _signalClientDataUpdate(binID: DataBinID, binType: string, data: any) {
  const EP = ServerEndpoint();
  const seqNum = SEQ_NUM++;
  EP.netSignal('SYNC:CLI_DATA', { binID, binType, seqNum, ...data });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// DATASET MANAGER MESSAGE HANDLERS //////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handler for SYNC:SRV_DSET messages */
async function _asyncHandleDatasetOp(opParams: DatasetReq) {
  const fn = '_asyncHandleDatasetOp:';

  if (DSET !== undefined) {
    return { status: 'loaded', data: DSET._getDataObj() };
  }

  const { dataURI, authToken, op, error } = DecodeDatasetReq(opParams);
  if (error) return { error };
  // TODO: check authToken against datasetURI
  // TODO: use dataURI to locate the stored data
  // TODO: load the stored data

  /** mock data loading from filesystem, decide where it goes later */
  const mock_GetDataFromFilesystem = () => {
    // dummy hardcoded load
    const rootDir = FILE.DetectedRootDir();
    const dataPath = PATH.join(rootDir, '_ur/tests/data/');
    const jsonFile = PATH.join(dataPath, 'mock-dataset.json');
    const data = FILE.ReadJSON(jsonFile);
    return data;
  };

  /** mock data initialization of dataset, decide where it goes later */
  const mock_InitializeDatasetFromData = (
    dataset: Dataset,
    inputData: UR_DatasetObj
  ) => {
    const { _schema, _dataURI, DocFolders, ItemLists } = inputData;
    if (_schema) dataset._schema = _schema;
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

  // process the operations

  let data;
  let result: OpResult;
  switch (op) {
    case 'LOAD':
      // load the dataset into memor
      // placeholder process to work out the data loading
      if (DSET === undefined) {
        DSET = new Dataset('default');
        data = mock_GetDataFromFilesystem();
        mock_InitializeDatasetFromData(DSET, data);
        result = { status: 'loaded', data: DSET._getDataObj() };
      } else {
        result = { status: 'already loaded', data: DSET._getDataObj() };
      }
      break;
    case 'UNLOAD':
      DSET = undefined;
      result = { status: 'unloaded' };
      break;
    case 'PERSIST':
      LOG('** would persist dataset to disk');
      result = { status: 'persisted' };
      break;
    case 'GET':
      result = {
        status: 'ok',
        dataURI: DSET._dataURI,
        schema: DSET._schema,
        data: DSET._getDataObj()
      };
      break;
    case 'GET_MANIFEST':
      LOG('** would return manifest');
      result = { manifest: '{}' };
      break;
    default:
      result = { error: `${fn} op [${op}] not recognized` };
  } // switch
  return result;
}

/// DATASYNC MESSAGE HANDLERS /////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handler for SYNC:SRV_DATA messages */
async function _asyncHandleDataOp(opParams: SyncDataReq) {
  const { binID, op, items, ids, searchOpt, error } = DecodeSyncReq(opParams);
  if (error) return { error };
  const bin = DSET.getDataBin(binID);
  if (bin === undefined) return { error: `DSRV: bin [${binID}] not found` };
  if (!items && !ids) return { error: 'DSRV: items or ids required' };
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
/** PreHook is called just before the SNA Lifecycle is started, so here is
 *  where your module can declare where it needs to do something */
function PreHook() {
  SNA_Hook('EXPRESS_READY', () => {
    AddMessageHandler('SYNC:SRV_DSET', _asyncHandleDatasetOp);
    AddMessageHandler('SYNC:SRV_DATA', _asyncHandleDataOp);
  });
}
/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SNA_MODULE: SNA_Module = {
  _name: 'dataserver',
  PreHook
};
export default SNA_MODULE;
export {
  LoadFromDirectory, // pathToDataset => void
  LoadFromURI, // datasetURI => void
  LoadFromArchive, // pathToZip => void
  OpenBin, // binName, options => BinOpRes
  CloseBin // databin => BinOpRes
};
