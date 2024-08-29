/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR } from '@ursys/core';
import * as LOKI from './lib/mod-loki.mts';
import tsm_data from './lib/class-data-mgr.ts';
import { HookPhase, AddMessageHandler } from '../webplay-svc-server.mts';
import { UR_MachineState } from '../webplay-svc-server.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { DataManager } = tsm_data;
import type {
  UR_EntID,
  UR_EntID_Obj,
  UR_BagRef,
  UR_Item,
  UR_ItemList
} from '../../../_ur/_types/dataset.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('COMMENT', 'TagYellow');

/// IMPORTED API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { PromiseUseDatabase } = LOKI;

/// DUMMY LIST MANAGER ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = new DataManager();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_InitDummyData() {
  const list = DATA.createItemList('comments'); // would be nice if it returns recordset
  list.add([
    { text: 'comment number one' }, //
    { text: 'comment number two' }
  ]);
}

/// LIFECYCLE /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Init() {
  const current_state = UR_MachineState();
  await PromiseUseDatabase('comments.loki');

  /** dummy handler example */
  AddMessageHandler('NET:DC_HANDLER', data => {
    LOG(`DC_HANDLER`, data);
    data = { status: 'OK' };
    LOG('returning data', data);
    return data;
  });

  /** collection get */
  AddMessageHandler('SYNC:SRV_DATA_GET', async (params: any) => {
    const { listName, accToken, ids } = params;
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    const listItems = list.getItems();
    // if ids are provided, return only those items
    if (ids) {
      const items = listItems.filter((item: any) => ids.includes(item._id));
      return { listItems: items };
    }
    // otherwise return everything
    return { listItems };
  });

  /** collection add */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (data: any) => {
    const { listName, accToken, items } = data; // items is the generic term id data
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    if (!items) return { error: 'entities is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    return list.add(items);
  });
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (data: any) => {});
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (data: any) => {});
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (data: any) => {});
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (data: any) => {});
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(() => {
  LOG('Hook SRV_INIT');
  HookPhase('URSYS/SRV_INIT', m_InitDummyData);
  LOG('Hook EXPRESS_CONFIG');
  HookPhase('URSYS/EXPRESS_CONFIG', Init);
})();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // DATA
  DATA,
  // LIFECYCLE
  Init // () => void
};
