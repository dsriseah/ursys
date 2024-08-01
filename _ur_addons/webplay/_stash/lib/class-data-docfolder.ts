/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset Document Manager Class
  this is a class that manages folders of documents in a dataset
  in serializable form

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NORM } from '@ursys/core';
const { NormalizeItem, NormalizeItems, NormalizeDataObj, NormalizeItemIDs } = NORM;

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DataObj, // { [key: string]: any }
  UR_EntID, // string
  UR_BagRef, // string
  UR_Doc, // { _ref: UR_BagRef; [key: string]: any }
  UR_DocFolder // { [ref_name: UR_BagRef]: UR_Doc }
} from '~ur/types/ursys.d.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// the documents managed by DocManager
/// this is what would be serialized as part of a dataset
let m_docs: { [ref_name: UR_BagRef]: UR_DocFolder };

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class DocManager {
  //
  constructor() {
    if (m_docs === undefined) m_docs = {}; // { [ref_name: UR_BagRef]: DatasetDoc }
  }

  /// DOCUMENT FOLDER METHODS ///

  /** Given the name of a doc, create a new doc and return the doc
   *  instance */
  createDocFolder(fdoc: string) {
    const fn = 'createDocFolder:';
    if (m_docs[fdoc]) throw Error(`${fn} doc '${fdoc}' already exists`);
    const folder: UR_DocFolder = {};
    m_docs[fdoc] = folder;
    return folder;
  }

  /** Given the name of a doc, clear the doc of all items and retain the
   *  same doc instance */
  clearDocFolder(fdoc: string) {
    const fn = 'clearDocFolder:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    m_docs[fdoc] = undefined;
    return folder;
  }

  /** Given the name of a doc, return the entire doc */
  getDocFolder(fdoc: string) {
    return m_docs[fdoc];
  }

  /// DOCUMENT METHODS ///

  /** given the name of a doc and an object, add the object to the
   *  doc and return the doc if successful, undefined otherwise */
  docAdd(fdoc: string, doc: DataObj): UR_Doc {
    const fn = 'docAdd:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} doc '${fdoc}' not found`);
    // normalize the objects and add them to the doc
    const [norm_doc, norm_error] = NormalizeItem(doc);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    const { _id } = norm_doc;
    folder[_id] = norm_doc;
    return { ...norm_doc }; // return a copy of the doc
  }

  /** given the name of a doc and an array of objects, add the objects to the
   * doc and return the doc if successful, undefined otherwise */
  docsAdd(fdoc: string, docs: UR_Doc[]): UR_Doc[] {
    const fn = 'docsAdd:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} doc '${fdoc}' not found`);
    // normalize the objects and add them to the doc
    const [norm_docs, norm_error] = NormalizeItems(docs);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    for (const doc of norm_docs) {
      const { _id } = doc;
      folder[_id] = doc;
    }
    return [...norm_docs]; // return a copy
  }

  /** return a single doc from the folder */
  docRead(fdoc: string, id: UR_EntID): UR_Doc {
    const fn = 'docRead:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    const doc = folder[id];
    if (doc === undefined) throw Error(`${fn} doc '${id}' not found`);
    return { ...doc };
  }

  /** given the folder and ids of documents, return the matching docs
   *  in order of the ids provided. If no ids are provided, return all docs
   */
  docsRead(fdoc: string, ids?: UR_EntID[]): UR_Doc[] {
    const fn = 'docRead:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} doc '${fdoc}' not found`);
    if (ids && Array.isArray(ids)) {
      const [norm_ids, norm_error] = NormalizeItemIDs(ids);
      if (norm_error) throw Error(`${fn} ${norm_error}`);
      return norm_ids.map(id => {
        const doc = folder[id];
        if (doc === undefined) throw Error(`${fn} doc '${id}' not found`);
        return folder[id];
      });
    }
    return Object.values(folder).map(doc => ({ ...doc }));
  }

  /** given the folder and a doc object, update the doc with the items
   *  provided through shallow merge.
   */
  docUpdate(fdoc: string, doc: UR_Doc): UR_Doc {
    const fn = 'docUpdate:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    if (typeof doc !== 'object') throw Error(`${fn} doc must be an object`);
    const { _id } = doc;
    if (_id === undefined) throw Error(`${fn} missing _id field`);
    const [norm_doc, error] = NormalizeItem(doc);
    if (error) throw Error(`${fn} ${error}`);
    const old_doc = folder[_id];
    if (old_doc === undefined) throw Error(`${fn} doc '${_id}' not found`);
    folder[_id] = { ...old_doc, ...norm_doc };
    return { ...folder[_id] };
  }

  /** given the folder and an array of doc objects, update the doc with the
   *  items provided through shallow merge. return a copy of the updated docs
   */
  docsUpdate(fdoc: string, docs: UR_Doc[]): UR_Doc[] {
    const fn = 'docsUpdate:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    const [norm_docs, norm_error] = NormalizeItems(docs);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    const updated = [];
    for (const doc of norm_docs) {
      const { _id } = doc;
      const old_doc = folder[_id];
      if (old_doc === undefined) throw Error(`${fn} doc '${_id}' not found`);
      folder[_id] = { ...old_doc, ...doc };
      updated.push({ ...folder[_id] });
    }
    return updated;
  }

  /** Given the name of a doc, overwrite the object. Unlike DocUpdate,
   *  this will not merge but replace the item. The item must exist to be
   *  replaced */
  docReplace(fdoc: string, doc: UR_Doc) {
    const fn = 'docReplace:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    const { _id } = doc;
    if (_id === undefined) throw Error(`${fn} missing _id field`);
    if (folder[_id] === undefined) throw Error(`${fn} doc '${_id}' not found`);
    const [norm_doc, error] = NormalizeItem(doc);
    if (error) throw Error(`${fn} ${error}`);
    const old_doc = folder[_id];
    folder[_id] = norm_doc;
    return old_doc;
  }

  /** Given the name of a doc, overwrite the objects. Unlike ListUpdate, this
   * will not merge but replace the items. The items must exist to be
   * replaced */
  docsReplace(fdoc: string, docs: UR_Doc[]) {
    const fn = 'docsReplace:';
    const folder = m_docs[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${folder}' not found`);
    if (!Array.isArray(docs) || docs === undefined)
      throw Error(`${fn} docs must be an array`);
    if (docs.length === 0) throw Error(`${fn} docs array is empty`);
    const [norm_docs, error] = NormalizeItems(docs);
    if (error) throw Error(`${fn} ${error}`);
    const replaced = [];
    for (const doc of norm_docs) {
      const { _id } = doc;
      if (folder[_id] === undefined)
        throw Error(`${fn} doc '${_id}' not found in '${fdoc}'`);
      const old_doc = folder[_id];
      folder[_id] = doc;
      replaced.push(old_doc);
    }
    return replaced;
  }

  /** Given the name of a doc, add the items to the doc. If an already
   *  exists in the doc, update it instead. Return a copy of the doc */
  docUpdateOrAdd(docID: string, doc: UR_Doc) {
    const fn = 'docUpdateOrAdd:';
    const docInstance = m_docs[docID];
    // update the items that already exist in the doc
  }

  /** Given the name of a doc, delete the objects in the doc with the ids
   *  provided. If there are any ids that don't exist in the doc, throw an
   *  Error. Return a copy of the deleted items if successful */
  docDelete(docID: string, ids: UR_EntID[]) {
    const fn = 'docDelete:';
    const doc = m_docs[docID];
    if (doc === undefined) throw Error(`${fn} doc '${docID}' not found`);
  }

  /** return the instances of all lists */
  static GetDocFolders(): UR_DocFolder[] {
    return Object.values(m_docs);
  }
}

/// STATIC FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetDocFolders() {
  return DocManager.GetDocFolders();
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DocManager; // the class
export {
  GetDocFolders, // static method
  DocManager // the class
};
