import { DatasetAdapter } from '../common/abstract-dataset-adapter.ts';
import type { SNA_EvtHandler } from '../_types/sna.ts';
import type { DatasetRes, DataSyncOptions, UR_Item, DS_DatasetObj, DS_DataURI, SearchOptions, OpResult, RecordSet } from '../_types/dataset.ts';
/** initialized a new Dataset with dataURI without performing ops.
 *  dataURI looks like 'sri.org:bucket-1234/sna-app/project-one'
 */
declare function Configure(dataURI: DS_DataURI, opt: DataSyncOptions): Promise<{
    error: string;
    dataURI?: undefined;
    adapter?: undefined;
    handlers?: undefined;
} | {
    dataURI: `${string}:${string}/${string}/${string}:${string}`;
    adapter: DatasetAdapter;
    handlers: string[];
    error?: undefined;
}>;
/** after configure is called, this method connects to the dataset */
declare function Activate(): Promise<DS_DatasetObj | DatasetRes | {
    dataURI: `${string}:${string}/${string}/${string}:${string}`;
    found: string[];
}>;
/** sets the dataset's content from a DS_DatasetObj. must be called after
 *  Configure() */
declare function SetDataFromObject(data: DS_DatasetObj): Promise<OpResult>;
declare function Persist(): Promise<DatasetRes>;
declare function Get(binID: string, ids: string[]): Promise<OpResult>;
declare function Add(binID: string, items: UR_Item[]): Promise<OpResult>;
declare function Update(binID: string, items: UR_Item[]): Promise<OpResult>;
declare function Write(binID: string, items: UR_Item[]): Promise<OpResult>;
declare function Delete(binID: string, items: UR_Item[]): Promise<OpResult>;
declare function DeleteIDs(binID: string, ids: string[]): Promise<OpResult>;
declare function Replace(binID: string, items: UR_Item[]): Promise<OpResult>;
declare function Clear(binID: string): Promise<OpResult>;
/** search for matches in the local dataset, which is assumed to be up-to
 *  date if synched mode is set */
declare function Find(binID: string, crit?: SearchOptions): Promise<UR_Item[]>;
declare function Query(binID: string, query: SearchOptions): Promise<RecordSet>;
/** Subscribe to a bin's events. The binID must be a string */
declare function Subscribe(binID: string, evHdl: SNA_EvtHandler): {
    error: string;
    binID?: undefined;
    eventName?: undefined;
    success?: undefined;
} | {
    binID: string;
    eventName: string;
    success: boolean;
    error?: undefined;
};
/** Unsubscribe from a bin's events. The binID must be a string */
declare function Unsubscribe(binID: string, evHdl: SNA_EvtHandler): {
    error: string;
};
/** SNA_Component defines a component that can participate in the SNA Lifecycle
 *  by "hooking" into it. Once a SNA_Component is registered, it will be called
 *  with the PreConfig() and PreHook() methods to allow the module to
 *  independently manage itself and its data */
declare const _default: import("../common/class-sna-component.ts").default;
export default _default;
export { Configure, // (dataURI, {mode}) => {adapter, handlers}
Activate, SetDataFromObject, Persist, Subscribe, Unsubscribe, Get, Add, Update, Write, Delete, DeleteIDs, Replace, Clear, Find, Query };
