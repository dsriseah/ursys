/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Base Types for Comment Manager Addon
  includes placeholder Comment Template typers as well

  Annotable - a generic term for an object that can be annotated
  AnnotableRef - a unique reference id to an annotable object in the system

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// CONFIGURATION API /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type AN_TYPES = 'n' | 'p' | 'e';
type TAnnotableKeys = `${AN_TYPES[number]}`; // can only be 'n', 'p', or 'e'
export type TAnnotableRef = `${TAnnotableKeys}-${IDString}`;

/// USERS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TUserID = string;
export type TUserName = string;
export type TUser = {
  id: TUserID;
  name: TUserName;
};

/// UNIVERSAL SYSTEM TYPES ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type AnnotableUUID = string; // unique identifier for an annotable object
type IDString = string;
//
export type URDateTime = number;

/// COMMENTS //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCommentID = string;
export type TComment = {
  // meta
  cref: TAnnotableRef; // reference to the object being annotated
  ctpl: CTemplateRef; // comment "template" type
  //
  cid: TCommentID; // model-wide unique comment id
  cid_root: TCommentID; // parent comment id, if there is one
  cid_previous: TCommentID; //
  user_ctime: URDateTime; // creation date time
  user_mtime: URDateTime; // modification date time
  user_id: TUserID; // creator of this comment
  user_text: string[]; // array of strings
  isDeleted: boolean;
};

/// UI DATA ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCommentData = {
  cref: TAnnotableRef;
  cid: TCommentID;
  cid_root?: TCommentID;
  cid_previous?: TCommentID;
  isDeleted?: boolean;
  user_id: TUserID;
};
export type TCommentSelector = {
  cref: TAnnotableRef;
  cid: TCommentID;
  uid: TUserID;
};

/// COLLECTION REFERENCES /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TCollectionType = 'n' | 'p' | 'e';
export type TCommentCollectionID = `${TCollectionType}` | string;

/// COMMENT TEMPLATING ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// CTemplateRef needs to be defined after we figure out how to handle templates
// Eventually we will dynamically define them.
export type CTemplateRef = 'cmt' | 'tellmemore' | 'source' | 'demo';
export type CPromptFormat =
  | 'text'
  | 'dropdown'
  | 'checkbox'
  | 'radio'
  | 'likert'
  | 'discrete-slider';
export type TCommentType = {
  slug: CTemplateRef;
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
export type TCommentTypeMap = Map<CTemplateRef, TCommentType>;

/// COMMENT MARKED AS READ ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type TReadByObject = {
  cid: TCommentID;
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
  cref: TAnnotableRef;
};
export type TCommentQueueAction_Update = {
  comment: TComment;
};
