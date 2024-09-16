/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset List Manager Class
  this is a class that manages lists of items in a dataset
  in serializable form

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NORM } from '@ursys/core';
import { ItemList } from './class-data-itemlist.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_EntID_Obj,
  DataObj,
  UR_BagRef,
  UR_Item,
  UR_ItemList
} from '../../../../_ur/_types/dataset';
import type { ItemListOptions } from './class-data-itemlist.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class DataManager {
  //
  collection_name: string; // the name of this list manager
  collection_type: string; // the type of this list manager
  _LI: { [ref_name: UR_BagRef]: ItemList };
  //
  constructor(col_name?: string) {
    if (this._LI === undefined) this._LI = {};
    if (col_name) this.collection_name = col_name;
    this.collection_type = this.constructor.name;
  }

  /// ITEM LIST METHODS ///

  /** Given the name of a list, create a new list and return the list
   *  instance */
  createItemList(listName: string, opt?: ItemListOptions): ItemList {
    const fn = 'createItemList:';
    if (this._LI[listName] !== undefined)
      throw Error(`${fn} list '${listName}' already exists`);
    const list = new ItemList(listName, opt);
    this._LI[listName] = list;
    return this._LI[listName];
  }

  /** Given the name of a list, clear the list of all items and retain the
   *  same list instance and max ordinal count */
  clearItemList(listName: string): ItemList {
    const fn = 'clearItemList:';
    const list = this._LI[listName];
    if (list === undefined) throw Error(`${fn} list '${listName}' not found`);
    list.clear();
    return list;
  }

  /** Given the name of a list, return the entire list */
  getItemList(listName: string): ItemList {
    const fn = 'getItemList:';
    const list = this._LI[listName];
    if (list === undefined) throw Error(`${fn} list '${listName}' not found`);
    return list;
  }

  /// ITEMLISTS DATA STRUCTURE GETTER ///

  /** return the instances of all lists */
  getItemListsByReference(): ItemList[] {
    return Object.values(this._LI);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DataManager; // the class
export {
  DataManager // the class
};
