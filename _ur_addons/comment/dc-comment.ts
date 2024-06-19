/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-comments
  
  test module/code review for dc-comment.ts

  main concepts

    The Comment Data Struture is implemented as a bidirectional graph using
    CommentObjs as their nodes. The term Comment and CommentObjs are used
    interchangeably. They are of interface type TComment. Each node has a parent
    and child link.

    A runtime collection of "root comments" is maintained. These are comments
    with no parent, and are the starting point for a thread of replies.

    Comment threads are CommentObjs that have a parent. The parent might be a
    root comment or another comment in the same thread. 

  supporting concepts

    Each Comment is associated with a "commentable object", identified by a
    "collection reference" id. These can be individual nodes or areas of the
    screen.

    Each Comment contains the "commenter id" and their text. The system supports
    a "read by" data structure that consists of an array of ReadBy objects. Each
    ReadBy object has the comment_id (unique across the system) and an arrar of
    commenter ids that have read the comment.

  data sets - persisted and pure

    COMMENTS      : TComment[];
    READBY        : TCommentReadMap;
    USERS         : Map<TUserId, TUserName>
    
  data sets - derived at runtime as lookup tables

    ROOTS       : Map<TCommentCollectionID, TCommentID>
    REPLY_ROOTS : Map<TCommentID, TCommentID>
    NEXT        : Map<TCommentID, TCommentID>

  template stuff that has nothing to do with comment objects

    COMMENT_TYPES : Map<CType, TCommentType>

  EXAMPLE
  
    COMMENT OBJECT                                    DERIVED DATA
    --------------------------------------------      ----------------
    parnt prev                                        NEXT  REPLY-ROOT
                "r1 First Comment"                    r2    r1.1
    r1            "r1.1 Reply to First Comment"       r1.2
    r1    r1.1    "r1.2 Reply to First Comment"       
          r1    "r2 Second Comment"                   r3    r2.1
    r2            "r2.1 Reply to Second Comment"      r2.2
    r2    r2.1    "r2.2 Reply to Second Comment"      r2.3
    r2    r2.2    "r2.3 Reply to Second Comment"
          r2    "r3 Third Comment"                    r4
          r4    "r4 Fourth Comment"                   

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import DEFAULT_TEMPLATE from './dc-template-default.ts';

/// TYPE DEFINITIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  TCommentID,
  TComment,
  TCollectionRef,
  TLokiData,
  TCommentCollectionID,
  TCommentQueueActions,
  TUserID,
  TUserName,
  TUserObject,
  TReadByObject
} from './types-comment';
/** local data structure  - - - - - - - - - - - - - - - - - - - - - - - - - **/
type UserMap = Map<TUserID, TUserName>;
type CommentMap = Map<TCommentID, TComment>;
type ReadByMap = Map<TCommentID, TUserID[]>;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const PR = 'dc-comments';
/// MAIN DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const USERS: UserMap = new Map(); // Map<uid, name>
const COMMENTS: CommentMap = new Map(); // Map<cid, commentObject>
const READBY: ReadByMap = new Map(); // Map<cid, readbyObject[]>
/// DERIVED DATA  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ROOTS: Map<TCommentCollectionID, TCommentID> = new Map(); // Map<cref, comment_id> Root comment for a given collection_ref
const REPLY_ROOTS: Map<TCommentID, TCommentID> = new Map(); // Map<comment_id_parent, comment_id> Root comment_id for any given comment. (thread roots)
const NEXT: Map<TCommentID, TCommentID> = new Map(); // Map<comment_id_previous, comment_id> Next comment_id that follows the requested comment_id

