/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-WEB-DATACLIENT is the client-side data manager that mirrors a 
  server-side dataset. It uses URNET network to perform data operations with
  SNA-NODE-DATASERVER

  A Dataset contains several named "bins" of DataBin collections which are
  formally as a bucket with a schema. Datasets are in-memory object stores
  intended for real-time manipulation of data. They can be either local or
  synched with a remote server-side dataset.

  KEY METHODS:
  - Configure() is used to initialize the local dataset and select a
    remote adapter based on the passed 'mode' parameter.
  - Activate() is used to connect to the remote dataset and load the data.
  - SetDataFromObject() is used to initialize the Dataset with
    a data object that conforms to the DS_DatasetObj schema.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '../common/util-prompts.ts';
import {
  HookAppPhase,
  AddMessageHandler,
  ClientEndpoint,
  RegisterMessages,
  NewComponent
} from './sna-web.ts';
import { Dataset } from '../common/class-data-dataset.ts';
import { DatasetAdapter } from '../common/abstract-dataset-adapter.ts';
import { DecodeDataURI, DecodeDataConfig } from '../common/util-data-ops.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DataObj,
  OpResult,
  IDS_DatasetAdapter,
  DatasetReq,
  DatasetRes,
  DataSyncOptions,
  DataSyncReq,
  DataSyncRes,
  DataSyncMode,
  UR_Item,
  DS_DataURI,
  DS_DatasetObj,
  SearchOptions,
  RecordSet,
  SNA_EvtHandler,
  SNA_Component
} from '../@ur-types.d.ts';
//

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('SNA.DCI', 'TagBlue');
const LOG = console.log.bind(console);
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let DSET: Dataset; // singleton instance of the dataset
let DS_URI: DS_DataURI; // the dataset URI
let DS_MODE: DataSyncMode; // the dataset mode

