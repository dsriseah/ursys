import type { IDS_DataObjectAdapter, DS_DatasetObj, UR_ManifestObj, DataBinID, DS_DataURI } from '../_types/dataset.ts';
export type DOA_Options = {
    dataURI?: DS_DataURI;
    accToken?: string;
};
declare abstract class DataObjAdapter implements IDS_DataObjectAdapter {
    dataURI: DS_DataURI;
    accToken: string;
    constructor(opt?: DOA_Options);
    abstract getManifest(dataURI: DS_DataURI): Promise<UR_ManifestObj>;
    abstract readDatasetObj(dataURI: string): Promise<DS_DatasetObj>;
    abstract writeDatasetObj(dataURI: string, dsObj: DS_DatasetObj): Promise<any>;
    abstract readDataBinObj(dataURI: string, binID: DataBinID): Promise<any>;
    abstract writeDataBinObj(dataURI: string, binID: DataBinID, dataObj: any): Promise<any>;
}
export default DataObjAdapter;
export { DataObjAdapter };
