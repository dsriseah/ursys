/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  test generate a json comment data structure

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as TXTGEN from 'txtgen';
import { NORM, FILE, ASSET } from 'ursys';
import * as PATH from 'path';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { UR_Item, UR_EntID, UserName } from 'tsconfig/types';
type CommentTemplateType = string;
type CommentThread = (UR_EntID | UR_EntID[])[];

/// GLOBAL DATA STRUCTURES ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CHILDREN = new Map<UR_EntID, UR_EntID[]>();
/// derived data structures
const DD_THREADS = new Map<UR_EntID, CommentThread>();
const DD_ID_MAP = new Map<UR_EntID, CommentObj>();

/// CLASS DECLARATIONS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class CommentObj implements UR_Item {
  _id: UR_EntID; // required field _id (always a string)
  // linked list meta
  _parent_id: UR_EntID; // immediate parent id or undefined
  _replied_id: UR_EntID; // immediate reply id or undefined
  // comment info
  author: UserName;
  text: string[];
  promptType: CommentTemplateType;
  //
  // other meta
  _deleted: boolean;
  _ts_created: number;
  _ts_modified: number;

  constructor(id?: UR_EntID) {
    this._id = NORM.NormEntID(id);
    this._parent_id = '';
    this._replied_id = '';
    this.author = '';
    this.promptType = '';
    this.text = [];
    this._deleted = false;
    this._ts_created = Date.now();
    this._ts_modified = this._ts_created;
  }
}

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const AUTHORS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
const PROJ_ID = 'project';
const ROOT_TYPE = [PROJ_ID, 'edge', 'node'];
const CPROMPTS = ['default', 'note', 'query']; // defined in templating
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let ID_COUNTER = 0;
let FLAG_PROJECT_SET = false;

/// HELPER FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_PickRandomAuthor() {
  return AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create either a regular entID or a special entID */
