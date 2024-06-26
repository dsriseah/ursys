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
    ReadBy object has the cid (unique across the system) and an arrar of
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

    COMMENT_TYPES : Map<CTemplateRef, TCommentType>

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
import { APPSTATE, TIME } from './mock-core.ts';

/// TYPE DEFINITIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  TDataSet, // definition of dataset object
  //
  TCommentID, // id of a TComment object
  TComment, // comment data fields and references
  TAnnotableRef, // unique identifier for a collection of comments
  TCommentData, // data fields for creating a new comment
  TCommentSelector, // selector for removing a comment
  //
  TCommentCollectionID, // unique identifier for a collection of comments
  TCommentQueueActions, // ?
  //
  TUserID, // unique identifier for a user
  TUser, // object with user data fields
  TUserName, // name of a user
  //
  TReadByObject
} from './types-comment';
/** local data structure  - - - - - - - - - - - - - - - - - - - - - - - - - **/
type CommentMap = Map<TCommentID, TComment>;
type ReadByMap = Map<TCommentID, TUserID[]>;
type DeferOptions = { defer?: boolean };

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const PR = 'dc-comment';
/// MAIN DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const COMMENTS: CommentMap = new Map(); // Map<cid, commentObject>
const READBY: ReadByMap = new Map(); // Map<cid, readbyObject[]>
/// DERIVED DATA  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ROOTS: Map<TAnnotableRef, TCommentID> = new Map(); // root comment for each collection
const REPLY_ROOTS: Map<TCommentID, TCommentID> = new Map(); // reverse lookup to find collection root
const NEXT: Map<TCommentID, TCommentID> = new Map(); // map from comment to next comment

