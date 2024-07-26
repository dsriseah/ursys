/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Collections are 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// BASE TYPES ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** identifier strings for types of collections in the URSYS ecosystem */
type CollectionName = string; // snake_case for a name of a collection
type PropName = string; // camelCase for user, _snake_case for internal
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** a generic item with a unique id and properties */
type ItemUID = string; // unique snake_case identifier
type Item = {
  id: ItemUID; // must be unique within a collection
  [propertyName: PropName]: any;
};

/// UNIVERSAL IDENTIFIERS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Identify ownership and schema uniquely across the world */
type URSchemaRoot = string; // e.g. 'ursys', 'rapt'
type URSchemaName = string; // e.g. 'resource_type', 'meme', 'netcreate'
type URSchemaVersion = `version=${string}`; // e.g. 'version=1.0.0'
type URSchemaTags = string; // semi-colon separated list of tags
type URSchemaID =
  `${URSchemaRoot}:${URSchemaName}:${URSchemaVersion}:${URSchemaTags}`;

/// RESOURCE TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Resources are file-based data structures that conform to a schema */
type ResourceUID = string; // unique snake_case resource identifier
type ResourceKey = string; // non-unique resource URI
type ManifestItem = {
  res_name: ResourceKey; // type of resource
  uri: string; // location of resource
  [propertyName: PropName]: any; // related properties for resource
};
type TemplateUID = string; // must be unique within a schema

/// LIST TYPES ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A list of Items with a collection name defined in schema */
type URDataList = {
  _schema: URSchemaID;
  list_name: CollectionName;
  items: Item[];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A key-value dictionary a collection name defined in schema */
type URDataDict = {
  _schema: URSchemaID;
  doc_name: CollectionName;
  dict: { [propertyName: PropName]: any };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A list of resources with a collection name defined in schema */
type URResourceList = {
  _schema: URSchemaID;
  res_name: CollectionName;
  uris: ManifestItem[];
};

/// TEMPLATE TYPES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A template is a collection of properties defined in schema */
type URTemplate = {
  _schema: URSchemaID;
  template_name: CollectionName;
  fields: {
    [templateProperty: PropName]: any;
  };
};

/// DATASET ADDRESSING ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type UROrgDomain = string; // reverse-domain-id
type URDataBucket = string; // unique within org domain
type URDataSetName = string; // unique within bucket
type URDataSetAddress = `${UROrgDomain}:${URDataBucket}:${URDataSetName}`;

/// MASTER DATASET DECLARATION ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** A complete dataset with all collections and resources */
type URDataSet = {
  _address: URDataSetAddress;
  _schema: URSchemaID;
  lists: { [list_name: ItemUID]: URDataList };
  dicts: { [doc_name: ItemUID]: URDataDict };
  files: { [res_name: ResourceUID]: URResourceList };
  templates: { [template_name: TemplateUID]: URTemplate };
};

/// DATABASE TYPE DECLARATIONS ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** settings for initializing a collection on create */
type CollectionOptions = {
  [key: string]: any;
};
/** settings for initializing a database on create or load */
type DatabaseOptions = {
  [key: string]: any;
};

/// DATABASE RECORD TYPES /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Records are stored in Collections */
type RecordID = string; // the id of a record
type RecordFields = {
  [field: string]: any; // fields of a record
};
type Record = {
  _id?: RecordID; // may not be defined on create
  fields: RecordFields;
};

/// DATABASE OPERATIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** returned by whole-database operations */
type DatabaseStatus = 'loaded' | 'saved' | 'flushed' | 'closed';

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type {
  // main set of resources
  URDataSet,
  // sub types
  URDataList,
  URDataDict,
  URResourceList,
  URTemplate
};
export type {
  // options
  CollectionOptions,
  DatabaseOptions,
  // status
  DatabaseStatus,
  // record types
  RecordID,
  RecordFields,
  Record
};
