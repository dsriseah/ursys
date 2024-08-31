/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-comments is the client-side component of a comment module, which talks
  to srv-comments through URSYS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import { Endpoint, HookPhase, AddMessageHandler } from '../webplay-svc-client.ts';
import { DataManager } from './lib/class-data-mgr.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('COMMENT', 'TagYellow');
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = new DataManager();

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(...PR('DC-Comments Initializing'));

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_CONFIG allows data structures to initialize to starting values
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/NET_REGISTER', () => {
    // client implements these sync handlers
    AddMessageHandler('SYNC:CLI_DATA', (data: any) => {});
    AddMessageHandler('SYNC:CLI_STATE', async (data: any) => {});
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    LOAD_DATA happens early to fetch critical data from wherever it's stored.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/LOAD_DATA', async () => {
    const fn = 'LOAD_DATA:';
    const EP = Endpoint();
    let retdata = await EP.netCall('SYNC:SRV_DATA_GET', {
      listName: 'comments',
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
      LOG(...PR(fn, 'DC-Comments Added'), ...added);
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

    LOG(...PR(fn, 'DC-Comments APP_READY'));

    /** test data add **/
    let retdata = await EP.netCall('SYNC:SRV_DATA_ADD', {
      accToken,
      listName: 'comments',
      items: [{ text: `comment add` }]
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_ADD'), retdata.error);
      return;
    }
    let added = retdata.added; // test data update
    LOG(...PR('added'), ...added);

    /** test data update **/
    let updatedItems = added.map(item => {
      item.text = `updated comment ${item._id}`;
      return item;
    });
    LOG(...PR('updating'), ...updatedItems);
    retdata = await EP.netCall('SYNC:SRV_DATA_UPDATE', {
      accToken,
      listName: 'comments',
      items: updatedItems
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_UPDATE'), retdata.error);
      return;
    }
    let updated = retdata.updated;
    LOG(...PR('received updated'), ...updated);
    // let's see if we got any added items with ids in them

    /** test data write **/
    let writeItems = [
      { text: `write new comment AAA` },
      { text: `write new comment BBB` },
      { _id: '1', text: `write existing comment 1` }
    ];
    LOG(...PR('writing'), ...writeItems);
    retdata = await EP.netCall('SYNC:SRV_DATA_WRITE', {
      accToken,
      listName: 'comments',
      items: writeItems
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_WRITE'), retdata.error);
      return;
    }
    added = retdata.added;
    updated = retdata.updated;
    LOG(...PR('added'), ...added);
    LOG(...PR('updated'), ...updated);

    /** test data replace **/
    let replaceItems = [
      { _id: '1', replaced: true },
      { _id: '3', replaced: true },
      { _id: '5', replaced: true }
    ];
    LOG(...PR('replacing'), ...replaceItems);
    retdata = await EP.netCall('SYNC:SRV_DATA_REPLACE', {
      accToken,
      listName: 'comments',
      items: replaceItems
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_REPLACE'), retdata.error);
      return;
    }
    let replaced = retdata.replaced;
    LOG(...PR('replaced'), ...replaced);

    /** retrieve current data **/
    retdata = await EP.netCall('SYNC:SRV_DATA_GET', {
      listName: 'comments',
      accToken
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_GET'), retdata.error);
      return;
    }
    LOG(...PR('current items after replace'), ...retdata.items);

    /** test data delete **/
    let deleteIDs = retdata.items.map(item => item._id);
    LOG(...PR('deleting'), ...deleteIDs);
    retdata = await EP.netCall('SYNC:SRV_DATA_DELETE', {
      accToken,
      listName: 'comments',
      ids: deleteIDs
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_DELETE'), retdata.error);
      return;
    }
    let deleted = retdata.deleted;
    LOG(...PR('deleted'), ...deleted);

    /** retrieve current data **/
    retdata = await EP.netCall('SYNC:SRV_DATA_GET', {
      listName: 'comments',
      accToken
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_GET'), retdata.error);
      return;
    }
    LOG(...PR(`${retdata.items.length} items after delete`), ...retdata.items);

    /** RESET DATA **/
    retdata = await EP.netCall('SYNC:SRV_DATA_INIT', {
      listName: 'comments',
      accToken
    });
    if (retdata.error) {
      LOG(...PR('error in SRV_DATA_INIT'), retdata.error);
      return;
    }

    const resetItems = retdata.items;
    LOG(...PR('reset items'), ...resetItems);
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
