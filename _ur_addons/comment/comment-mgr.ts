/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  AC MANAGER

  IMPORTS
    NCUI
    EDITORTYPE
    AC
    SETTINGS

  ASSETS
    COMMENTICON -

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

import { APP, TIME, UDATA } from './mock-core.ts';
import { ReactDOM, DATASTORE, EDITORTYPE, ARROW_RIGHT } from './mock-core.ts';
import * as DC from './dc-comment.ts';
import * as AC from './ac-comment.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const PR = 'comment-mgr:';

let UID; // Current User ID
const m_dialog_id = 'dialog-container'; // used to inject dialogs into NetCreate.jsx

/// UNISYS LIFECYCLE HOOKS ////////////////////////////////////////////////////
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:

  HOOKS:

    'INITIALIZE' -

  MESSAGES DECLARE ON INITIALIZE:

`   'LOAD_COMMENT_DATACORE' - HandleCOMMENTS_UPDATE
    'COMMENTS_UPDATE' - HandleCOMMENTS_UPDATE
    'COMMENT_UPDATE' - HandleCOMMENTS_UPDATE
    'READBY_UPDATE' - HandleREADBY_UPDATE
    'EDIT_PERMISSIONS_UPDATE' - m_UpdatePermissions

:*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

/// HELPER FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_SetAppStateCommentCollections() {
  const COMMENTCOLLECTION = AC.GetCommentCollections();
  UDATA.SetAppState('COMMENTCOLLECTION', COMMENTCOLLECTION);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_SetAppStateCommentVObjs() {
  const COMMENTVOBJS = AC.GetCOMMENTVOBJS();
  UDATA.SetAppState('COMMENTVOBJS', COMMENTVOBJS);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_UpdateComment(comment) {
  const cobj = {
    collection_ref: comment.collection_ref,
    comment_id: comment.comment_id,
    comment_id_parent: comment.comment_id_parent,
    comment_id_previous: comment.comment_id_previous,
    comment_type: comment.comment_type,
    comment_createtime: comment.comment_createtime,
    comment_modifytime: comment.comment_modifytime,
    comment_isMarkedDeleted: comment.comment_isMarkedDeleted,
    commenter_id: comment.commenter_id,
    commenter_text: comment.commenter_text
  };
  const uid = GetCurrentUserId();
  AC.UpdateComment(cobj, uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_UpdatePermissions(data) {
  UDATA.NetCall('SRV_GET_EDIT_STATUS').then(data => {
    // disable comment button if someone is editing a comment
    UDATA.LocalCall('COMMENT_UPDATE_PERMISSIONS', data);
  });
}
/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Collection Reference Generators
/// e.g. converts node id to "n32"
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetNodeCREF(nodeId: number): string {
  return `n${nodeId}`;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetEdgeCREF(edgeId: number): string {
  return `e${edgeId}`;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetProjectCREF(projectId: number): string {
  return `p${projectId}`;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function DeconstructCref(cref: string) {
  const type = cref.substring(0, 1);
  const id = cref.substring(1);
  return { type, id };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Generate a human friendly label based on the cref (e.g. `n21`, `e4`)
 *  e.g. "n32" becomes {typeLabel "Node", sourceLabel: "32"}
 *  @param {string} cref
 *  @returns { typeLabel, sourceLabel } sourceLabel is undefined if the source has been deleted
 */
function GetCREFSourceLabel(cref: string) {
  const { type, id } = DeconstructCref(cref);
  let typeLabel;
  let node, edge, nodes, sourceNode, targetNode;
  let sourceLabel; // undefined if not found
  switch (type) {
    case 'n':
      typeLabel = 'Node';
      node = UDATA.AppState('NCDATA').nodes.find(n => n.id === Number(id));
      if (!node) break; // node might be missing if comment references a node that was removed
      if (node) sourceLabel = node.label;
      break;
    case 'e':
      typeLabel = 'Edge';
      edge = UDATA.AppState('NCDATA').edges.find(e => e.id === Number(id));
      if (!edge) break; // edge might be missing if the comment references an edge that was removed
      nodes = UDATA.AppState('NCDATA').nodes;
      sourceNode = nodes.find(n => n.id === Number(edge.source));
      targetNode = nodes.find(n => n.id === Number(edge.target));
      if (edge && sourceNode && targetNode)
        sourceLabel = `${sourceNode.label}${ARROW_RIGHT}${targetNode.label}`;
      break;
    case 'p':
      typeLabel = 'Project';
      sourceLabel = id;
      break;
  }
  return { typeLabel, sourceLabel };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Open the object that the comment refers to
/// e.g. in Net.Create it's a node or edge object
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function OpenReferent(cref: string) {
  const { type, id } = DeconstructCref(cref);
  let edge;
  switch (type) {
    case 'n':
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [parseInt(id)] });
      break;
    case 'e':
      edge = UDATA.AppState('NCDATA').edges.find(e => e.id === Number(id));
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [edge.source] }).then(() => {
        UDATA.LocalCall('EDGE_SELECT', { edgeId: edge.id });
      });
      break;
    case 'p':
      // do something?
      break;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Open comment using a comment id
/** */
function OpenComment(cref: string, cid: string) {
  const { type, id } = DeconstructCref(cref);
  let edge;
  switch (type) {
    case 'n':
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [parseInt(id)] }).then(() => {
        UDATA.LocalCall('COMMENT_SELECT', { cref }).then(() => {
          const commentEl = document.getElementById(cid);
          commentEl.scrollIntoView({ behavior: 'smooth' });
        });
      });
      break;
    case 'e':
      edge = UDATA.AppState('NCDATA').edges.find(e => e.id === Number(id));
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [edge.source] }).then(() => {
        UDATA.LocalCall('EDGE_SELECT', { edgeId: edge.id }).then(() => {
          UDATA.LocalCall('COMMENT_SELECT', { cref }).then(() => {
            const commentEl = document.getElementById(cid);
            commentEl.scrollIntoView({ behavior: 'smooth' });
          });
        });
      });
      break;
    case 'p':
      // do something?
      break;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function SetCurrentUserId(uid: string) {
  UID = uid;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCurrentUserId() {
  return UID; // called by other comment classes
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUserName(uid) {
  return AC.GetUserName(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentTypes() {
  return AC.GetCommentTypes();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentType(slug) {
  return AC.GetCommentType(slug);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetDefaultCommentType() {
  return AC.GetDefaultCommentType();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Global Operations
function MarkAllRead() {
  const uid = GetCurrentUserId();
  const crefs = AC.GetCrefs();
  crefs.forEach(cref => {
    m_DBUpdateReadBy(cref, uid);
    AC.MarkRead(cref, uid);
  });
  AC.DeriveAllThreadedViewObjects(uid);
  m_SetAppStateCommentCollections();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Comment Collections
function GetCommentCollection(uiref) {
  return AC.GetCommentCollection(uiref);
}
/** Marks a comment as read, and closes the component.
 *  Called by NCCommentBtn when clicking "Close"
 *  @param {Object} uiref comment button id
 *  @param {Object} cref collection_ref
 *  @param {Object} uid user id
 */
function CloseCommentCollection(uiref, cref, uid) {
  if (!OKtoClose(cref)) {
    // Comment is still being edited, prevent close
    alert(
      'This comment is still being edited!  Please Save or Cancel before closing the comment.'
    );
    return;
  }
  // OK to close
  m_DBUpdateReadBy(cref, uid);
  AC.CloseCommentCollection(uiref, cref, uid);
  m_SetAppStateCommentCollections();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetCommentStats() {
  const uid = GetCurrentUserId();
  return AC.GetCommentStats(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Comment UI State
function GetCommentUIState(uiref) {
  return AC.GetCommentUIState(uiref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 *
 * @param {string} uiref
 * @param {TCommentOpenState} openState
 */
function UpdateCommentUIState(uiref, openState) {
  AC.UpdateCommentUIState(uiref, openState);
  m_SetAppStateCommentCollections();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Open Comments
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetOpenComments(cref) {
  return AC.GetOpenComments(cref);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
/// Editable Comments (comments being ddited)
function OKtoClose(cref) {
  const cvobjs = GetThreadedViewObjects(cref);
  let isBeingEdited = false;
  cvobjs.forEach(cvobj => {
    if (AC.GetCommentBeingEdited(cvobj.comment_id)) isBeingEdited = true;
  });
  return !isBeingEdited;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Threaded View Objects */
///
function GetThreadedViewObjects(cref, uid?) {
  return AC.GetThreadedViewObjects(cref, uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetThreadedViewObjectsCount(cref, uid) {
  return AC.GetThreadedViewObjectsCount(cref, uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
/// Comment View Objects
function GetCommentVObj(cref, cid) {
  return AC.GetCommentVObj(cref, cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
/// Comments
function GetComment(cid) {
  return AC.GetComment(cid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUnreadRepliesToMe(uid) {
  return AC.GetUnreadRepliesToMe(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function GetUnreadComments() {
  return AC.GetUnreadComments();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 *
 * @param {Object} cobj Comment Object
 */
function AddComment(cobj) {
  // This just generates a new ID, but doesn't update the DB
  DATASTORE.PromiseNewCommentID().then(newCommentID => {
    cobj.comment_id = newCommentID;
    AC.AddComment(cobj); // creates a comment vobject
    m_SetAppStateCommentVObjs();
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Update the ac/dc comments, then save it to the db
 *  This will also broadcast COMMENT_UPDATE so other clients on the network
 *  update the data to match the server.
 *  @param {Object} cobj
 */
function UpdateComment(cobj) {
  const uid = GetCurrentUserId();
  AC.UpdateComment(cobj, uid);
  m_DBUpdateComment(cobj);
  m_SetAppStateCommentVObjs();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Removing a comment can affect multiple comments, so this is done
 *  via a batch operation.  We queue up all of the comment changes
 *  using the logic for removing/re-arranging the comments in
 *  ac-comments/dc-comments, then write out the db updates. This way
 *  the db updates can be blindly accomplished in a single operation.
 *
 *  Removing is a two step process:
 *  1. Show confirmation dialog
 *  2. Execute the remova
 *  @param {Object} parms
 *  @param {string} parms.collection_ref
 *  @param {string} parms.comment_id
 *  @param {string} parms.uid
 *  @param {boolean} parms.showCancelDialog
 *  @param {function} cb CallBack
 */
function RemoveComment(parms, cb) {
  let confirmMessage, okmessage, cancelmessage;
  if (parms.showCancelDialog) {
    // Are you sure you want to cancel?
    confirmMessage = `Are you sure you want to cancel editing this comment #${parms.comment_id}?`;
    okmessage = 'Cancel Editing and Delete';
    cancelmessage = 'Go Back to Editing';
  } else {
    // Are you sure you want to delete?
    parms.isAdmin = APP.isAdmin();
    confirmMessage = parms.isAdmin
      ? `Are you sure you want to delete this comment #${parms.comment_id} and ALL related replies (admin only)?`
      : `Are you sure you want to delete this comment #${parms.comment_id}?`;
    okmessage = 'Delete';
    cancelmessage = "Don't Delete";
  }
  // const dialog = (
  //   <NCDialog
  //     message={confirmMessage}
  //     okmessage={okmessage}
  //     onOK={event => m_ExecuteRemoveComment(event, parms, cb)}
  //     cancelmessage={cancelmessage}
  //     onCancel={m_CloseRemoveCommentDialog}
  //   />
  // );
  // const container = document.getElementById(m_dialog_id);
  // ReactDOM.render(dialog, container);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** The db call is made AFTER ac/dc handles the removal and the logic of
 *  relinking comments.  The db call is dumb, all the logic is in dc-comments.
 *  @param {Object} event
 *  @param {Object} parms
 *  @param {Object} parms.collection_ref
 *  @param {Object} parms.comment_id
 *  @param {Object} parms.uid
 */