/// DEFAULT SNA-DATASERVER REMOTE ///////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let F_ReadOnly: boolean = false; // set to true to prevent remote writes
let F_SyncInit: boolean = false; // set to true to sync data on init
let REMOTE: DatasetAdapter; // the remote data adapter
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class DefaultDatasetAdapter extends DatasetAdapter {
  // inherited fields
  // this.accToken:string

  /** select the "current dataset to use" on master server */
  async selectDataset(dataURI: string): Promise<OpResult> {
    const EP = ClientEndpoint();
    if (EP) {
      const res = await EP.netCall('SYNC:SRV_DSET', { dataURI, op: 'LOAD' });
      return res; // => { status, dataURI, error }
    }
  }

  /** return either the current dataset object or the one
   *  specified by dataURI */
  async getDataObj(dataURI?: string): Promise<DS_DatasetObj> {
    const EP = ClientEndpoint();
    if (EP) {
      const res = await EP.netCall('SYNC:SRV_DSET', {
        dataURI: dataURI || DS_URI,
        op: 'GET_DATA'
      });
      return res;
    }
  }

  /** perform a data collection (databin) operation, returning
   *  the status of the operation (but never data) */
  async syncData(syncReq: DataSyncReq) {
    const EP = ClientEndpoint();
    if (EP) {
      const res = await EP.netCall('SYNC:SRV_DATA', syncReq);
      return res;
    }
  }

  /** perform a dataset operation, returning the status of the operation */
  async execDataset(syncReq: DatasetReq) {
    const EP = ClientEndpoint();
    if (EP) {
      const res = await EP.netCall('SYNC:SRV_DSET', syncReq);
      return res;
    }
  }

  /** catch-all implementation-specific error handler */
  async handleError(errData: any): Promise<any> {
    Promise.resolve();
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let DefaultAdapter = new DefaultDatasetAdapter(); // for remotess

/// DATASYNC HANDLERS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** 'SYNC:DATA_CLI' handler for incoming data sync messages from dataserver */
function HandleSyncData(sync: DataSyncRes) {
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
/** initialized a new Dataset with dataURI without performing ops.
 *  dataURI looks like 'sri.org:bucket-1234/sna-app/project-one'
 */
async function Configure(dataURI: DS_DataURI, opt: DataSyncOptions) {
  const fn = 'SetDataURI:';
  if (DSET !== undefined) throw Error(`${fn} dataset already set`);
  //
  let res: OpResult;
  res = DecodeDataURI(dataURI);
  if (res.error) return { error: `DecodeDataURI ${res.error}` };
  res = DecodeDataConfig(opt);
  if (res.error) return { error: `DecodeDataConfig ${res.error}` };
  const { mode } = res;
  // configure!
  DS_URI = dataURI;
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
      REMOTE = DefaultAdapter;
      break;
    case 'sync-ro':
      F_ReadOnly = true;
      F_SyncInit = true;
      REMOTE = DefaultAdapter;
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
  return { dataURI, adapter: REMOTE, handlers: ['SYNC:CLI_DATA'] };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** after configure is called, this method connects to the dataset */
async function Activate() {
  if (DSET === undefined) return { error: 'must call Configure() first' };
  if (F_SyncInit) {
    const res = await REMOTE.selectDataset(DS_URI);
    if (res.error) {
      console.error('Activate(): error selecting dataset:', res.error);
      return res;
    }
    if (res.status === 'ok') {
      LOG(...PR(`Activate existing dataURI:`, res.dataURI));
    } else {
      LOG(...PR(`Activate status [${res.status}]`));
    }
    // next fetch the data
    const ds = await REMOTE.getDataObj();
    if (ds.error) {
      console.error('Activate(): error fetching dataset:', ds.error);
      return ds;
    }
    const found = DSET._setFromDataObj(ds);
    return { dataURI: DS_URI, found: Object.keys(found) };
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sets the dataset's content from a DS_DatasetObj. must be called after
 *  Configure() */
async function SetDataFromObject(data: DS_DatasetObj): Promise<OpResult> {
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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Persist() {
  if (REMOTE) {
    const res = await REMOTE.execDataset({ dataURI: DS_URI, op: 'PERSIST' });
    return res;
  }
  return { error: 'no remote adapter' };
}

/// DATASET OPERATIONS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Get(binID: string, ids: string[]): Promise<OpResult> {
  const syncReq: DataSyncReq = { op: 'GET', binID, ids };
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
  const syncReq: DataSyncReq = { op: 'ADD', binID, items };
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
  const syncReq: DataSyncReq = { op: 'UPDATE', binID, items };
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
  const syncReq: DataSyncReq = { op: 'WRITE', binID, items };
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
  const syncReq: DataSyncReq = { op: 'DELETE', binID, items };
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
  const syncReq: DataSyncReq = { op: 'DELETE', binID, ids };
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
  const syncReq: DataSyncReq = { op: 'REPLACE', binID, items };
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
  const syncReq: DataSyncReq = { op: 'CLEAR', binID };
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
  dataURI: DS_DataURI,
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
  dataURI: DS_DataURI,
  binID: string,
  query: SearchOptions
) /* :Promise<RecordSet> */ {
  return {};
}

/// SNA MODULE API ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** PreConfig is called before the network is available, so starting data
 *  is provided by the app itself in some way */
function PreConfig(config: DataObj) {
  const { dataset } = config;
  if (dataset) {
    const { dataURI, syncMode } = dataset;
    if (!dataURI) return { error: 'missing dataURI property' };
    if (!syncMode) return { error: 'missing syncMode property' };
    DS_URI = dataURI;
    DS_MODE = syncMode;
    return { dataURI, syncMode };
  }
  return { error: 'missing dataset property' };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** PreHook is called just before the SNA Lifecycle is started, so here is
 *  where your module can declare where it needs to do something */
function PreHook() {
  // hook into NET_DATASET to initialize dataclient connection to dataserver
  HookAppPhase('NET_DATASET', async () => {
    let dataURI = DS_URI;
    const opts = { mode: DS_MODE };
    let res: OpResult;
    // configure the dataset
    res = await Configure(dataURI, opts); // => { adapter, handlers }
    if (res.error) throw Error(`Configure ${res.error}`);
    res = await Activate(); // => { dataURI, ItemLists }
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Subscribe to a bin's events. The binID must be a string */
function Subscribe(binID: string, evHdl: SNA_EvtHandler) {
  if (typeof binID !== 'string') return { error: 'binID must be a string' };
  if (typeof evHdl !== 'function') return { error: 'evHdl must be a function' };
  if (DSET === undefined) return { error: 'must call Configure() first' };
  const bin = DSET.getDataBin(binID);
  if (bin) {
    bin.on('*', evHdl);
    if (DBG) LOG(...PR('Subscribe:', binID, 'subscribed'));
    return { binID, eventName: '*', success: true };
  }
  if (DBG) LOG(...PR('Subscribe:', binID, 'not found'));
  return { error: `bin [${binID}] not found` };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Unsubscribe from a bin's events. The binID must be a string */
function Unsubscribe(binID: string, evHdl: SNA_EvtHandler) {
  if (DSET === undefined) return { error: 'must call Configure() first' };
  const bin = DSET.getDataBin(binID);
  if (bin) bin.off('*', evHdl);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** SNA_Component defines a component that can participate in the SNA Lifecycle
 *  by "hooking" into it. Once a SNA_Component is registered, it will be called
 *  with the PreConfig() and PreHook() methods to allow the module to
 *  independently manage itself and its data */
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default NewComponent('dataclient', {
  PreConfig,
  PreHook,
  Subscribe,
  Unsubscribe
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // api data initialization
  Configure, // (dataURI, {mode}) => {adapter, handlers}
  Activate,
  SetDataFromObject,
  Persist,
  // SNA module methods
  Subscribe,
  Unsubscribe,
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
