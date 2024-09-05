/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import {
  NormDataItems,
  DeepCloneArray
} from '../../../../_ur/common/util-data-norm.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  SortOptions, //
  UR_Item,
  DataObj
} from '../../../../_ur/_types/dataset';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type ItemTransformFunction = (item: UR_Item) => UR_Item;
type ItemFormatOptions = {
  includeFields?: string[];
  excludeFields?: string[];
  transformBy?: { [field: string]: ItemTransformFunction };
};
/*/ SORT OPTIONS
    _cloneItems?: boolean; //
    preFilter?: (items: UR_Item[]) => UR_Item[];
    sortBy?: { [field: string]: SortType };
    postFilter?: (items: UR_Item[]) => UR_Item[];
/*/
type ItemsTesterFunction = (items: UR_Item[]) => any;
type ItemTestOptions = {
  groupBy?: { [test: string]: ItemsTesterFunction };
  statTests?: { [stat: string]: ItemsTesterFunction };
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const fn = 'Recordset';

/// PREDEFINED TRANSFORMER METHODS ////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// Transformer methods are used to transform the data in the recordset
/// in common ways. These methods are used in the format() method.
const tx_option_id = (item: UR_Item) => (item.opt = `opt${item._id}`);

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class Recordset {
  //
  src_items: UR_Item[]; // source items
  cur_items: UR_Item[]; // transformed items
  cur_meta: any; // metadata
  //
  constructor(items: UR_Item[]) {
    if (!Array.isArray(items)) {
      throw Error(`${fn} requires an array of items`);
    }
    const [normed, error] = NormDataItems(items);
    if (error) throw Error(`${fn} ${error}`);
    this.src_items = normed;
    this.cur_items = DeepCloneArray(this.src_items);
  }

  /// NON-CHAINING TERMINAL LIST METHODS ///

  /** return the current transformed items */
  getItems() {
    return DeepCloneArray(this.cur_items);
  }

  /** return the current metadata. can provide a name which will
   *  be searched first in groups, then in the top level metadata.
   */
  getStats(name?: string) {
    let result;
    if (name === undefined) result = this.cur_meta;
    else if (this.cur_meta.groups && this.cur_meta.groups[name])
      result = this.cur_meta.groups[name];
    else if (this.cur_meta[name]) result = this.cur_meta[name];
    return result;
  }

  /** return the original source items */
  getSrcItems() {
    return DeepCloneArray(this.src_items);
  }

  /** resets the current item set to beginning */
  reset() {
    this.cur_items = DeepCloneArray(this.src_items);
  }

  /// CHAINING METHODS ///

  /** sorts the current list. if no sort options are passed,
   *  the list is sorted by the first field in ascending order
   */
  sort(sOpt?: SortOptions): Recordset {
    let { sortBy, preFilter, postFilter } = sOpt || {};
    // apply pre filter
    if (preFilter) {
      this.cur_items = preFilter(this.cur_items);
    }
    // default sort by first field
    if (sortBy === undefined) {
      const [firstKey] = Object.keys(this.cur_items[0]);
      sortBy = { [firstKey]: 'sort_asc' };
    }
    // apply successive sort operations
    Object.keys(sortBy).forEach(sortField => {
      const sortType = sortBy[sortField];
      switch (sortType) {
        case 'sort_asc':
          this.cur_items.sort((a, b) => (a[sortField] > b[sortField] ? 1 : -1));
          break;
        case 'sort_desc':
          this.cur_items.sort((a, b) => (a[sortField] < b[sortField] ? 1 : -1));
          break;
        case 'random':
          this.cur_items.sort(() => Math.random() - 0.5);
          break;
        default:
          break;
      }
    });
    // apply post filter
    if (postFilter) {
      this.cur_items = postFilter(this.cur_items);
    }
    // method-chaining return
    return this;
  }

  /** */
  format(fOpt: ItemFormatOptions): Recordset {
    const { includeFields, transformBy } = fOpt || {};
    let items = [];
    this.cur_items.forEach(item => {
      let newItem = {};
      // include only specified fields
      if (includeFields) {
        includeFields.forEach(field => {
          if (item[field] !== undefined) newItem[field] = item[field];
          else console.warn(`${fn} missing field: ${field}`);
        });
      }
      // apply field transformations
      if (transformBy) {
        Object.entries(transformBy).forEach(entry => {
          const [field, xform] = entry;
          if (typeof xform === 'function') newItem[field] = xform(item);
          else console.warn(`${fn} invalid transform function for field: ${field}`);
        });
      }
      // save new item
      items.push(newItem);
    });
    // method-chaining return
    return this;
  }

  /** */
  analyze(testOpts: ItemTestOptions): Recordset {
    const { groupBy, statTests } = testOpts || {};
    let groups: DataObj;
    let stats: DataObj;
    // group by fields
    if (groupBy) {
      groups = {};
      Object.entries(groupBy).forEach(entry => {
        const [groupField, groupTest] = entry;
        groups[groupField] = groupTest(this.cur_items);
      });
    }
    // summarize fields
    if (statTests) {
      stats = {};
      Object.entries(statTests).forEach(entry => {
        const [stat, test] = entry;
        if (stat === 'groups') throw Error(`${fn} 'groups' is a reserved stat name`);
        stats[stat] = test(this.cur_items);
      });
    }
    // check for useless method call
    if (!groups && !stats)
      throw Error(`${fn} no groupBy or summarizeBy options provided`);
    // save metadata
    this.cur_meta = { groups, ...stats };
    // method-chaining return
    return this;
  }

  /// PAGINATION ///

  /** */
  pageItems(): UR_Item[] {
    return this.cur_items;
  }

  /** */
  pageIndex() {}

  /** */
  pageCount() {}

  /** */
  paginate(pageNum?, pageSize?) {}

  /** */
  nextPage() {}

  /** */
  prevPage() {}

  /** */
  isLastPage() {}

  /** */
  isFirstPage() {}
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default Recordset;
export { Recordset };
