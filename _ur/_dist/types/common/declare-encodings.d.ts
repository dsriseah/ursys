/** a list of data encodings that can be used to describe data */
declare const ENCODING_TYPES: string[];
/** a list of triggers that can be used to detect changes in a signal */
declare const TRIGGER_LOGIC: string[];
export { ENCODING_TYPES, TRIGGER_LOGIC };
export type DataEncoding = (typeof ENCODING_TYPES)[number];
export type DataTrigger = (typeof TRIGGER_LOGIC)[number];
