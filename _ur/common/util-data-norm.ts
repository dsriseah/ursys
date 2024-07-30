/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS Data Normalization and Validation Utility Module

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { ObjID, ItemObj } from '~ur/types/ursys.d.ts';

/// DATASET METHODS ///////////////////////////////////////////////////////////
/// datasets are standardized around collections of objects, defined in
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an array of objects, return a new array of objects that are
 *  guaranteed to have an _id field, or undefined if any object doesn't have
 *  an _id field. The copied objects are also filtered for suspicious
 *  property strings that are HTML or script tags
 *  Returns [ obj[], error ] */
function NormalizeObjs(objs: ItemObj[], schema?: any): [ItemObj[], error?: string] {
  const fn = 'm_NormalizeObjs:';
  // if any object is missing an _id, return undefined
  if (objs.some(obj => obj._id === undefined))
    return [[undefined], `${fn} missing _id field`];
  // copy the objects
  const norm_objs = [];
  for (const obj of objs) {
    const norm_obj = { _id: obj._id };
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // htmlencode strings before storing them
        norm_obj[key] = encodeURIComponent(obj[key]);
      } else {
        norm_obj[key] = obj[key];
      }
    }
    norm_objs.push(norm_obj);
  }
  return [norm_objs];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an array of ids, return a new array of ids that are guaranteed to be
 *  strings, or undefined if any id is not a string */
function NormalizeIDs(ids: ObjID[]): [ObjID[], error?: string] {
  const fn = 'm_NormalizeIDs:';
  if (ids.some(id => typeof id !== 'string'))
    return [[undefined], `${fn} id must be a string`];
  return [ids];
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  NormalizeObjs, // normalize objects for storage
  NormalizeIDs
};
