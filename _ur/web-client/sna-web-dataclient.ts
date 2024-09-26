/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA-WEB-DATACLIENT is the client-side data manager that mirrors a 
  server-side dataset manager. It uses the URNET network to communicate
  changes with the server.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import { Endpoint, Hook, AddMessageHandler } from './sna-web.ts';
import { DataSet } from '../common/class-data-dataset.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { UR_DataSyncObj } from '../_types/dataset.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('SNA-DC', 'TagBlue');
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = new DataSet('comments');

/// URNET DATA SYNC API ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function HookClientDataSync() {
  AddMessageHandler('SYNC:CLI_DATA', (sync: UR_DataSyncObj) => {
    const { cName, cType, seqNum, status, error, skipped } = sync;
    const { items, updated, added, deleted, replaced } = sync;
    const itemset = DATA.getBin(cName);

    /*** handle error conditions ***/

    if (itemset === undefined) {
      LOG(...PR('ERROR: Bin not found:', cName));
      return;
    }
    if (error) {
      LOG(...PR('ERROR:', error));
      return;
    }

    /*** handle change arrays ***/

    if (Array.isArray(items)) itemset.write(items);
    if (Array.isArray(updated)) itemset.update(updated);
    if (Array.isArray(added)) itemset.add(added);
    if (Array.isArray(deleted)) itemset.delete(deleted);
    if (Array.isArray(replaced)) itemset.replace(replaced);
    // if (Array.isArray(skipped)) LOG(...PR('SKIPPED:', skipped));
  });
}

/// DATASET API ///////////////////////////////////////////////////////////////
/// for direct interfacing to the dataset manager (client side instance)
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME INITIALIZATION ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Hook('NET_READY', HookClientDataSync);

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
