/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-WEB-DATACLIENT is the client-side data manager that mirrors a 
  server-side dataset. It uses URNET network to perform data operations with
  SNA-NODE-DATASERVER

  A Dataset contains several named "bins" of DataBin collections which are
  formally as a bucket with a schema. Datasets are in-memory object stores
  intended for real-time manipulation of data.

  Method Summary

  - Get, Add, Update, Delete, Replace, Init
  - SetRemoteDataAdapter, QueueRemoteDataOp
  - m_ProcessOpQueue

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '../common/util-prompts.ts';
import {
  Hook,
  AddMessageHandler,
  ClientEndpoint,
  RegisterMessages
} from './sna-web.ts';
import { Dataset } from '../common/class-data-dataset.ts';
import { DecodeDataURI, DecodeDataConfig } from '../common/util-data-ops.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DataObj,
  OpResult,
  RemoteStoreAdapter,
  DatasetReq,
  DatasetRes,
  SyncDataOptions,
  SyncDataReq,
  SyncDataRes,
  SyncDataMode,
  UR_Item,
  UR_DatasetURI,
  UR_DatasetObj,
  SearchOptions,
  RecordSet,
  SNA_EvtHandler,
  SNA_Module
} from '../@ur-types.d.ts';
//

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('SNA.DCI', 'TagBlue');
const LOG = console.log.bind(console);
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let DSET: Dataset; // singleton instance of the dataset
let DS_URI: UR_DatasetURI; // the dataset URI
let DS_MODE: SyncDataMode; // the dataset mode

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** receives global config object to initialize local settings */
function m_PreConfigHandler(config: DataObj): OpResult {
  const { dataset } = config;
  if (dataset) {
    const { uri, mode } = dataset;
    if (!uri) return { error: 'missing uri property' };
    if (!mode) return { error: 'missing mode property' };
    DS_URI = uri;
    DS_MODE = mode;
    return { uri, mode };
  }
  return { error: 'missing dataset property' };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** invoked during SNA:LOAD_DATA phase, after PreConfig has configured
 *  the dataset URI and mode. The purpose of this code is to just set up
 *  the datalink; afterwards, datacore modules can just open/load bins */
async function HOOK_NetDataset() {
  const fn = 'HOOK_LoadData:';
  let dataURI = DS_URI;
  LOG(...PR(`${fn} establishing datalink to ${dataURI}`));
  const opts = { mode: DS_MODE };
  let res: OpResult;
  // configure the dataset
  res = await Configure(dataURI, opts); // => { adapter, handlers }
  if (res.error) throw Error(`Configure ${res.error}`);
  // connect the dataset
  res = await Activate(); // => { dataURI, ItemLists }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** here is the opportunity to register hooks before the lifecycle starts */
function m_AddLifecycleHooks() {
  Hook('NET_DATASET', HOOK_NetDataset);
}

/// DEFAULT SNA-DATASERVER REMOTE ///////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let F_ReadOnly: boolean = false; // set to true to prevent remote writes
let F_SyncInit: boolean = false; // set to true to sync data on init
let REMOTE: RemoteStoreAdapter; // the remote data adapter
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LocalAdapter: RemoteStoreAdapter = {
  accToken: '',
  selectDataset: async (dsReq: DatasetReq) => {
    const EP = ClientEndpoint();
    if (EP) {
      const res = await EP.netCall('SYNC:SRV_DSET', dsReq);
      return res;
    }
  },
  syncData: async (syncReq: SyncDataReq) => {
    const EP = ClientEndpoint();
    if (EP) {
      const res = await EP.netCall('SYNC:SRV_DATA', syncReq);
      return res;
    }
  },
  handleError: (result: OpResult) => {
    return { error: 'no remote data adapter set' };
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** 'SYNC:DATA_CLI' handler for incoming data sync messages from dataserver */
function HandleSyncData(sync: SyncDataRes) {
  const { binID, binType, seqNum, status, error, skipped } = sync;
  const { items, updated, added, deleted, replaced } = sync;
  const bin = DSET.getDataBin(binID);

  /*** handle error conditions ***/
  if (bin === undefined) {
    LOG(...PR('ERROR: Bin not found:', binID));
    return;
  }
  if (error) {
    LOG(...PR('ERROR:', error));
    return;
  }
  if (Array.isArray(skipped)) {
    LOG(...PR('ERROR: skipped:', skipped));
    return;
  }
  /*** handle change arrays ***/
  if (Array.isArray(items)) bin.write(items);
  if (Array.isArray(updated)) bin.update(updated);
  if (Array.isArray(added)) bin.add(added);
  if (Array.isArray(deleted)) bin.delete(deleted);
  if (Array.isArray(replaced)) bin.replace(replaced);
}

/// DATASET LOCAL API /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** initialized a new Dataset with dsURI without performing ops.
 *  dataURI looks like 'sri.org:bucket-1234/sna-app/project-one'
 */
async function Configure(dsURI: UR_DatasetURI, opt: SyncDataOptions) {
  const fn = 'SetDataURI:';
  if (DSET !== undefined) throw Error(`${fn} dataset already set`);
  //
  let res: OpResult;
  res = DecodeDataURI(dsURI);
  if (res.error) return { error: `DecodeDataURI ${res.error}` };
  res = DecodeDataConfig(opt);
  if (res.error) return { error: `DecodeDataConfig ${res.error}` };
  const { mode } = res;
  // configure!
  DS_URI = dsURI;
  DSET = new Dataset(DS_URI);
  switch (mode) {
    case 'local':
      F_ReadOnly = false;
      F_SyncInit = false;
      REMOTE = undefined;
      break;
    case 'local-ro':
      F_ReadOnly = true;
      F_SyncInit = false;
      REMOTE = undefined;
      break;
    case 'sync':
      F_ReadOnly = false;
      F_SyncInit = true;
      REMOTE = LocalAdapter;
      break;
    case 'sync-ro':
      F_ReadOnly = true;
      F_SyncInit = true;
      REMOTE = LocalAdapter;
      break;
    default:
      return { error: `unknown mode ${mode}` };
  }
  if (REMOTE) {
    AddMessageHandler('SYNC:CLI_DATA', HandleSyncData);
    await RegisterMessages();
  }
  // return the dataset URI, adapter, messages
  // it's up to the caller to register messages
  return { dsURI, adapter: REMOTE, handlers: ['SYNC:CLI_DATA'] };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** after configure is called, this method connects to the dataset */
async function Activate() {
  if (DSET === undefined) return { error: 'must call Configure() first' };
  if (F_SyncInit) {
    const res = await REMOTE.selectDataset({ dataURI: DS_URI, op: 'LOAD' });
    if (res.error) return res;
    if (res.status === 'ok') {
      LOG(...PR(`Activate existing dataURI:`, res.dataURI));
    } else {
      LOG(...PR(`Activate status [${res.status}]`));
    }
    /** now we need to write the data **/
    LOG(...PR(`data received on activate:`, res.data));
    await SetDataFromObject(res.data);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sets the dataset's content from a UR_DatasetObj. must be called after
 *  Configure() */
async function SetDataFromObject(data: UR_DatasetObj): Promise<OpResult> {
  const fn = 'SetDataFromObject:';
  if (DSET === undefined) return { error: 'must call Configure() first' };
  LOG(...PR(fn, 'data:', data));
  const { _dataURI } = data;
  if (_dataURI !== DS_URI) return { error: 'dataURI mismatch' };

  // create the bins manually
  const { ItemLists } = data;
  for (const [binID, binDataObj] of Object.entries(ItemLists)) {
    LOG(...PR('SetDataFromObject: creating', binID));
    const bin = DSET.createDataBin(binID, 'ItemList');
    bin._setFromDataObj(binDataObj);
  }

  /*/ 
  note: implementors of databin (e.g. ItemList) fire notifications
  for data changes, which registed via the Subscribe() API below
  /*/

  // return the dataURI and the list of ItemLists
  return { dataURI: DS_URI, ItemLists: Object.keys(ItemLists) };
}

/// DATASET OPERATIONS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Get(binID: string, ids: string[]): Promise<OpResult> {
  const syncReq: SyncDataReq = { op: 'GET', binID, ids };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    LOG(...PR('Get:', binID, res));
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.get(ids);
  throw Error(`Get: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Add(binID: string, items: UR_Item[]): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'ADD', binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.add(items);
  throw Error(`Add: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Update(binID: string, items: UR_Item[]): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'UPDATE', binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.update(items);
  throw Error(`Update: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Write(binID: string, items: UR_Item[]): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'WRITE', binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.write(items);
  throw Error(`Write: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Delete(binID: string, items: UR_Item[]): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'DELETE', binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.delete(items);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function DeleteIDs(binID: string, ids: string[]): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'DELETE', binID, ids };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.deleteIDs(ids);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Replace(binID: string, items: UR_Item[]): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'REPLACE', binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.replace(items);
  throw Error(`Replace: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Clear(binID: string): Promise<OpResult> {
  if (F_ReadOnly) return { error: 'readonly mode' };
  const syncReq: SyncDataReq = { op: 'CLEAR', binID };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  bin.clear();
  if (bin) return {};
  throw Error(`Clear: bin [${binID}] not found`);
}

/// SEARCH METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** search for matches in the local dataset, which is assumed to be up-to
 *  date if synched mode is set */
async function Find(binID: string, crit?: SearchOptions): Promise<UR_Item[]> {
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.find(crit);
  throw Error(`Find: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** use to Find in datasets other than what is configured. good for one-time
 *  queries to remote datasets */
async function DS_RemoteFind(
  dsURI: UR_DatasetURI,
  binID: string,
  crit?: SearchOptions
): Promise<UR_Item[]> {
  return [];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/* return a RecordSet of items that match the query criteria in the local
 * dataset, which is assumed to be up-to-date if synched mode is set */
async function Query(binID: string, query: SearchOptions): Promise<RecordSet> {
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.query(query);
  throw Error(`Query: bin [${binID}] not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** use to Query datasets other than what is configured. good for one-time
 *  queries to remote datasets */
async function DS_RemoteQuery(
  dsURI: UR_DatasetURI,
  binID: string,
  query: SearchOptions
) /* :Promise<RecordSet> */ {
  return {};
}

/// NOTIFIERS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Subscribe(binID: string, evHdl: SNA_EvtHandler): OpResult {
  if (typeof binID !== 'string') return { error: 'binID must be a string' };
  if (typeof evHdl !== 'function') return { error: 'evHdl must be a function' };
  if (DSET === undefined) return { error: 'must call Configure() first' };
  const bin = DSET.getDataBin(binID);
  LOG(...PR('Subscribe:', binID, 'bin', bin, 'dset', DSET));
  if (bin) {
    bin.on('*', evHdl);
    if (DBG) LOG(...PR('Subscribe:', binID, 'subscribed'));
    return { binID, eventName: '*', success: true };
  }
  if (DBG) LOG(...PR('Subscribe:', binID, 'not found'));
  return { error: `bin [${binID}] not found` };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Unsubscribe(binID: string, evHdl: SNA_EvtHandler) {
  if (DSET === undefined) return { error: 'must call Configure() first' };
  const bin = DSET.getDataBin(binID);
  if (bin) bin.off('*', evHdl);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SNA_MODULE: SNA_Module = {
  _name: 'dataclient',
  PreConfig: m_PreConfigHandler,
  PreHook: m_AddLifecycleHooks,
  Subscribe,
  Unsubscribe
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_MODULE;
export {
  // SNA module methods
  Configure,
  Subscribe,
  Unsubscribe,
  // api data initialization
  SetDataFromObject,
  // api data operations
  Get,
  Add,
  Update,
  Write,
  Delete,
  DeleteIDs,
  Replace,
  Clear,
  Find,
  Query
};
