import type { SortOptions, //
UR_Item, ItemFormatOptions, ItemStatsOptions, ItemStatsResult, IRecordSet } from '../_types/dataset.ts';
declare class RecordSet implements IRecordSet {
    src_items: UR_Item[];
    cur_items: UR_Item[];
    cur_meta: ItemStatsResult;
    page_index: number;
    page_size: number;
    page_count: number;
    pages: UR_Item[][];
    constructor(items: UR_Item[]);
    /** return true if the current list is paginated */
    _nop(): string | void;
    /** return the current transformed items */
    getItems(): UR_Item[];
    /** return the current metadata. can provide a name which will
     *  be searched first in groups, then in the top level metadata.
     */
    getStats(name?: string): ItemStatsResult;
    /** return the original source items */
    getSrcItems(): UR_Item[];
    /** sorts the current list. if no sort options are passed,
     *  the list is sorted by the first field in ascending order
     */
    sort(sOpt?: SortOptions): RecordSet;
    /** */
    format(fOpt: ItemFormatOptions): RecordSet;
    /** */
    analyze(testOpts: ItemStatsOptions): RecordSet;
    /** resets the current item set to beginning */
    reset(): RecordSet;
    /** API: main pagination, using 1-based indexing */
    paginate(pageSize?: number): RecordSet;
    /** API: set the current page index */
    goPage(index: number): RecordSet;
    /** API: advance to the next page */
    nextPage(): RecordSet;
    /** API: go back a page */
    prevPage(): RecordSet;
    /** return the page items of the current page */
    getPage(): UR_Item[];
    /** return the current 1-based page index */
    getPageIndex(): number;
    /** return the total number of pages */
    getPageCount(): number;
    /** return the current page size */
    getPageSize(): number;
    /** return true if this is the last page */
    isLastPage(): boolean;
    /** return true if this is the first page */
    isFirstPage(): boolean;
}
export default RecordSet;
export { RecordSet };
