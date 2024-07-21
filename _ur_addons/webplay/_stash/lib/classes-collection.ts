/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  The collection module is like an ORM API
  The idea is to provide a simple way to interact with collections of data
  and have some kind of adapter that talks to different backends

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DatabaseStatus,
  Record,
  RecordID,
  RecordFields,
  //
  DatabaseOptions,
  CollectionOptions
} from '../types/ur-collections';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type CollectionList = {
  [name: string]: Collection;
};

/// RESULT SET CLASSES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A ResultSet is a collection of records that were returned by a Database
 *  or Collections operation. The set is mutable and can be filtered, sorted
 *  further.
 */
class ResultSet {
  _records: Record[]; // the records in the result set
  //
  constructor(records: Record[]) {
    this._records = records;
  }
  //
  limit(num: number): ResultSet {
    return new ResultSet(this._records);
  }
  offset(num: number): ResultSet {
    return new ResultSet(this._records);
  }
  map(filter: Function): any[] {
    return [];
  }
  where(filter: Function): ResultSet {
    return new ResultSet(this._records);
  }
  sort(field: string): ResultSet {
    return new ResultSet(this._records);
  }
  compoundSort(fields: string[]): ResultSet {
    return new ResultSet(this._records);
  }
  eq(field: string, value: any): ResultSet {
    return new ResultSet(this._records);
  }
  gt(field: string, value: any): ResultSet {
    return new ResultSet(this._records);
  }
  lt(field: string, value: any): ResultSet {
    return new ResultSet(this._records);
  }
  between(field: string, valueA: any, valueB: any): ResultSet {
    return new ResultSet(this._records);
  }
  findAndRemove(query: string) {}
}

/// COLLECTION CLASS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A Collection is a set of related records of the same type, stored in a
 *  Database instance by name. */
class Collection {
  _name: string;
  _records: Record[];

  constructor(name: string) {
    this._name = name;
    this._records = [];
  }

  insert(record: Record): Record {
    const newRecord: Record = { _id: '0', ...record };
    this._records.push(newRecord);
    return newRecord;
  }

  find(query: any): ResultSet {
    const resultSet = new ResultSet(this._records);
    return resultSet.where(query);
  }

  findIDs(idList: RecordID[]): ResultSet {
    const found = this._records.filter(r => idList.includes(r._id));
    return new ResultSet(found);
  }

  update(records: Record[]): void {
    records.forEach(record => {
      const index = this._records.findIndex(r => r._id === record._id);
      if (index !== -1) this._records[index] = record;
    });
  }
  updateID(recordID: RecordID, update: Record): void {
    const record = this._records.find(r => r._id === recordID);
    if (record) {
      Object.assign(record, update);
    }
  }

  removeID(recordID: RecordID): void {
    this._records = this._records.filter(r => r._id !== recordID);
  }

  removeIDs(recordList: RecordID[]): void {
    this._records = this._records.filter(r => !recordList.includes(r._id));
  }

  count(): number {
    return this._records.length;
  }

  clear(): void {
    this._records = [];
  }
}

/// DATABASE CLASS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A Database is a container of Collections of Records.
 *  It provides methods to load, save, flush, and close the database. */
class Database {
  collections: CollectionList;
  //
  constructor() {
    this.collections = {};
  }

  async awaitLoad(opt: DatabaseOptions): Promise<CollectionList> {
    return this.collections;
    // implementation here
  }

  async awaitSave(): Promise<DatabaseStatus> {
    return 'saved';
  }

  async awaitFlush(): Promise<DatabaseStatus> {
    return 'flushed';
  }

  async awaitClose(): Promise<DatabaseStatus> {
    return 'closed';
  }

  addCollection(name: string, opt: CollectionOptions): Collection {
    return new Collection(name);
  }

  getCollection(name: string): Collection {
    return this.collections[name];
  }

  listCollections(): CollectionList {
    return this.collections;
  }

  removeCollection(name: string): CollectionList {
    delete this.collections[name];
    return this.collections;
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { Database, Collection, ResultSet };
