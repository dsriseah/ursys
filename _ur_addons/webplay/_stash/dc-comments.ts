/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-comments is the client-side component of a comment module, which talks
  to srv-comments through URSYS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import { Endpoint, HookPhase, AddMessageHandler } from '../webplay-svc-client.ts';
import { DataSet } from './lib/class-data-dataset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { UR_DataSyncObj } from '../../../_ur/_types/dataset.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('CMT', 'TagYellow');
const P2 = ConsoleStyler('CMT.SYN', 'TagGreen');
const ERR = ConsoleStyler('ERR', 'TagRed');
const LOG = console.log.bind(console);
const DCA = true; // log debug calls
const DSN = true; // log debug sync
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = new DataSet('comments');

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let m_out = '';
function m_Info(label?: string, data?: any) {
  if (label && data) m_out += `${label}: ${JSON.stringify(data)}\n`;
  if (label && data === undefined) {
    LOG(...P2(label, m_out));
    m_out = '';
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function m_Compare() {
  const EP = Endpoint();
  let cdata = await EP.netCall('SYNC:SRV_DATA_GET', {
    cName: 'comments',
    accToken: 'myAccess'
  });
  // LOG(...PR('DC-Comments Data'), ...cdata.items);
  const items = DATA.getItemList('comments').getItems();
  // LOG(...PR('DC-Comments List'), ...items);
  // compare list and cdata.items
  if (items.length !== cdata.items.length) {
    LOG(...PR('DC-Comments Error'), 'length mismatch');
    return;
  }
  // LOG('\nitems', ...items, '\ncdata', ...cdata.items);
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  if (DCA) LOG(...PR('DC-Comments Initializing'));

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_CONFIG allows data structures to initialize to starting values
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/NET_REGISTER', () => {
    // client implements these sync handlers
    AddMessageHandler('SYNC:CLI_DATA', (sync: UR_DataSyncObj) => {
      const { cName, cType, seqNum, status, error, skipped } = sync;
      const { items, updated, added, deleted, replaced } = sync;
      const list = DATA.getItemList(cName);
      if (list === undefined) {
        LOG(...P2('SYNC:CLI_DATA Error'), `list ${cName} not found`);
        return;
      }
      if (error) {
        LOG(...P2('SYNC:CLI_DATA Error'), error);
        return;
      }
      // if (Array.isArray(items)) m_Info('items', items);
      // if (Array.isArray(updated)) m_Info('updated', updated);
      // if (Array.isArray(added)) m_Info('added', added);
      // if (Array.isArray(deleted)) m_Info('deleted', deleted);
      // if (Array.isArray(replaced)) m_Info('replaced', replaced);
      // m_Info(`${cName}/${cType}`);
      if (Array.isArray(skipped) && skipped.length > 0) {
        LOG('ERROR skipped items', ...skipped);
      }
      if (Array.isArray(items)) {
        list.write(items);
        LOG(...P2('write items'), ...items);
      }
      if (Array.isArray(updated)) {
        list.update(updated);
        LOG(...P2('update items'), ...updated);
      }
      if (Array.isArray(added)) {
        list.write(added);
        LOG(...P2('add items'), ...added);
      }
      // the deleted array contains objects that were deleted
      if (Array.isArray(deleted)) {
        const items = list.delete(deleted);
      }
      if (Array.isArray(replaced)) {
        list.replace(replaced);
        LOG(...P2('replace items'), ...replaced);
      }
    });
    AddMessageHandler('SYNC:CLI_STATE', async (data: any) => {
      LOG(...P2('SYNC:CLI_STATE'), data);
    });
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    LOAD_DATA happens early to fetch critical data from wherever it's stored.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/LOAD_DATA', async () => {
    const fn = 'LOAD_DATA:';
    const EP = Endpoint();
    let retdata = await EP.netCall('SYNC:SRV_DATA_GET', {
      cName: 'comments',
      accToken: 'myAccess'
    });
    if (retdata.error) {
      LOG(...PR(fn, 'DC-Comments Error'), retdata.error);
      return;
    }
    // now that we have a list, we should probably stuff it into our own
    // mirrored list
    const { items } = retdata;
    const list = DATA.createItemList('comments');
    const { added, updated } = list.write(items);
    if (updated.length > 0) {
      LOG(...PR(fn, 'Warning: unexpected updated array on list creation', updated));
    }
    if (added.length > 0) {
      if (DCA) LOG(...PR(fn, 'DC-Comments Added'), ...added);
    }
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_READY is when the app is ready to start running, but hasn't yet.
    Might be a good place to set up modes and initial user interface states.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/APP_READY', async () => {
    const fn = 'APP_READY:';
    const accToken = 'myAccess';
    const EP = Endpoint();

    let added, updated, deleted, retdata;

    /** test data add **/
    async function addData() {
      let retdata = await EP.netCall('SYNC:SRV_DATA_ADD', {
        accToken,
        cName: 'comments',
        items: [{ text: `add CCC` }]
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_ADD'), retdata.error);
        return;
      }
      added = retdata.added; // test data update
      if (DCA) LOG(...PR('added'), ...added);
    }
    /** test data update **/
    async function updateData() {
      let retdata = await EP.netCall('SYNC:SRV_DATA_UPDATE', {
        accToken,
        cName: 'comments',
        items: [{ _id: '1', text: `update AAA` }]
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_UPDATE'), retdata.error);
        return;
      }
      updated = retdata.updated;
      if (DCA) LOG(...PR('updated'), ...updated);
    }
    /** test data write **/
    async function writeData() {
      let writeItems = [
        { text: `write DDD new` },
        { text: `write EEE new` },
        { _id: '1', text: `write AAA 1` }
      ];
      if (DCA) LOG(...PR('writing'), ...writeItems);
      retdata = await EP.netCall('SYNC:SRV_DATA_WRITE', {
        accToken,
        cName: 'comments',
        items: writeItems
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_WRITE'), retdata.error);
        return;
      }
      added = retdata.added;
      updated = retdata.updated;
      if (DCA) LOG(...PR('write added'), ...added);
      if (DCA) LOG(...PR('write updated'), ...updated);
    }
    /** test data replace **/
    async function replaceData() {
      let replaceItems = [
        { _id: '1', replaced: true },
        { _id: '3', replaced: true },
        { _id: '5', replaced: true }
      ];
      if (DCA) LOG(...PR('replacing'), ...replaceItems);
      retdata = await EP.netCall('SYNC:SRV_DATA_REPLACE', {
        accToken,
        cName: 'comments',
        items: replaceItems
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_REPLACE'), retdata.error);
        return;
      }
      let replaced = retdata.replaced;
      if (DCA) LOG(...PR('replaced'), ...replaced);
    }
    /** test data delete **/
    async function deleteData() {
      retdata = await EP.netCall('SYNC:SRV_DATA_GET', {
        cName: 'comments',
        accToken: 'myAccess'
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_GET'), retdata.error);
        return;
      }
      let deleteIDs = retdata.items.map(item => item._id);
      if (DCA) LOG(...PR('deleting'), ...deleteIDs);
      retdata = await EP.netCall('SYNC:SRV_DATA_DELETE', {
        accToken,
        cName: 'comments',
        ids: deleteIDs
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_DELETE'), retdata.error);
        return;
      }
      deleted = retdata.deleted;
      if (DCA) LOG(...PR('deleted'), ...deleted);
    }
    /** reset data **/
    async function resetData() {
      retdata = await EP.netCall('SYNC:SRV_DATA_INIT', {
        cName: 'comments',
        accToken
      });
      if (retdata.error) {
        LOG(...ERR('error in SRV_DATA_INIT'), retdata.error);
        return;
      }
      const resetItems = retdata.items;
      if (DCA) LOG(...PR('reset items'), ...resetItems);
    }

    // exercise
    console.group('dc-comments APP_READY');
    LOG(...PR('--- starting web test ---'));
    await addData();
    await m_Compare();
    await updateData();
    await m_Compare();
    await writeData();
    await m_Compare();
    await replaceData();
    await m_Compare();
    await deleteData();
    await m_Compare();
    // do not remove or comment out otherwise reload will fail
    await resetData();
    LOG(...PR('--- finished web test ---'));
    console.groupEnd();
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_RUN is when the app is starting to run, used to start main processes.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/APP_RUN', () => {
    const EP = Endpoint();
    EP.netCall('NET:DC_HANDLER', { data: 'hello' }).then(data => {
      // LOG(...PR('DC-Handler Response'), data);
    });
  });
})();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {};
