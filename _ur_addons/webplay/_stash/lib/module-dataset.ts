/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset Manager

  A top-level manager for interacting with datasets on both the client
  and server. A Dataset contains several "bags" (our term for "item collection")
  each of which has a type (e.g. ItemList, DocFolder).



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NORM } from '@ursys/core';
import { ItemList } from './class-data-itemlist.ts';
import { DocFolder } from './class-data-docfolder.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_EntID,
  UR_EntID_Obj,
  DataObj,
  UR_Item,
  UR_ItemList,
  I_BagInstance,
  UR_BagRef,
  UR_BagType,
  UR_Dataset
} from '../../../../_ur/_types/dataset';

import type { ItemListOptions } from './class-data-itemlist.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATASET: UR_Dataset = {};
const CTYPES = ['DocFolder', 'ItemList'];

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** initialize the collections object */
function m_InitializeCollections() {
  if (Object.keys(DATASET).length > 0) throw Error('DATASET already exists');
  DATASET.Schema = undefined;
  DATASET.DocFolder = {};
  DATASET.ItemList = {};
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return true if the given bag type is recognized */
function m_IsValidBagType(cType: UR_BagType): boolean {
  return CTYPES.includes(cType);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** conform bag names to be snake case and is only lower case */
function m_IsValidBagName(bName: string): boolean {
  const noSpaces = !/\s/.test(bName);
  const snakeCase = /^[a-z_]+$/.test(bName);
  return noSpaces && snakeCase;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** find all matching bag names */
function m_FindBag(bName: UR_BagRef): any[] {
  if (!m_IsValidBagName(bName)) throw Error('Invalid bag name');
  const bags = [];
  if (DATASET.DocFolder[bName]) bags.push(DATASET.DocFolder[bName]);
  if (DATASET.ItemList[bName]) bags.push(DATASET.ItemList[bName]);
  return bags;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return a string list of all bags in the dataset */
function m_GetBagReport(bags: I_BagInstance[]): string[] {
  if (bags === undefined) {
    bags = [];
    for (let bag of Object.values(DATASET.DocFolder)) bags.push(bag);
    for (let bag of Object.values(DATASET.ItemList)) bags.push(bag);
  }
  const report = [];
  bags.forEach(bag => {
    if (bag instanceof DocFolder) {
      report.push('DocFolder... ' + bag.name);
    } else if (bag instanceof ItemList) {
      report.push('ItemList.... ' + bag.name);
    }
  });
  return report;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create a new bag of the given type, and return the bag */
function m_CreateBag(bName: UR_BagRef, bType: UR_BagType): any {
  if (!m_IsValidBagName(bName)) throw Error(`Invalid bag name '${bName}'`);
  if (m_FindBag(bName).length > 0)
    throw Error(`Bag name must be unique across the entire dataset ('${bName}')`);
  if (!m_IsValidBagType(bType)) throw Error(`Invalid bag type ${bType}`);
  //
  if (bType === 'DocFolder') {
    const ff = DATASET.DocFolder;
    if (ff[bName]) throw Error(`DocFolder '${bName}' already exists`);
    ff[bName] = new DocFolder(bName);
    return ff[bName];
  } else if (bType === 'ItemList') {
    const ii = DATASET.ItemList;
    if (ii[bName]) throw Error(`ItemList '${bName}' already exists`);
    ii[bName] = new ItemList(bName);
    return ii[bName];
  } else {
    throw Error(`Invalid bag type ${bType}`);
  }
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** look for the bag in the dataset, and return it if it exists */
function GetBag(bName: UR_BagRef): any {
  const bags = m_FindBag(bName);
  if (bags.length === 1) return bags[0];
  // this should never happen
  if (bags.length > 1) throw Error(`unexpected multiple bags with name '${bName}'`);
  // wasn't found
  return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** look for a bag of given type and name based on selector pattern
 *  "type/name" e.g. "DocFolder/comment_collection" */
function GetBagType(bagSelector: string): any {
  const [bType, bName] = bagSelector.split('/');
  if (!m_IsValidBagType(bType as UR_BagType))
    throw Error(`Invalid bag type ${bType}`);
  if (!m_IsValidBagName(bName)) throw Error(`Invalid bag name '${bName}'`);
  const bag = GetBag(bName);
  if (bag && bag._type === bType) return bag;
  return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function CreateBag(bName: UR_BagRef, bType: UR_BagType): any {
  return m_CreateBag(bName, bType);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  GetBag, //
  GetBagType,
  CreateBag
};
