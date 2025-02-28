import type { UR_EntID, UR_Item, UR_ItemDict, UR_ItemList } from '../_types/dataset.ts';
/** given an ID, return a new ID that is guaranteed to be a string by converting
 *  numbers to strings */
declare function m_NormEntityID(id: UR_EntID): UR_EntID;
/** API: Normalize a string to detected number or booleans */
declare function NormStringToValue(str: string): string | number | boolean;
/** API: Normalize a single Item, which is DataObj plus _id field. It leverages
 *  m_NormDataObj to normalize the object and detect the _id field which
 *  is roundabout */
declare function NormItem(item: UR_Item, schema?: any): UR_Item;
/** API: Given an array of objects, return a new array of objects that are
 *  guaranteed to have an _id field, or undefined if any object doesn't have
 *  an _id field. The copied objects are also filtered for suspicious
 *  property strings that are HTML or script tags
 *  Returns [ item[], error ] */
declare function NormItemList(items: UR_ItemList, schema?: any): [UR_ItemList, error?: string];
/** API: Given an object of objects, return a new object of objects that are
 *  guaranteed to have an _id field, or undefined if any object doesn't have
 *  an _id field. The copied objects are also filtered for suspicious property
 *  strings that are HTML or script tags.
 *  Returns [ {}, error ] */
declare function NormItemDict(dict: UR_ItemDict, schema?: any): [UR_ItemDict, error?: string];
/** API: Given an array of IDs, return a new array of ids that are guaranteed
 *  to be strings, or undefined if any id is not a string */
declare function NormIDs(ids: string[] | number[]): UR_EntID[];
/** API: make a deep clone of an array by copying arrays and object by value
 */
declare function DeepCloneArray(arr: any[]): any[];
/** API: make a deep clone of an object by copying arrays and object by value
 */
declare function DeepCloneObject(obj: any): any;
/** API: make a shallow clone of an object by copying arrays and object by value
 */
declare function DeepClone(obj: any): any;
export { m_NormEntityID as NormEntID, // normalize an ID
NormItem, // normalize a single object for serialized storage
NormItemList, // normalize multiple objects for storage
NormItemDict, // normalize dictionary of multiple objects for storage
NormIDs, //  should be strings
NormStringToValue, // convert string to number or boolean
DeepClone, DeepCloneObject, DeepCloneArray };
