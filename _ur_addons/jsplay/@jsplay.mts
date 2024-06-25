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
const DBG = false;
const DIM = '\x1b[2m';
const NRM = '\x1b[0m';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PROCS: PROCESS.ChildProcess[] = [];
const CHANGES = new Set<string>();
let CHANGE_TIMER: NodeJS.Timeout;
let WATCHER: CHOKIDAR.FSWatcher;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [AO_NAME, AO_DIR] = FILE.DetectedAddonDir();
const ADDON = AO_NAME.toUpperCase();
const LOG = PR(ADDON, 'TagCyan');

/// PROCESS EVENTS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Queue a file to be run by TSNODE. It'll wait 500ms before running
 *  the file to allow for multiple changes to be queued up. */
function m_QueueTSNode(filepath: string) {
  CHANGES.add(filepath);
  if (CHANGE_TIMER) clearTimeout(CHANGE_TIMER);
  CHANGE_TIMER = setTimeout(() => {
    m_StartTSNode();
    CHANGE_TIMER = undefined;
  }, 500);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Start a TSNODE process and run the file provided. It'll kill
 *  the previous process if it's running. */
async function m_StartTSNode() {
  const FILES = Array.from(CHANGES) as string[];
  // first kill all processes
  await m_KillTSNode({ silent: true });
  // now start the new processes
  while (FILES.length) {
    const fp = FILES.shift();
    const fn = PATH.basename(fp);
    PROCS.push(PROCESS.spawn('ts-node', [fp], { stdio: 'inherit' }));
    const date = new Date().toLocaleTimeString();
    LOG(`${DIM}${date} running '${fn}'${NRM}`);
  }
  // clear
  CHANGES.clear();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: kill the ts-node process if it's running */
async function m_KillTSNode(opt: { silent: boolean } = { silent: false }) {
  const { silent } = opt;
  // kill all processes
  PROCS.forEach(proc => proc.kill());
  // check all processes status every 100ms
  await new Promise<void>((resolve, reject) => {
    setInterval(() => {
      PROCS.forEach(proc => {
        if (proc.exitCode !== null) {
          PROCS.splice(PROCS.indexOf(proc), 1);
          if (!silent) {
            const date = new Date().toLocaleTimeString();
            LOG(`${DIM}${date} '${proc.spawnfile}' finished${NRM}`);
          }
        }
      });
      if (PROCS.length === 0) {
        clearInterval(this);
        resolve();
      }
    }, 100);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Shutdown spawned processes, including Chokidar watchers which
 *  linger after process exit for some reason */
async function m_Shutdown() {
  await m_KillTSNode();
  console.log('\n');
  LOG('CLOSING ADDON. PRESS RETURN.');
  if (DBG) LOG('.. Node Processes Killed');
  await WATCHER.close();
  if (DBG) LOG('.. Chokidar Watcher Closed');
  process.exit(0);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Intercept SIGTERM and SIGINT to kill the ts-node process
process.on('SIGINT', m_Shutdown);

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
LOG(`${ADDON} Mini Javascript Playground`);
LOG('CTRL-C to exit');
// create WATCHER
WATCHER = CHOKIDAR.watch('./scripts', {
  ignored: [
    /(^|[/\\])\../, // ignore files starting with _
    /.*-.*\.ts/ // ignore files with dashes in them
  ],
  persistent: true
});
// test for events
WATCHER.on('all', (event, path) => {
  if (event === 'change') {
    m_QueueTSNode(path);
  }
});
// always start by launching the welcome file
m_QueueTSNode('./scripts/_welcome.ts');
