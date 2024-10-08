/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  boilerplate example for using sna dataclient

  SNA CLIENT METHODS
  - Start, Status, Hook
  - HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks
  - AddMessageHandler, DeleteMessageHandler, RegisterMessages, ClientEndpoint
  - SetRemoteDataAdapter, Get, Add, Update, Delete, Replace, Init

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { SNA, DataBin } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj, SyncDataRes } from '@ursys/types';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_PlaceholderConfig(uri: string, opt: DataObj) {}
function m_PlaceholderRequestAccess(authToken?: string) {
  return Promise.resolve('dummy-access-token');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_UpdateDerivedData() {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_PlaceholderOpenDataBin(name: string) {
  return Promise.resolve({} as DataBin);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given dataset uri and authtoken, connect to the datastore
 *  if authToken is not provided, the URNET authToken that's already
 *  established will be used. */
async function m_Connect(uri: string, authToken?: string) {
  // given: datastore URI and authToken
  const mode = 'remote';
  const adapter = undefined;
  const returnMode = 'data';
  const batchEnable = false;

  m_PlaceholderConfig(uri, {
    // uri is either a string key or a URI
    mode: 'remote', // local, remote, remote-ro, remote-wo
    adapter, // instance of DatastoreAdapter
    returnMode, // return items, ids or just error (default 'data')
    batchEnable // whether to allow server to batch by tick rate
  });
  const accToken = await m_PlaceholderRequestAccess(authToken);
  if (!accToken) throw Error('access denied');
  // if requestAccess succeeded, then datastore instance saves accToken

  // open the comments databin from the set
  const comments: DataBin = await m_PlaceholderOpenDataBin('comments');
  // the contents of the COMMENTS dataset are synced with server

  // data return handler
  comments.on('change', (sync: SyncDataRes) => {
    m_UpdateDerivedData();
  });
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// API: Use the high-level operation, not database terminology
async function DoSomething() {
  // manipulate comments.update, comments.read, etc
  // do not use NETCALLS for talking to database, as the DataBin class
  // handles all that stuff automatically
  // const { updated, error } = await comments.update(items);
  // if (error) throw Error('error updating comments', error);
  // else console.log('updated items', updated);
  // the updated values are provided for debugging only
  // updates are handled by data return handler above
}

// API: Notififiers
function Subscribe(evtType, evtHandler) {
  // if (evtType === 'change') {
  //   comments.on('change', evtHandler);
  // }
}

/// RUNTIME INITIALIZATION ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// SNA HOOK: initialize at the appropriate stage
SNA.Hook('LOAD_DATA', m_Connect);
SNA.Hook('APP_CONFIG', () => {
  console.log('app is ready to configure');
});

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { DoSomething, Subscribe };
