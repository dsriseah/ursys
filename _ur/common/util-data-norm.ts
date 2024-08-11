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
import type { UR_EntID_Obj, DataObj, UR_Item } from '~ur/types/ursys.d.ts';

/// DATASET METHODS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// datasets are standardized collections of objects, defined in ursys.d.ts
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an array of objects, return a new array of objects that are
 *  guaranteed to have an _id field, or undefined if any object doesn't have
 *  an _id field. The copied objects are also filtered for suspicious
 *  property strings that are HTML or script tags
 *  Returns [ item[], error ] */
function NormDataItems(items: UR_Item[], schema?: any): [UR_Item[], error?: string] {
  const fn = 'NormDataItems:';
  const normeds = [];
  for (const item of items) {
    const [normed, error] = NormDataItem(item, schema);
    if (error) return [undefined, error];
    normeds.push(normed);
  }
  return [normeds, ''];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** similar to NormDataItems, but for a single object */
function NormDataItem(item: UR_Item, schema?: any): [UR_Item, error?: string] {
  const fn = 'NormDataItem:';
  const { _id } = item;
  if (_id === undefined) return [undefined, `${fn} missing _id field`];
  const [norm, detectedID] = NormDataObj(item);
  norm._id = _id;
  return [norm as UR_Item, undefined];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an object without an _id, normalize properties. return
 *  the normalized object and the _id if found */
function NormDataObj(obj: UR_Item): [DataObj, detectedID?: string] {
  const fn = 'NormDataObj:';
  let foundID;
  const norm = {};
  for (const key in obj) {
    if (key === '_id') {
      foundID = obj[key];
      continue;
    }
    if (typeof obj[key] === 'string') {
      // norm[key] = encodeURIComponent(obj[key]);
      norm[key] = obj[key];
    } else {
      norm[key] = obj[key];
    }
  }
  return [norm, foundID];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an array of ids, return a new array of ids that are guaranteed to be
 *  strings, or undefined if any id is not a string */
function NormItemIDs(ids: UR_EntID_Obj[]): [UR_EntID_Obj[], error?: string] {
  const fn = 'NormItemIDs:';
  if (ids.some(id => typeof id !== 'string'))
    return [[undefined], `${fn} id must be a string`];
  return [ids];
}

/// ITEM CLONING //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** make a deep clone of an array by copying arrays and object by value
 *  - if _fstr is true, props with numbers values are converted to strings
 *  - if _fnul is true, props with undefined values are converted to null
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
/** make a deep clone of an object by copying arrays and object by value
 *  - if _fstr is true, props with numbers values are converted to strings
 *  - if _fnul is true, props with undefined values are converted to null
 */
function DeepCloneObject(obj: any): any {
  const fn = 'DeepCloneObject:';
  if (typeof obj !== 'object') throw Error(`${fn} invalid input ${obj}`);
  const clone = {};
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
/** make a shallow clone of an object by copying arrays and object by value
 *  - if _flcp is true, top-level keys are converted to lower case
 *  - if _deep is true, objects and arrays are cloned recursively
 *  - if _fstr is true, props with numbers values are converted to strings
 *  - if _fnul is true, props with undefined values are converted to null
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
  NormDataObj,
  NormDataItem, // normalize a single object for storage
  NormDataItems, // normalize objects for storage
  NormItemIDs, // IDs should be strings
  //
  DeepClone,
  DeepCloneObject,
  DeepCloneArray
};
