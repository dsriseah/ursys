/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
    
  Manifest is a utility class that handles the resource declaration that
  specifies where serialized data collections are stored. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import {
  DecodeManifest,
  DecodeSchemaID,
  DecodeDataURI
} from '../common/util-data-ops';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_ManifestObj,
  UR_ContentMeta,
  DataBinID,
  DataBinType,
  DataBinURIs,
  ResourceURI,
  UR_SchemaID,
  UR_DatasetURI
} from '../_types/dataset';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log;
const WARN = console.warn;

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class DatasetManifest {
  //
  _manifest: UR_ManifestObj;
  _schemaID: UR_SchemaID;
  _dataURI: UR_DatasetURI;
  _metaInfo: UR_ContentMeta;
  _bins: Map<DataBinType, DataBinURIs>;
  //
  constructor(maniObj?: UR_ManifestObj) {
    // if there is no manifest provided, then make a blank one
    if (maniObj === undefined) {
      this._manifest = {};
      return;
    }
    // otherwise initialize from the provided object
    this._setFromManifestObj(maniObj);
  }

  /// INITIALIZERS ///

  /** utility method to set the instance from an object */
  _setFromManifestObj(maniObj: UR_ManifestObj): void {
    const { error, ...decoded } = DecodeManifest(maniObj);
    if (error) throw Error(`error constructing DatasetManifest: ${error}`);
    const { _schemaID, _dataURI, _metaInfo, ...bins } = decoded;
    this._manifest = decoded;
    // memory note: ? none-duplicated pointers ?
    this._schemaID = _schemaID;
    this._dataURI = _dataURI;
    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*\
      bins: {
        ItemListURIs: { name1: resource_uri1, name2: resource_uri2 }
        DocFolderURIs: { name3: resource_uri3, name4: resource_uri4 }
    \*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
    if (typeof bins !== 'object') return;
    this._bins = new Map();
    Object.keys(bins).forEach(binType => {
      const binDict = bins[binType]; // { [binName] : resourceURI }
      this._bins.set(binType as DataBinType, binDict);
    });
  }

  /// BUILDERS ///

  setSchemaID(schemaID: UR_SchemaID): void {
    const { error } = DecodeSchemaID(schemaID);
    if (error) throw Error(`error setting schemaID '${schemaID}': ${error}`);
    this._schemaID = schemaID;
  }

  setDataURI(dataURI: UR_DatasetURI): void {
    const { error } = DecodeDataURI(dataURI);
    if (error) throw Error(`error setting dataURI '${dataURI}': ${error}`);
    this._dataURI = dataURI;
  }

  setMeta(meta: UR_ContentMeta): void {
    this._metaInfo = meta;
  }

  /** add a bin to the manifest */
  addBinEntry(binType: DataBinType, binName: DataBinID, binURI: ResourceURI): void {
    if (!this._bins.has(binType)) this._bins.set(binType, {});
    const bin = this._bins.get(binType);
    if (bin[binName]) WARN(`addBin: overwriting existing bin ${binName}`);
    bin[binName] = binURI;
  }

  /// GENERATORS ///

  /** return a new manifest object */
  getManifestObj(): UR_ManifestObj {
    const { _schemaID, _dataURI, _metaInfo } = this;
    const bins = {};
    this._bins.forEach((dict, type) => {
      bins[type] = { ...dict };
    });
    return {
      _schemaID,
      _dataURI,
      _metaInfo,
      ...bins
    };
  }

  /// ACCESSORS (RETURN COPIES) ///

  /** return the schemaID of this manifest */
  get schemaID(): UR_SchemaID {
    return this._schemaID;
  }

  /** retrieve the dataURI of this manifest*/
  get dataURI(): string {
    return this._dataURI;
  }

  /** retrieve a copy of the meta info for this manifest */
  get meta(): UR_ContentMeta {
    return { ...this._metaInfo };
  }

  /** return a copy of the bins map as object */
  getBinURIs(): DataBinURIs {
    const bins = {};
    this._bins.forEach((binDict, binType) => {
      bins[binType] = { ...binDict };
    });
    return bins;
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DatasetManifest;
export { DatasetManifest };