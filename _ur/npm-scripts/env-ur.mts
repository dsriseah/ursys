/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  A dependency-free environment detection for CJS codebases

  The _ur directory has a build utility script that depends
  on various paths; this module can provide those paths and related utilities
  to any CJS node source file inside the _ur directory.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { join, normalize } from 'node:path';
import { statSync } from 'node:fs';

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - -
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - - - -
const ROOT = normalize(join(__dirname, '../../'));

/// UTILITY METHODS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return an absolute path string from root-relative path */
const MakePath = (path = '') => {
  if (path.length === 0) return ROOT;
  path = normalize(join(ROOT, path));
  if (path.endsWith('/')) path = path.slice(0, -1);
  return path;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return true if the path exists and is a directory */
const DirExists = dirpath => {
  try {
    const stat = statSync(dirpath);
    if (stat.isFile()) return false;
    return stat.isDirectory();
  } catch (err) {
    console.log('*** DirExists:', err.message);
    return false;
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** remove ROOT prefix to return shortname */
const ShortPath = path => {
  if (path.startsWith(ROOT)) return path.slice(ROOT.length);
  return path;
};

/// RUNTIME CALCULATIONS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// NOTE: these are declared also in node-server/env-node.mts
const DIR_PUBLIC = MakePath('/public');
const DIR_UR = MakePath('/_ur');
const DIR_UR_DIST = MakePath('/_ur/_dist');
const DIR_BDL_BROWSER = MakePath('/_ur/browser-client');
const DIR_BDL_NODE = MakePath('/_ur/node-server');
const DIR_URADDS = MakePath('/_ur_addons');

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  ROOT, // root of the project
  DIR_PUBLIC, // path to PUBLIC directory for webapp
  DIR_UR, // path to _ur directory
  DIR_UR_DIST, // path to browser client code
  DIR_BDL_BROWSER, // path to node server code
  DIR_BDL_NODE, // path to _ur/dist directory for library out
  DIR_URADDS, // path to _ur_mod directory
  //
  DirExists,
  MakePath,
  ShortPath
};
