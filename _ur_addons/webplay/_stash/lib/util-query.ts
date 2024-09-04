/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  A set of utilities that work on an array of items, providing advanced
  filtering and matching.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DeepClone } from '../../../../_ur/common/util-data-norm.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_Item,
  QueryOptions,
  MatchObj,
  RangeObj,
  QueryFlags,
  QueryProps,
  QueryState
} from '../../../../_ur/_types/dataset';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANT DECLARATIONS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const QUERY_STATE: QueryState = { criteria: {}, flags: {}, props: {} };

/// QUERY STATE METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: set the search criteria for the query */
function m_SetCriteria(criteria: QueryOptions): QueryState {
  QUERY_STATE.criteria = criteria;
  QUERY_STATE.flags = u_getFlagsFromSearchOptions(criteria);
  // props are reset after each query operation
  return QUERY_STATE;
}
/** API: get the current query state */
function m_GetCriteria(): QueryState {
  return QUERY_STATE;
}

/// UTILITY FUNCTIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** convert the verbose search options to object with shorter names */
function u_getFlagsFromSearchOptions(criteria: QueryOptions): QueryFlags {
  // processing options
  const { _lowercaseProps, _forceValue, _forceNull, _cloneItems } = criteria;
  const _flcp = _lowercaseProps || false;
  const _fval = _forceValue || undefined;
  const _fnul = _forceNull || false;
  const _clone = _cloneItems === undefined ? true : _cloneItems;
  if (typeof _flcp !== 'boolean') throw Error('_lowercaseProps invalid type');
  if (typeof _fval !== 'string' && _fval !== undefined)
    throw Error('_forceValue invalid type');
  if (typeof _fnul !== 'boolean') throw Error('_forceNull invalid type');
  if (typeof _clone !== 'boolean') throw Error('_cloneItems invalid type');
  // fields and values to match
  const { missingFields, hasFields, matchExact, matchRange, matchCount } = criteria;
  const b_miss = Array.isArray(missingFields) ? missingFields : undefined;
  const b_has = Array.isArray(hasFields) ? hasFields : undefined;
  const match_exact = typeof matchExact === 'object' ? matchExact : undefined;
  const match_range = typeof matchRange === 'object' ? matchRange : undefined;
  const count = typeof matchCount === 'number' ? matchCount : undefined;
  // pre and post filter functions
  const { preFilter, postFilter } = criteria;
  const f_pre = typeof preFilter === 'function' ? preFilter : undefined;
  const f_post = typeof postFilter === 'function' ? postFilter : undefined;
  // return the flags object
  return {
    _flcp, // force prop keys to lowercase
    _fval, // force numeric values to strings or numeric strings to numbers
    _fnul, // force undefined to null
    _clone, // return cloned items, not originals
    b_miss, // check for these missing fields
    b_has, // check that these fields are present
    match_exact, // match these exact values no more no less
    match_range, // match these ranges for values
    count, // limit the number of matches
    f_pre, // pre-filter function
    f_post // post-filter function
  };
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an object, recursively apply all the forcing constraints to its
 *  values. The 'mutable' object is mutated in place and returned. Converts numbers
 *  to strings, undefined to null, handles arrays, and optionally forces
 *  lowercase prop keys. */
function u_conformObject(mutable: UR_Item, flags?: QueryFlags): UR_Item {
  const { _fval, _fnul, _flcp } = flags || QUERY_STATE.flags;
  if (mutable === null) return null;
  Object.keys(mutable).forEach(key => {
    let value = mutable[key];
    if (_flcp) {
      mutable.delete(key);
      key = key.toLowerCase();
      mutable[key] = value;
    }
    if (Array.isArray(value)) {
      mutable[key] = u_conformArray(value);
      return;
    }
    if (typeof value === 'string' && !_fval) {
      const num = Number(value);
      if (!isNaN(num)) mutable[key] = num;
    }
    if (typeof value === 'number' && _fval) {
      mutable[key] = String(value);
      return;
    }
    if (value === undefined && _fnul) {
      mutable[key] = null;
      return;
    }
    if (typeof value === 'object') {
      mutable[key] = u_conformObject(value);
      return;
    }
    mutable[key] = value;
  });
  return mutable;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given array, recursively apply all the forcing constraints to the values.
 *  Iterates over the array and also calls u_conformObject on any object
 *  members. The 'muts' array is mutated in place and returned */
function u_conformArray(muts: any[]): any[] {
  return muts.map(item => {
    if (Array.isArray(item)) return u_conformArray(item);
    if (typeof item === 'object') return u_conformObject(item);
    return item;
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return true if item has all the fields in the passed list,
 *  no more, no less */
function u_hasProps(item: UR_Item, plist: string[]): boolean {
  let foundCount = 0;
  for (const key of plist) if (item[key] !== undefined) foundCount++;
  return foundCount === plist.length;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item does not have any of the fields in the passed list */
function u_hasMissingProps(item: UR_Item, plist: string[]): boolean {
  const missing = [];
  for (const key of plist) if (item[key] === undefined) missing.push(key);
  return missing.length > 0;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item has any extra fields not in the passed list */
function u_hasExtraProps(item: UR_Item, plist: string[]): boolean {
  const extra = [];
  for (const key in item) if (!plist.includes(key)) extra.push(key);
  return extra.length > 0;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item has all the fields and values in the passed dictionary */
function u_matchValues(item: UR_Item, mObj: MatchObj): boolean {
  let match = true;
  for (const [key, value] of Object.entries(mObj)) {
    match &&= item[key] === value;
  }
  return match;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given a value, return a string or number, or throw an error if the value
 *  is not a string or number */
function u_cast_value(val: any): string | number {
  if (!isNaN(parseFloat(val))) return Number(parseFloat(val));
  if (typeof val === 'string') return String(val);
  throw Error('u_cast_num: value is not string or number');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item has all the fields and values in the passed dictionary
 *  RangeObj: { [key: string]: RangeType }
 *  RangeType: `op value [value]`
 */
function u_matchRanges(item: UR_Item, rObj: RangeObj): boolean {
  const fn = 'u_matchRanges:';
  let match = true;
  for (const [prop, parms] of Object.entries(rObj)) {
    let bits = parms.split(' ');
    let [op, arg1, arg2] = bits.filter(bit => bit.trim() !== '');
    let ival = u_cast_value(item[prop]);
    let a = u_cast_value(arg1);
    // we're assuming that javascript's weird string-to-number coercion will
    // handle both string and numeric comparisons correctly
    if (op === 'gt') match &&= ival > a;
    if (op === 'lt') match &&= ival < a;
    if (op === 'gte') match &&= ival >= a;
    if (op === 'lte') match &&= ival <= a;
    if (op === 'eq') match &&= ival === a;
    if (op === 'ne') match &&= ival !== a;
    if (op === 'between') {
      let b = u_cast_value(arg2);
      match &&= ival >= a && ival <= b;
    }
  }
  return match;
}

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Given an item, apply all the forcing constraints to the values.
 *  The provided item is mutated in place and returned. */
function m_EnforceFlags(mutable: UR_Item): UR_Item {
  const {
    _fval, // force prop values to strings
    _fnul, // force undefined to null
    _flcp, // force prop keys to lowercase
    _clone // clone the item
  } = QUERY_STATE.flags;
  if (_clone) mutable = DeepClone(mutable);
  Object.keys(mutable).forEach(key => {
    let value = mutable[key];
    if (_flcp) {
      delete mutable[key];
      key = key.toLowerCase();
      mutable[key] = value;
    }
    if (Array.isArray(value)) {
      mutable[key] = u_conformArray(value);
      return;
    }
    if (typeof value === 'number' && _fval) {
      mutable[key] = String(value);
      return;
    }
    if (value === undefined && _fnul) {
      mutable[key] = null;
      return;
    }
    if (typeof value === 'object') {
      mutable[key] = u_conformObject(value);
      return;
    }
    mutable[key] = value;
  });

  return mutable;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return found, missing, extra props in item based on passed list of desired
 *  properties */
function m_AssessPropKeys(item: UR_Item, plist: string[]): QueryProps {
  const ff = []; // found
  const mm = []; // missing
  const xx = []; // extra
  // check keys against exact match list
  Object.keys(item).forEach(key => {
    if (plist.includes(key)) ff.push(key);
    else xx.push(key);
  });
  // figure out what is missing
  Object.keys(plist).forEach(key => {
    if (!ff.includes(key)) mm.push(key);
  });
  const found = ff.length === 0 ? ff : undefined;
  const missing = mm.length === 0 ? mm : undefined;
  const extra = xx.length === 0 ? xx : undefined;
  QUERY_STATE.props = { found, missing, extra };
  return QUERY_STATE.props;
}

/// QUERY OPERATIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Find the first item that matches the criteria, returning the item or
 *  undefined if no item is found.
 *  - if _clone is set, the returned item will be a clone of the original
 *  - if _deep is set, then the clone will be a deep clone of the original
 *    that also has _fval, _fnul, and _flcp applied to the values
 */
function Find(items: UR_Item[], criteria?: QueryOptions): UR_Item[] {
  const fn = 'Find:';
  if (criteria === undefined) return [];
  if (Object.keys(criteria).length === 0) return [];
  const { flags } = m_SetCriteria(criteria);
  const { _clone, b_miss, b_has, match_exact, match_range, count } = flags;
  // get the raw items
  if (items === undefined) throw Error(`${fn} items are undefined`);
  // apply the pre-filter function if it exists
  // if (flags.f_pre) items = flags.f_pre(items);
  //
  let item: UR_Item; // the original item
  let ii: UR_Item; // the mutated copy with force lc, str, null applied
  //
  const found = [];
  for (item of items) {
    // bail out if we've found the number of matches we're looking for
    if (found.length >= count) break;
    // create a deep clone of the item, otherwise use the original
    // deepClone will apply _fval, _fnul, _flcp to the values if they
    // are set in flags.
    ii = _clone ? { ...item } : item;
    let match = true;
    if (b_miss) match &&= u_hasMissingProps(ii, b_miss);
    if (b_has) match &&= u_hasProps(ii, b_has);
    if (match_exact) match &&= u_matchValues(ii, match_exact);
    if (match_range) match &&= u_matchRanges(ii, match_range);
    if (match) found.push(ii);
  }
  // apply the pre-filter function if it exists
  //if (flags.f_post) items = flags.f_post(items);
  return found;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Find all items that match the criteria, returning a list of items or
 *  undefined if no items are found */
function FindAll(items: UR_Item[], criteria: QueryOptions): UR_Item[] {
  // find all matching field (case sensitive or not)
  // return the list of matching items
  return undefined || [{ _id: '1', name: 'item1' }];
}

/// EXPORTS ////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  Find // (items: UR_Item[], criteria: QueryOptions) => UR_Item
};

/// for testing only
export {
  m_SetCriteria, // (criteria: QueryOptions) => QueryState
  m_GetCriteria, // () => QueryState
  m_EnforceFlags, // (mutable: UR_Item) => UR_Item
  m_AssessPropKeys, // (item: UR_Item, plist: PropKey[]) => QueryProps
  //
  u_matchValues, // (item: UR_Item, mObj: MatchObj) => boolean
  u_matchRanges // (item: UR_Item, rObj: RangeObj) => boolean
};
