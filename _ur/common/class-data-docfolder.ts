/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Dataset Document Manager Class
  this is a class that manages folders of documents in a dataset
  in serializable form

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { NormDocIDs, NormDoc, NormDocFolder } from './util-data-norm.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DataObj, // { [key: string]: any }
  UR_EntID, // string
  DataBinID, // string
  UR_Doc, // { _ref: DataBinID; [key: string]: any }
  UR_DocFolder, // { [ref_name: DataBinID]: UR_Doc }
  UR_Item // { _id: UR_EntID; [key: string]: any }
} from '../_types/dataset';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);

/// CLASS DECLARATION //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class DocFolder {
  //
  collection_name: string;
  collection_type: string;
  _DOCS: { [ref_name: DataBinID]: UR_DocFolder };
  //
  constructor(col_name?: string) {
    if (this._DOCS === undefined) this._DOCS = {};
    if (col_name) this.collection_name = col_name;
    this.collection_type = this.constructor.name;
  }

  /// DOCUMENT FOLDER METHODS ///

  /** Given the name of a doc, create a new doc and return the doc
   *  instance */
  createDocFolder(fdoc: string): UR_DocFolder {
    const fn = 'createDocFolder:';
    if (this._DOCS[fdoc]) throw Error(`${fn} doc '${fdoc}' already exists`);
    const folder: UR_DocFolder = {};
    this._DOCS[fdoc] = folder;
    return folder;
  }

  /** Given the name of a doc, clear the doc of all items and retain the
   *  same doc instance */
  clearDocFolder(fdoc: string): UR_DocFolder {
    const fn = 'clearDocFolder:';
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    this._DOCS[fdoc] = undefined;
    return folder;
  }

  /** Given the name of a doc, return the entire doc */
  getDocFolder(fdoc: string): UR_DocFolder {
    return this._DOCS[fdoc];
  }

  /// DOCUMENT METHODS ///

  /** given the name of a doc and an object, add the object to the
   *  doc and return the doc if successful, undefined otherwise */
  docAdd(fdoc: string, doc: DataObj): UR_Doc {
    const fn = 'docAdd:';
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} doc '${fdoc}' not found`);
    // normalize the objects and add them to the doc
    const [norm_doc, norm_error] = NormDoc(doc);
    if (norm_error) throw Error(`${fn} ${norm_error}`);
    const { _id } = norm_doc;
    folder[_id] = norm_doc;
    return { ...norm_doc }; // return a copy of the doc
  }

  /** given the name of a doc and an array of objects, add the objects to the
   * doc and return the doc if successful, undefined otherwise */
  docsAdd(fdoc: string, _DOCS: UR_Doc[]): UR_Doc[] {
    const fn = 'docsAdd:';
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} doc '${fdoc}' not found`);
    // normalize the objects and add them to the doc
    const [norm_docs, norm_error] = NormDocFolder(_DOCS);
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
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    const doc = folder[id];
    if (doc === undefined) throw Error(`${fn} doc '${id}' not found`);
    return { ...doc };
  }

  /** given the folder and ids of documents, return the matching _DOCS
   *  in order of the ids provided. If no ids are provided, return all _DOCS
   */
  docsRead(fdoc: string, ids?: UR_EntID[]): UR_Doc[] {
    const fn = 'docRead:';
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} doc '${fdoc}' not found`);
    if (ids && Array.isArray(ids)) {
      const [norm_ids, norm_error] = NormDocIDs(ids);
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
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    if (typeof doc !== 'object') throw Error(`${fn} doc must be an object`);
    const { _id } = doc;
    if (_id === undefined) throw Error(`${fn} missing _id field`);
    const [norm_doc, error] = NormDoc(doc);
    if (error) throw Error(`${fn} ${error}`);
    const old_doc = folder[_id];
    if (old_doc === undefined) throw Error(`${fn} doc '${_id}' not found`);
    folder[_id] = { ...old_doc, ...norm_doc };
    return { ...folder[_id] };
  }

  /** given the folder and an array of doc objects, update the doc with the
   *  items provided through shallow merge. return a copy of the updated _DOCS
   */
  docsUpdate(fdoc: string, _DOCS: UR_Doc[]): UR_Doc[] {
    const fn = 'docsUpdate:';
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    const [norm_docs, norm_error] = NormDocFolder(_DOCS);
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
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${fdoc}' not found`);
    const { _id } = doc;
    if (_id === undefined) throw Error(`${fn} missing _id field`);
    if (folder[_id] === undefined) throw Error(`${fn} doc '${_id}' not found`);
    const [norm_doc, error] = NormDoc(doc);
    if (error) throw Error(`${fn} ${error}`);
    const old_doc = folder[_id];
    folder[_id] = norm_doc;
    return old_doc;
  }

  /** Given the name of a doc, overwrite the objects. Unlike ListUpdate, this
   * will not merge but replace the items. The items must exist to be
   * replaced */
  docsReplace(fdoc: string, _DOCS: UR_Doc[]) {
    const fn = 'docsReplace:';
    const folder = this._DOCS[fdoc];
    if (folder === undefined) throw Error(`${fn} folder '${folder}' not found`);
    if (!Array.isArray(_DOCS) || _DOCS === undefined)
      throw Error(`${fn} _DOCS must be an array`);
    if (_DOCS.length === 0) throw Error(`${fn} _DOCS array is empty`);
    const [norm_docs, error] = NormDocFolder(_DOCS);
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
    const docInstance = this._DOCS[docID];
    // TODO: update the items that already exist in the doc
  }

  /** Given the name of a doc, delete the objects in the doc with the ids
   *  provided. If there are any ids that don't exist in the doc, throw an
   *  Error. Return a copy of the deleted items if successful */
  docDelete(docID: string, ids: UR_EntID[]) {
    const fn = 'docDelete:';
    const doc = this._DOCS[docID];
    if (doc === undefined) throw Error(`${fn} doc '${docID}' not found`);
    // TODO: update the items that already exist in the doc
  }

  /// DOC FOLDERS DATA STRUCTURE GETTER ///

  /** return the instances of all lists */
  docFoldersGetAll(): UR_DocFolder[] {
    return Object.values(this._DOCS);
  }

  /// DATA INTERCHANGE METHODS ///

  /** return the folder contents as a list of items. these are the actual
   *  objects in the list, not copies */
  getCollectionAsItemList(docf: string): UR_Item[] {
    const folder = this._DOCS[docf];
    if (folder === undefined) return undefined;
    return Object.values(folder) as UR_Item[];
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DocFolder; // the class
export {
  DocFolder // the class
};
