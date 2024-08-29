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
    const { listItems } = retdata;
    const list = DATA.createItemList('comments');
    const { added, updated } = list.write(listItems);
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
    LOG(...PR(fn, 'DC-Comments APP_READY'));
    const EP = Endpoint();
    let retdata = await EP.netCall('SYNC:SRV_DATA_ADD', {
      listName: 'comments',
      accToken: 'myAccess',
      items: [{ text: `comment add from ${EP.uaddr}` }]
    });
    if (retdata.error) {
      LOG(...PR(fn, 'DC-Comments Error'), retdata.error);
      return;
    }
    // let's see if we got any added items with ids in them
    const added = retdata;
    LOG(...PR(fn, 'DC-Comments Added'), ...added);
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
