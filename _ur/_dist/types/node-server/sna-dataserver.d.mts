import { DataBin } from '../common/abstract-data-databin.ts';
import type { OpResult, DataBinID, DataBinType, DS_DataURI } from '../_types/dataset.ts';
type SyncOptions = {
    syncType: 'pull' | 'push' | 'both';
    syncURI: string;
    autoSync: boolean;
};
type BinOptions = SyncOptions & {
    binType: DataBinType;
    autoCreate: boolean;
};
type BinOpRes = OpResult & {
    bin?: DataBin;
    binName?: DataBinID;
};
/** API: Load a dataset from the dataURI, return the data object */
declare function LoadDataset(dataURI: DS_DataURI): Promise<OpResult>;
/** API: */
declare function CloseDataset(dataURI: DS_DataURI): Promise<{
    error: string;
}>;
/** API: given  tell the current dataset to persist (write) to disk */
declare function PersistDataset(dataURI: DS_DataURI): Promise<OpResult>;
/** API: given a bin reference, open the bin and return the DataBin */
declare function OpenBin(binName: DataBinID, options: BinOptions): BinOpRes;
/** API: given an databin, close the bin and return the bin name if successful */
declare function CloseBin(bin: DataBin): BinOpRes;
declare const _default: import("../common/class-sna-component.ts").default;
export default _default;
export { LoadDataset, // pathToDataset => void
CloseDataset, // dataURI => void
PersistDataset, // pathToZip => void
OpenBin, // binName, options => BinOpRes
CloseBin };
