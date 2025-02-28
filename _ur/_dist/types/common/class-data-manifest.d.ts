import type { UR_ManifestObj, DS_ContentMeta, DataBinID, DataBinType, DataBinURIs, ResourceURI, DS_DataURI } from '../_types/dataset.ts';
declare class DatasetManifest {
    _manifest: UR_ManifestObj;
    _dataURI: DS_DataURI;
    _metaInfo: DS_ContentMeta;
    _bins: Map<DataBinType, DataBinURIs>;
    constructor(maniObj?: UR_ManifestObj);
    /** utility method to set the instance from an object */
    _setFromManifestObj(maniObj: UR_ManifestObj): void;
    setDataURI(dataURI: DS_DataURI): void;
    setMeta(meta: DS_ContentMeta): void;
    /** add a bin to the manifest */
    addBinEntry(binType: DataBinType, binName: DataBinID, binURI: ResourceURI): void;
    /** return a new manifest object */
    getManifestObj(): UR_ManifestObj;
    /** retrieve the dataURI of this manifest*/
    get dataURI(): string;
    /** retrieve a copy of the meta info for this manifest */
    get meta(): DS_ContentMeta;
    /** return a copy of the bins map as object */
    getBinURIs(): DataBinURIs;
}
export default DatasetManifest;
export { DatasetManifest };
