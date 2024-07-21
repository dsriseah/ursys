/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  srv-comments is the server-side component of a comment module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, APPSERV } from '@ursys/core';
import * as LOKI from './lib/mod-loki.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  URDataSet,
  URDataList,
  URDataDict,
  URResourceList,
  URTemplate
} from './types/ur-collections.js';
import type {
  CollectionOptions,
  DatabaseOptions,
  RecordID,
  RecordFields,
  Record
} from './types/ur-collections.js';
import type {
  NM_Handler // TODO: export types somehow
} from '../../../_ur/common/types-urnet.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('COMMENT', 'TagYellow');

/// EXTERNAL API METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { AddMessageHandler } = APPSERV;
const { PromiseUseDatabase } = LOKI;

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
await PromiseUseDatabase('comments.loki');
AddMessageHandler('NET:DC_HANDLER', data => {
  LOG(`DC_HANDLER`, data);
  data = { status: 'OK' };
  LOG('returning data', data);
  return data;
});

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
