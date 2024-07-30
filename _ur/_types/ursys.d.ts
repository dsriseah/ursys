/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS CORE TYPES

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// DATASET OBJECT CONVENTIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** When returning results in an object, it either has an 'err' key and
 *  to indicate an error, or it has other keys to indicate success.
 *  Checking for the present of err is a common pattern in URSYS.
 */
export type UR_ResultObject = {
  err?: string;
  [key?: string]: any;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** We use a lot of collections that contain objects with an _id key. Generally
 *  this key is unique within the collection, but derived collections may
 *  have the same _id as the original collection to indicate the relationship.
 *  In some cases, the object may not have the _id key set yet on creation,
 *  but for it to be a valid object in the collection, it must have an _id key.
 */
export type ObjID = `${string}`; // unique id of an object within a collection
export type ObjREF = `${string}`; // unique name of a collection

export type ItemObj = { _id: ObjID; [key: string]: any }; // similar to a document in nosql
export type ItemKeyObj = { _id: ObjID }; // used as a parameter list compatible with ItemObj

export type ObjDict = { [itemName: string]: ItemObj };
export type ObjList = ItemObj[];
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type UR_Dataset = {
  dicts?: { [ref_name: ObjREF]: ObjDict };
  lists?: { [ref_name: ObjREF]: ObjList };
  // see Discussion #22 in github/dsriseah/ursys/discussions
  // files
  // state
  // logs
  // templates
  // config
};
