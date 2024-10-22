/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  boilerplate example for using sna dataclient

  SNA CLIENT METHODS
  - Start, Status, Hook
  - HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks
  - AddMessageHandler, DeleteMessageHandler, RegisterMessages, ClientEndpoint
  - SetRemoteDataAdapter, Get, Add, Update, Delete, Replace, Init

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, DataBin, ConsoleStyler } from '@ursys/core';
import DUMMY_DATA from './dataset-dummy.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj, SyncDataRes, OpResult } from 'tsconfig/types';
import type { SNA_Module, SNA_EvtName } from 'tsconfig/types';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('Comments', 'TagPink');
const DCLI = SNA.MOD_DataClient;

/// APP LIFECYCLE METHODS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given dataset dataURI */
async function LoadDataHook() {
  let dataURI = 'sri.org:bucket-1234/sna-app/project-one';
  LOG(...PR('LoadDataHook'), dataURI);
  const opts = { mode: 'local' };
  let res: OpResult;
  res = await DCLI.Configure(dataURI, opts);
  if (res.error) throw Error(`Configure ${res.error}`);
  const { adapter, handlers } = res;
  res = await DCLI.SetDataFromObject(DUMMY_DATA);
  if (res.error) throw Error(`SetDataFromObject ${res.error}`);
  res = DCLI.Subscribe('comments', HandleDataEvent);
  if (res.error) throw Error(`Subscribe ${res.error}`);
  // after DCLI.LoadData(), notification to HandleDataEvent should occur
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** example of using dataclient */
async function DoSomething() {
  const comment123 = DCLI.Get('comments', ['123']);
  const resAdd = await DCLI.Add('comments', [{ text: '' }, { text: '' }]);
  const resQuery = await DCLI.Query('comments', { id: '123' });
}

/// DATA LIFECYCLE METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** handle data change from subscriber */
function HandleDataEvent(evt: SNA_EvtName, data: SyncDataRes) {
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

/// SNA MODULE CONFIGURATION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SNA_PreConfig(data: any): OpResult {
  return data;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SNA_PreHook() {
  SNA.Hook('LOAD_DATA', () => LoadDataHook());
  SNA.Hook('APP_CONFIG', async () => {
    console.log('APP_CONFIG: ');
    const items = await DCLI.Get('comments');
    console.log('APP_CONFIG: loaded items', items);
    let res: OpResult;
    const sriItem = { author: 'Sri', text: 'hello' };
    console.log('APP_CONFIG: adding item', sriItem);
    res = await DCLI.Add('comments', [sriItem]);
    console.log('result of DCLI.Add', res);
    // should fire HandleDataEvent
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SNA_Subscribe(evtType: SNA_EvtName, evtHandler: Function) {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SNA_Unsubscribe(evtType: SNA_EvtName, evtHandler: Function) {}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SNA_MODULE: SNA_Module = {
  _name: 'comments',
  PreConfig: SNA_PreConfig,
  PreHook: SNA_PreHook,
  Subscribe: SNA_Subscribe,
  Unsubscribe: SNA_Unsubscribe
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_MODULE;
export {
  // sna module methods
  SNA_PreConfig as PreConfig,
  SNA_PreHook as PreHook,
  SNA_Subscribe as Subscribe,
  SNA_Unsubscribe as Unsubscribe,
  // api methods
  DoSomething,
  DoSomethingEx,
  AddComment
};
