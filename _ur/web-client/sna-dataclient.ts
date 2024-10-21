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
import { Hook, AddMessageHandler } from './sna-web.ts';
import { Dataset } from '../common/class-data-dataset.ts';
import {
  DecodeDataURI,
  DecodeDataConfig,
  GetDatasetObjectProps
} from '../common/util-data-asset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  OpResult,
  RemoteStoreAdapter,
  SyncOp,
  SyncDataReq,
  SyncDataRes,
  UR_Item,
  UR_DatasetURI,
  UR_DatasetObj,
  ConfigOptions,
  SearchOptions,
  RecordSet,
  SNA_EvtHandler,
  SNA_EvtName
} from '../@ur-types.d.ts';
//

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('SNA-DC', 'TagBlue');
const LOG = console.log.bind(console);
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let DSET: Dataset;
let DS_URI: UR_DatasetURI;
let REMOTE: RemoteStoreAdapter;
let ACTIONS: { op: SyncOp; data: SyncDataReq }[] = [];

/// DATASET LOCAL API /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** creates a new Dataset with the associated dsURI but does not perform
 *  any operations
 *  dataURI looks like 'sri.org:bucket-1234/sna-app/project-one'
 */
async function Configure(
  dsURI: UR_DatasetURI,
  opt: ConfigOptions
): Promise<OpResult> {
  const fn = 'SetDataURI:';
  let res: OpResult;
  res = DecodeDataURI(dsURI);
  if (res.error) return { error: `DecodeDataURI ${res.error}` };
  const { mode } = DecodeDataConfig(opt);
  if (res.error) return { error: `DecodeDataConfig ${res.error}` };
  // make sure that the dataset is not already set
  if (DSET !== undefined) throw Error(`${fn} dataset already set`);
  // configure!
  DS_URI = dsURI;
  DSET = new Dataset(DS_URI);
  DSET.setStorageMode(mode);
  return { dsURI, configOpt: opt };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sets the dataset's content from a UR_DatasetObj. must be called after
 *  Configure() */
async function SetDataFromObject(data: UR_DatasetObj): Promise<OpResult> {
  if (DSET === undefined) return { error: 'must call Configure() first' };
  const { _dataURI } = data;
  if (_dataURI !== DS_URI) return { error: 'dataURI mismatch' };

  // create the bins manually
  const { ItemLists } = data;
  for (const [binID, items] of Object.entries(ItemLists)) {
    LOG(...PR('SetDataFromObject: creating', binID));
    const bin = DSET.createDataBin(binID, 'ItemList');
    bin.write(items);
  }

  /*/ 
  note: implementors of databin (e.g. ItemList) fire notifications
  for data changes, which registed via the Subscribe() API below
  /*/

  // return the dataURI and the list of ItemLists
  return { dataURI: DS_URI, ItemLists: Object.keys(ItemLists) };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** sets the dataset's content from a UR_DatasetURI. must be called after
 *  Configure() */
async function SetDataFromConfigURI(): Promise<OpResult> {
  const fn = 'LoadDataset:';
  if (DSET === undefined) return { error: 'must call Configure() first' };
  // TODO: load the dataset from the server
  // TODO: handle 'local' and 'sync' modes
  // TODO: hook dataserver updates to the dataset and notify subscribers
}

/// DATASET REMOTE API ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// for direct interfacing to the dataset manager (client side instance)
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** SUPPORT: process the operation queue until it is clear */
async function m_ProcessOpQueue(): Promise<void> {
  const fn = 'm_ProcessOpQueue:';
  if (REMOTE === undefined) {
    console.error(`${fn} no remote data adapter set`);
    return;
  }
  if (ACTIONS.length === 0) return;
  // process all actions in the queue
  while (ACTIONS.length > 0) {
    const { op, data } = ACTIONS.shift();
    // wait for the result of the writeData operation
    const result = await REMOTE.writeData(op, data);
    // if there is an error, use implementation-specific error handling
    // to determine if the error is fatal or not. it's up to the
    // handleError method return error if it couldn't handle it.
    if (result.error) {
      const errHandled = REMOTE.handleError(result);
      if (!errHandled.error) return;
      throw Error(`${fn} fatal writeData error: ${errHandled.error}`);
    }
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: define the remote data adapter */
function SetRemoteDataAdapter(adapter: RemoteStoreAdapter): void {
  const fn = 'SetRemoteDataAdapter:';
  // check adapter integrity
  if (!adapter) throw Error(`${fn} adapter must be type RemoteStoreAdapter`);
  const { writeData, handleError, accToken } = adapter;
  if (typeof writeData !== 'function')
    throw Error(`${fn} adapter must have writeData method`);
  if (typeof handleError !== 'function')
    throw Error(`${fn} adapter must have handleError method`);
  if (typeof accToken !== 'string')
    throw Error(`${fn} adapter must have accToken string`);
  REMOTE = adapter;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: queue an operation to persist data to the server, if one is defined */
function QueueRemoteDataOp(op: SyncOp, data: SyncDataReq): void {
  const fn = 'QueueRemoteDataOp:';
  if (REMOTE === undefined) {
    console.error(`${fn} no remote data adapter set`);
    return;
  }
  ACTIONS.push({ op, data });
  m_ProcessOpQueue();
}

/// DATASET OPERATIONS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Get(binID: string, ids: string[]) {
  const data: SyncDataReq = { binID, ids };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_GET', data);
    return;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.get(ids);
  throw Error(`Get: bin ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Add(binID: string, items: UR_Item[]): OpResult {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_ADD', data);
    return { queued: true };
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.add(items);
  throw Error(`Add: bin ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Update(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_UPDATE', data);
    return;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.update(items);
  throw Error(`Update: bin ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Write(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_WRITE', data);
    return;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.write(items);
  throw Error(`Write: bin ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Delete(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_DELETE', data);
    return;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.delete(items);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DeleteIDs(binID: string, ids: string[]) {
  const data: SyncDataReq = { binID, ids };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_DELETE', data);
    return;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.deleteIDs(ids);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Replace(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_REPLACE', data);
    return;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.replace(items);
  throw Error(`Replace: bin ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Init(binID: string): void {
  const data: SyncDataReq = { binID };
  QueueRemoteDataOp('DATA_INIT', data);
}

/// SEARCH METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Find(binID: string, crit?: SearchOptions): Promise<UR_Item[]> {
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.find(crit);
  throw Error(`Find: bin ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Query(binID: string, query: SearchOptions): Promise<RecordSet> {
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.query(query);
  throw Error(`Query: bin ${binID} not found`);
}

/// NOTIFIERS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Subscribe(binID: string, evHdl: SNA_EvtHandler): OpResult {
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
  return { error: `bin ${binID} not found` };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Unsubscribe(binID: string, evHdl: SNA_EvtHandler) {
  if (DSET === undefined) return { error: 'must call Configure() first' };
  const bin = DSET.getDataBin(binID);
  if (bin) bin.off('*', evHdl);
}

/// RUNTIME INITIALIZATION ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handle incoming data sync messages from dataserver */
Hook('NET_READY', function () {
  AddMessageHandler('SYNC:CLI_DATA', (sync: SyncDataRes) => {
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
  });
});

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // data initialization
  Configure,
  SetDataFromObject,
  SetDataFromConfigURI,
  // data operations
  Get,
  Add,
  Update,
  Write,
  Delete,
  DeleteIDs,
  Replace,
  Init,
  Find,
  Query,
  // data notification
  Subscribe as Subscribe,
  Unsubscribe as Unsubscribe,
  // remote data adapter
  SetRemoteDataAdapter,
  QueueRemoteDataOp
};
