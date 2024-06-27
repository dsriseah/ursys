/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  test module/code review for ac-comment.ts

  main concepts


  
  supporting concepts


  dependencies on dc-comment

  
  
  data sets - persisted and pure

    
  data sets - derived at runtime as lookup tables


  

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import * as AC from './ac-comment.ts';
import * as DC from './dc-comment.ts';

/// IMPORTED TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  TComment,
  TAnnotableRef,
  TCommentID,
  TUserID,
  CTemplateRef,
  TCommentType,
  TCommentQueueActions
} from './types-comment.ts';

/// EXTRACTED METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const {
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
} = AC;

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
