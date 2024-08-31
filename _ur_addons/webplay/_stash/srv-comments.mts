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
const m_dummy_data = [
  { text: 'initial comment number one' }, //
  { text: 'initialcomment number two' }
];

/// LIFECYCLE /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Init() {
  const current_state = UR_MachineState();
  await PromiseUseDatabase('comments.loki');

  /** initialize the list */
  const opt = {
    // idPrefix: 'cmt'
  };
  const list = DATA.createItemList('comments', opt);
  list.add(m_dummy_data);

  /** dummy handler example */
  AddMessageHandler('NET:DC_HANDLER', data => {
    LOG(`DC_HANDLER`, data);
    data = { status: 'OK' };
    LOG('returning data', data);
    return data;
  });

  /** collection initialize **/
  AddMessageHandler('SYNC:SRV_DATA_INIT', async (data: any) => {
    const { listName, accToken } = data;
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    list.clear();
    list.add([
      { text: 'initial comment number one' }, //
      { text: 'initialcomment number two' }
    ]);
    const items = list.getItems();
    return { items };
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
      return { items };
    }
    // otherwise return everything
    return { items: listItems };
  });

  /** collection add */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (data: any) => {
    const { listName, accToken, items } = data; // items is the generic term id data
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    if (!items) return { error: 'entities is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    let added = list.add(items);
    return { added };
  });

  /** collection update  */
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (data: any) => {
    const { listName, accToken, items } = data; // items is the generic term id data
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    if (!items) return { error: 'entities is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    let updated = list.update(items);
    return { updated };
  });

  /** collection write (updates and adds) */
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (data: any) => {
    const { listName, accToken, items } = data; // items is the generic term id data
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    if (!items) return { error: 'entities is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    let { added, updated } = list.write(items);
    return { added, updated };
  });

  /** collection replace */
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (data: any) => {
    const { listName, accToken, items } = data; // items is the generic term id data
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    if (!items) return { error: 'entities is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    let { replaced, error, skipped } = list.replace(items);
    return { replaced, skipped, error };
  });

  /** collection delete */
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (data: any) => {
    const { listName, accToken, ids } = data; // items is the generic term id data
    if (accToken === undefined) return { error: 'accToken is required' };
    if (!listName) return { error: 'listName is required' };
    if (!ids) return { error: 'ids is required' };
    const list = DATA.getItemList(listName);
    if (list === undefined) return { error: `list ${listName} not found` };
    let { deleted } = list.delete(ids);
    return { deleted };
  });
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(() => {
  LOG('Hook SRV_INIT');
  HookPhase('URSYS/SRV_INIT', Init);
})();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // DATA
  DATA,
  // LIFECYCLE
  Init // () => void
};
