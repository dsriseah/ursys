import { DataObjAdapter } from '../common/abstract-dataobj-adapter.ts';
import type { DOA_Options } from '../common/abstract-dataobj-adapter.ts';
import type { DS_DatasetObj, DS_DataURI, DataBinID } from '../_types/dataset.ts';
type ExtOptions = DOA_Options & {
    dataDir: string;
};
declare class SNA_DataObjAdapter extends DataObjAdapter {
    data_dir: string;
    constructor(opt?: ExtOptions);
    /** extended method to set the data directory for this filesystem-based
     *  data object adapter */
    setDataDir(dataDir: string): void;
    /** returns manifest object from the filesystem */
    getManifest(dataURI: DS_DataURI): Promise<{
        error: any;
        manifest?: undefined;
    } | {
        manifest: any;
        error?: undefined;
    }>;
    /** construct a dataset object from the filesystem */
    readDatasetObj(dataURI: DS_DataURI): Promise<DS_DatasetObj | {
        error: any;
    }>;
    /** write dataset object to the filesystem */
    writeDatasetObj(dataURI: DS_DataURI, dsObj: DS_DatasetObj): Promise<{
        error: string;
        errorInfo: string;
        status?: undefined;
    } | {
        status: string;
        error?: undefined;
        errorInfo?: undefined;
    }>;
    /** read databin object from the filesystem */
    readDataBinObj(dataURI: DS_DataURI, binID: DataBinID): Promise<{}>;
    /** write databin object to the filesystem */
    writeDataBinObj(dataURI: DS_DataURI, binID: DataBinID, dataObj: any): Promise<{}>;
}
export default SNA_DataObjAdapter;
export { SNA_DataObjAdapter };
