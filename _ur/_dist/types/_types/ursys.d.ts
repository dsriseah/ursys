export type DataObj = {
    [key: string]: any;
};
export type ErrObj = {
    error?: string;
    errorCode?: string;
    errorInfo?: string;
};
export type StatusObj = {
    status?: string;
    statusCode?: number;
    statusInfo?: string;
};
export type OpResult = DataObj & ErrObj & StatusObj;
/** identifier strings for types of collections in the URSYS ecosystem */
export type PropName = string;
export type SNA_EvtName = string;
export type SNA_EvtHandler = (evt: SNA_EvtName, param: DataObj) => void;
export type SNA_EvtOn = (evt: string, param: DataObj) => void;
export type SNA_EvtOff = (evt: string, param: DataObj) => void;
export type SNA_EvtOnce = (evt: string, param: DataObj) => void;
/** Identify ownership and schema uniquely across the world */
type SchemaRoot = string;
type SchemaName = string;
type SchemaVersion = `version=${string}`;
type TagString = string;
export type UR_SchemaID = `${SchemaRoot}:${SchemaName}:${SchemaVersion};${TagString}`;
/** Identify a dataset uniquely across the world */
type OrgDomain = string;
type BucketID = string;
type InstanceID = string;
type AppID = string;
export type DS_DataURI = `${OrgDomain}:${BucketID}/${AppID}/${InstanceID}:${TagString}`;
export {};
