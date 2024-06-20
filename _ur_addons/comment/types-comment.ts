/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Base Types for Comment Manager Addon
  includes placeholder Comment Template typers as well

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// COMMENTS //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TUserID = string;
export type TUserName = string;
export type TUser = {
  id: TUserID;
  name: TUserName;
};
export type TCommentData = {
  cref: TCollectionRef;
  comment_id: TCommentID;
  comment_id_parent?: TCommentID;
  comment_id_previous?: TCommentID;
  comment_isMarkedDeleted?: boolean;
  commenter_id: TUserID;
};
export type TCommentSelector = {
  collection_ref: TCollectionRef;
  comment_id: TCommentID;
  uid: TUserID;
};

/// USERS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCommentID = string;
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

/// COLLECTION REFERENCES /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCollectionType = 'n' | 'p' | 'e';
export type TCollectionRef = any;
export type TCommentCollectionID = `${TCollectionType}` | string;

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
export type TCommentTypeMap = Map<CType, TCommentType>;

/// COMMENT MARKED AS READ ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TReadByObject = {
  comment_id: TCommentID;
  commenter_ids: TUserID[];
};

/// DATA PAYLOAD //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TDataSet = {
  users?: TUser[];
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
