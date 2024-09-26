/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-NODE-DATASERVER is the server-side Dataset Manager that uses the 

  A Dataset contains several named "bins" of a particular data type
  that can be opened and closed. 

  This is a module that is dependent on SNA, as it draws on the SNA server
  lifecycle to manage its initialization. To use it in an SNA program,
  you just need to import the module.

  This module implements the `SYNC:SRV` protocol for receiving requests to
  access and mutate a dataset consisting of multiple collection bins of
  type ItemSet. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataSet } from '../common/class-data-dataset.ts';
import { ItemSet } from '../common/class-data-itemset.ts';
import { AddMessageHandler, GetServerEndpoint, Hook } from './sna-node.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { ReturnObj, UR_BinRefID, UR_BinType } from '../_types/dataset.d.ts';
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
type BinOpResult = ReturnObj & { bin?: ItemSet; binName?: UR_BinRefID };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// to start, we just have one dataset, but for the future we could support
/// multiple ones.
const DS_DICT: DatasetStore = { 'default': new DataSet('default') };
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
/** given a bin reference, open the bin and return the ItemSet */
function OpenBin(binName: UR_BinRefID, options: BinOptions): BinOpResult {
  const { binType, autoCreate } = options;
  let bin = DATA.openBin(binName);
  return { bin };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an itemset, close the bin and return the bin name if successful */
function CloseBin(itemset: ItemSet): BinOpResult {
  const { name } = itemset;
  let binName = DATA.closeBin(name);
  return { binName };
}

/// URNET MESSAGE HELPERS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_CheckDataParams(data: any) {
  const { cName, accToken, ids, items } = data;
  // required params
  if (accToken === undefined) return { error: 'cType, accToken is required' };
  if (!cName) return { error: 'cName is required' };
  if (typeof cName !== 'string') return { error: 'cName must be a string' };
  if (DATA.getBin(cName) === undefined)
    return { error: `itemset ${cName} not found` };
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
  return { cName, cType, accToken, ids, items };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_NotifyClients(cName: UR_BinRefID, cType: string, data: any) {
  const EP = GetServerEndpoint();
  const seqNum = SEQ_NUM++;
  EP.netSignal('SYNC:CLI_DATA', { cName, cType, seqNum, ...data });
}

/// URNET DATA HANDLING API ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function HookServerDataSync() {
  AddMessageHandler('SYNC:SRV_DATA_INIT', async (params: any) => {
    const { cName, cType, accToken, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    itemset.clear();
    const items = itemset.getItems();
    return { items };
  });

  /** accept optional id[], return { items, error } */
  AddMessageHandler('SYNC:SRV_DATA_GET', async (params: any) => {
    const { cName, cType, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    return itemset.read(ids);
  });

  /** accept item[], return { added, error } */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    const addObj = itemset.add(items);
    m_NotifyClients(cName, cType, addObj);
    return addObj;
  });

  /** accept item[], return { updated, error } */
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    const updObj = itemset.update(items);
    m_NotifyClients(cName, cType, updObj);
    return updObj;
  });

  /** accepts item[], return { added, updated, error } */
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    const writObj = itemset.write(items);
    m_NotifyClients(cName, cType, writObj);
    return writObj;
  });

  /** accepts item[], return { replace, error } */
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    const oldItems = itemset.replace(items); // returns the old items
    const replaced = [...items];
    m_NotifyClients(cName, cType, { replaced, oldItems });
    return oldItems;
  });

  /** accepts id[], returning deleted:items[] */
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (params: any) => {
    const { cName, cType, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const itemset = DATA.getBin(cName);
    const result = itemset.deleteIDs(ids);
    m_NotifyClients(cName, cType, result);
    return result;
  });
}

/// DATASET API ///////////////////////////////////////////////////////////////
/// for direct interfacing to the dataset manager (server-side instance)
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME HOOKS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** declare the data message handler when the express server is ready,
 *  just before listening */
Hook('EXPRESS_READY', HookServerDataSync);

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  LoadFromDirectory, //
  LoadFromURI,
  LoadFromArchive,
  OpenBin,
  CloseBin
};
