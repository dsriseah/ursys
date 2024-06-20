/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

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


\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import * as DC from './dc-comment.ts';
import * as DTPL from './dc-template.ts';

/// IMPORTED TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  TUserID,
  CType,
  TCommentID,
  TCommentType,
  TCollectionRef,
  TComment,
  TCommentQueueActions,
  TCommentTypeMap
} from './types-comment.ts';

/// EXTRACTED METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const {
  Init, //
  // DB
  UpdateData, // data object => initializes internal data
  // USERS,
  GetUserData, // id => userdata
  GetUserName, // id => username
  GetCurrentUser, // => current user id ???
  // COMMENTS
  COMMENTS,
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
  // GetThreadedCommentDataForRoot,
  // READBY
  GetReadby,
  // ROOTS
  GetCrefs,
  // protected data
  USERS
} = DC;

const {
  // protected data
  TPL_COMMENTS,
  // COMMENT TYPES
  GetCommentType,
  GetDefaultCommentType
} = DTPL;

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
