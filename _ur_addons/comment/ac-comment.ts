/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ac-comments

  there's the a chain of lifecycle events:
  - initial render
  - user events routing
  - reactive rendering
  - data entry mode
  - data editing,
  - data submission
  - data update
  - data notification -> reactive rendering

  - comments can be opened and edited
  - a list of active open comments is maintained, as these are transactions in
    progress (open -> close)
  - a list of active edtted comments is maintained, as this is a transaction in
    progress as well (edit - done)
  - there is an intertwingled set of rules that affect Open and Edit (state
    machine)

  visual things
  - comment badges, comment threads, and comments are the main components, which
    are comprised of their own operations
  - these are not the same as operations as described above, but are generated
    from the comment data source and cached as viewstate usable by the renderer.
  - there are a number of supported viewstate methods that create the data
    needed by each of these controls.

  comment badges:
  - display links and info, can be open or closed.

  comment threads:
  - a list of comments that can be opened and closed
  - commands other than "close" are "add reply" based on what's clicked. 
    This UI is inconsistent.
  - comment objects that are contained within handle actual editing
  - hovering create state changes (nested)

  comments:
  - a comment can be expanded or not (?)
  - a comment can be in edit mode or read only
  - transaction: edited -> submitted or cancelled
  - hovering creates state changes (nested)  

  For the data submission side of things:
  - open/close actions are tracked by the UI
  - comment creation invoke database entry create
  - comment edit creates locking
  - comment submission updates database

  There's a hierarchy of selection < highlighted < focused that affect the
  render display. This is another state machine that's modeled in the appstate,
  not the UI through checking of flags and what not and firing events all over
  the place.

  App Core Comments

  DATA

    COMMENTCOLLECTION ccol
    -----------------
    A COMENTCOLLECTION is the main data source for the CommentBtn. It primarily
    shows summary information for the three states of the button:
    * has no comments
    * has unread comments
    * has read comments It passes on the cref to the CommentThread components.

      interface CommentCollection { cref: any; // cref hasUnreadComments:
        boolean; hasReadComments: boolean;
      }


    COMMENTUISTATE cui
    --------------
    A COMMENTUISTATE object can be opened and closed from multiple UI elements.
    COMMENTUI keeps track of the `isOpen` status based on the UI element. e.g. a
    comment button in a node can open a comment but the same comment can be
    opeend from the node table view.

      COMMENTUISTATE Map<uiref, {cref, isOpen}>


    OPENCOMMENTS
    ------------
    OPENCOMMENTS keeps track of currently open comment buttons.  This is used
    prevent two comment buttons from opening the same comment collection, e.g.
    if the user opens a node and a node table comment at the same time.

      OPENCOMMENTS Map<cref, uiref>


    EDITABLECOMMENTS
    ----------------
    EDITABLECOMMENTS keeps track of which comment is currently open for editing.
    This is used to prevent close requests coming from NCCOmmentThreads from
    closing a NCComment that is in the middle of being edited. Tracked locally
    only.

      EDITABLECOMMENTS Map<cid, cid>


    COMMENT_VSTATE
    ------------
    COMMENT_VSTATE are a flat array of data sources (cvobj) for CommentThread
    ojects.

      COMMENT_VSTATE Map(cref, cvobj[])


    CommentVObj cvobj
    -----------
    CommentVObj a handles the UI view state of the each comment in the thread.
    cvobjs are a unique to each user id.

      interface CommentVObj {
        cid: any;

        createtime_string: string;
        modifytime_string: string;

        level: number;

        isSelected: boolean;
        isBeingEdited: boolean;
        isEditable: boolean;
        isMarkedRead: boolean;
        isReplyToMe: boolean;
        allowReply: boolean;

        markedRead: boolean;
      }

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as COMMENTS from './dc-comment.ts';
import * as USERS from './dc-comment-users.ts';
import { APPSTATE, TIME } from './mock-core.ts';
import * as TEMPLATES from './dc-template.ts';
import type {
  TComment,
  TAnnotableRef,
  TCommentID,
  TUserID,
  CTemplateRef,
  TCommentType,
  TCommentTypeMap,
  TCommentQueueActions,
  TCommentData,
  TDataSet
} from './types-comment.ts';

const DBG = true;
const PR = 'ac-comments';

