/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  LokiJS Test Framework
  invoked by the _ur/ur command line module loader

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { FILE, PR } from '@ursys/core';
import { PromiseLoadDatabase, ListCollections } from './import-lokidb.mts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('LOKI', 'TagBlue');

/// RUNTIME TESTS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('run starting...reading database');
// note that the database is not committed to the repo
// so you have to create the _data_nocommit directory with a loki file
const datadir = FILE.AbsLocalPath('_ur_addons/loki/_data_nocommit');
await PromiseLoadDatabase(`${datadir}/test-graph.loki`);
ListCollections();
LOG('run complete');
