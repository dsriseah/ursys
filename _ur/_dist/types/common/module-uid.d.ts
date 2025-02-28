type Schema = `${string}:`;
type EntityPrefix = `${string}-`;
type EntityID = `${number}`;
type UniversalID = `${Schema}${EntityPrefix}${EntityID}`;
type ShortUID = `${EntityPrefix}${EntityID}`;
/** Given a string, return the elements of the ID. The schema is optional
 *  and if it isn't present, the schema is an empty string.
 *  The return value is an array of strings: [schema, prefix, id]
 *  If the ID is not in a valid format, an empty array is returned.
 */
declare function DecodeID(uid: string): string[];
/** Create a new Short Universal ID string */
declare function NewID(prefix: string, int?: number): ShortUID;
/** Create a new Full Universal ID string */
declare function NewFullID(schema: string, prefix: string, int?: number): UniversalID;
/** given a valid short ID, return a derivative ID with a different prefix */
declare function PrefixShortID(uid: string, prefix: string): ShortUID;
/** Return true if the ID is in a valid format.
 *  - full form:  [schema]:[entity_code]-[entity_id]
 *  - short form: [entity_code]-[entity_id]`
 *  must be all lowercase
 */
declare function IsValidFormat(uid: string): boolean;
/** Return true if the schema is found in the Schema table. All schemas
 *  are lowercase */
declare function IsValidSchema(schema: string): boolean;
/** Return true if the entitty prefix is found in the Schema table, optionally
 *  with a schema match string. All prefixes are lowercase */
declare function IsValidPrefix(sch_pre: string): boolean;
/** set the default schema that will be returned by DecodeID if this is
 *  desirable for some reason */
declare function SetDefaultSchema(schema: string): void;
/** get the default schema, which is manually set by SetDefaultSchema */
declare function GetDefaultSchema(): string;
export { NewID, // [prefix, id] => id
NewFullID, // [schema, prefix, id] => id
PrefixShortID, // [id, prefix] => id
DecodeID, // id => [schema, prefix, id] or []
IsValidFormat, // id => boolean
IsValidSchema, // schema => boolean
IsValidPrefix, // schema:prefix  => boolean
SetDefaultSchema, // schema => void
GetDefaultSchema };