function m_ExecuteRemoveComment(event, parms, cb) {
  const queuedActions = AC.RemoveComment(parms);
  m_DBRemoveComment(queuedActions);
  m_SetAppStateCommentVObjs();
  m_CloseRemoveCommentDialog();
  if (typeof cb === 'function') cb();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_CloseRemoveCommentDialog() {
  const container = document.getElementById(m_dialog_id);
  ReactDOM.unmountComponentAtNode(container);
}
//// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Requested when a node/edge is deleted
 *  @param {string} cref
 */
function RemoveAllCommentsForCref(cref) {
  const uid = GetCurrentUserId();
  const parms = { uid, collection_ref: cref };
  const queuedActions = AC.RemoveAllCommentsForCref(parms);
  m_DBRemoveComment(queuedActions);
  m_SetAppStateCommentVObjs();
}

/// EVENT HANDLERS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\
/** Respond to network COMMENTS_UPDATE Messages
 *  Usually used after a comment deletion to handle a batch of comment updates
 *  This can include
 *    * updates to existing comments (marked DELETE or re-linked to other removed comment)
 *    * removal of comment altogether
 *  This a network call that is used to update local state for other browsers
 *  (does not trigger another DB update)
 *  @param {Object[]} dataArray
 */
function HandleCOMMENTS_UPDATE(dataArray) {
  if (DBG) console.log('COMMENTS_UPDATE======================', dataArray);
  const updatedComments = [];
  const removedComments = [];
  const updatedCrefs = new Map();
  dataArray.forEach(data => {
    if (data.comment) {
      updatedComments.push(data.comment);
      updatedCrefs.set(data.comment.collection_ref, 'flag');
    }
    if (data.commentID) removedComments.push(data.commentID);
    if (data.collection_ref) updatedCrefs.set(data.collection_ref, 'flag');
  });
  const uid = GetCurrentUserId();
  AC.HandleRemovedComments(removedComments, uid);
  AC.HandleUpdatedComments(updatedComments, uid);

  const crefs = [...updatedCrefs.keys()];
  crefs.forEach(cref => AC.DeriveThreadedViewObjects(cref, uid));

  // and broadcast a state change
  m_SetAppStateCommentCollections();
  m_SetAppStateCommentVObjs();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Respond to COMMENT_UPDATE Messages from the network
 *  After the server/db saves the new/updated comment, COMMENT_UPDATE is
 *  broadcast across the network.  This a network call that is used to update
 *  the local state to match the server's comments.
 *  (does not trigger another DB update)
 *  @param {Object} data
 *  @param {Object} data.comment cobj
 */
function HandleCOMMENT_UPDATE(data) {
  if (DBG) console.log('COMMENT_UPDATE======================', data);
  const { comment } = data;
  m_UpdateComment(comment);
  // and broadcast a state change
  m_SetAppStateCommentCollections();
  m_SetAppStateCommentVObjs();
}
function HandleREADBY_UPDATE(data) {
  if (DBG) console.log('READBY_UPDATE======================');
  // Not used currently
  // Use this if we need to update READBY status from another user.
  // Since "read" status is only displayed for the current user,
  // we don't need to worry about "read" status updates from other users
  // across the network.
  //
  // The exception to this would be if we wanted to support a single user
  // logged in to multiple browsers.
}

/// DB CALLS //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function LockComment(comment_id) {
  UDATA.NetCall('SRV_DBLOCKCOMMENT', { commentID: comment_id }).then(() => {
    UDATA.NetCall('SRV_REQ_EDIT_LOCK', { editor: EDITORTYPE.AC });
    UDATA.LocalCall('SELECTMGR_SET_MODE', { mode: 'comment_edit' });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function UnlockComment(comment_id) {
  UDATA.NetCall('SRV_DBUNLOCKCOMMENT', { commentID: comment_id }).then(() => {
    UDATA.NetCall('SRV_RELEASE_EDIT_LOCK', { editor: EDITORTYPE.AC });
    UDATA.LocalCall('SELECTMGR_SET_MODE', { mode: 'normal' });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_DBUpdateComment(cobj, cb?) {
  const comment = {
    collection_ref: cobj.collection_ref,
    comment_id: cobj.comment_id,
    comment_id_parent: cobj.comment_id_parent,
    comment_id_previous: cobj.comment_id_previous,
    comment_type: cobj.comment_type,
    comment_createtime: cobj.comment_createtime,
    comment_modifytime: cobj.comment_modifytime,
    comment_isMarkedDeleted: cobj.comment_isMarkedDeleted,
    commenter_id: cobj.commenter_id,
    commenter_text: cobj.commenter_text
  };
  UDATA.LocalCall('DB_UPDATE', { comment }).then(data => {
    if (typeof cb === 'function') cb(data);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** */
function m_DBUpdateReadBy(cref, uid, cb?) {
  // Get existing readby
  const cvobjs = AC.GetThreadedViewObjects(cref, uid);
  const readbys = [];
  cvobjs.forEach(cvobj => {
    const commenter_ids = AC.GetReadby(cvobj.comment_id) || [];
    // Add uid if it's not already marked
    if (!commenter_ids.includes(uid)) commenter_ids.push(uid);
    const readby = {
      comment_id: cvobj.comment_id,
      commenter_ids
    };
    readbys.push(readby);
  });
  UDATA.LocalCall('DB_UPDATE', { readbys }).then(data => {
    if (typeof cb === 'function') cb(data);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Executes multiple database operations via a batch of commands:
 *  - `cobjs` will be updated
 *  - `commentIDs` will be deleted
 *  @param {Object[]} items [ ...cobj, ...commentID ]
 *  @param {function} cb callback
 */
function m_DBRemoveComment(items, cb?) {
  UDATA.LocalCall('DB_BATCHUPDATE', { items }).then(data => {
    if (typeof cb === 'function') cb(data);
  });
}

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  GetNodeCREF,
  GetEdgeCREF,
  GetProjectCREF,
  DeconstructCref,
  GetCREFSourceLabel,
  OpenReferent,
  OpenComment,
  SetCurrentUserId,
  GetCurrentUserId,
  GetUserName,
  GetCommentTypes,
  GetCommentType,
  GetDefaultCommentType,
  MarkAllRead,
  GetCommentCollection,
  CloseCommentCollection,
  GetCommentStats,
  GetCommentUIState,
  UpdateCommentUIState,
  GetOpenComments,
  OKtoClose,
  GetThreadedViewObjects,
  GetThreadedViewObjectsCount,
  GetCommentVObj,
  GetComment,
  GetUnreadRepliesToMe,
  GetUnreadComments,
  AddComment,
  UpdateComment,
  RemoveComment,
  RemoveAllCommentsForCref,
  HandleCOMMENTS_UPDATE,
  HandleCOMMENT_UPDATE,
  HandleREADBY_UPDATE,
  LockComment,
  UnlockComment
};
