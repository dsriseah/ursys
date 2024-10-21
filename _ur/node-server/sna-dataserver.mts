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
  - DecodeSyncReq, m_NotifyClients

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { Dataset } from '../common/class-data-dataset.ts';
import { DataBin } from '../common/abstract-data-databin.ts';
import { AddMessageHandler, ServerEndpoint } from './sna-node-urnet-server.mts';
import { IsDataSyncOp } from '../common/util-data-ops.ts';
import { SNA_Hook } from './sna-node-hooks.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpResult,
  DataBinID,
  DataBinType,
  SyncDataReq,
  DatastoreReq,
  SyncDataOp
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
type DatasetStore = {
  [dataset_name: string]: Dataset;
};
type BinOpRes = OpResult & { bin?: DataBin; binName?: DataBinID };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// to start, we just have one dataset, but for the future we could support
/// multiple ones.
const DS_DICT: DatasetStore = { 'default': new Dataset('default') };
const DATA = DS_DICT.default;
let SEQ_NUM = 0; // very predictable sequence number

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
  let bin = DATA.openDataBin(binName);
  return { bin };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an itemset, close the bin and return the bin name if successful */
function CloseBin(itemset: DataBin): BinOpRes {
  const { name } = itemset;
  let binName = DATA.closeDataBin(name);
  return { binName };
}

/// URNET MESSAGE HELPERS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** confirm that parameters are correct for synchronizing data */
function DecodeSyncReq(syncReq: SyncDataReq) {
  const { accToken, op, binID, ids, items, searchOpt } = syncReq;
  // required params
  if (accToken === undefined) return { error: 'binType, accToken is required' };
  if (!IsDataSyncOp(op) === false) return { error: `op ${op} not recognized` };
  if (!binID) return { error: 'binID is required' };
  if (typeof binID !== 'string') return { error: 'binID must be a string' };
  if (DATA.getDataBin(binID) === undefined)
    return { error: `itemset ${binID} not found` };
  // optional params
  if (ids) {
    if (!Array.isArray(ids)) return { error: 'ids must be an array' };
    if (ids.some(id => typeof id !== 'string'))
      return { error: 'ids must be an array of string IDs' };
  }
  if (items) {
    if (!Array.isArray(items)) return { error: 'items must be an array' };
    if (items.some(item => typeof item !== 'object'))
      return { error: 'items must be an array of objects' };
  }
  if (searchOpt) {
    if (typeof searchOpt !== 'object')
      return { error: 'searchOpt must be an object' };
    if (Object.keys(searchOpt).length === 0)
      return { error: 'searchOpt must have at least one key' };
    if (searchOpt.preFilter || searchOpt.postFilter) {
      return { error: 'filters not supported for remote ops' };
    }
  }
  // everything good, then return the data
  return { binID, op, accToken, ids, items, searchOpt };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** confirm that parameters are correct for connecting to a datastore */
function m_CheckDatastoreData(data: DatastoreReq) {
  const { dataURI, authToken } = data;
  if (!dataURI) return { error: 'dataURI is required' };
  if (typeof dataURI !== 'string') return { error: 'dataURI must be a string' };
  return { dataURI, authToken };
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_NotifyClients(binID: DataBinID, binType: string, data: any) {
  const EP = ServerEndpoint();
  const seqNum = SEQ_NUM++;
  EP.netSignal('SYNC:CLI_DATA', { binID, binType, seqNum, ...data });
}

/// URNET DATASET CONNECTION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** implements dataset-level services */
function HookDatastoreServices() {
  /** accept */
  AddMessageHandler('SYNC:SRV_DSET_LOAD', async (params: DatastoreReq) => {
    const { dataURI } = m_CheckDatastoreData(params);
    // TODO: implement data loading
  });
}

/// URNET DATA HANDLING API ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** implements databin-level services */
function HookServerDataSync() {
  AddMessageHandler('SYNC:SRV_DATA', async (syncPacket: SyncDataReq) => {
    const { binID, op, items, ids, searchOpt, error } = DecodeSyncReq(syncPacket);
    if (error) return { error };
    const bin = DATA.getDataBin(binID);
    if (bin === undefined) return { error: `bin ${binID} not found` };
    if (!items && !ids) return { error: 'items or ids required' };
    switch (op) {
      case 'GET':
        if (ids) return bin.read(ids);
        return bin.get();
      case 'ADD':
        if (items) return bin.add(items);
        return { error: 'items required for ADD operation' };
      case 'UPDATE':
        if (items) return bin.update(items);
        return { error: 'items required for UPDATE operation' };
      case 'WRITE':
        if (items) return bin.write(items);
        return { error: 'items required for WRITE operation' };
      case 'DELETE':
        if (ids) return bin.deleteIDs(ids);
        if (items) return bin.delete(items);
        return { error: 'ids or items required for DELETE operation' };
      case 'REPLACE':
        if (items) return bin.replace(items);
        return { error: 'items required for REPLACE operation' };
      case 'CLEAR':
        return bin.clear();
      case 'FIND':
        if (searchOpt) return bin.find(searchOpt);
        return { error: 'searchOpt required for FIND operation' };
      case 'QUERY':
        if (searchOpt) return bin.query(searchOpt);
        return { error: 'searchOpt required for QUERY operation' };
      default:
        return { error: `operation ${op} not recognized` };
    }
  });
}

/// RUNTIME HOOKS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** declare the data message handler when the express server is ready,
 *  just before listening */
SNA_Hook('EXPRESS_READY', HookServerDataSync);
SNA_Hook('EXPRESS_READY', HookDatastoreServices);

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  LoadFromDirectory, // pathToDataset => void
  LoadFromURI, // datasetURI => void
  LoadFromArchive, // pathToZip => void
  OpenBin, // binName, options => BinOpRes
  CloseBin // itemset => BinOpRes
};
