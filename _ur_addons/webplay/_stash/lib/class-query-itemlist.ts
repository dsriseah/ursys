/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ListManager } from './class-data-itemlist';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_Item,
  UR_Doc,
  UR_EntID,
  UR_ItemList,
  UR_DocFolder,
  RangeType,
  RangeParams,
  SortType,
  SearchOptions,
  SearchParams,
  SortOptions
} from '~ur/types/ursys.d.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type PropKey = string;
type QueryFlags = {
  _flc?: boolean;
  _fstr?: boolean;
  _fnul?: boolean;
  _deep?: boolean;
  _clone?: boolean;
  b_miss?: string[];
  b_has?: string[];
  dict_exact?: SearchParams;
  dict_range?: RangeParams;
  f_pre?: (items: UR_Item[]) => Promise<UR_Item[]>;
  f_post?: (items: UR_Item[]) => Promise<UR_Item[]>;
};
type QueryProps = { found?: string[]; missing?: string[]; extra?: string[] };
type QueryState = {
  criteria: SearchOptions;
  flags: QueryFlags;
  props: QueryProps;
};

/// CONSTANT DECLARATIONS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LM = new ListManager();
const QUERY_STATE: QueryState = { criteria: {}, flags: {}, props: {} };

/// QUERY STATE METHODS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: set the search criteria for the query */
function SetCriteria(criteria: SearchOptions): QueryState {
  QUERY_STATE.criteria = criteria;
  QUERY_STATE.flags = u_getFlagsFromSearchOptions(criteria);
  // props are reset after each query operation
  return QUERY_STATE;
}

