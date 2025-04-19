/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  addon loader module

  invoked from the '_ur/ur' shell script expecting the name of a subdirectory
  in the _ur_addons directory with option @entryfile name (no extension).
  If the optional @entryfile is not provided, the first one found will be used.
  This entryfile will be forked as a child process with complete arguments.

  example:

  $ ur my-addon args...
  $ ur my-addon@my-entry args...

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { FILE, PROMPTS, PROC } from 'ursys/server';
import { fork } from 'node:child_process';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PROMPTS.TerminalLog('ADO-LOADR', 'TagCyan');
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ADDON_DIR = process.argv[1];
const ARGS = process.argv.slice(2);

/// SIGNAL HANDLING ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// this should allow 'nohup net start &' to work correctly
process.on('SIGHUP', () => {
  LOG(`ignoring SIGHUP received by @load-addon.mts`);
});

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function ForkAddon(addonSelector: string) {
  const { addonName, entryName, entryFile, entryFiles, err } =
    PROC.ValidateAddon(addonSelector);
  if (err) throw Error(err);
  // success!
  if (DBG) LOG(`.. found ${entryFiles.length} addon entryFile(s)`);
  if (DBG) entryFiles.forEach(f => LOG(`   . ${addonName}/${f}  `));
  const cwd = FILE.AbsLocalPath(`_ur_addons/${addonName}`);
  const child_pid = fork(entryFile, ARGS, { cwd });
  const { pid } = child_pid;
  if (DBG) LOG(`.. forking '${addonName}${entryName}' (pid ${pid})`);
  else LOG.info(`loading '${addonName}${entryName}' (pid ${pid})`);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
if (DBG) LOG('---');
if (DBG) LOG('@load-addon.mts called with args:', ARGS);
const [arg_addon_name] = ARGS;
ForkAddon(arg_addon_name);

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
