import { RecordSet } from './class-data-recordset.ts';
import type { UR_Item, SearchOptions, MatchObj, RangeObj, SearchProps, SearchState } from '../_types/dataset.ts';
/** API: set the search criteria for the query */
declare function m_SetCriteria(criteria: SearchOptions): SearchState;
/** API: get the current query state */
declare function m_GetCriteria(): SearchState;
/** check if item has all the fields and values in the passed dictionary */
declare function u_matchValues(item: UR_Item, mObj: MatchObj): boolean;
/** check if item has all the fields and values in the passed dictionary
 *  RangeObj: { [key: string]: RangeType }
 *  RangeType: `op value [value]`
 */
declare function u_matchRanges(item: UR_Item, rObj: RangeObj): boolean;
/** Given an item, apply all the forcing constraints to the values.
 *  The provided item is mutated in place and returned. */
declare function m_EnforceFlags(mutable: UR_Item): UR_Item;
/** return found, missing, extra props in item based on passed list of desired
 *  properties */
declare function m_AssessPropKeys(item: UR_Item, plist: string[]): SearchProps;
/** API: Find the first item that matches the criteria, returning the item or
 *  undefined if no item is found.
 *  - if _clone is set, the returned item will be a clone of the original
 *  - if _deep is set, then the clone will be a deep clone of the original
 *    that also has _fval, _fnul, and _flcp applied to the values
 */
declare function Find(items: UR_Item[], criteria?: SearchOptions): UR_Item[];
/** API: Find the first item that matches the criteria, returning a recordset
 *  wrapping the results
 */
declare function Query(items: UR_Item[], criteria?: SearchOptions): RecordSet;
export { Find, // (items: UR_Item[], criteria: SearchOptions) => UR_Item
Query };
export { m_SetCriteria, // (criteria: SearchOptions) => SearchState
m_GetCriteria, // () => SearchState
m_EnforceFlags, // (mutable: UR_Item) => UR_Item
m_AssessPropKeys, // (item: UR_Item, plist: PropKey[]) => SearchProps
u_matchValues, // (item: UR_Item, mObj: MatchObj) => boolean
u_matchRanges };
