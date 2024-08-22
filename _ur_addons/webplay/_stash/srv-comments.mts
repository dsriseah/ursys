/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR } from '@ursys/core';
import * as LOKI from './lib/mod-loki.mts';
import IL from './lib/class-data-itemlist.ts';
import DF from './lib/class-data-docfolder.ts';
import { HookPhase, AddMessageHandler } from '../webplay-svc-server.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ListManager } = IL;
const { DocManager } = DF;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('COMMENT', 'TagYellow');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LISTS = new ListManager();
const DOCS = new DocManager();

/// IMPORTED API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { PromiseUseDatabase } = LOKI;

/// LIFECYCLE /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Init() {
  await PromiseUseDatabase('comments.loki');
  AddMessageHandler('NET:DC_HANDLER', data => {
    LOG(`DC_HANDLER`, data);
    data = { status: 'OK' };
    LOG('returning data', data);
    return data;
  });
  AddMessageHandler('SYNC:GET_DATA', async (data: any) => {});
  AddMessageHandler('SYNC:ADD_DATA', async (data: any) => {});
  AddMessageHandler('SYNC:UPDATE_DATA', async (data: any) => {});
  AddMessageHandler('SYNC:WRITE_DATA', async (data: any) => {});
  AddMessageHandler('SYNC:REPLACE_DATA', async (data: any) => {});
  AddMessageHandler('SYNC:DELETE_DATA', async (data: any) => {});
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(() => {
  LOG('SRV-Comments Initializing');
  HookPhase('URSYS/SRV_INIT', Init);
})();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // DATA
  LISTS,
  DOCS,
  // LIFECYCLE
  Init // () => void
};
