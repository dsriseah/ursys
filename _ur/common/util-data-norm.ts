/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS Data Normalization and Validation Utility Module

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
function NormalizeItems(items: UR_Item[], schema?: any): [UR_Item[], error?: string] {
  const fn = 'NormalizeItems:';
  const normeds = [];
  for (const item of items) {
    const [normed, error] = NormalizeItem(item, schema);
    if (error) return [undefined, error];
    normeds.push(normed);
  }
  return [normeds, ''];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** similar to NormalizeItems, but for a single object */
function NormalizeItem(item: UR_Item, schema?: any): [UR_Item, error?: string] {
  const fn = 'NormalizeItem:';
  const { _id } = item;
  if (_id === undefined) return [undefined, `${fn} missing _id field`];
  const [norm, detectedID] = NormalizeDataObj(item);
  norm._id = _id;
  return [norm as UR_Item, undefined];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an object without an _id, normalize properties. return
 *  the normalized object and the _id if found */
function NormalizeDataObj(obj: UR_Item): [DataObj, detectedID?: string] {
  const fn = 'NormalizeDataObj:';
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
function NormalizeItemIDs(ids: UR_EntID_Obj[]): [UR_EntID_Obj[], error?: string] {
  const fn = 'NormalizeItemIDs:';
  if (ids.some(id => typeof id !== 'string'))
    return [[undefined], `${fn} id must be a string`];
  return [ids];
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  NormalizeDataObj,
  NormalizeItem, // normalize a single object for storage
  NormalizeItems, // normalize objects for storage
  NormalizeItemIDs
};