const USED_IDS = [];
let LAST_ID;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_GetNextID(): UR_EntID {
  const type = ROOT_TYPE[Math.floor(Math.random() * ROOT_TYPE.length)];
  LAST_ID = `cmt${ID_COUNTER++}`;
  if (type === PROJ_ID && !FLAG_PROJECT_SET) {
    FLAG_PROJECT_SET = true;
    USED_IDS.push(PROJ_ID);
  } else USED_IDS.push(`cmt${ID_COUNTER}`);
  return USED_IDS[USED_IDS.length - 1];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** pick a parent ID from the list of used IDs, skipping the root id */
function m_PickParentID(current_id: UR_EntID): UR_EntID {
  if (current_id === PROJ_ID) return undefined;
  if (USED_IDS.length < 2) return PROJ_ID;
  if (USED_IDS.length === 2) return USED_IDS[0];
  let id: UR_EntID;
  do {
    id = USED_IDS[Math.floor(Math.random() * USED_IDS.length)];
    if (Math.random() < 0.1) id = undefined; // force occasional skip
  } while (id === current_id);
  return id;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_PickPromptType(): CommentTemplateType {
  return CPROMPTS[Math.floor(Math.random() * CPROMPTS.length)];
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const COMMENTS: CommentObj[] = [];
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** for apps that work with entities like nodes, edges, and other areas,
 *  we generate a unique ID for each entity */
function MakeComments() {
  CHILDREN.clear();
  let count = 10;
  while (count--) {
    const comment = new CommentObj(m_GetNextID());
    comment._parent_id = m_PickParentID(comment._id);
    comment.author = m_PickRandomAuthor();
    comment.text = TXTGEN.sentence();
    comment.promptType = m_PickPromptType();
    COMMENTS.push(comment);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** walk the COMMENTS array and generate derived data structures
 *  - DD_ROOT_IDS: list of root ids (no parent_id)
 *  - ID_MAP: map of id to comment object
 *  - THREADS: map of root id to CommentThread[]
 */
function MakeDerivedData() {
  // create initial data structures
  DD_ID_MAP.clear();
  DD_THREADS.clear();
  let counter = 1;
  for (const cobj of COMMENTS) {
    const { _id, _parent_id } = cobj;
    let sic = `${String(counter++).padStart(2, '0')}`;
    let sid = `${String(_id).padEnd(10, ' ')}`;
    let sip = `${String(_parent_id).padStart(5, ' ')}`;
    console.log(`${sic} id:'${sid}' parent:'${sip}'`);
    if (_id === undefined) throw Error(`no id in cobj ${cobj}`);
    DD_ID_MAP.set(_id, cobj);
    if (_parent_id === undefined) {
      CHILDREN.set(_id, undefined);
    } else {
      if (!CHILDREN.has(_parent_id)) CHILDREN.set(_parent_id, []);
      const thread = CHILDREN.get(_parent_id);
      if (Array.isArray(thread)) thread.push(_id);
      console.log(`-- id:'${sid}' thread updated`, thread);
    }
  }

  let indent = 0;
  function u_create_thread(root_id: UR_EntID): CommentThread {
    const slev = '  '.repeat(indent);
    ++indent;
    console.log(`${slev} create thread for root_id`, root_id);
    const chids = CHILDREN.get(root_id);
    const thread = [];
    if (chids === undefined) {
      --indent;
      return undefined;
    }
    for (let chid of chids) {
      thread.push(chid);
      if (CHILDREN.has(chid)) {
        const sub_thread = u_create_thread(chid);
        if (sub_thread.length) thread.push(sub_thread);
      }
    }
    indent--;
    return thread;
  }

  console.log(`\n${CHILDREN.size} CHILDREN entries`);
  for (const [key, value] of CHILDREN) {
    console.log(`children of id:'${key}'`, JSON.stringify(value));
  }
  console.log(`\n${DD_ID_MAP.size} DD_ID_MAP entries`);
  for (const [key, value] of DD_ID_MAP) {
    console.log(`id_map id:'${key}'`, JSON.stringify(value.text.slice(0, 30)));
  }

  // create thread data structure
  DD_THREADS.clear();
  console.log('\n');
  console.log(`THREADS processing ${CHILDREN.size} root ids`);
  for (const [rootID, value] of CHILDREN) {
    const thread = u_create_thread(rootID);
    DD_THREADS.set(rootID, thread);
  }
  console.log('\n');
  for (const [key, value] of DD_THREADS) {
    console.log(`thread id:'${key}'`, JSON.stringify(value));
  }
}

/// DATASET BUCKET WRITING ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** get the runtime directory */
function m_GetRuntimeDir(): string {
  const rootDir = FILE.FindParentDir('package.json', process.cwd());
  return PATH.join(rootDir, '_runtime');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_GetBucketDir(): string {
  const rootDir = m_GetRuntimeDir();
  const org = 'sri.org';
  const bucket = 'bucket-1234';
  return PATH.join(rootDir, org, bucket);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetBucketDatasetDir(subdir: string = '') {
  if (typeof subdir !== 'string') throw Error(`subdir must be a string`);
  if (subdir && !ASSET.IsAssetDirname(subdir))
    throw Error(`'${subdir}' is not a valid asset dirname (see util-data-asset.ts)`);
  const bucketDir = m_GetBucketDir();
  const dsDir = PATH.join(bucketDir, 'sna-app/project-one', subdir);
  FILE.EnsureDir(dsDir);
  return dsDir;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** write the JSON data to a file */
function WriteCommentJSON(filename: string, data: any) {
  const outDir = GetBucketDatasetDir('itemlists');
  console.log(`*** writing ${outDir}${filename}`);
  FILE.WriteJSON(PATH.join(outDir, filename), data);
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
MakeComments();
const data_bin_obj = {
  comments: { name: 'comments', _prefix: '', _ord_digits: 3, items: COMMENTS }
};
WriteCommentJSON('comments.json', data_bin_obj);
// MakeDerivedData();
