/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  boilerplate example for using sna dataclient

  SNA CLIENT METHODS
  - Start, Status, Hook
  - HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks
  - AddMessageHandler, DeleteMessageHandler, RegisterMessages, ClientEndpoint
  - SetRemoteDataAdapter, Get, Add, Update, Delete, Replace, Init

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, ConsoleStyler } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj, DataSyncRes, OpResult } from '@ursys/core';
import type { SNA_EvtName } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('Comments', 'TagPink');
const DCLI = SNA.DATACLIENT;
const CTXT = SNA.APPCONTEXT;

/// APP LIFECYCLE METHODS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given dataset dataURI */
async function HOOK_LoadDataLocal() {
  let res: OpResult;
  const DUMMY_DATA = await fetch('./json/dummy-dataset.json');
  res = await DCLI.SetDataFromObject(DUMMY_DATA);
  if (res.error) throw Error(`SetDataFromObject ${res.error}`);
  res = DCLI.Subscribe('comments', HandleDataEvent);
  if (res.error) throw Error(`Subscribe ${res.error}`);
  // todo: check that after DCLI.LoadData() HandleDataEvent gets changes
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** using the remote data initialization, assuming dataset is already loaded */
async function HOOK_LoadDataRemote() {
  LOG(...PR('HOOK_LoadDataRemote:'));
  let res: OpResult;
  res = await DCLI.Subscribe('comments', HandleDataEvent);
  if (res.error) {
    console.error(`subscribe to 'comments' collection of current databin failed`);
    throw Error(`Subscribe ${res.error}`);
  }
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** example of using dataclient */
async function HOOK_DoSomething() {
  const fn = 'HOOK_DoSomething:';
  LOG(...PR(fn, 'persistence test setup'));
  const resGet = await DCLI.Get('comments', ['cmt004']);
  LOG(...PR(fn, 'got cmt004', resGet));

  const items = await DCLI.Get('comments');
  LOG(...PR(fn, 'loaded items', items));
  let res: OpResult;
  const sriItem = { author: 'Sri', text: 'hello' };
  LOG(...PR(fn, 'adding item', sriItem));
  res = await DCLI.Add('comments', [sriItem]);
  LOG(...PR(fn, 'result of add', res));

  // todo: check that this fires data change

  setTimeout(async () => {
    LOG(...PR(fn, 'faked autosave'));
    const res = await DCLI.Persist();
    LOG(...PR(fn, 'persisted', res));
  }, 3000);
}

/// DATA LIFECYCLE METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handle data change from subscriber */
function HandleDataEvent(evt: SNA_EvtName, data: DataSyncRes) {
  LOG(...PR(`HandleDataEvent: '${evt}' with data:`), data);
  UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** after data change */
async function UpdateDerivedData() {
  LOG(...PR('UpdateDerivedData:'));
  // update the derived data
  const items = await DCLI.Get('comments');
  LOG(...PR('grabbing items to derive'), items);
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Use the high-level operation, not database terminology */
async function DoSomethingEx() {
  // manipulate comments.update, comments.read, etc
  // do not use NETCALLS for talking to database, as the DataBin class
  // handles all that stuff automatically
  // const { updated, error } = await comments.update(items);
  // if (error) throw Error('error updating comments', error);
  // else console.log('updated items', updated);
  // the updated values are provided for debugging only
  // updates are handled by data return handler above
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function AddComment(cmo: DataObj) {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Subscribe(evtType: SNA_EvtName, evtHandler: Function) {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Unsubscribe(evtType: SNA_EvtName, evtHandler: Function) {}

/// RUNTIME INITIALIZATION ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function PreHook() {
  LOG(...PR('PreHook'));
  SNA.HookAppPhase('LOAD_DATA', () => HOOK_LoadDataRemote());
  SNA.HookAppPhase('APP_CONFIG', HOOK_DoSomething);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // sna-compatible module methods
  PreHook,
  Subscribe,
  Unsubscribe,
  // api methods
  DoSomethingEx,
  AddComment
};
