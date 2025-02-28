import type { IDS_DatasetAdapter, DatasetReq, DatasetRes, DataSyncReq, DataSyncRes, DS_DataURI, DS_DatasetObj } from '../_types/dataset.ts';
declare abstract class DatasetAdapter implements IDS_DatasetAdapter {
    /** access token **/
    accToken: string;
    /** select the "current dataset to use" on master server */
    abstract selectDataset(dataURI: DS_DataURI): Promise<DatasetRes>;
    /** return either the current dataset object or the one
     *  specified by dataURI */
    abstract getDataObj(dataURI?: DS_DataURI): Promise<DS_DatasetObj>;
    /** perform a data collection (databin) operation, returning
     *  the status of the operation (but never data) */
    abstract syncData(synReq: DataSyncReq): Promise<DataSyncRes>;
    /** perform a dataset operation, returning the status of the
     *  operation (but never data) */
    abstract execDataset(req: DatasetReq): Promise<DatasetRes>;
    /** catch-all implementation-specific error handler */
    abstract handleError(errData: any): Promise<any>;
}
export default DatasetAdapter;
export { DatasetAdapter };
