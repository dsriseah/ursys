/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS CORE TYPES

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// DATASET CONVENTIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// data models have objects with an _id field that uniquely identifies
/// each entity in the dataset called a UID.
export type UR_EntID = `${string}`;
export type UR_EntID_Obj = { _id: UR_EntID };
/// we use various object conventions
export type DataObj = { [key: string]: any };
export type ErrObj = { error?: string; errorCode?: string; errorInfo?: string };
export type ReturnObj = DataObj | ErrObj;
/// we use UR_DataMethod functions to modify data and datasets
export type UR_DataMethod = (...any, data: DataObj, options?: DataObj) => ReturnObj;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an UR_Item is a union of DataObj with UR_EntID
export type UR_Item = UR_EntID_Obj & DataObj; // { _id: UR_EntID; [key: string]: any }
/// there are multiple ways to organize UR_Items into a "bag"
export type UR_ItemList = UR_Item[]; // list of objects
export type UR_Document = UR_Item; // nosql-style
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// REFS identify a unique "bag" of items in a data model, despite the type
/// of bag it is (e.g. documents, itemlists, etc.)
export type UR_BagRef = `${string}`;
/// a UR_Dataset is a collection of multiple bags of items, organized by
/// type of bag (e.g. documents, itemlists, etc.)
export type UR_Dataset = {
  schema?: UR_Schema; // see https://github.com/dsriseah/ursys/discussions/22
  documents?: { [docname: UR_BagRef]: UR_Document };
  itemlists?: { [listname: UR_BagRef]: UR_ItemList };
  // additional items
  // see https://github.com/dsriseah/ursys/discussions/25
  // files
  // state
  // logs
  // templates
  // config
};
