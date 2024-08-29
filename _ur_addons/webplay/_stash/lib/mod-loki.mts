/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  read a loki database 
  this is a temp version of the loki database module for webplay noodling

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import Loki from 'lokijs';
import FSE from 'fs-extra';
import PATH from 'path';
// our library import
import { PR, FILE } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type LokiFile = `${string}.loki`;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = PR('WP.LOKI', 'TagBlue');
const [, AO_DIR] = FILE.DetectedAddonDir('webplay');
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let m_datafile: string = '';
let m_options: any = {};
let m_db: Loki; // loki database
let m_db_loaded: boolean = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let m_max_edgeID: number;
let m_max_nodeID: number;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let NODES: Loki.Collection;
let EDGES: Loki.Collection;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const script_name = PATH.basename(import.meta.url);
const READONLY = false;

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// utility function for getting a valid file path
const f_validname = (lokiFile: string): string => {
  // validate lokiFile name
  const regex = /^([A-z0-9-_+./])*$/; // Allow _ - + . /, so nested pathways are allowed
  // good lokiFile name
  if (regex.test(lokiFile)) {
    if (lokiFile.endsWith('.loki')) return lokiFile;
    return `${lokiFile}.loki`;
  }
  // not a valid lokiFile name
  const err = `bad lokiFile name: ${lokiFile}`;
  console.error(err);
  throw new Error(err);
};

/// ASYNCHRONOUS CALLBACKS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** helper used by m_LoadLokiDB() when the database file has loaded */
const cb_loadComplete = () => {
  if (DBG) LOG('DATABASE LOADED!');
  // ensure collections if readonly
  NODES = m_db.getCollection('nodes');
  EDGES = m_db.getCollection('edges');
  if (!READONLY) {
    if (NODES === null) NODES = m_db.addCollection('nodes');
    if (EDGES === null) EDGES = m_db.addCollection('edges');
  }
  // get number of nodes
  const nodeCount = NODES.count();
  const edgeCount = EDGES.count();
  // get max ids
  m_max_nodeID = GetMaxIdIn(NODES);
  m_max_edgeID = GetMaxIdIn(EDGES);
  //
  if (DBG) LOG(`${nodeCount} NODES / ${edgeCount} EDGES`);
  if (DBG) LOG(`NODE MAX_ID ${m_max_nodeID} / EDGE MAX_ID ${m_max_edgeID}`);
  //
  m_db_loaded = true;
  if (m_options.resolve) {
    m_options.resolve();
    m_options.resolve = null;
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** helper used to periodically save the database, set up by m_LoadLokiDB() */
const cb_autosaveNotice = () => {
  const nodeCount = NODES.count();
  const edgeCount = EDGES.count();
  if (READONLY) {
    LOG(`unexpected AUTOSAVE encounter when READONLY = true`);
  } else {
    LOG(`AUTOSAVING! ${nodeCount} NODES / ${edgeCount} EDGES <3`);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** INTERNAL API: asynchronously load database file
 *  lokiFilePath should be a full path
 */
function m_LoadLokiDB(lokiFilePath: string, options: any = {}) {
  m_datafile = f_validname(lokiFilePath);
  m_options = options;
  FSE.ensureDirSync(PATH.dirname(m_datafile));
  if (!FSE.existsSync(m_datafile)) {
    if (!READONLY) LOG('creating blank database...');
    else {
      LOG.error(`DATABASE ${m_datafile} NOT FOUND`);
      if (m_options.reject) {
        m_options.reject();
        m_options.reject = null;
      }
      return;
    }
  }
  LOG(`LOADING DATABASE ${m_datafile}`);
  let ropt = {
    autoload: true,
    autoloadCallback: cb_loadComplete
  };
  if (!READONLY) {
    LOG(`write mode: ensure collections and autosave`);
    ropt = Object.assign(ropt, {
      autosave: true,
      autosaveCallback: cb_autosaveNotice,
      autosaveInterval: 4000 // save every four seconds
    });
  }
  ropt = Object.assign(ropt, options);
  m_db = new Loki(m_datafile, ropt);
  m_options = ropt;
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: InitLoki the database. The lokiFile is a short path name */
function PromiseUseDatabase(lokiFile: string, options: any = {}) {
  const lokiFilePath = PATH.join(AO_DIR, '_scratch/runtime/', lokiFile);
  return new Promise((resolve, reject) => {
    m_LoadLokiDB(lokiFilePath, { resolve, reject, ...options });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: List all collections in the database */
function ListCollections() {
  if (!m_db_loaded) {
    LOG(`database not loaded...try later`);
    return;
  }
  m_db.listCollections().forEach(col => {
    LOG(`collection: ${col.name}`);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Get the max id in a collection */
function GetMaxIdIn(col: Loki.Collection) {
  if (col.count() > 0) {
    return col.mapReduce(
      obj => obj.id,
      arr => Math.max(...arr)
    );
  }
  return 0;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// for direct imports by other modules
export {
  PromiseUseDatabase, //
  ListCollections
};
