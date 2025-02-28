import type { DataObj, ErrObj, OpResult, SNA_EvtName, SNA_EvtHandler, DS_DataURI } from './ursys.ts';
export interface IRecordSet {
    src_items: UR_Item[];
    cur_items: UR_Item[];
    cur_meta: ItemStatsResult;
    page_index: number;
    page_size: number;
    page_count: number;
    pages: UR_Item[][];
    getItems(): UR_Item[];
    getStats(name?: string): ItemStatsResult;
    getSrcItems(): UR_Item[];
    sort(sOpt?: SortOptions): IRecordSet;
    format(fOpt: ItemFormatOptions): IRecordSet;
    analyze(testOpts: ItemStatsOptions): IRecordSet;
    reset(): IRecordSet;
    paginate(pageSize?: number): IRecordSet;
    goPage(index: number): IRecordSet;
    nextPage(): IRecordSet;
    prevPage(): IRecordSet;
    getPage(): UR_Item[];
    getPageIndex(): number;
    getPageCount(): number;
    getPageSize(): number;
    isLastPage(): boolean;
    isFirstPage(): boolean;
}
/** used by databin and dataset classes moving data across the network */
export interface IDS_Serialize {
    _getDataObj(): DS_DatasetObj;
    _setFromDataObj(data: DS_DatasetObj): OpResult;
    _serializeToJSON(): string;
    _deserializeFromJSON(json: string): void;
}
/** required interface for dataAPI (implemented by DataBin abstract class) */
export interface IDS_DataBin {
    add(items: UR_Item[]): {
        added?: UR_Item[];
        error?: string;
    };
    read(ids?: UR_EntID[]): {
        items?: UR_Item[];
        error?: string;
    };
    update(items: UR_Item[]): {
        updated?: UR_Item[];
        error?: string;
    };
    replace(items: UR_Item[]): {
        replaced?: UR_Item[];
        skipped?: UR_Item[];
        error?: string;
    };
    write(items: UR_Item[]): {
        added?: UR_Item[];
        updated?: UR_Item[];
        error?: string;
    };
    deleteIDs(ids: UR_EntID[]): {
        deleted?: UR_Item[];
        error?: string;
    };
    delete(items: UR_Item[]): {
        deleted?: UR_Item[];
        error?: string;
    };
    clear(): void;
    get(ids?: UR_EntID[]): any[];
    on(event: SNA_EvtName, lis: SNA_EvtHandler): void;
    off(event: SNA_EvtName, lis: SNA_EvtHandler): void;
    notify(evt: SNA_EvtName, data: DataObj): void;
    find(criteria?: SearchOptions): UR_Item[];
    query(criteria?: SearchOptions): IRecordSet;
}
/** a UR_Manifest is a description of the dataset contents that can be
 *  requested by name. The actual data is fetched from a ResourceURI */
export type ResourceURI = string;
export type DataBinURIs = {
    [binID: DataBinID]: ResourceURI;
};
export type DS_ContentMeta = {
    author?: string;
    source?: string;
    organization?: string;
    create_time?: string;
    modify_time?: string;
    description?: string;
};
export type UR_ManifestObj = {
    _dataURI?: DS_DataURI;
    _meta?: DS_ContentMeta;
    itemlists?: DataBinURIs;
    itemdicts?: DataBinURIs;
} & ErrObj;
type IntString = `${string}`;
export type UR_EntID = `${string}${IntString}`;
export type UR_EntID_Obj = {
    _id: UR_EntID;
};
export type UR_NewItem = DataObj;
export type UR_Item = UR_EntID_Obj & DataObj;
export type UR_Doc = UR_EntID_Obj & DataObj;
export type DataBinID = string;
export type DataBinType = 'ItemDict' | 'ItemList';
export type UR_ItemList = UR_Item[];
export type UR_ItemDict = {
    [_id: UR_EntID]: UR_Doc;
};
export type DS_DatasetObj = {
    _dataURI?: DS_DataURI;
    ItemLists?: {
        [listname: DataBinID]: ItemListObj;
    };
    ItemDicts?: {
        [dictname: DataBinID]: ItemDictObj;
    };
} & ErrObj;
type ItemListObj = {
    name: DataBinID;
    _prefix: string;
    _ord_digits: number;
    _ord_highest: number;
    items: UR_ItemList;
};
type ItemDictObj = {
    name: DataBinID;
    _prefix: string;
    _ord_digits: number;
    _ord_highest: number;
    items: UR_ItemDict;
};
export type DatasetOp = 'LOAD' | 'UNLOAD' | 'PERSIST' | 'GET_MANIFEST' | 'GET_DATA';
/** sent to dataset source by inquiring clients SYNC:SRV */
export type DatasetReq = {
    dataURI: string;
    authToken?: string;
    op: DatasetOp;
};
/** sent from dataset source to inquiring clients SYNC:CLI */
export type DatasetRes = {
    dataURI?: string;
    accToken?: string;
    data?: DS_DatasetObj;
    status?: string;
    error?: string;
};
/** DataSyncOp is the operations that can be performed on a dataset via
 *  the SYNC:SRV_DATA protocol. See util-data-asset for lookup tables */
