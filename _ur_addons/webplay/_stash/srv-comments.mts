/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR } from '@ursys/core';
import * as LOKI from './lib/mod-loki.mts';
import tsm_data from './lib/class-data-mgr.ts';
import {
  HookPhase,
  AddMessageHandler,
  GetServerEndpoint
} from '../webplay-svc-server.mts';
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
  const { cName, accToken, ids, items } = data;
  // required params
  if (accToken === undefined) return { error: 'cType, accToken is required' };
  if (!cName) return { error: 'cName is required' };
  if (typeof cName !== 'string') return { error: 'cName must be a string' };
  if (DATA.getItemList(cName) === undefined)
    return { error: `list ${cName} not found` };
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
  const cType = 'ItemList';
  return { cName, cType, accToken, ids, items };
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
    const { cName, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
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
    const { cName, cType, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    return list.read(ids);
  });

  /// DATA MUTATION HANDLERS ///

  const EP = GetServerEndpoint();

  /** collection add */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const added = list.add(items);
    EP.netSignal('SYNC:CLI_DATA', { cName, cType, ...added });
    return added;
  });

  /** collection update  */
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const updated = list.update(items);
    EP.netSignal('SYNC:CLI_DATA', { cName, cType, ...updated });
    return updated;
  });

  /** collection write (updates and adds) */
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const written = list.write(items);
    EP.netSignal('SYNC:CLI_DATA', { cName, cType, ...written });
    return written;
  });

  /** collection replace */
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const replaced = list.replace(items);
    EP.netSignal('SYNC:CLI_DATA', { cName: cName, cType, ...replaced });
    return replaced;
  });

  /** collection delete */
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (params: any) => {
    const { cName, cType, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const deleted = list.delete(ids);
    EP.netSignal('SYNC:CLI_DATA', { cName, cType, ...deleted });
    return deleted;
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
