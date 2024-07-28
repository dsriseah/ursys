/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  _welcome mts file
  print some instructions

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { PR, FILE } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [AO_NAME, AO_DIR] = FILE.DetectedAddonDir();
const ADDON = AO_NAME.toUpperCase();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR(ADDON, 'TagCyan');
const BRT = '\x1b[34;1m';
const NRM = '\x1b[0m';
const scriptDir = `${AO_DIR}/scripts`;

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG('To use, create a .mts file (without dashes in the filename) in the');
LOG(`  ${BRT}${scriptDir}${NRM}`);
LOG('directory. Write some Typescript code in that file and the file will');
LOG('run every time it is saved.');
LOG('Filenames starting with an underscore or contain dashes are ignored.');
