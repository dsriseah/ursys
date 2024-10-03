/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS Data Normalization and Validation Utility Module

  A Normalized UR_Item merely means that it has been checked that it has
  an _id field and it is a string value. 
  
  Optional enforcement criteria:
  - all string values are stripped of script tags
  - all numbers are forced to string types
  - all property names are forced to lower case

  The Conforming and Cloning methods in this module are designing to adhere
  to these criteria by providing a set of options to enforce them.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { UR_EntID, DataObj, UR_Item } from '../_types/dataset.d.ts';

/// SINGLE OBJ HELPERS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an ID, return a new ID that is guaranteed to be a string by converting
 *  numbers to strings */
function m_NormItemID(id: UR_EntID): UR_EntID {
  const fn = 'm_NormItemID:';
  if (typeof id === 'string') return id;
  if (typeof id === 'number') return String(id);
  throw Error(`${fn} invalid id ${id} typeof ${typeof id}`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Shallow normalize a single DataObj, which does not have _id field.
 *  Detects and returns the normalized _id field if found */
function m_NormDataObj(obj: DataObj): [DataObj, foundID: string] {
  const fn = 'm_NormDataObj:';
  if (typeof obj !== 'object') throw Error(`${fn} invalid input ${obj}`);
  let foundID;
  const norm = {};
  for (const key of Object.keys(obj)) {
    if (key === '_id') {
      foundID = m_NormItemID(obj[key]);
      continue;
    }
    if (typeof obj[key] === 'string') {
      // todo: remove bad characters
      // norm[key] = encodeURIComponent(obj[key]);
      norm[key] = obj[key];
    } else {
      norm[key] = obj[key];
    }
  }
  return [norm, foundID];
}
/// DATA FORMAT CHECKING //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// datasets are standardized collections of objects, defined in ursys.d.ts
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Normalize a single Item, which is DataObj plus _id field. It leverages
 *  m_NormDataObj to normalize the object and detect the _id field which
 *  is roundabout */
function NormItem(item: UR_Item, schema?: any): UR_Item {
  const fn = ' NormItem:';
  // first normalize the base object
  let [dataObj, foundID] = m_NormDataObj(item);
  dataObj._id = foundID;
  return dataObj as UR_Item;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Given an array of objects, return a new array of objects that are
 *  guaranteed to have an _id field, or undefined if any object doesn't have
 *  an _id field. The copied objects are also filtered for suspicious
 *  property strings that are HTML or script tags
 *  Returns [ item[], error ] */
function NormItems(items: UR_Item[], schema?: any): [UR_Item[], error?: string] {
  const fn = 'NormItems:';
  const normeds = [];
  for (const item of items) {
    const normed = NormItem(item, schema);
    if (normed === undefined) return [undefined, `${fn} invalid item ${item}`];
    normeds.push(normed);
  }
  return [normeds, undefined];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Given an array of IDs, return a new array of ids that are guaranteed
 *  to be strings, or undefined if any id is not a string */
function NormIDs(ids: string[] | number[]): UR_EntID[] {
  const fn = 'NormItemIDs:';
  return ids.map(id => m_NormItemID(id));
}

/// ITEM CLONING //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: make a deep clone of an array by copying arrays and object by value
 */
function DeepCloneArray(arr: any[]): any[] {
  const fn = 'DeepCloneArray:';
  if (!Array.isArray(arr)) throw Error(`${fn} invalid input ${arr}`);
  return arr.map(item => {
    if (Array.isArray(item)) return DeepCloneArray(item);
    if (typeof item === 'object') return DeepCloneObject(item);
    return item;
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: make a deep clone of an object by copying arrays and object by value
 */
function DeepCloneObject(obj: any): any {
  const fn = 'DeepCloneObject:';
  if (typeof obj !== 'object') throw Error(`${fn} invalid input ${obj}`);
  const clone = {};
  if (obj === null) return null;
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (Array.isArray(val)) {
      clone[key] = DeepCloneArray(val);
      return;
    }
    if (typeof val === 'object') {
      clone[key] = DeepCloneObject(val);
      return;
    }
    clone[key] = val;
  });
  return clone;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: make a shallow clone of an object by copying arrays and object by value
 */
function DeepClone(obj: any): any {
  // walk object and clone arrays and objects
  const clone = {};
  for (const key in obj) {
    const val = obj[key];
    if (Array.isArray(val)) {
      clone[key] = DeepCloneArray(val);
      continue;
    }
    if (typeof val === 'object') {
      clone[key] = DeepCloneObject(val);
      continue;
    }
    if (typeof val === 'number') clone[key] = String(val);
    else clone[key] = val;
  }
  return clone;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  NormItem, // normalize a single object for serialized storage
  NormItems, // normalize multiple objects for storage
  NormIDs, // addar should be strings
  //
  DeepClone,
  DeepCloneObject,
  DeepCloneArray
};
