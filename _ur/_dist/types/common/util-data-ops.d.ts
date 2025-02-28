import type { ErrObj, DS_DataURI } from '../_types/dataset.ts';
import type { DatasetOp, DataSyncReq, DatasetReq } from '../_types/dataset.ts';
import type { DataBinType, DataSyncOp } from '../_types/dataset.ts';
import type { UR_ManifestObj } from '../_types/dataset.ts';
type DecodedManifest = UR_ManifestObj & ErrObj;
type DecodedDataURI = {
    orgDomain?: string;
    bucketID?: string;
    instanceID?: string;
    appID?: string;
    tags?: any;
} & ErrObj;
type DecodedSyncReq = {
    binID?: string;
    op?: DataSyncOp;
    accToken?: string;
    ids?: string[];
    items?: any[];
    searchOpt?: any;
} & ErrObj;
type DecodedDatasetReq = {
    dataURI?: DS_DataURI;
    authToken?: string;
    op?: DatasetOp;
} & ErrObj;
type DecodedSchema = {
    root?: string;
    name?: string;
    version?: string;
    tags?: {
        [tag: string]: any;
    };
} & ErrObj;
/** return a copy of the dataset databin keys */
declare function GetDatasetObjectProps(): DataBinType[];
/** returns true if the given dirname is a valid asset directory name */
declare function IsAssetDirname(dirname: string): boolean;
declare function IsDataSyncOp(op: DataSyncOp): boolean;
declare function IsDatasetOp(op: DatasetOp): boolean;
/** inspect schema for validity */
declare function DecodeSchemaID(schemaID: string): DecodedSchema;
/** decode and validate the manifest object */
declare function DecodeManifest(manifest: UR_ManifestObj): DecodedManifest;
/** reverse lookup of assetDir to contained type, where dirname is
 *  a pluralized version of the type name */
declare function GetBinPropsByDirname(dirname: string): any;
/** decode a dataURI into its components */
declare function DecodeDataURI(dataURI: string): DecodedDataURI;
/** check the values of DataClient config object */
declare function DecodeDataConfig(configObj: any): {
    error: string;
    mode?: undefined;
} | {
    mode: any;
    error?: undefined;
};
/** return true if the dataURI is a valid dataset URI */
declare function IsValidDataURI(dataURI: string): boolean;
declare function IsValidDataConfig(configObj: any): boolean;
/** confirm that parameters are correct for synchronizing data */
declare function DecodeSyncReq(syncReq: DataSyncReq): DecodedSyncReq;
/** confirm that parameters are correct for connecting to a datastore */
declare function DecodeDatasetReq(req: DatasetReq): DecodedDatasetReq;
export { IsAssetDirname, IsValidDataURI, IsValidDataConfig, IsDataSyncOp, IsDatasetOp, DecodeDataURI, DecodeManifest, DecodeSchemaID, DecodeDataConfig, DecodeDatasetReq, DecodeSyncReq, GetDatasetObjectProps, GetBinPropsByDirname };