/// DEFAULTS //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_LoadUsers(dbUsers: TUserObject[]) {
  dbUsers.forEach(u => USERS.set(u.id, u.name));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_LoadComments(comments: TComment[]) {
  comments.forEach(c => COMMENTS.set(c.comment_id, c));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_LoadReadBy(readby: TReadByObject[]) {
  readby.forEach(r => READBY.set(r.comment_id, r.commenter_ids));
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Init() {
  if (DBG) console.log(PR, 'Init');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * @param {Object} data
 * @param {Object} data.users
 * @param {Object} data.commenttypes
 * @param {Object} data.comments
 * @param {Object} data.readby
 */
function SetData(data: TLokiData) {
  if (DBG) console.log(PR, 'SetData');
  // Load Data!
  if (data.users) m_LoadUsers(data.users);
  if (data.comments) m_LoadComments(data.comments);
  if (data.readby) m_LoadReadBy(data.readby);
  if (DBG) console.log('USERS', USERS);
  if (DBG) console.log('COMMENTS', COMMENTS);
  if (DBG) console.log('READBY', READBY);
  // Derive Secondary Values
  m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUser(uid): TUserName {
  return USERS.get(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUserName(uid): TUserName {
  const u = USERS.get(uid);
  return u !== undefined ? u : uid; // fallback to using `uid` if there's no record
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCurrentUser(): TUserName {
  // TODO Placeholder
  return 'Ben32';
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCOMMENTS(): CommentMap {
  return COMMENTS;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetComment(cid): TComment {
  return COMMENTS.get(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_UpdateDerivedData() {
  ROOTS.clear();
  REPLY_ROOTS.clear();
  NEXT.clear();
  COMMENTS.forEach(c => {
    if (c.comment_id_parent === '' && c.comment_id_previous === '')
      ROOTS.set(c.collection_ref, c.comment_id);
    if (c.comment_id_parent !== '' && c.comment_id_previous === '') {
      REPLY_ROOTS.set(c.comment_id_parent, c.comment_id);
    }
    if (c.comment_id_previous !== '') {
      NEXT.set(c.comment_id_previous, c.comment_id);
    }
  });
  if (DBG) console.log('ROOTS', ROOTS);
  if (DBG) console.log('REPLY_ROOTS', REPLY_ROOTS);
  if (DBG) console.log('NEXT', NEXT);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function AddComment(data): TComment {
  if (data.cref === undefined)
    throw new Error('Comments must have a collection ref!');

  const comment_id_parent = data.comment_id_parent || '';
  const comment_id_previous = data.comment_id_previous || '';

  const comment: TComment = {
    collection_ref: data.cref,
    comment_id: data.comment_id, // thread
    comment_id_parent,
    comment_id_previous,
    comment_type: 'cmt', // default type, no prompts
    comment_createtime: new Date().getTime(),
    comment_modifytime: null,
    comment_isMarkedDeleted: data.comment_isMarkedDeleted,

    commenter_id: data.commenter_id,
    commenter_text: []
  };

  COMMENTS.set(comment.comment_id, comment);
  m_UpdateDerivedData();

  return comment;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * API Call to processes a single update
 * @param {Object} cobj TComment
 */
function UpdateComment(cobj: TComment) {
  m_UpdateComment(cobj);
  m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Processes a single update
 * @param {Object} cobj TComment
 */
function m_UpdateComment(cobj: TComment) {
  // Fake modify date until we get DB roundtrip
  cobj.comment_modifytime = new Date().getTime();
  console.log(
    'REVIEW: UpdateComment...modify time should use loki time???',
    cobj.comment_modifytime
  );
  COMMENTS.set(cobj.comment_id, cobj);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * API Call to batch updates an array of updated comments
 * @param {Object[]} cobjs TComment[]
 */
function HandleUpdatedComments(cobjs: TComment[]) {
  cobjs.forEach(cobj => m_UpdateComment(cobj));
  m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * @param {Object} parms
 * @param {Object} parms.collection_ref
 * @param {Object} parms.comment_id
 * @param {Object} parms.uid
 * @param {Object} parms.isAdmin
 * @returns {(any|Array)} if {comment: cobj} updates the comment
 *                        if {commentID: id} deletes the comment
 */
function RemoveComment(parms): TCommentQueueActions[] {
  const { collection_ref, comment_id, uid, isAdmin } = parms;
  const queuedActions = [];

  // MAIN PROCESS: `xxxToDelete`
  // A. Determine the comment to remove
  //    Can we delete it?
  //    If isAdmin just delete it
  //    If root &&
  //    ... does it have a reply thread ? Then Mark Deleted
  //    ... else delete it
  //    If reply &&
  //    ... does it have next comments?  Then Mark Deleted
  //    ... else delete it
  // B. If root and threads have been marked deleted
  //    then remove the whole thread
  // C. Delete it
  // D. Handle the next comment
  //    If it has a next comment, re-link

  // Multiple actions are possible, so pre-plan for them
  let deleteTarget = false;
  let deleteTargetAndNext = false; // del this comment and any child replies
  let deleteRootAndChildren = false; // del this comment, and top level root and replies
  let markDeleted = false;
  let relinkNext = false;

  const cidToDelete = comment_id;
  const cobjToDelete = COMMENTS.get(cidToDelete);
  const cobjIsRoot = cobjToDelete.comment_id_parent === ''; // does not have parent, so it's a root

  // I. THINK
  if (isAdmin) {
    // ADMIN
    if (cobjIsRoot) {
      deleteRootAndChildren = true; // is admin and is root, so delete the root and all replies
      relinkNext = true; // and always relink next if it's root
    } else {
      deleteTargetAndNext = true; // is admin and is reply thread, so delete comment and subsequent comments
    }
  } else {
    // NOT ADMIN
    if (cobjIsRoot) {
      // is not admin and is root...
      const hasChildReplies = REPLY_ROOTS.get(cidToDelete);
      if (!hasChildReplies) {
        deleteTarget = true; // ...so delete if there are no threads
        const hasNext = NEXT.get(cidToDelete);
        if (hasNext) relinkNext = true; // ...is root and has next comments, so relink them
      } else markDeleted = true; // ...else just mark deleted
    } else {
      // is not admin and is reply thread...
      const hasNext = NEXT.get(cidToDelete);
      if (hasNext) markDeleted = true; // ...has Next so just mark it
      else deleteTarget = true; // ...else orphan, just delete
    }
  }

  // II. DO ACTIONS

  // IIa. DELETE CHILDREN?
  if (deleteRootAndChildren) {
    if (DBG) console.log(`deleteRootAndChildren`);
    const childThreadIds = [];
    COMMENTS.forEach(cobj => {
      // find child thread ids
      if (cobj.comment_id_parent === cidToDelete)
        childThreadIds.push(cobj.comment_id);
    });
    childThreadIds.forEach(cid => {
      COMMENTS.delete(cid);
      queuedActions.push({ commentID: cid });
    });
  }

  // IIb. DELETE NEXT
  if (deleteTargetAndNext) {
    if (DBG) console.log(`deleteTargetAndNext`);
    const nextIds = m_GetNexts(cidToDelete);
    nextIds.forEach(cid => {
      COMMENTS.delete(cid);
      queuedActions.push({ commentID: cid });
    });
  }

  // IIc. RELINK NEXT -- Relink BEFORE deleting the target
  //      Generally only happens if it's a root
  if (relinkNext) {
    if (DBG) console.log(`relinkNext`);
    if (!cobjIsRoot)
      throw new Error(
        `relinkNext a non-root comment are you sure?  Usually we don't relink! ${cidToDelete}`
      );
    const nextCid = NEXT.get(cidToDelete);
    const nextCobj = COMMENTS.get(nextCid);
    const prev = COMMENTS.get(cobjToDelete.comment_id_previous);
    if (nextCobj) {
      nextCobj.comment_id_previous = prev ? prev.comment_id : ''; // if there's no prev, this is the first root
      COMMENTS.set(nextCobj.comment_id, nextCobj);
      queuedActions.push({ comment: nextCobj });
    }
  }

  // IId. DELETE TARGET or just MARK it DELETED?
  if (deleteTarget || deleteTargetAndNext || deleteRootAndChildren) {
    // DELETE TARGET
    if (DBG) console.log('deleteTarget or Root', cidToDelete);
    COMMENTS.delete(cidToDelete);
    queuedActions.push({ commentID: cidToDelete });
  } else if (markDeleted) {
    // MARK TARGET DELETED
    if (DBG) console.log('markDeleted', cidToDelete);
    const { comment_types } = DEFAULT_TEMPLATE; // REVIEW this hack
    cobjToDelete.comment_type = comment_types[0].slug; // revert to default comment type
    cobjToDelete.comment_isMarkedDeleted = true;
    COMMENTS.set(cobjToDelete.comment_id, cobjToDelete);
    queuedActions.push({ comment: cobjToDelete });
  }

  // IIe. DELETE ALL?
  // If everything in the thread has been deleted, also remove everything.
  // If root, then if the root and replies are all deleted, delete all
  // If thread, then if root and replies are all deelted, delete all
  // This an odd call because if we're deleting a thread item, we need to pop up a level
  // and also delete and relink the root
  let rootId;
  if (cobjIsRoot) rootId = comment_id; // get the first reply and the next
  else rootId = cobjToDelete.comment_id_parent; // is a thread reply, so pop up a level and get the root
  if (m_AllAreMarkedDeleted(rootId)) {
    if (DBG) console.log('delete all!');
    // re-order the next BEFORE deleting
    // this is necessary if we're deleting a thread item we also need to
    // pop up level to the root and deleting that too
    // also need to re=order before deleteTarget!!
    const rootCobj = COMMENTS.get(rootId);
    if (rootCobj) {
      // may have already been deleted
      const nextCid = NEXT.get(rootId);
      const nextCobj = COMMENTS.get(nextCid);
      const prev = COMMENTS.get(rootCobj.comment_id_previous);
      if (nextCobj) {
        nextCobj.comment_id_previous = prev ? prev.comment_id : ''; // if there's no prev, this is the first root
        COMMENTS.set(nextCobj.comment_id, nextCobj);
        queuedActions.push({ comment: nextCobj });
      }
    }

    const replyIds = m_GetReplies(rootId);
    replyIds.forEach(cid => {
      if (COMMENTS.has(cid)) {
        COMMENTS.delete(cid);
        queuedActions.push({ commentID: cid });
      }
    });

    // also delete the root
    if (COMMENTS.has(rootId)) {
      COMMENTS.delete(rootId);
      queuedActions.push({ commentID: rootId });
    }
  }

  // IIf. DELETE DANGLING THREADS
  // If we're a thread, the prune any remaining marked deleted from the end
  if (!cobjIsRoot) {
    const rootId = cobjToDelete.comment_id_parent;
    const replyIds = m_GetReplies(rootId).reverse(); // walk backwards towards undeleted

    for (let i = 0; i < replyIds.length; i++) {
      const cid = replyIds[i];
      const cobj = COMMENTS.get(cid);
      if (cobj && cobj.comment_isMarkedDeleted) {
        // is already marked deleted so remove it
        COMMENTS.delete(cid);
        queuedActions.push({ commentID: cid });
      } else if (cobj && !cobj.comment_isMarkedDeleted) {
        // found an undeleted item, stop!
        break;
      }
    }
  }

  // IIg. FINISHED
  m_UpdateDerivedData();
  return queuedActions;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function RemoveAllCommentsForCref({ collection_ref, uid }): TCommentQueueActions[] {
  const queuedActions = [];
  const cids = COMMENTS.forEach(cobj => {
    if (cobj.collection_ref === collection_ref) {
      COMMENTS.delete(cobj.comment_id);
      queuedActions.push({ commentID: cobj.comment_id });
    }
  });
  m_UpdateDerivedData();
  return queuedActions;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Checks if the current root and all children are marked deleted.
 *  Ignores the NEXT root items
 *  This is used to determine if we can safely prune the whole thread
 *  because every other comment in the thread has been marked deleted.
 */
function m_AllAreMarkedDeleted(rootCommentId: TCommentID): boolean {
  const allCommentIdsInThread = [rootCommentId, ...m_GetReplies(rootCommentId)];
  const allCommentsInThread = allCommentIdsInThread.map(cid => COMMENTS.get(cid));
  let allAreMarkedDeleted = true;
  allCommentsInThread.forEach(cobj => {
    if (!cobj) return; // was already deleted
    if (!cobj.comment_isMarkedDeleted) allAreMarkedDeleted = false;
  });
  return allAreMarkedDeleted;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Batch updates an array of removed comment ids */
function HandleRemovedComments(comment_ids: TCommentID[]) {
  comment_ids.forEach(comment_id => {
    if (DBG) console.log('...removing', comment_id);
    COMMENTS.delete(comment_id);
  });
  m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** `uid` can be undefined if user is not logged in */
function MarkCommentRead(cid: TCommentID, uid: TUserID) {
  // Mark the comment read
  const readby = READBY.get(cid) || [];
  if (!readby.includes(uid)) readby.push(uid);
  READBY.set(cid, readby);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function MarkCommentUnread(cid: TCommentID, uid: TUserID) {
  // Mark the comment NOT read
  const readby = READBY.get(cid) || [];
  const updatedReadby = readby.filter(readByUid => readByUid !== uid);
  READBY.set(cid, updatedReadby);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function IsMarkedRead(cid: TCommentID, uid: TUserID): boolean {
  const readby = READBY.get(cid) || [];
  return readby.includes(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function IsMarkedDeleted(cid: TCommentID): boolean {
  return COMMENTS.get(cid).comment_isMarkedDeleted;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Walk down the next items starting with the current
 *  Ignores child threads
 */
function m_GetNexts(cid: TCommentID): TCommentID[] {
  const results = [];
  const nextId = NEXT.get(cid);
  // if there are next comments, then recursively find next reply
  if (nextId) results.push(nextId, ...m_GetNexts(nextId));
  return results;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Gets all the child reply comments under the root
 *  Does not include the rootCid
 */
function m_GetReplies(rootCid: TCommentID): TCommentID[] {
  const results = [];
  const replyRootId = REPLY_ROOTS.get(rootCid);
  // if there are replies under the root, then recursively find next replies
  if (replyRootId) results.push(replyRootId, ...m_GetNexts(replyRootId));
  return results;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** recursively add replies and next
 *  1. Adds nested children reply threads first
 *  2. Then adds the next younger sibling
 *  Does NOT include the passed cid
 */
function m_GetRepliesAndNext(cid: TCommentID): TCommentID[] {
  const results = [];

  // are there "replies"?
  const reply_root_id = REPLY_ROOTS.get(cid);
  if (reply_root_id) {
    // then recursively find next reply
    results.push(reply_root_id, ...m_GetRepliesAndNext(reply_root_id));
  }

  // are there "next" items?
  const nextId = NEXT.get(cid);
  if (nextId) {
    // then recursively find next reply
    results.push(nextId, ...m_GetRepliesAndNext(nextId));
  }

  return results;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Get all the comment ids related to a particular collection_ref
 *  based on ROOTS.
 *  DeriveValues needs to be called before this method can be used.
 */
function GetThreadedCommentIds(cref: TCollectionRef): TCommentID[] {
  const all_comments_ids = [];

  // 1. Start with Roots
  const rootId = ROOTS.get(cref);
  if (rootId === undefined) return [];

  // 2. Find Replies (children) followed by Next (younger siblings)
  all_comments_ids.push(rootId, ...m_GetRepliesAndNext(rootId));
  return all_comments_ids;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** [Currently not used]
 *  Get all the comments related to a particular collection_ref
 */
function GetThreadedCommentData(cref: TCollectionRef): TComment[] {
  const threaded_comments_ids = GetThreadedCommentIds(cref);
  // convert ids to comment objects
  return threaded_comments_ids.map(cid => COMMENTS.get(cid));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetReadby(cid: TCommentID): TUserID[] {
  return READBY.get(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCrefs(): TCollectionRef[] {
  return [...ROOTS.keys()];
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Init,
  // DB
  SetData,
  // USERS
  GetUser,
  GetUserName,
  GetCurrentUser,
  // COMMENTS
  GetCOMMENTS,
  GetComment,
  AddComment,
  UpdateComment,
  HandleUpdatedComments,
  RemoveComment,
  RemoveAllCommentsForCref,
  HandleRemovedComments,
  MarkCommentRead,
  MarkCommentUnread,
  IsMarkedRead,
  IsMarkedDeleted,
  GetThreadedCommentIds,
  GetThreadedCommentData,
  // READBY
  GetReadby,
  // ROOTS
  GetCrefs,
  // 'protected' data for ac-comment
  USERS
};
