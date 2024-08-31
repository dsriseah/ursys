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
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = new DataManager();

/// IMPORTED API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { PromiseUseDatabase } = LOKI;

/// DUMMY LIST MANAGER ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const m_dummy_data = [
  { text: 'initial comment number one' }, //
  { text: 'initialcomment number two' }
];

/// GUARD FUNCTIONS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_CheckDataParams(data: any) {
  const { listName, accToken, ids, items } = data;
  // required params
  if (accToken === undefined) return { error: 'accToken is required' };
  if (!listName) return { error: 'listName is required' };
  if (typeof listName !== 'string') return { error: 'listName must be a string' };
  if (DATA.getItemList(listName) === undefined)
    return { error: `list ${listName} not found` };
  // optional params
  if (ids) {
    if (!Array.isArray(ids)) return { error: 'ids must be an array' };
    if (ids.some(id => typeof id !== 'string'))
      return { error: 'ids must be an array of string IDs' };
  }
  if (items) {
    if (!Array.isArray(items)) return { error: 'items must be an array' };
    if (items.some(item => typeof item !== 'object'))
      return { error: 'items must be an array of objects' };
  }
  // everything good, then return the data
  return { listName, accToken, ids, items };
}

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
  AddMessageHandler('SYNC:SRV_DATA_INIT', async (params: any) => {
    const { listName, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
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
    const { listName, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
    return list.read(ids);
  });

  /** collection add */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (params: any) => {
    const { listName, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
    return list.add(items);
  });

  /** collection update  */
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (params: any) => {
    const { listName, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
    return list.update(items);
  });

  /** collection write (updates and adds) */
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (params: any) => {
    const { listName, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
    return list.write(items);
  });

  /** collection replace */
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (params: any) => {
    const { listName, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
    return list.replace(items);
  });

  /** collection delete */
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (params: any) => {
    const { listName, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(listName);
    return list.delete(ids);
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