/// DATA LIFECYCLE METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: First time initialization */
function Init() {
  if (DBG) console.log(PR, 'Init');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Update local core data sets, derive data, and notify */
function UpdateData(data: TDataSet) {
  if (DBG) console.log(PR, 'UpdateData');
  const { users, comments, readby } = data;
  // update datasets
  if (comments) comments.forEach(c => COMMENTS.set(c.cid, c));
  if (readby) readby.forEach(r => READBY.set(r.cid, r.commenter_ids));
  // Derive Secondary Values
  m_UpdateDerivedData();
  m_NotifyDataChange();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: Called after core data is updated to rederive stuff */
function m_UpdateDerivedData() {
  ROOTS.clear();
  REPLY_ROOTS.clear();
  NEXT.clear();
  COMMENTS.forEach(c => {
    const { cid_root, cid_previous } = c;
    const { cref, cid } = c;
    if (cid_root === '' && cid_previous === '') ROOTS.set(cref, cid);
    if (cid_root !== '' && cid_previous === '') {
      REPLY_ROOTS.set(cid_root, cid);
    }
    if (cid_previous !== '') {
      NEXT.set(cid_previous, cid);
    }
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** NOTIFIER: emit data change signal */
function m_NotifyDataChange() {
  // defining a data notification standard that embeds the messages dirrectly
  // in the module would cut down on a lot of bullshit.
  const fn = 'm_NotifyDataChange';
  const dataset = { comments: COMMENTS, readby: READBY };
  console.log(fn, `would emit 'COMMENT_DATA_UPDATED' signal w/`, dataset);
}

/// CRUD API //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Return a TComment object */
function GetComment(cid: TCommentID): TComment {
  return COMMENTS.get(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Given comment data, create a new comment object and save it*/
function AddComment(data: TCommentData): TComment {
  const { cref, cid, user_id, cid_root = '', cid_previous = '', isDeleted } = data;
  if (cref === undefined) throw new Error('Comments must have a collection ref!');
  const newComment: TComment = {
    cref: cref,
    cid, // thread
    cid_root,
    cid_previous,
    ctpl: 'cmt', // default type, no prompts
    user_ctime: TIME.getTimestamp(),
    user_mtime: null,
    isDeleted,
    user_id,
    user_text: []
  };
  COMMENTS.set(cid, newComment);
  m_UpdateDerivedData();
  return newComment;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Processes a single update */
function UpdateComment(cobj: TComment, opt?: DeferOptions) {
  const { cid } = cobj;
  // use nullish coallescing to check opt for defer value
  const { defer = false } = opt ?? {};
  const timestamp = TIME.getTimestamp();
  cobj.user_mtime = timestamp;
  COMMENTS.set(cid, cobj);
  // update any derived data
  if (!defer) m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Given selector, delete all references to it and update derived data
 *  Because threaded comments are implemented as a
 *  doubly-linked list, this is pretty involved.
 */
function RemoveComment(selector: TCommentSelector): TCommentQueueActions[] {
  const { cref, cid, uid } = selector;
  const isAdmin = APPSTATE.isAdmin();
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

  const cidToDelete = cid;
  const cobjToDelete = COMMENTS.get(cidToDelete);
  const cobjIsRoot = cobjToDelete.cid_root === ''; // does not have parent, so it's a root

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
      if (cobj.cid_root === cidToDelete) childThreadIds.push(cobj.cid);
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
    const prev = COMMENTS.get(cobjToDelete.cid_previous);
    if (nextCobj) {
      nextCobj.cid_previous = prev ? prev.cid : ''; // if there's no prev, this is the first root
      COMMENTS.set(nextCobj.cid, nextCobj);
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
    cobjToDelete.ctpl = comment_types[0].slug; // revert to default comment type
    cobjToDelete.isDeleted = true;
    COMMENTS.set(cobjToDelete.cid, cobjToDelete);
    queuedActions.push({ comment: cobjToDelete });
  }

  // IIe. DELETE ALL?
  // If everything in the thread has been deleted, also remove everything.
  // If root, then if the root and replies are all deleted, delete all
  // If thread, then if root and replies are all deelted, delete all
  // This an odd call because if we're deleting a thread item, we need to pop up a level
  // and also delete and relink the root
  let rootId;
  if (cobjIsRoot) rootId = cid; // get the first reply and the next
  else rootId = cobjToDelete.cid_root; // is a thread reply, so pop up a level and get the root
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
      const prev = COMMENTS.get(rootCobj.cid_previous);
      if (nextCobj) {
        nextCobj.cid_previous = prev ? prev.cid : ''; // if there's no prev, this is the first root
        COMMENTS.set(nextCobj.cid, nextCobj);
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
    const rootId = cobjToDelete.cid_root;
    const replyIds = m_GetReplies(rootId).reverse(); // walk backwards towards undeleted

    for (let i = 0; i < replyIds.length; i++) {
      const cid = replyIds[i];
      const cobj = COMMENTS.get(cid);
      if (cobj && cobj.isDeleted) {
        // is already marked deleted so remove it
        COMMENTS.delete(cid);
        queuedActions.push({ commentID: cid });
      } else if (cobj && !cobj.isDeleted) {
        // found an undeleted item, stop!
        break;
      }
    }
  }

  // IIg. FINISHED
  m_UpdateDerivedData();
  return queuedActions;
}

/// MESSAGE API METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** MESSAGE API: Call to batch updates an array of updated comments
 *  Invoked by 'COMMENTS_UPDATE', 'COMMENT_UPDATE'
 */
function HandleUpdatedComments(cobjs: TComment[]) {
  // REVIEW this is dataflow-breaking invocation from GUI???
  cobjs.forEach(cobj => UpdateComment(cobj, { defer: true }));
  m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** MESSAGE API: Remove the provided comment ids.
 *  associated with 'COMMENTS_UPDATE', 'COMMENT_UPDATE' handlers
 */
function HandleRemovedComments(comment_ids: TCommentID[]) {
  // REVIEW this is dataflow-breaking invocation from GUI???
  comment_ids.forEach(cid => {
    if (DBG) console.log('...removing', cid);
    COMMENTS.delete(cid);
  });
  m_UpdateDerivedData();
}

/// COMMENT HELPER METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: Checks if the current root and all children are marked deleted.
 *  This is used to determine if we can safely prune the whole thread
 *  because every other comment in the thread has been marked deleted.
 */
function m_AllAreMarkedDeleted(rootCommentId: TCommentID): boolean {
  const allCommentIdsInThread = [rootCommentId, ...m_GetReplies(rootCommentId)];
  const allCommentsInThread = allCommentIdsInThread.map(cid => COMMENTS.get(cid));
  let allAreMarkedDeleted = true;
  allCommentsInThread.forEach(cobj => {
    if (!cobj) return; // was already deleted
    if (!cobj.isDeleted) allAreMarkedDeleted = false;
  });
  return allAreMarkedDeleted;
}

/// COMMENT MARK - DELETE METHODS /////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Mark comment as read by user id */
function MarkCommentRead(cid: TCommentID, uid: TUserID) {
  // Mark the comment read
  const readby = READBY.get(cid) || [];
  if (!readby.includes(uid)) readby.push(uid);
  READBY.set(cid, readby);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Unmark comment as read by user id */
function MarkCommentUnread(cid: TCommentID, uid: TUserID) {
  // Mark the comment NOT read
  const readby = READBY.get(cid) || [];
  const updatedReadby = readby.filter(readByUid => readByUid !== uid);
  READBY.set(cid, updatedReadby);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Return true if comment has been read by a particular user */
function IsMarkedRead(cid: TCommentID, uid: TUserID): boolean {
  const readby = READBY.get(cid) || [];
  return readby.includes(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Check if a particular comment was marked as "deleted"  */
function IsMarkedDeleted(cid: TCommentID): boolean {
  return COMMENTS.get(cid).isDeleted;
}

/// COMMENT COLLECTION METHODS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Remove all comments for a particular collection */
function RemoveAllCommentsForCref({ cref, uid }): TCommentQueueActions[] {
  const queuedActions = [];
  const cids = COMMENTS.forEach(cobj => {
    if (cobj.cref === cref) {
      COMMENTS.delete(cobj.cid);
      queuedActions.push({ commentID: cobj.cid });
    }
  });
  m_UpdateDerivedData();
  return queuedActions;
}

/// COMMENT THREAD HELPERS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: Walk down the next items starting with the current
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
/** HELPER: Gets all the child reply comments under the root
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
/** HELPER: recursively add replies and next
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

/// COMMENT THREAD METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Get all the comment ids related to a particular cref
 *  based on ROOTS.
 *  DeriveValues needs to be called before this method can be used.
 */
function GetThreadedCommentIds(cref: TAnnotableRef): TCommentID[] {
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
 *  Get all the comments related to a particular cref
 */
function GetThreadedCommentData(cref: TAnnotableRef): TComment[] {
  const threaded_comments_ids = GetThreadedCommentIds(cref);
  // convert ids to comment objects
  return threaded_comments_ids.map(cid => COMMENTS.get(cid));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Return the array of users who have read a particular comment */
function GetReadby(cid: TCommentID): TUserID[] {
  return READBY.get(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Return all the TCommentCollectionID */
function GetCrefs(): TAnnotableRef[] {
  return [...ROOTS.keys()];
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Init,
  // DB
  UpdateData,
  // COMMENT CRUD API
  GetComment,
  AddComment,
  UpdateComment,
  RemoveComment,
  // COMMENT MESSAGE API
  HandleUpdatedComments,
  HandleRemovedComments,
  // COMMENT OPERATIONS API
  RemoveAllCommentsForCref,
  MarkCommentRead,
  MarkCommentUnread,
  // COMMENT STATUS API
  IsMarkedRead,
  IsMarkedDeleted,
  // REVIEW: COMMENT VIEW API shouldn't be here?
  GetThreadedCommentIds,
  GetThreadedCommentData,
  // COMMENT READ STATUS API
  GetReadby,
  // COMMENT COLLECTIONS API
  GetCrefs,
  // 'protected' data for use by ac-comment
  COMMENTS
};
