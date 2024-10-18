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
  - m_CheckSyncData, m_NotifyClients

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { Dataset } from '../common/class-data-dataset.ts';
import { DataBin } from '../common/abstract-data-databin.ts';
import { AddMessageHandler, ServerEndpoint } from './sna-node-urnet-server.mts';
import { SNA_Hook } from './sna-node-hooks.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpResult,
  DataBinID,
  DataBinType,
  SyncDataReq,
  DatastoreReq,
  SyncOp
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
function m_CheckSyncData(data: SyncDataReq) {
  const { binID, accToken, ids, items } = data;
  // required params
  if (accToken === undefined) return { error: 'cType, accToken is required' };
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
  // everything good, then return the data
  const cType = 'ItemList';
  return { binID, cType, accToken, ids, items };
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
function m_NotifyClients(binID: DataBinID, cType: string, data: any) {
  const EP = ServerEndpoint();
  const seqNum = SEQ_NUM++;
  EP.netSignal('SYNC:CLI_DATA', { binID, cType, seqNum, ...data });
}

/// URNET DATASET CONNECTION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function HookDatastoreServices() {
  /** accept */
  AddMessageHandler('SYNC:SRV_LOAD_DATASTORE', async (params: DatastoreReq) => {
    const { dataURI } = m_CheckDatastoreData(params);
  });
}

/// URNET DATA HANDLING API ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function HookServerDataSync() {
  AddMessageHandler('SYNC:SRV_DATA_INIT', async (params: SyncDataReq) => {
    const { binID, cType, accToken, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    itemset.clear();
    const items = itemset.getItems();
    return { items };
  });

  /** accept optional id[], return { items, error } */
  AddMessageHandler('SYNC:SRV_DATA_GET', async (params: SyncDataReq) => {
    const { binID, cType, accToken, ids, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    return itemset.read(ids);
  });

  /** accept item[], return { added, error } */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (params: SyncDataReq) => {
    const { binID, cType, accToken, items, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    const addObj = itemset.add(items);
    m_NotifyClients(binID, cType, addObj);
    return addObj;
  });

  /** accept item[], return { updated, error } */
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (params: SyncDataReq) => {
    const { binID, cType, accToken, items, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    const updObj = itemset.update(items);
    m_NotifyClients(binID, cType, updObj);
    return updObj;
  });

  /** accepts item[], return { added, updated, error } */
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (params: SyncDataReq) => {
    const { binID, cType, accToken, items, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    const writObj = itemset.write(items);
    m_NotifyClients(binID, cType, writObj);
    return writObj;
  });

  /** accepts item[], return { replace, error } */
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (params: SyncDataReq) => {
    const { binID, cType, accToken, items, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    const oldItems = itemset.replace(items); // returns the old items
    const replaced = [...items];
    m_NotifyClients(binID, cType, { replaced, oldItems });
    return oldItems;
  });

  /** accepts id[], returning deleted:items[] */
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (params: SyncDataReq) => {
    const { binID, cType, accToken, ids, error } = m_CheckSyncData(params);
    if (error) return { error };
    const itemset = DATA.getDataBin(binID);
    const result = itemset.deleteIDs(ids);
    m_NotifyClients(binID, cType, result);
    return result;
  });
}

/// RUNTIME HOOKS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** declare the data message handler when the express server is ready,
 *  just before listening */
SNA_Hook('EXPRESS_READY', HookServerDataSync);

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  LoadFromDirectory, // pathToDataset => void
  LoadFromURI, // datasetURI => void
  LoadFromArchive, // pathToZip => void
  OpenBin, // binName, options => BinOpRes
  CloseBin // itemset => BinOpRes
};
