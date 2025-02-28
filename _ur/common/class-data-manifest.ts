/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
    
  Manifest is a utility class that handles the resource declaration that
  specifies where serialized data collections are stored. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import {
  DecodeManifest,
  DecodeSchemaID,
  DecodeDataURI
} from '../common/util-data-ops.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  UR_ManifestObj,
  DS_ContentMeta,
  DataBinID,
  DataBinType,
  DataBinURIs,
  ResourceURI,
  UR_SchemaID,
  DS_DataURI
} from '../_types/dataset.ts';

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
  _dataURI: DS_DataURI;
  _metaInfo: DS_ContentMeta;
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
    const { _dataURI, _meta, ...bins } = decoded;
    this._manifest = decoded;
    // memory note: ? none-duplicated pointers ?
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

  setDataURI(dataURI: DS_DataURI): void {
    const { error } = DecodeDataURI(dataURI);
    if (error) throw Error(`error setting dataURI '${dataURI}': ${error}`);
    this._dataURI = dataURI;
  }

  setMeta(meta: DS_ContentMeta): void {
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
    const { _dataURI, _metaInfo } = this;
    const bins = {};
    this._bins.forEach((dict, type) => {
      bins[type] = { ...dict };
    });
    return {
      _dataURI,
      _meta: _metaInfo,
      ...bins
    };
  }

  /// ACCESSORS (RETURN COPIES) ///

  /** retrieve the dataURI of this manifest*/
  get dataURI(): string {
    return this._dataURI;
  }

  /** retrieve a copy of the meta info for this manifest */
  get meta(): DS_ContentMeta {
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
