/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  PLACEHOLDER - core functions for the comment addon 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// (PROPOSED) URSYS CORE /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** APP - mockup of APPLICATION STATE and SESSION */
const APP = {
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
const DATASTORE = {
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
  APP,
  TIME,
  // netcreate mocks
  UDATA,
  DATASTORE,
  // netcreate constant mocks
  EDITORTYPE,
  ARROW_RIGHT,
  // library mocks
  ReactDOM
};
