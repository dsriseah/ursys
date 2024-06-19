/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Base Types for Comment Manager Addon
  includes placeholder Comment Template typers as well

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// USERS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export type TUserID = string;
export type TUserName = string;
export type TUserObject = {
  id: TUserID;
  name: TUserName;
};

/// COMMENT TEMPLATING ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// CType needs to be defined after we figure out how to handle templates
// Eventually we will dynamically define them.
export type CType = 'cmt' | 'tellmemore' | 'source' | 'demo';
export type CPromptFormat =
  | 'text'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'likert'
  | 'discrete-slider';
export type TCommentID = string;
export type TCommentType = {
  slug: CType;
  label: string;
  prompts: TCommentPrompt[];
};
export type TCommentPrompt = {
  format: CPromptFormat;
  prompt: string;
  options?: string[];
  help: string;
  feedback: string;
};

/// COLLECTION REFERENCES /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCollectionRef = any;
export type TComment = {
  collection_ref: TCollectionRef; // aka 'cref'
  comment_id: TCommentID;
  comment_id_parent: any;
  comment_id_previous: any;
  comment_type: string;
  comment_createtime: number;
  comment_modifytime: number;
  comment_isMarkedDeleted: boolean;
  commenter_id: TUserID;
  commenter_text: string[];
};
export type TCollectionType = 'n' | 'p' | 'e';
export type TCommentCollectionID = `${TCollectionType}` | string;

/// COMMENT MARKED AS READ ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TReadByObject = {
  comment_id: TCommentID;
  commenter_ids: TUserID[];
};

/// DATA PAYLOAD //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TLokiData = {
  users?: TUserObject[];
  commenttypes?: TCommentType[];
  comments?: TComment[];
  readby?: TReadByObject[];
};

/// COMMENT QUEUE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCommentQueueActions =
  | TCommentQueueAction_RemoveCommentID
  | TCommentQueueAction_RemoveCollectionRef
  | TCommentQueueAction_Update;
export type TCommentQueueAction_RemoveCommentID = {
  commentID: TCommentID;
};
export type TCommentQueueAction_RemoveCollectionRef = {
  collection_ref: TCollectionRef;
};
export type TCommentQueueAction_Update = {
  comment: TComment;
};
