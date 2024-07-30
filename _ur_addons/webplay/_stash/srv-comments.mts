/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, APPSERV } from '@ursys/core';
import * as LOKI from './lib/mod-loki.mts';
import DL from './lib/class-dataset-list.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ItemListMgr } = DL;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('COMMENT', 'TagYellow');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LISTS = new ItemListMgr();

/// EXTERNAL API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { AddMessageHandler } = APPSERV;
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
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function Config() {}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // DATA
  LISTS,
  // LIFECYCLE
  Init, // () => void
  Config // () => void
};