/// TYPE DEFINITIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** a uiref is the id of an HTMLElement encoded with additional properties
 *  so it can be passed back to the comment manager as a unique key like:
 *  `${prefix}-${cref}${uuiid}`
 *  - prefix is prepended during constrution by URCommentBtn component
 *  - cref is the collection ref (TAnnotableRef)
 *  - uuiid is a unique id for the element that is optionally added when
 *    a CommentBtn (badge) is created
 */
type CommentUIRef = string; 
type OpenCommentsMap = Map<TAnnotableRef, CommentUIRef>;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** used for the comment badges that attach to each annotable object */
type CommentCollectionMap = Map<TAnnotableRef, CommentCollection>;
type CommentCollection = {
  cref: TAnnotableRef;
  hasUnreadComments?: boolean;
  hasReadComments?: boolean;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** track the open state of a given comment collection */
type CommentUIStateMap = Map<CommentUIRef, CommentOpenState>;
type CommentOpenState = {
  cref: TAnnotableRef;
  isOpen: boolean;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** track the interactive state of a given comment compponent */
type CommentViewStateMap = Map<TAnnotableRef, CommentVisualState[]>;
type CommentVisualState = {
  // Comment Data
  cid: TCommentID;
  createtime_string: string;
  modifytime_string: string;
  // visual layout properties
  level: number;
  // component state
  isSelected: boolean;
  isBeingEdited: boolean;
  isEditable: boolean;
  isMarkedRead: boolean;
  isReplyToMe: boolean;
  // user access
  allowReply: boolean;
  markedRead: boolean;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** track the comments that are being edited */
type CommentBeingEditedMap = Map<TCommentID, TCommentID>;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const COMMENTCOLLECTION: CommentCollectionMap = new Map(); // Map<cref, ccol>
const COMMENTUISTATE: CommentUIStateMap = new Map(); // Map<uiref, {cref, isOpen}>
const OPENCOMMENTS: OpenCommentsMap = new Map(); // Map<cref, uiref>
const COMMENTS_BEING_EDITED: CommentBeingEditedMap = new Map(); // Map<cid, cid>
const COMMENT_VSTATE: CommentViewStateMap = new Map(); // Map<cref, cvobj[]>

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** passthrough to COMMENTS.Init() */
function Init() {
  if (DBG) console.log('ac-comments Init');
  COMMENTS.Init();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** passthrough to COMMENTS.UpdateData */
function UpdateData(data: TDataSet) {
  if (DBG) console.log(PR, 'UpdateData', data);
  COMMENTS.UpdateData(data);
}

/// COMMENT COLLECTIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** passthrough to comment collection map */
function GetCommentCollections(): CommentCollectionMap {
  return COMMENTCOLLECTION;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return the comment root for a given reference */
function GetCommentCollection(cref: TAnnotableRef): CommentCollection {
  const collection = COMMENTCOLLECTION.get(cref);
  return collection;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** ? update comment component state based on openState */
function UpdateCommentUIState(uiref: CommentUIRef, openState: CommentOpenState) {
  if (!uiref) throw new Error('UpdateCommentUIState "uiref" must be defined!');
  COMMENTUISTATE.set(uiref, { cref: openState.cref, isOpen: openState.isOpen });
  OPENCOMMENTS.set(openState.cref, uiref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** ? combined update of component "open" status and mark as read */
function CloseCommentCollection(
  uiref: CommentUIRef,
  cref: TAnnotableRef,
  uid: TUserID
) {
  // Set isOpen status
  COMMENTUISTATE.set(uiref, { cref, isOpen: false });
  OPENCOMMENTS.set(cref, undefined);
  //
  MarkRead(cref, uid);
  // Update Derived Lists to update Marked status
  DeriveThreadedViewObjects(cref, uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Mark a particular comment thread as read by user */
function MarkRead(cref: TAnnotableRef, uid: TUserID) {
  // Mark Read
  const commentVObjs = COMMENT_VSTATE.get(cref);
  commentVObjs.forEach(cvobj => COMMENTS.MarkCommentRead(cvobj.cid, uid));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** count replies/unread replies for user */
function GetCommentStats(uid: TUserID): {
  countRepliesToMe: number;
  countUnread: number;
} {
  let countRepliesToMe = 0;
  let countUnread = 0;
  DeriveAllThreadedViewObjects(uid);
  // 1. collect replies to me
  const crefs = COMMENTS.GetCrefs();
  let rootCidsWithRepliesToMe = [];
  crefs.forEach(cref => {
    const cvobjs = COMMENT_VSTATE.get(cref);
    cvobjs.find(cvobj => {
      const comment = COMMENTS.GetComment(cvobj.cid);
      if (comment.user_id === uid && comment.cid_root !== '')
        rootCidsWithRepliesToMe.push(comment.cid_root);
    });
  });
  // 2. count total and unread replies to me
  COMMENT_VSTATE.forEach(cvobjs => {
    cvobjs.forEach(cvobj => {
      if (!cvobj.isMarkedRead) {
        // count unread
        countUnread++;
        // count repliesToMe
        const comment = COMMENTS.GetComment(cvobj.cid);
        if (rootCidsWithRepliesToMe.includes(comment.cid_root)) {
          // HACKY: Update cvobj by reference!
          cvobj.isReplyToMe = true;
          countRepliesToMe++;
        }
      }
    });
  });
  return { countRepliesToMe, countUnread };
}

/// COMMENT UI STATE //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** tracks comment visual component state by uiref */
function GetCommentUIState(uiref: CommentUIRef): CommentOpenState {
  return COMMENTUISTATE.get(uiref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** OpenComments tracks which comments are open */
function GetOpenComments(cref: TAnnotableRef): CommentUIRef {
  return OPENCOMMENTS.get(cref);
}

/// COMMENT UI EDITING STATE //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** contains the flags for a particular comment */
function m_RegisterCommentBeingEdited(cid: TCommentID) {
  COMMENTS_BEING_EDITED.set(cid, cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Mirror of m_RegisterCommentBeingEdited */
function m_DeRegisterCommentBeingEdited(cid: TCommentID) {
  COMMENTS_BEING_EDITED.delete(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** accessor for COMMENTS_BEING_EDITED */
function GetCommentBeingEdited(cid: TCommentID): TCommentID {
  return COMMENTS_BEING_EDITED.get(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return all unread replies to user */
function GetUnreadRepliesToMe(uid?: TUserID): TComment[] {
  const comments = [];
  COMMENT_VSTATE.forEach(cvobjs => {
    cvobjs.forEach(cvobj => {
      if (cvobj.isReplyToMe) comments.push(COMMENTS.GetComment(cvobj.cid));
    });
  });
  return comments;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return all unread comments in system */
function GetUnreadComments(): TComment[] {
  const comments = [];
  COMMENT_VSTATE.forEach(cvobjs => {
    cvobjs.forEach(cvobj => {
      if (!cvobj.isMarkedRead) comments.push(COMMENTS.GetComment(cvobj.cid));
    });
  });
  return comments;
}

/// THREADED VIEWS OF COMMENTS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** LIFECYCLE: update all data structures related to threaded comments */
function DeriveAllThreadedViewObjects(uid: TUserID) {
  const crefs = COMMENTS.GetCrefs();
  crefs.forEach(cref => DeriveThreadedViewObjects(cref, uid));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: given the ref and user, return commentReplyVObjs for rendering
 *  seems to have a side effect of updating COMMENT_VSTATE
 */
function DeriveThreadedViewObjects(
  cref: TAnnotableRef,
  uid: TUserID
): CommentVisualState[] {
  if (cref === undefined)
    throw new Error(`m_DeriveThreadedViewObjects cref: "${cref}" must be defined!`);
  // 1. Get all comments for cref
  const commentVObjs = [];
  const threadIds = COMMENTS.GetThreadedCommentIds(cref);
  threadIds.forEach(cid => {
    const comment = COMMENTS.GetComment(cid);
    if (comment === undefined)
      console.error('GetThreadedViewObjects for cid not found', cid, 'in', threadIds);
    const level = comment.cid_root === '' ? 0 : 1;
    commentVObjs.push({
      cid: cid,
      createtime_string: TIME.stringFromTimestamp(comment.user_ctime),
      modifytime_string: comment.user_mtime
        ? TIME.stringFromTimestamp(comment.user_mtime)
        : '',
      level,
      isSelected: false,
      isBeingEdited: false,
      isEditable: false,
      isMarkedRead: COMMENTS.IsMarkedRead(cid, uid),
      allowReply: undefined // will be defined next
    });
  });
  // 2. Figure out which comment can add a reply:
  // * any top level comment or
  // * for threads, only the last comment in a thread is allowed to reply
  const reversedCommentVObjs = commentVObjs.reverse();
  const commentReplyVObjs = [];
  let prevLevel = -1;
  reversedCommentVObjs.forEach(cvobj => {
    if (
      (cvobj.level === 0 && cvobj.level >= prevLevel) || // is top level without a reply thread
      cvobj.level > prevLevel // or is a thread
    )
      cvobj.allowReply = true;
    commentReplyVObjs.push(cvobj);
    prevLevel = cvobj.level;
  });
  COMMENT_VSTATE.set(cref, commentReplyVObjs.reverse());

  // 3. Derive COMMENTCOLLECTION
  const ccol: CommentCollection = COMMENTCOLLECTION.get(cref) || {
    cref: cref
  };
  const hasReadComments = commentReplyVObjs.length > 0;
  let hasUnreadComments = false;
  commentReplyVObjs.forEach(c => {
    if (!c.isMarkedRead) hasUnreadComments = true;
  });
  ccol.hasUnreadComments = hasUnreadComments;
  ccol.hasReadComments = hasReadComments;
  COMMENTCOLLECTION.set(cref, ccol);
  // 
  return commentReplyVObjs;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given cred and UID, get the CommentVisualState */
function GetThreadedViewObjects(
  cref: TAnnotableRef,
  uid: TUserID
): CommentVisualState[] {
  const commentVObjs = COMMENT_VSTATE.get(cref);
  return commentVObjs === undefined
    ? DeriveThreadedViewObjects(cref, uid)
    : commentVObjs;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return count of ThreadedViewObjects */
function GetThreadedViewObjectsCount(cref: TAnnotableRef, uid: TUserID): number {
  return GetThreadedViewObjects(cref, uid).length;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** passthrough for direct access to COMMENT_VSTATE */
function GetCOMMENTVOBJS(): CommentViewStateMap {
  return COMMENT_VSTATE;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** get the CommentVObj for a given ref and id */
function GetCommentVObj(cref: TAnnotableRef, cid: TCommentID): CommentVisualState {
  const thread = COMMENT_VSTATE.get(cref);
  const cvobj = thread.find(c => c.cid === cid);
  return cvobj;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Add a new comment and trigger COMMENT_VSTATE state change */
function AddComment(data): TComment {
  if (data.cref === undefined)
    throw new Error('Comments must have a collection ref!');

  const comment = COMMENTS.AddComment(data);
  DeriveThreadedViewObjects(data.cref, data.user_id);

  // Make it editable
  let commentVObjs = GetThreadedViewObjects(data.cref, data.user_id);
  const cvobj = GetCommentVObj(comment.cref, comment.cid);
  if (cvobj === undefined)
    console.error(
      'ac-comment:Could not find CommentVObj',
      comment.cref,
      comment.cid,
      COMMENT_VSTATE
    );
  cvobj.isBeingEdited = true;
  m_RegisterCommentBeingEdited(comment.cid);

  commentVObjs = commentVObjs.map(c => (c.cid === cvobj.cid ? cvobj : c));
  COMMENT_VSTATE.set(data.cref, commentVObjs);

  return comment;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Add changed comment to COMMENTS and generate derived objects */
function UpdateComment(cobj: TComment, uid: TUserID) {
  if (cobj.cref === undefined)
    throw new Error(`UpdateComment cref is undefined ${cobj}`);

  COMMENTS.UpdateComment(cobj);
  DeriveThreadedViewObjects(cobj.cref, uid);
  // Disable editable and update modify time
  let commentVObjs = GetThreadedViewObjects(cobj.cref, uid);
  const cvobj = GetCommentVObj(cobj.cref, cobj.cid);
  if (cvobj === undefined)
    throw new Error(
      `ac-comment.UpdateComment could not find cobj ${cobj.cid}.  Maybe it hasn't been created yet? ${COMMENT_VSTATE}`
    );

  // mark it unread
  cvobj.isMarkedRead = false; // clear read status
  COMMENTS.MarkCommentUnread(cvobj.cid, uid);

  cvobj.isBeingEdited = false;
  m_DeRegisterCommentBeingEdited(cobj.cid);
  cvobj.modifytime_string = TIME.stringFromTimestamp(cobj.user_mtime);
  commentVObjs = commentVObjs.map(c => (c.cid === cvobj.cid ? cvobj : c));
  COMMENT_VSTATE.set(cobj.cref, commentVObjs);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Batch updates an array of updated comments
 *  This updates the local browser's comment state to match the server.
 *  Triggered by COMMENTS_UPDATE network call after someone else on the network removes a comment.
 *  Does NOT trigger a database update
 *  (Contrast this with UpdateComment above)
 */
function HandleUpdatedComments(comments: TComment[], uid?: TUserID) {
  COMMENTS.HandleUpdatedComments(comments);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Processes the comment removal triggered by the local user, including relinking logic
 *  This is called BEFORE the database update.
 *  (Contrast this with UpdateRemovedComment below)
 */
function RemoveComment(parms: {
  cref: TAnnotableRef;
  cid: TCommentID;
  uid: TUserID;
  isAdmin: boolean;
}): TCommentQueueActions[] {
  if (parms.cref === undefined)
    throw new Error(`RemoveComment cref is undefined ${parms}`);
  const queuedActions = COMMENTS.RemoveComment(parms);
  DeriveThreadedViewObjects(parms.cref, parms.uid);
  // Add an action to update the cref, which forces an update after removal
  // otherwise the comment would have been removed and we no longer have a reference to the cref
  queuedActions.push({ cref: parms.cref });
  return queuedActions;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Processes comment removal triggered by deletion of a source (e.g. node or edge)
 */
function RemoveAllCommentsForCref(parms: {
  cref: TAnnotableRef;
  uid: TUserID;
}): TCommentQueueActions[] {
  if (parms.cref === undefined)
    throw new Error(`RemoveAllCommentsForCref cref is undefined ${parms}`);
  const queuedActions = COMMENTS.RemoveAllCommentsForCref(parms);
  DeriveThreadedViewObjects(parms.cref, parms.uid);
  // Add an action to update the cref, which forces an update after removal
  // otherwise the comment would have been removed and we no longer have a reference to the cref
  queuedActions.push({ cref: parms.cref });
  return queuedActions;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Batch updates a list of removed comment ids
 *  This updates the local browser's comment state to match the server.
 *  Triggered by COMMENTS_UPDATE network call after someone else on the network removes a comment.
 *  This assumes that it is safe to simply delete the comment.  Any relinking
 *  should have been handled by UpdateComment
 *  Does NOT trigger a database update
 *  (Contrast this with RemoveComment above)
 */
function HandleRemovedComments(comment_ids: TCommentID[], uid?: TUserID) {
  COMMENTS.HandleRemovedComments(comment_ids);
}

/// PASS-THROUGH METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetUserName(uid: TCommentID): string {
  return USERS.GetUserName(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetCommentTypes(): TCommentTypeMap {
  return TEMPLATES.TPL_COMMENTS;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetCOMMENTS() {
  return COMMENTS.COMMENTS;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetCommentType(slug: CTemplateRef): TCommentType {
  return TEMPLATES.GetCommentType(slug);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetDefaultCommentType(): TCommentType {
  return TEMPLATES.GetDefaultCommentType();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetComment(cid: TCommentID): TComment {
  return COMMENTS.GetComment(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetReadby(cid: TCommentID): TUserID[] {
  return COMMENTS.GetReadby(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetCrefs(): TAnnotableRef[] {
  return COMMENTS.GetCrefs();
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Init,
  // DB
  UpdateData,
  // Comment Collection
  GetCommentCollections,
  GetCommentCollection,
  UpdateCommentUIState,
  CloseCommentCollection,
  MarkRead,
  GetCommentStats,
  // Comment UI State
  GetCommentUIState,
  // Open Comments
  GetOpenComments,
  // Editable Comments
  GetCommentBeingEdited,
  // Unread Comments
  GetUnreadRepliesToMe,
  GetUnreadComments,
  // Comment Thread View Object
  DeriveAllThreadedViewObjects,
  DeriveThreadedViewObjects,
  GetThreadedViewObjects,
  GetThreadedViewObjectsCount,
  GetCOMMENTVOBJS,
  GetCommentVObj,
  // Comment Objects
  AddComment,
  UpdateComment,
  HandleUpdatedComments,
  RemoveComment,
  RemoveAllCommentsForCref,
  HandleRemovedComments,
  // PASS THROUGH
  GetUserName,
  GetCommentTypes,
  GetCommentType,
  GetDefaultCommentType,
  GetCOMMENTS,
  GetComment,
  GetReadby,
  GetCrefs
};
