/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  JSPLAY Mini Javascript Tester App

  This allows you to try out javascript code in the node environment, running
  it immediately every time you save the file. Also launches the code in
  a web browser.

  ur jsplay [script] [args]

  The script

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import PROCESS from 'node:child_process';
import PATH from 'node:path';
import { PR, FILE } from '@ursys/core';
import CHOKIDAR from 'chokidar';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const LOG = PR('JSPLAY', 'TagCyan');
const DIM = '\x1b[2m';
const NRM = '\x1b[0m';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [m_addon, m_script, ...m_args] = process.argv.slice(2);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let TSNODE_PROCESS;

/// PROCESS EVENTS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_KillTSNode(opt: { silent: boolean } = { silent: false }) {
  const { silent } = opt;
  if (TSNODE_PROCESS) {
    if (!silent) LOG(`${DIM}killing ts-node process${NRM}`);
    TSNODE_PROCESS.kill();
  }
}
// define terminal code for dim output
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
process.on('SIGTERM', m_KillTSNode);
process.on('SIGINT', m_KillTSNode);

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_StartTSNode(file: string) {
  if (TSNODE_PROCESS) m_KillTSNode();
  // get the basename.ext of the file only from file
  const date = new Date().toLocaleTimeString();
  const filename = PATH.basename(file);
  LOG(`${DIM}${date} - running '${filename}'${NRM}`);
  TSNODE_PROCESS = PROCESS.spawn('ts-node', [file], { stdio: 'inherit' });
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [addonName, addonDir] = FILE.DetectedAddonDir();
LOG('JSPLAY Mini Javascript Tester App');
LOG('CTRL-C to exit');

const watcher = CHOKIDAR.watch('./scripts', {
  ignored: [
    /(^|[/\\])\../, // ignore files starting with _
    /.*-.*\.ts/ // ignore files with dashes in them
  ],
  persistent: true
});
watcher.on('all', (event, path) => {
  if (event === 'change') {
    const filename = PATH.basename(path);
    LOG(`${DIM}file changed '${filename}'${NRM}`);
    m_StartTSNode(path);
  }
});
m_StartTSNode('./scripts/_welcome.ts');
