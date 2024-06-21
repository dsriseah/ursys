/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-users - placeholder for users manager

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { APPSTATE } from './mock-core.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { TUserID, TUser, TDataSet, TUserName } from './types-comment.ts';
type UserMap = Map<TUserID, TUser>;
const USERS: UserMap = new Map(); // Map<uid, name>

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const PR = 'dc-comment-users';
/// group divider - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATA = {}; // main data object

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
  const { users } = data;
  // update datasets
  if (users) users.forEach(u => USERS.set(u.id, u));
  // Derive Secondary Values
  m_UpdateDerivedData();
  m_NotifyDataChange();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: Called after core data is updated to rederive stuff */
function m_UpdateDerivedData() {
  // no derived data from users
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** NOTIFIER: emit data change signal */
function m_NotifyDataChange() {
  // defining a data notification standard that embeds the messages dirrectly
  // in the module would cut down on a lot of bullshit.
  const fn = 'm_NotifyDataChange';
  const dataset = { users: USERS };
  console.log(fn, `would emit 'COMMENT_USERS_UPDATED' signal w/`, dataset);
}

/// USER ACCESS METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Given a UID, return the related UserObject */
function GetUserData(uid: TUserID): TUser {
  return USERS.get(uid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Given a uid, return a username string */
function GetUserName(uid: TUserID): TUserName {
  const u = GetUserData(uid);
  if (u === undefined) return 'Unknown User';
  return u.name || `user-${uid}`;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return the current user */
function GetCurrentUser(): TUserName {
  // TODO: this shouldn't be a forward, as currentUser should be
  // part of appstate, not commentmgr.
  return APPSTATE.currentUser();
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Init,
  // DB
  UpdateData,
  // USERS
  GetUserData,
  GetUserName,
  GetCurrentUser,
  // 'protected' data for use by ac-comment
  USERS
};
