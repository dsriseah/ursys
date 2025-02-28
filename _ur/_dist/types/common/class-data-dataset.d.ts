import { ItemList } from './class-data-itemlist.ts';
import { DataBin } from './abstract-data-databin.ts';
import type { DataBinID, DataBinType, IDS_Serialize, UR_ManifestObj, DS_DatasetObj, OpResult, DS_DataURI } from '../_types/dataset.d.ts';
import type { ItemListOptions } from './class-data-itemlist.ts';
type DataAccessTok = string;
type DataAccessTokSet = Set<DataAccessTok>;
/** knows how to manage the different kinds of collections */
declare class Dataset implements IDS_Serialize {
    dataset_name: string;
    manifest: UR_ManifestObj;
    _dataURI: DS_DataURI;
    open_bins: Set<DataBinID>;
    acc_toks: Map<DataBinID, DataAccessTokSet>;
    LISTS: {
        [ref_name: DataBinID]: ItemList;
    };
    constructor(dataURI: DS_DataURI, manifest?: UR_ManifestObj);
    /** private: initialize the dataset */
    _init(): void;
    /** private: mark a bin as open */
    _markBinOpen(binName: DataBinID): void;
    /** private: mark a bin as closed */
    _markBinClosed(binName: DataBinID): void;
    /** return DataObj representation of the dataset */
    _getDataObj(): DS_DatasetObj;
    /** given a dataset object, set the dataset properties */
    _setFromDataObj(dataObj: DS_DatasetObj): OpResult;
    _serializeToJSON(): string;
    _deserializeFromJSON(json: string): void;
    /** API: Retrieve the manifest object for the dataset */
    getManifest(): UR_ManifestObj;
    /** API: Given a bin name, return the bin. Since bin names are unique, this
     *  method will return just one bin. */
    getDataBin(binName: DataBinID, binType?: DataBinType): DataBin;
    /** API: Given a bin name and type, return the bin. */
    getDataBinByType(binName: DataBinID, binType: DataBinType): DataBin;
    /** API: create a new bin by name and type. */
    createDataBin(binName: DataBinID, binType: DataBinType): DataBin;
    /** API: close a bin by name */
    deleteDataBin(binName: DataBinID): void;
    /** API: Given a bin name, return the bin. Since bin names are unique, this
     *  method will return just one bin. */
    openDataBin(binName: DataBinID, binType?: DataBinType): DataBin;
    /** API: close bin */
    closeDataBin(binName: DataBinID): DataBinID;
    /** Given the name of a list, create a new list and return the list
     *  instance */
    createItemList(listName: string, opt?: ItemListOptions): ItemList;
    /** Given the name of a list, clear the list of all items and retain the
     *  same list instance and max ordinal count */
    clearItemList(listName: string): ItemList;
    /** Given the name of a list, return the entire list */
    getItemList(listName: string): ItemList;
    /** Given the name of a folder, create a new folder and return the folder
     *  instance */
    createDocFolder(folderName: string): void;
    clearDocFolder(folderName: string): void;
    getDocFolder(folderName: string): void;
}
export default Dataset;
export { Dataset };
