/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  NODE CLI TOOL - PACK TARBALL FOR LOCAL PACKAGE TESTING
  using the _out directory for the tarball. This is referred to in the
  package.json dependencies as "core-node": "file:../exports/local/core-node.tgz"
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { GetRootDirs } from '../node-server/file.mts';
import PROMPTS from '../common/util-prompts.ts';
import FSE from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';

/// CONSTANTS AND DECLARATIONS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = PROMPTS.TerminalLog('PackCore', 'TagSystem');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { ROOT, DIR_UR_OUT } = GetRootDirs();
const DIR_UR_DIST = path.join(ROOT, '_ur/_dist');

/// HELPERS //////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const u_short = p => {
  if (p.startsWith(ROOT)) return p.slice(ROOT.length + 1); // +1 for the slash
  return p; // return path as is if not in ROOT
};

/// PACK METHOD /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** copy files from exports/_out/core-  to exports/core */
async function UpdateDistributionFiles() {
  FSE.ensureDir(path.join(DIR_UR_DIST, 'core'));
  FSE.emptyDirSync(path.join(DIR_UR_DIST, 'core'));
  FSE.copySync(DIR_UR_OUT, path.join(DIR_UR_DIST, 'core'), {
    filter: src => {
      if (!src.includes('.')) return true; // it's a directory
      return src.includes('core-');
    },
    overwrite: true
  });

  // copy files from exports/_out/sna-  to exports/web
  FSE.ensureDir(path.join(DIR_UR_DIST, 'sna'));
  FSE.copySync(DIR_UR_OUT, path.join(DIR_UR_DIST, 'sna'), {
    filter: src => {
      if (!src.includes('.')) return true; // it's a directory
      return src.includes('sna-');
    },
    overwrite: true
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** copy files from exports/_out/cli-  to exports/cli */
async function PackCore() {
  // get the package name and version from package.json
  const pkgPath = path.join(ROOT, 'package.json');
  if (!FSE.existsSync(pkgPath)) {
    LOG('Package.json not found at', pkgPath);
    return;
  }
  let pkg;
  try {
    pkg = JSON.parse(FSE.readFileSync(pkgPath, 'utf-8'));
  } catch (err) {
    LOG('Error reading package.json:', err);
    return;
  }
  const { name, version } = pkg;
  const filename = `${name}-${version}.tgz`;
  LOG(`Packing "${name}-${version}.tgz" ...`);

  // pack the core library
  const urTgzDir = path.join(ROOT, '_ur/_tgz');
  if (!FSE.existsSync(urTgzDir)) {
    LOG('Creating tgz directory at', urTgzDir);
    FSE.mkdirSync(urTgzDir, { recursive: true });
  }
  execSync(`npm pack ${ROOT}`, {
    cwd: urTgzDir,
    stdio: 'inherit'
  });
  LOG(`Packed "${filename}" to "${u_short(urTgzDir)}"`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG('ROOT:', ROOT);
  LOG('DIR_UR_OUT:', DIR_UR_OUT);
  LOG('DIR_UR_DIST:', DIR_UR_DIST);
  UpdateDistributionFiles();
  PackCore();
})();
