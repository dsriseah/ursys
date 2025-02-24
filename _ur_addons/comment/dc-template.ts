/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-template - placeholder for "templates" related to comments

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { APPSTATE, TIME } from './mock-core';
import DEFAULT_TEMPLATE from './dc-template-default';

/// TYPE DEFINITIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { TCommentType, TCommentTypeMap, TDataSet } from './types-comment';

/// DEBUGGER UTILS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const PR = 'dc-template';
const LOG = console.log;
LOG.bind(console);

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const TPL_COMMENTS: TCommentTypeMap = new Map(); // Map<typeId, commentTypeObject>
const DEFAULT: Array<TCommentType> = DEFAULT_TEMPLATE.comment_types;

/// LIFECYCLE HOOKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// currently not supported in new ursys...

/// TEMPLATE TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// TODO: This is temporarily hard-coded until we have a new Template Editor
/*/ COMMENT TEMPLATE PROMPT TYPES 
  - `text` data is stored as a single string
  - `dropdown` (menu) -- single-select, single-view
  - `checkbox` (multi-select) -- multi-select, multi-view
    data is stored as a single delimited (\n) string so that it is human readable
    The format is '<optionLabel>\n', e.g.
      ```
      Apples\n
      Banana\n
      Orange
      ```
  - `radio` (scale) -- single-select, multi vertical view
  - `likert` -- likert scale for single-select, multi horizontal view
  - 'discrete-slider' -- single-select, stacked horizontal view

  CPromptFormatOption_TextData = string; // simple string, e.g. "This is my comment."
  CPromptFormatOption_DropdownData = string; // selected menu item string, e.g. "A little"
  CPromptFormatOption_CheckboxData = string; // selected items <optionLabel>\n, e.g. "Banana\nOrange"
  CPromptFormatOption_RadioData = string; // selected item string, e.g. "I agree"
  CPromptFormatOption_LikertData = string; // selected item string, e.g. '💚'
  CPromptFormatOption_DiscreteSliderData = string; // selected item 0-based index e.g. "2"
  
/*/

/// DATA LIFECYCLE METHODS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: First time initialization */
function Init() {
  if (DBG) LOG(`${PR} Init()`);
  m_UpdateTPL_COMMENTS(DEFAULT);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: update from passed LokiData object */
function UpdateData(data: TDataSet) {
  if (data.comments) m_UpdateTPL_COMMENTS(data.commenttypes);
  m_UpdateDerivedData();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: called immediately after data is updated */
function m_UpdateDerivedData() {}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: called from Init, UpdateData */
function m_UpdateTPL_COMMENTS(comments: TCommentType[]) {
  comments.forEach(t => TPL_COMMENTS.set(t.slug, t));
}

/// DATA ACCESS METHODS  ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Get a specific comment type for .../ */
function GetCommentType(typeid): TCommentType {
  return TPL_COMMENTS.get(typeid);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Get the default that's used when a user creates a comment, which they
 *  can change if they want to */
function GetDefaultCommentType(): TCommentType {
  // returns the first comment type object
  if (DEFAULT.length < 1) throw new Error(`${PR} No comment types defined!`);
  return GetCommentType(DEFAULT[0].slug);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // lifecycle
  Init,
  UpdateData,
  // template getters
  GetCommentType, //
  GetDefaultCommentType, //
  // 'protected' data for use by ac-template
  TPL_COMMENTS
};