export type DataSyncOp = 'CLEAR' | 'GET' | 'ADD' | 'UPDATE' | 'WRITE' | 'DELETE' | 'REPLACE' | 'FIND' | 'QUERY';
/** Mode of operation for a dataset source */
export type DataSyncMode = 'local' | 'local-ro' | 'sync' | 'sync-ro';
/** these flags are derived from value of DataSyncMode */
export type DataSyncFlags = {
    readOnly?: boolean;
    remote: IDS_DatasetAdapter;
    initOnly?: boolean;
};
export type DataSyncOptions = {
    mode: DataSyncMode;
};
/** sent from a dataset source by inquiring clients SYNC:SRV */
export type DataSyncReq = {
    binID: DataBinID;
    op: DataSyncOp;
    accToken?: string;
    items?: UR_Item[];
    ids?: UR_EntID[];
    searchOpt?: SearchOptions;
};
/** sent from a dataset source to a inquiring client SYNC:CLI */
export type DataSyncRes = {
    binID: DataBinID;
    binType: DataBinType;
    op: DataSyncOp;
    seqNum?: number;
    status?: string;
    error?: string;
    skipped?: UR_EntID[];
    items?: UR_Item[];
    added?: UR_Item[];
    updated?: UR_Item[];
    deleted?: UR_Item[];
    replaced?: UR_Item[];
};
/** implement functions needed to write data to a remote datastore
 *  . syncData is the async method that writes data to remote datastore
 *  . handleError is the method that handles the return object from syncData */
export type IDS_DatasetAdapter = {
    accToken: string;
    selectDataset: (dataURI: string) => Promise<DatasetRes>;
    getDataObj: () => Promise<DS_DatasetObj>;
    syncData: (synReq: DataSyncReq) => Promise<DataSyncRes>;
    handleError: (params: any) => Promise<any>;
};
/** implement functions needed to read/write data objects to a datastore */
export interface IDS_DataObjectAdapter {
    accToken: string;
    getManifest(dataURI: DS_DataURI): Promise<UR_ManifestObj>;
    readDatasetObj(dataURI: DS_DataURI): Promise<DS_DatasetObj>;
    readDataBinObj(dataURI: DS_DataURI, binID: DataBinID): Promise<DataObj>;
    writeDatasetObj(dataURI: DS_DataURI, dsObj: DS_DatasetObj): Promise<OpResult>;
    writeDataBinObj(dataURI: DS_DataURI, binID: DataBinID, dsObj: DS_DatasetObj): Promise<OpResult>;
}
export type RangeType = `gt ${string | number}` | `lt ${string | number}` | `gte ${string | number}` | `lte ${string | number}` | `eq ${string | number}` | `ne ${string | number}` | `between ${string | number} ${string | number}`;
export type MatchObj = {
    [key: string]: string | number;
};
export type RangeObj = {
    [key: string]: RangeType;
};
export type SortType = `none` | `sort_asc` | `sort_desc` | `random`;
export type SearchOptions = {
    _lowercaseProps?: boolean;
    _forceNull?: boolean;
    _forceValue?: 'number' | 'string';
    _cloneItems?: boolean;
    preFilter?: (items: UR_Item[]) => UR_Item[];
    missingFields?: string[];
    hasFields?: string[];
    matchCount?: number;
    matchExact?: MatchObj;
    matchRange?: RangeObj;
    postFilter?: (items: UR_Item[]) => UR_Item[];
};
export type SearchFlags = {
    _flcp?: boolean;
    _fval?: 'number' | 'string' | undefined;
    _fnul?: boolean;
    _clone?: boolean;
    b_miss?: string[];
    b_has?: string[];
    count?: number;
    match_exact?: MatchObj;
    match_range?: RangeObj;
    f_pre?: (items: UR_Item[]) => UR_Item[];
    f_post?: (items: UR_Item[]) => UR_Item[];
};
export type SearchProps = {
    found?: string[];
    missing?: string[];
    extra?: string[];
};
export type SearchState = {
    criteria: SearchOptions;
    flags: SearchFlags;
    props: SearchProps;
};
export type SortOptions = {
    _cloneItems?: boolean;
    preFilter?: (items: UR_Item[]) => UR_Item[];
    sortBy?: {
        [field: string]: SortType;
    };
    postFilter?: (items: UR_Item[]) => UR_Item[];
};
export type ItemTransformFunction = (item: UR_Item) => UR_Item;
export type ItemFormatOptions = {
    includeFields?: string[];
    excludeFields?: string[];
    transformBy?: {
        [field: string]: ItemTransformFunction;
    };
};
export type ItemsMapFunction = (items: UR_Item[]) => any;
export type ItemStatsOptions = {
    groupBy?: {
        [test: string]: ItemsMapFunction;
    };
    statTests?: {
        [stat: string]: ItemsMapFunction;
    };
};
export type ItemStatsResult = {
    groups?: {
        [test: string]: UR_Item[];
    };
    [stat: string]: any;
};
export type { DataObj, ErrObj, OpResult, UR_SchemaID } from './ursys.js';
export type { DataBin } from '../common/abstract-data-databin.ts';
export type { Dataset } from '../common/class-data-dataset.ts';
export type { RecordSet } from '../common/class-data-recordset.ts';
export type { DS_DataURI } from './ursys.ts';
