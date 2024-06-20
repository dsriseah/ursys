/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ac-comments
  
  App Core Comments
  
  DATA
  
    COMMENTCOLLECTION ccol
    -----------------
    A COMENTCOLLECTION is the main data source for the CommentBtn.
    It primarily shows summary information for the three states of the button:
    * has no comments
    * has unread comments
    * has read comments
    It passes on the collection_ref to the CommentThread components.
    
      interface CommentCollection {
        cref: any; // collection_ref
        hasUnreadComments: boolean;
        hasReadComments: boolean;
      }

      
    COMMENTUISTATE cui
    --------------
    A COMMENTUISTATE object can be opened and closed from multiple UI elements.
    COMMENTUI keeps track of the `isOpen` status based on the UI element.
    e.g. a comment button in a node can open a comment but the same comment can
    be opeend from the node table view.
    
      COMMENTUISTATE Map<uiref, {cref, isOpen}>
    
    
    OPENCOMMENTS
    ------------
    OPENCOMMENTS keeps track of currently open comment buttons.  This is 
    used prevent two comment buttons from opening the same comment collection,
    e.g. if the user opens a node and a node table comment at the same time.
    
      OPENCOMMENTS Map<cref, uiref>

      
    EDITABLECOMMENTS
    ----------------
    EDITABLECOMMENTS keeps track of which comment is currently open for 
    editing.  This is used to prevent close requests coming from NCCOmmentThreads
    from closing a NCComment that is in the middle of being edited.
    Tracked locally only.
    
      EDITABLECOMMENTS Map<cid, cid>

      
    COMMENT_VSTATE
    ------------
    COMMENT_VSTATE are a flat array of data sources (cvobj) for CommentThread ojects.
    
      COMMENT_VSTATE Map(cref, cvobj[])

      
    CommentVObj cvobj
    -----------
    CommentVObj a handles the UI view state of the each comment in the thread.
    cvobjs are a unique to each user id.
      
      interface CommentVObj {
        comment_id: any;
        
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
import { APP, TIME } from './mock-core.ts';
import * as TEMPLATES from './dc-template.ts';
import type {
  TComment,
  TCollectionRef,
  TCommentID,
  TUserID,
  CType,
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
type CommentCollection = {
  collection_ref: TCollectionRef;
  hasUnreadComments?: boolean;
  hasReadComments?: boolean;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type CommentUIRef = string; // comment button id, e.g. `n32-isTable`, not just TCollectionRef
type CommentOpenState = {
  cref: TCollectionRef;
  isOpen: boolean;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type CommentVisualState = {
  comment_id: TCommentID;
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
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type CommentCollectionMap = Map<TCollectionRef, CommentCollection>;
type CommentUIStateMap = Map<CommentUIRef, CommentOpenState>;
type OpenCommentsMap = Map<TCollectionRef, CommentUIRef>;
type CommentBeingEditedMap = Map<TCommentID, TCommentID>;
type CommentViewStateMap = Map<TCollectionRef, CommentVisualState[]>;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const COMMENTCOLLECTION: CommentCollectionMap = new Map(); // Map<cref, ccol>
const COMMENTUISTATE: CommentUIStateMap = new Map(); // Map<uiref, {cref, isOpen}>
const OPENCOMMENTS: OpenCommentsMap = new Map(); // Map<cref, uiref>
const COMMENTS_BEING_EDITED: CommentBeingEditedMap = new Map(); // Map<cid, cid>
const COMMENT_VSTATE: CommentViewStateMap = new Map(); // Map<cref, cvobj[]>

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Init() {
  if (DBG) console.log('ac-comments Init');
  COMMENTS.Init();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function UpdateData(data: TDataSet) {
  if (DBG) console.log(PR, 'UpdateData', data);
  COMMENTS.UpdateData(data);
}

/// COMMENT COLLECTIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentCollections(): CommentCollectionMap {
  return COMMENTCOLLECTION;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentCollection(cref: TCollectionRef): CommentCollection {
  const collection = COMMENTCOLLECTION.get(cref);
  return collection;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function UpdateCommentUIState(uiref: CommentUIRef, openState: CommentOpenState) {
  if (!uiref) throw new Error('UpdateCommentUIState "uiref" must be defined!');
  COMMENTUISTATE.set(uiref, { cref: openState.cref, isOpen: openState.isOpen });
  OPENCOMMENTS.set(openState.cref, uiref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function CloseCommentCollection(
  uiref: CommentUIRef,
  cref: TCollectionRef,
  uid: TUserID
) {
  // Set isOpen status
  COMMENTUISTATE.set(uiref, { cref, isOpen: false });
  OPENCOMMENTS.set(cref, undefined);

  MarkRead(cref, uid);

  // Update Derived Lists to update Marked status
  DeriveThreadedViewObjects(cref, uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function MarkRead(cref: TCollectionRef, uid: TUserID) {
  // Mark Read
  const commentVObjs = COMMENT_VSTATE.get(cref);
  commentVObjs.forEach(cvobj => COMMENTS.MarkCommentRead(cvobj.comment_id, uid));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentStats(uid: TUserID): {
  countRepliesToMe: number;
  countUnread: number;
} {
  let countRepliesToMe = 0;
  let countUnread = 0;
  DeriveAllThreadedViewObjects(uid);

  // find replies to me
  const crefs = COMMENTS.GetCrefs();
  let rootCidsWithRepliesToMe = [];
  crefs.forEach(cref => {
    const cvobjs = COMMENT_VSTATE.get(cref);
    cvobjs.find(cvobj => {
      const comment = COMMENTS.GetComment(cvobj.comment_id);
      if (comment.commenter_id === uid && comment.comment_id_parent !== '')
        rootCidsWithRepliesToMe.push(comment.comment_id_parent);
    });
  });

  COMMENT_VSTATE.forEach(cvobjs => {
    cvobjs.forEach(cvobj => {
      if (!cvobj.isMarkedRead) {
        // count unread
        countUnread++;
        // count repliesToMe
        const comment = COMMENTS.GetComment(cvobj.comment_id);
        if (rootCidsWithRepliesToMe.includes(comment.comment_id_parent)) {
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
/** */
function GetCommentUIState(uiref: CommentUIRef): CommentOpenState {
  return COMMENTUISTATE.get(uiref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetOpenComments(cref: TCollectionRef): CommentUIRef {
  return OPENCOMMENTS.get(cref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_RegisterCommentBeingEdited(cid: TCommentID) {
  COMMENTS_BEING_EDITED.set(cid, cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_DeRegisterCommentBeingEdited(cid: TCommentID) {
  COMMENTS_BEING_EDITED.delete(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentBeingEdited(cid: TCommentID): TCommentID {
  return COMMENTS_BEING_EDITED.get(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUnreadRepliesToMe(uid?: TUserID): TComment[] {
  const comments = [];
  COMMENT_VSTATE.forEach(cvobjs => {
    cvobjs.forEach(cvobj => {
      if (cvobj.isReplyToMe) comments.push(COMMENTS.GetComment(cvobj.comment_id));
    });
  });
  return comments;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUnreadComments(): TComment[] {
  const comments = [];
  COMMENT_VSTATE.forEach(cvobjs => {
    cvobjs.forEach(cvobj => {
      if (!cvobj.isMarkedRead) comments.push(COMMENTS.GetComment(cvobj.comment_id));
    });
  });
  return comments;
}

/// THREADED VIEWS OF COMMENTS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function DeriveAllThreadedViewObjects(uid: TUserID) {
  const crefs = COMMENTS.GetCrefs();
  crefs.forEach(cref => DeriveThreadedViewObjects(cref, uid));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function DeriveThreadedViewObjects(
  cref: TCollectionRef,
  uid: TUserID
): CommentVisualState[] {
  if (cref === undefined)
    throw new Error(`m_DeriveThreadedViewObjects cref: "${cref}" must be defined!`);
  const commentVObjs = [];
  const threadIds = COMMENTS.GetThreadedCommentIds(cref);
  threadIds.forEach(cid => {
    const comment = COMMENTS.GetComment(cid);
    if (comment === undefined)
      console.error('GetThreadedViewObjects for cid not found', cid, 'in', threadIds);
    const level = comment.comment_id_parent === '' ? 0 : 1;
    commentVObjs.push({
      comment_id: cid,
      createtime_string: TIME.stringFromTimestamp(comment.comment_createtime),
      modifytime_string: comment.comment_modifytime
        ? TIME.stringFromTimestamp(comment.comment_modifytime)
        : '',
      level,
      isSelected: false,
      isBeingEdited: false,
      isEditable: false,
      isMarkedRead: COMMENTS.IsMarkedRead(cid, uid),
      allowReply: undefined // will be defined next
    });
  });

  // Figure out which comment can add a reply:
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

  // Derive COMMENTCOLLECTION
  const ccol: CommentCollection = COMMENTCOLLECTION.get(cref) || {
    collection_ref: cref
  };
  const hasReadComments = commentReplyVObjs.length > 0;
  let hasUnreadComments = false;
  commentReplyVObjs.forEach(c => {
    if (!c.isMarkedRead) hasUnreadComments = true;
  });
  ccol.hasUnreadComments = hasUnreadComments;
  ccol.hasReadComments = hasReadComments;
  COMMENTCOLLECTION.set(cref, ccol);
  return commentReplyVObjs;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetThreadedViewObjects(
  cref: TCollectionRef,
  uid: TUserID
): CommentVisualState[] {
  const commentVObjs = COMMENT_VSTATE.get(cref);
  return commentVObjs === undefined
    ? DeriveThreadedViewObjects(cref, uid)
    : commentVObjs;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetThreadedViewObjectsCount(cref: TCollectionRef, uid: TUserID): number {
  return GetThreadedViewObjects(cref, uid).length;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCOMMENTVOBJS(): CommentViewStateMap {
  return COMMENT_VSTATE;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentVObj(cref: TCollectionRef, cid: TCommentID): CommentVisualState {
  const thread = COMMENT_VSTATE.get(cref);
  const cvobj = thread.find(c => c.comment_id === cid);
  return cvobj;
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Add a new comment and trigger COMMENT_VSTATE state change */
function AddComment(data): TComment {
  if (data.cref === undefined)
    throw new Error('Comments must have a collection ref!');

  const comment = COMMENTS.AddComment(data);
  DeriveThreadedViewObjects(data.cref, data.commenter_id);

  // Make it editable
  let commentVObjs = GetThreadedViewObjects(data.cref, data.commenter_id);
  const cvobj = GetCommentVObj(comment.collection_ref, comment.comment_id);
  if (cvobj === undefined)
    console.error(
      'ac-comment:Could not find CommentVObj',
      comment.collection_ref,
      comment.comment_id,
      COMMENT_VSTATE
    );
  cvobj.isBeingEdited = true;
  m_RegisterCommentBeingEdited(comment.comment_id);

  commentVObjs = commentVObjs.map(c =>
    c.comment_id === cvobj.comment_id ? cvobj : c
  );
  COMMENT_VSTATE.set(data.cref, commentVObjs);

  return comment;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Add changed comment to COMMENTS and generate derived objects */
function UpdateComment(cobj: TComment, uid: TUserID) {
  if (cobj.collection_ref === undefined)
    throw new Error(`UpdateComment cref is undefined ${cobj}`);

  COMMENTS.UpdateComment(cobj);
  DeriveThreadedViewObjects(cobj.collection_ref, uid);
  // Disable editable and update modify time
  let commentVObjs = GetThreadedViewObjects(cobj.collection_ref, uid);
  const cvobj = GetCommentVObj(cobj.collection_ref, cobj.comment_id);
  if (cvobj === undefined)
    throw new Error(
      `ac-comment.UpdateComment could not find cobj ${cobj.comment_id}.  Maybe it hasn't been created yet? ${COMMENT_VSTATE}`
    );

  // mark it unread
  cvobj.isMarkedRead = false; // clear read status
  COMMENTS.MarkCommentUnread(cvobj.comment_id, uid);

  cvobj.isBeingEdited = false;
  m_DeRegisterCommentBeingEdited(cobj.comment_id);
  cvobj.modifytime_string = TIME.stringFromTimestamp(cobj.comment_modifytime);
  commentVObjs = commentVObjs.map(c =>
    c.comment_id === cvobj.comment_id ? cvobj : c
  );
  COMMENT_VSTATE.set(cobj.collection_ref, commentVObjs);
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
  collection_ref: TCollectionRef;
  comment_id: TCommentID;
  uid: TUserID;
  isAdmin: boolean;
}): TCommentQueueActions[] {
  if (parms.collection_ref === undefined)
    throw new Error(`RemoveComment collection_ref is undefined ${parms}`);
  const queuedActions = COMMENTS.RemoveComment(parms);
  DeriveThreadedViewObjects(parms.collection_ref, parms.uid);
  // Add an action to update the collection_ref, which forces an update after removal
  // otherwise the comment would have been removed and we no longer have a reference to the cref
  queuedActions.push({ collection_ref: parms.collection_ref });
  return queuedActions;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Processes comment removal triggered by deletion of a source (e.g. node or edge)
 */
function RemoveAllCommentsForCref(parms: {
  collection_ref: TCollectionRef;
  uid: TUserID;
}): TCommentQueueActions[] {
  if (parms.collection_ref === undefined)
    throw new Error(`RemoveAllCommentsForCref collection_ref is undefined ${parms}`);
  const queuedActions = COMMENTS.RemoveAllCommentsForCref(parms);
  DeriveThreadedViewObjects(parms.collection_ref, parms.uid);
  // Add an action to update the collection_ref, which forces an update after removal
  // otherwise the comment would have been removed and we no longer have a reference to the cref
  queuedActions.push({ collection_ref: parms.collection_ref });
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
  return COMMENTS.GetUserName(uid);
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
function GetCommentType(slug: CType): TCommentType {
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
function GetCrefs(): TCollectionRef[] {
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
