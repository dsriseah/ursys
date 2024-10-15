/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  boilerplate example for using sna dataclient

  SNA CLIENT METHODS
  - Start, Status, Hook
  - HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks
  - AddMessageHandler, DeleteMessageHandler, RegisterMessages, ClientEndpoint
  - SetRemoteDataAdapter, Get, Add, Update, Delete, Replace, Init

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, DataBin, ConsoleStyler } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj, SyncDataRes } from '@ursys/types';
import type { SNA_Module } from '@ursys/types';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
const PR = ConsoleStyler('DEV', 'TagPink');
const DCLI = SNA.MOD_DataClient;
let COMMENT_BIN: DataBin; // set ddataURIng initial LoadDataHook()

/// APP LIFECYCLE METHODS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given dataset dataURI */
async function LoadDataHook(dataURI: string) {
  LOG(...PR('LoadDataHook'), dataURI);
  const opts = { mode: 'local' };
  const resConfig = await DCLI.Configure({ dataURI, opts });
  const resData = await DCLI.LoadData();
  if (resData.error) throw Error(`onData ${resData.error}`);
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
/** handle data change */
function HandleDataChange(sync: SyncDataRes) {
  LOG(...PR('HandleDataChange'));
  UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** after data change */
function UpdateDerivedData() {
  LOG(...PR('UpdateDerivedData'));
  // update the derived data
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

/// SNA INTEGRATION ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: component initialization hook*/
function SNA_Init() {
  LOG(...PR('INIT'), 'dc-comments');
  SNA.Hook('LOAD_DATA', LoadDataHook);
  SNA.Hook('APP_CONFIG', () => {
    console.log('app is ready to configure');
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Notifiers */
function SNA_Subscribe(evtType, evtHandler) {
  // if (evtType === 'change') {
  //   comments.on('change', evtHandler);
  // }
}
function SNA_Ubsubscribe(evtType, evtHandler) {
  // if (evtType === 'change') {
  //   comments.off('change', evtHandler);
  // }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const SNA_MODULE: SNA_Module = {
  Init: SNA_Init,
  On: SNA_Subscribe,
  Off: SNA_Ubsubscribe
};

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_MODULE;
export {
  // static methods
  DoSomething
};
