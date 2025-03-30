/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  LokiJS Test Framework
  invoked by the _ur/ur command line module loader

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { FILE, PROMPTS } from 'ursys';
import { PromiseLoadDatabase, ListCollections } from './import-lokidb.mts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PROMPTS.TerminalLog('LOKI', 'TagBlue');

/// RUNTIME TESTS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('run starting...reading database');
// note that the database is not committed to the repo
// so you have to create the _data_nocommit directory with a loki file
const datadir = FILE.AbsLocalPath('_ur_addons/loki/_data');
await PromiseLoadDatabase(`${datadir}/test-graph.loki`);
ListCollections();
LOG('run complete');
process.exit(0);
