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
const BLU = '\x1b[34;1m';
const DIM = '\x1b[2m';
const NRM = '\x1b[0m';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PROCS: PROCESS.ChildProcess[] = [];
const CHANGES = new Set<string>();
const CHANGE_DELAY = 250; // ms
const POLL_INTERVAL = 250; // ms
let CHANGE_TIMER: NodeJS.Timeout;
let WATCHER: CHOKIDAR.FSWatcher;
let WATCHER_SUSPEND = false;

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const [AO_NAME, AO_DIR] = FILE.DetectedAddonDir();
const ADDON = AO_NAME.toUpperCase();
const LOG = PR(ADDON, 'TagCyan');

/// PROCESS EVENTS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Queue a file to be run by TSNODE. It'll wait 500ms before running
 *  the file to allow for multiple changes to be queued up. */
function m_QueueTSNode(filepath: string) {
  const fn = 'm_QueueTSNode:';
  // save filepath
  CHANGES.add(filepath);
  if (DBG) LOG(fn, `${DIM}${CHANGES.size} queued files${NRM}`);
  // if timer is still set, clear and reset it again
  if (CHANGE_TIMER) {
    clearTimeout(CHANGE_TIMER);
    if (DBG) LOG(fn, `${DIM}clear old timer${NRM}`);
  }
  if (DBG) LOG(`${DIM}start new timer and wait ${CHANGE_DELAY}ms${NRM}`);
  CHANGE_TIMER = setTimeout(() => {
    if (DBG) LOG(fn, `${DIM}starting processes on timer trigger${NRM}`);
    m_StartTSNode();
  }, CHANGE_DELAY);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Start a TSNODE process and run the file provided. It'll kill
 *  the previous process if it's running. */
async function m_StartTSNode() {
  const fn = 'm_StartTSNode:';
  const FILES = Array.from(CHANGES) as string[];
  if (FILES.length === 0) {
    if (DBG) LOG(fn, `${DIM}no files to start${NRM}`);
    return;
  }
  if (DBG) LOG(fn, `${DIM}processes to start: ${FILES.join(',')}${NRM}`);
  //
  WATCHER_SUSPEND = true;
  // first kill all processes
  await m_KillTSNode({ silent: false });
  // now start the new processes
  while (FILES.length) {
    const fp = FILES.shift();
    const fname = PATH.basename(fp);
    const date = new Date().toLocaleTimeString();
    LOG(`${DIM}${date} running ${BLU}${fname}${NRM}`);
    PROCS.push(PROCESS.spawn('ts-node', [fp], { stdio: 'inherit' }));
  }
  await m_TSNodeStarted();
  WATCHER_SUSPEND = false;
  LOG(`${DIM}-${NRM}`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: Wait for all ts-node processes to start */
async function m_TSNodeStarted() {
  const fn = 'm_TSNodeStarted:';
  // wait for all processes to start
  let start_timer;
  await new Promise<void>((resolve, reject) => {
    start_timer = setInterval(() => {
      if (PROCS.every(proc => proc.exitCode !== null)) {
        clearInterval(start_timer);
        clearTimeout(CHANGE_TIMER);
        CHANGE_TIMER = undefined;
        CHANGES.clear();
        if (DBG) LOG(fn, `${DIM}all ts-node processes started${NRM}`);
        resolve();
      } else if (DBG) LOG(fn, `${DIM}waiting for ts-node processes to start${NRM}`);
    }, POLL_INTERVAL);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UTILITY: kill the ts-node process if it's running */
async function m_KillTSNode(opt: { silent: boolean } = { silent: false }) {
  const fn = 'm_KillTSNode:';
  const { silent } = opt;
  if (PROCS.length === 0) {
    if (DBG) LOG(fn, `${DIM}no ts-node processes to kill${NRM}`);
    return;
  } else {
    if (DBG) LOG(fn, `${DIM}killing ${PROCS.length} ts-node processes${NRM}`);
  }
  // kill all processes
  PROCS.forEach(proc => proc.kill());
  // check all processes status every 100ms
  let kill_timer;
  await new Promise<void>((resolve, reject) => {
    kill_timer = setInterval(() => {
      PROCS.forEach(proc => {
        if (proc.exitCode !== null) {
          PROCS.splice(PROCS.indexOf(proc), 1);
          if (!silent) {
            const date = new Date().toLocaleTimeString();
            if (DBG) LOG(fn, `${DIM}${date} '${proc.spawnfile}' finished${NRM}`);
          }
        }
      });
      if (PROCS.length === 0) {
        if (DBG) LOG(fn, `${DIM}all ts-node processes killed${NRM}`);
        clearInterval(kill_timer);
        kill_timer = undefined;
        resolve();
      } else if (DBG) {
        LOG(
          fn,
          `${DIM}waiting for ${PROCS.length} ts-node processes to finish${NRM}`
        );
      }
    }, POLL_INTERVAL);
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
LOG(`${DIM}-${NRM}`);
// create WATCHER
WATCHER = CHOKIDAR.watch('./scripts', {
  ignored: [
    /\/_.*/,
    /.*-.*\.ts/ // ignore files with dashes in them
  ],
  persistent: true
});
// test for events
WATCHER.on('all', (event, path) => {
  const fn = 'WATCHER.on(all):';
  if (WATCHER_SUSPEND) {
    if (DBG) LOG(fn, `${DIM}chokidar: WATCHER SUSPENDED...SKIPPING${NRM}`);
    return;
  }
  if (event === 'change') {
    if (DBG) LOG(fn, `${DIM}chokidar: calling m_QueueTSNode(${path})${NRM}`);
    m_QueueTSNode(path);
  } else {
    if (DBG) LOG(fn, `${DIM}chokidar: ${event} path: ${path}${NRM}`);
  }
});
// always start by launching the welcome file
m_QueueTSNode('./scripts/_welcome.ts');
