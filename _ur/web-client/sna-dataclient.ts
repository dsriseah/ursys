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

import { ConsoleStyler } from '@ursys/core';
import { Hook, AddMessageHandler } from './sna-web.ts';
import { Dataset } from '../common/class-data-dataset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  RemoteStoreAdapter,
  SyncOp,
  SyncDataReq,
  SyncDataRes,
  UR_Item,
  UR_EntID,
  UR_DatasetURI
} from '../@ur-types.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('SNA-DC', 'TagBlue');
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let DATA: Dataset;
let DS_URI: UR_DatasetURI;
let REMOTE: RemoteStoreAdapter;
let ACTIONS: { op: SyncOp; data: SyncDataReq }[] = [];

/// DATASET LOCAL API /////////////////////////////////////////////////////////

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
  QueueRemoteDataOp('DATA_GET', data);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Add(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_ADD', data);
    return;
  }
  const itemset = DATA.getDataBin(binID);
  if (itemset) return itemset.add(items);
  throw Error(`Add: itemset ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Update(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_UPDATE', data);
    return;
  }
  const itemset = DATA.getDataBin(binID);
  if (itemset) return itemset.update(items);
  throw Error(`Update: itemset ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Delete(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_DELETE', data);
    return;
  }
  const itemset = DATA.getDataBin(binID);
  if (itemset) return itemset.delete(items);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Replace(binID: string, items: UR_Item[]) {
  const data: SyncDataReq = { binID, items };
  if (REMOTE) {
    QueueRemoteDataOp('DATA_REPLACE', data);
    return;
  }
  const itemset = DATA.getDataBin(binID);
  if (itemset) return itemset.replace(items);
  throw Error(`Replace: itemset ${binID} not found`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Init(binID: string): void {
  const data: SyncDataReq = { binID };
  QueueRemoteDataOp('DATA_INIT', data);
}

/// RUNTIME INITIALIZATION ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handle incoming data sync messages from dataserver */
Hook('NET_READY', function () {
  AddMessageHandler('SYNC:CLI_DATA', (sync: SyncDataRes) => {
    const { binID, binType, seqNum, status, error, skipped } = sync;
    const { items, updated, added, deleted, replaced } = sync;
    const itemset = DATA.getDataBin(binID);

    /*** handle error conditions ***/
    if (itemset === undefined) {
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
    if (Array.isArray(items)) itemset.write(items);
    if (Array.isArray(updated)) itemset.update(updated);
    if (Array.isArray(added)) itemset.add(added);
    if (Array.isArray(deleted)) itemset.delete(deleted);
    if (Array.isArray(replaced)) itemset.replace(replaced);
  });
});

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // data operations
  Get,
  Add,
  Update,
  Delete,
  Replace,
  Init,
  // remote data adapter
  SetRemoteDataAdapter,
  QueueRemoteDataOp
};
