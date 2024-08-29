/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataManager } from './class-data-mgr.ts';
import { DeepClone, NormDataItem, NormItemIDs } from '~ur/common/util-data-norm.ts';

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
  _flcp?: boolean;
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
const LM = new DataManager();
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
  const _flcp = _caseSensitive;
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
    _flcp, // force prop keys to lowercase
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
function u_conformObject(mutant: UR_Item): UR_Item {
  const { _fstr, _fnul, _flcp } = QUERY_STATE.flags;
  Object.keys(mutant).forEach(key => {
    let value = mutant[key];
    if (_flcp) {
      mutant.delete(key);
      key = key.toLowerCase();
      mutant[key] = value;
    }
    if (Array.isArray(value)) {
      mutant[key] = u_conformArray(value);
      return;
    }
    if (typeof value === 'number' && _fstr) {
      mutant[key] = String(value);
      return;
    }
    if (value === undefined && _fnul) {
      mutant[key] = null;
      return;
    }
    if (typeof value === 'object') {
      mutant[key] = u_conformObject(value);
      return;
    }
    mutant[key] = value;
  });
  return mutant;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function u_conformArray(mutant: any[]): any[] {
  return mutant.map(item => {
    if (Array.isArray(item)) return u_conformArray(item);
    if (typeof item === 'object') return u_conformObject(item);
    return item;
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given an item, apply all the forcing constraints to the values */
function u_conformItem(mutant: UR_Item): UR_Item {
  const { _fstr, _fnul, _flcp } = QUERY_STATE.flags;
  Object.keys(mutant).forEach(key => {
    let value = mutant[key];
    if (_flcp) {
      mutant.delete(key);
      key = key.toLowerCase();
      mutant[key] = value;
    }
    if (Array.isArray(value)) {
      mutant[key] = u_conformArray(value);
      return;
    }
    if (typeof value === 'number' && _fstr) {
      mutant[key] = String(value);
      return;
    }
    if (value === undefined && _fnul) {
      mutant[key] = null;
      return;
    }
    if (typeof value === 'object') {
      mutant[key] = u_conformObject(value);
      return;
    }
    mutant[key] = value;
  });
  return mutant;
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
 *    that also has _fstr, _fnul, and _flcp applied to the values
 */
function findOne(dataset: string, criteria?: SearchOptions): UR_Item {
  const fn = 'findOne:';
  const { flags } = SetCriteria(criteria);
  const { _deep, _clone, b_miss, b_has, dict_exact, dict_range } = flags;
  // get the raw items
  const items: UR_Item[] = LM.getItemList(dataset);
  if (items === undefined) throw Error(`${fn} dataset '${dataset}' not found`);
  //
  let item: UR_Item; // the original item
  let ii: UR_Item; // the mutated copy with force lc, str, null applied
  //
  let found = true;
  for (item of items) {
    // create a deep clone of the item, otherwise use the original
    // deepClone will apply _fstr, _fnul, _flcp to the values if they
    // are set in flags.
    ii = _deep ? DeepClone(item) : item;
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
