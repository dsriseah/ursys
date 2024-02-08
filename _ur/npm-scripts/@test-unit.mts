/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UNIT TESTS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as UR from '@ursys/core';

/// CONSTANTS AND DECLARATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = UR.PR('UnitTests', 'TagBlue');
const FAIL = UR.PR('UnitTests', 'Red').fail;
const PASS = UR.PR('UnitTests', 'Green').pass;

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('would be running tests');
FAIL('this is a fail');
PASS('this is a pass');