/// UTILITY FUNCTIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** convert the verbose search options to object with shorter names */
function u_getFlagsFromSearchOptions(criteria: SearchOptions): QueryFlags {
  // processing options
  const { _caseSensitive, _forceNumAsString, _forceNull, _deepMatch, _cloneResults } =
    criteria;
  if (typeof _caseSensitive !== 'boolean') throw Error('_caseSensitive invalid type');
  if (typeof _forceNumAsString !== 'boolean')
    throw Error('_forceNumAsString invalid type');
  if (typeof _forceNull !== 'boolean') throw Error('_forceNull invalid type');
  if (typeof _deepMatch !== 'boolean') throw Error('_deepMatch invalid type');
  if (typeof _cloneResults !== 'boolean') throw Error('_cloneResults invalid type');
  const _flc = _caseSensitive;
  const _fstr = _forceNumAsString;
  const _fnul = _forceNull;
  const _deep = _deepMatch;
  const _clone = _cloneResults;
  // fields and values to match
  const { missingFields, hasFields, matchExact, matchRange } = criteria;
  const b_miss = Array.isArray(missingFields) ? missingFields : undefined;
  const b_has = Array.isArray(hasFields) ? hasFields : undefined;
  const dict_exact = typeof matchExact === 'object' ? matchExact : undefined;
  const dict_range = typeof matchRange === 'object' ? matchRange : undefined;
  // pre and post filter functions
  const { preFilter, postFilter } = criteria;
  const f_pre = typeof preFilter === 'function' ? preFilter : undefined;
  const f_post = typeof postFilter === 'function' ? postFilter : undefined;
  // return the flags object
  return {
    _flc, // force prop keys to lowercase
    _fstr, // force numeric values to strings
    _fnul, // force undefined to null
    _deep, // use deep comparison and clone
    _clone, // return cloned items, not originals
    b_miss, // check for these missing fields
    b_has, // check that these fields are present
    dict_exact, // match these exact values no more no less
    dict_range, // match these ranges for values
    f_pre, // pre-filter function
    f_post // post-filter function
  };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** make a deep clone of an array by copying arrays and object by value
 *  - if _fstr is true, props with numbers values are converted to strings
 *  - if _fnul is true, props with undefined values are converted to null
 */
function u_deepCloneArray(arr: any[]): any[] {
  const fn = 'u_deepCloneArray:';
  const { _fstr, _fnul } = QUERY_STATE.flags;
  if (!Array.isArray(arr)) throw Error(`${fn} invalid input ${arr}`);
  return arr.map(item => {
    if (Array.isArray(item)) return u_deepCloneArray(item);
    if (typeof item === 'object') return u_deepCloneObject(item);
    if (typeof item === 'number' && _fstr) return String(item);
    if (item === undefined && _fnul) return null;
    return item;
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** make a deep clone of an object by copying arrays and object by value
 *  - if _fstr is true, props with numbers values are converted to strings
 *  - if _fnul is true, props with undefined values are converted to null
 */
function u_deepCloneObject(obj: any): any {
  const fn = 'u_deepCloneObject:';
  const { _fstr, _fnul, _flc } = QUERY_STATE.flags;
  if (typeof obj !== 'object') throw Error(`${fn} invalid input ${obj}`);
  const clone = {};
  Object.keys(obj).forEach(key => {
    const val = obj[key];
    if (Array.isArray(val)) {
      clone[key] = u_deepCloneArray(val);
      return;
    }
    if (typeof val === 'object') {
      clone[key] = u_deepCloneObject(val);
    }
    if (typeof val === 'number' && _fstr) {
      clone[key] = String(val);
      return;
    }
    if (val === undefined && _fnul) {
      clone[key] = null;
      return;
    }
    clone[key] = val;
  });
  return clone;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** make a shallow clone of an object by copying arrays and object by value
 *  - if _flc is true, top-level keys are converted to lower case
 *  - if _deep is true, objects and arrays are cloned recursively
 *  - if _fstr is true, props with numbers values are converted to strings
 *  - if _fnul is true, props with undefined values are converted to null
 */
function u_deepClone(obj: any): any {
  const { _flc, _deep } = QUERY_STATE.flags;
  // walk object and clone arrays and objects
  const clone = {};
  for (const key in obj) {
    const val = obj[key];
    const kk = _flc ? key : key.toLowerCase();
    if (Array.isArray(val)) {
      clone[kk] = _deep ? u_deepCloneArray(val) : [...val];
      continue;
    }
    if (typeof val === 'object') {
      clone[kk] = _deep ? u_deepCloneObject(val) : { ...val };
      continue;
    }
    if (typeof val === 'number') clone[kk] = String(val);
    else clone[kk] = val;
  }
  return clone;
}

/// HELPER FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return found, missing, extra props in item based on passed list of desired
 *  properties */
function m_decodeProps(item: UR_Item, plist: PropKey[]): QueryProps {
  const ff = [];
  const mm = [];
  const xx = [];
  // check keys against exact match list
  for (const key in item) {
    if (plist.includes(key)) ff.push(key);
    else xx.push(key);
  }
  // figure out what is missing
  for (const key in plist) {
    if (!ff.includes(key)) mm.push(key);
  }
  const found = ff.length === 0 ? ff : undefined;
  const missing = mm.length === 0 ? mm : undefined;
  const extra = xx.length === 0 ? xx : undefined;
  QUERY_STATE.props = { found, missing, extra };
  return QUERY_STATE.props;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return true if item has all the fields in the passed list,
 *  no more, no less */
function m_hasProps(item: UR_Item, plist: PropKey[]): boolean {
  let foundCount = 0;
  for (const key of plist) if (item[key] !== undefined) foundCount++;
  return foundCount === plist.length;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item does not have any of the fields in the passed list */
function m_hasMissingProps(item: UR_Item, plist: PropKey[]): boolean {
  const missing = [];
  for (const key of plist) if (item[key] === undefined) missing.push(key);
  return missing.length > 0;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item has any extra fields not in the passed list */
function m_hasExtraProps(item: UR_Item, plist: PropKey[]): boolean {
  const extra = [];
  for (const key in item) if (!plist.includes(key)) extra.push(key);
  return extra.length > 0;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item has all the fields and values in the passed dictionary */
function m_matchValues(item: UR_Item, dict: SearchParams): boolean {
  return false;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** check if item has all the fields and values in the passed dictionary */
function m_matchRanges(item: UR_Item, dict: RangeParams): boolean {
  return false;
}

/// QUERY OPERATIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Find the first item that matches the criteria, returning the item or
 *  undefined if no item is found.
 *  - if _clone is set, the returned item will be a clone of the original
 *  - if _deep is set, then the clone will be a deep clone of the original
 *    that also has _fstr, _fnul, and _flc applied to the values
 */
function findOne(dataset: string, criteria?: SearchOptions): UR_Item {
  const fn = 'findOne:';
  const { flags } = SetCriteria(criteria);
  const { _deep, _clone, b_miss, b_has, dict_exact, dict_range } = flags;
  // get the raw items
  const items: UR_Item[] = LM.getItemList(dataset);
  if (items === undefined) throw Error(`${fn} dataset '${dataset}' not found`);
  //
  // check for missing fields, applying case-insensitive match if _flc is false
  let found = true;
  let ii: UR_Item, item: UR_Item;
  for (item of items) {
    ii = _deep ? u_deepClone(item) : JSON.parse(JSON.stringify(item));
    if (b_miss) found = found && m_hasMissingProps(ii, b_miss);
    if (b_has) found = found && m_hasProps(ii, b_has);
    if (dict_exact) found = found && m_matchValues(ii, dict_exact);
    if (dict_range) found = found && m_matchRanges(ii, dict_range);
    if (found) break;
  }
  if (found) return _clone ? ii : item;
  return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: Find all items that match the criteria, returning a list of items or
 *  undefined if no items are found */
function findAll(dataset: string, criteria: SearchOptions): UR_Item[] {
  // find all matching field (case sensitive or not)
  // return the list of matching items
  return undefined || [{ _id: '1', name: 'item1' }];
}
