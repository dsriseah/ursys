/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  simple test framework

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { FILES } from '@ursys/core';
import { PromiseLoadDatabase, ListCollections } from './import-lokidb.mts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME TESTS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const datadir = FILES.AbsLocalPath('_ur_addons/loki/_data_nocommit/');
await PromiseLoadDatabase(`${datadir}/team.loki`);
ListCollections();
