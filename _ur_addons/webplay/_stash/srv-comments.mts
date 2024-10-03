/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, PROMPTS } from '@ursys/core';
import * as LOKI from './lib/module-loki.mts';
import tsm_data from './lib/class-data-dataset.ts';
import {
  HookPhase,
  AddMessageHandler,
  ServerEndpoint
} from '../webplay-svc-server.mts';
import { UR_MachineState } from '../webplay-svc-server.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { DataSet } = tsm_data;
import type { UR_BinRefID, SyncDataRes } from '../../../_ur/_types/dataset.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = PROMPTS.ANSI;
const LOG = PR('COMMENT', 'TagYellow');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = new DataSet('comments');
let SEQ_NUM = 0; // very predictable sequence number

/// IMPORTED API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { PromiseUseDatabase } = LOKI;

/// DUMMY LIST MANAGER ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const m_dummy_data = [
  { text: 'AAA' }, //
  { text: 'BBB' }
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

/// CLIENT SYNC HELPER ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_NotifyClients(cName: UR_BinRefID, cType: string, data: any) {
  const EP = ServerEndpoint();
  const seqNum = SEQ_NUM++;
  EP.netSignal('SYNC:CLI_DATA', { cName, cType, seqNum, ...data });
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
    data = { status: 'OK' };
    return data;
  });

  /// COLLECTION INIT ///

  AddMessageHandler('SYNC:SRV_DATA_INIT', async (params: any) => {
    const { cName, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    list.clear();
    list.add(m_dummy_data);
    const items = list.getItems();
    return { items };
  });

  /** accept optional id[], return { items, error } */
  AddMessageHandler('SYNC:SRV_DATA_GET', async (params: any) => {
    const { cName, cType, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    return list.read(ids);
  });

  /// DATA MUTATION HANDLERS ///

  /** accept item[], return { added, error } */
  AddMessageHandler('SYNC:SRV_DATA_ADD', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const addObj = list.add(items);
    m_NotifyClients(cName, cType, addObj);
    return addObj;
  });

  /** accept item[], return { updated, error } */
  AddMessageHandler('SYNC:SRV_DATA_UPDATE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const updObj = list.update(items);
    m_NotifyClients(cName, cType, updObj);
    return updObj;
  });

  /** accepts item[], return { added, updated, error } */
  AddMessageHandler('SYNC:SRV_DATA_WRITE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const writObj = list.write(items);
    m_NotifyClients(cName, cType, writObj);
    return writObj;
  });

  /** accepts item[], return { replace, error } */
  AddMessageHandler('SYNC:SRV_DATA_REPLACE', async (params: any) => {
    const { cName, cType, accToken, items, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const oldItems = list.replace(items); // returns the old items
    const replaced = [...items];
    m_NotifyClients(cName, cType, { replaced, oldItems });
    return oldItems;
  });

  /** accepts id[], returning deleted:items[] */
  AddMessageHandler('SYNC:SRV_DATA_DELETE', async (params: any) => {
    const { cName, cType, accToken, ids, error } = m_CheckDataParams(params);
    if (error) return { error };
    const list = DATA.getItemList(cName);
    const result = list.deleteIDs(ids);
    m_NotifyClients(cName, cType, result);
    return result;
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
