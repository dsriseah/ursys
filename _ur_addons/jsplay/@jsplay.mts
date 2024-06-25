/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  JSPLAY Mini Javascript Tester App

  This allows you to try out javascript code in the node environment, running it
  immediately every time you save the file. Also launches the code in a web
  browser.

  ur jsplay

  The script automatically scans the 'scripts' directory for changes and runs
  the files through ts-node. It will ignore changes to files that start with an
  underscore or have a dash in the filename, so you can use those to define
  import modules or other utility files.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import PROCESS from 'node:child_process';
import PATH from 'node:path';
import { PR, FILE } from '@ursys/core';
import CHOKIDAR from 'chokidar';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('JSPLAY', 'TagCyan');
const DIM = '\x1b[2m';
const NRM = '\x1b[0m';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let TSNODE_PROCESS: PROCESS.ChildProcess;

/// PROCESS EVENTS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: kill the ts-node process if it's running */
function m_KillTSNode(opt: { silent: boolean } = { silent: false }) {
  const { silent } = opt;
  if (TSNODE_PROCESS) {
    if (!silent) LOG(`${DIM}killing ts-node process${NRM}`);
    TSNODE_PROCESS.kill();
    TSNODE_PROCESS = undefined;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Intercept SIGTERM and SIGINT to kill the ts-node process
process.on('SIGTERM', m_KillTSNode);
process.on('SIGINT', m_KillTSNode);

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Start a TSNODE process and run the file provided. It'll kill
 *  the previous process if it's running. */
function m_StartTSNode(file: string) {
  if (TSNODE_PROCESS) m_KillTSNode({ silent: true });
  // get the basename.ext of the file only from file
  const date = new Date().toLocaleTimeString();
  const filename = PATH.basename(file);
  LOG(`${DIM}${date} - running '${filename}'${NRM}`);
  TSNODE_PROCESS = PROCESS.spawn('ts-node', [file], { stdio: 'inherit' });
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [addonName, addonDir] = FILE.DetectedAddonDir();
LOG(`${addonName.toUpperCase()} Mini Javascript Playground`);
LOG('CTRL-C to exit');
// create watcher
const watcher = CHOKIDAR.watch('./scripts', {
  ignored: [
    /(^|[/\\])\../, // ignore files starting with _
    /.*-.*\.ts/ // ignore files with dashes in them
  ],
  persistent: true
});
// test for events
watcher.on('all', (event, path) => {
  if (event === 'change') {
    const filename = PATH.basename(path);
    LOG(`${DIM}file changed '${filename}'${NRM}`);
    m_StartTSNode(path);
  }
});
// always start by launching the welcome file
m_StartTSNode('./scripts/_welcome.ts');
