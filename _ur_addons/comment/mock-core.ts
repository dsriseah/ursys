/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  PLACEHOLDER - core functions for the comment addon 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// (PROPOSED) URSYS CORE /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** APPSTATE - mockup of APPLICATION STATE and SESSION */
const APPSTATE = {
  isAdmin: () => true,
  currentUser: () => 'Ben32',
  viewMode: () => 'edit'
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** TIME - mockup of TIME functions */
const TIME = {
  getTimestamp: () => new Date().getTime(),
  stringFromTimestamp: (ms: number) => new Date(ms).toLocaleString()
};

/// NETCREATE MOCKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const UDATA = {
  SetAppState: (key: string, any) => {},
  AppState: (key: string) => Object.create(null),
  LocalCall: async (key: string, any?) => Object.create(null),
  NetCall: async (key: string, any?) => Object.create(null)
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATASET = {
  PromiseNewCommentID: async () => 'new-comment-id'
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const EDITORTYPE = {
  AC: 'ac'
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const ARROW_RIGHT = '→';

/// LIBRARY MOCKS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** MOCKUP of ReactDOM */
const ReactDOM = {
  unmountComponentAtNode: (node: HTMLElement) => {}
};

/// EXPORTED MOCK MODULES /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  APPSTATE,
  TIME,
  // netcreate mocks
  UDATA,
  DATASET,
  // netcreate constant mocks
  EDITORTYPE,
  ARROW_RIGHT,
  // library mocks
  ReactDOM
};
