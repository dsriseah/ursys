declare function BadString(str: string): boolean;
declare function ThrowBadString(str: string): void;
/** returns a number if the input is a number or a string that can be parsed
 *  to a number. Otherwise, it throws an error. */
declare function AssertNumber(num: number | string): number;
declare function AssertString(str: string): string;
/** a keyword is a string with no spaces and is alphanumeric. */
declare function AssertKeyword(str: string): string;
declare function AssertAlphanumeric(str: string): string;
/** Format a multi-line string to make parsing operations easier. It
 *  conforms newlines, replaces tabs. It removes whitespace around
 *  delimiters and collapses quoted whitespace to a single space.
 *  Finally, it ensures that there is a trailing newline.
 */
declare function PreprocessDataText(str: string): string;
declare function IsAlphaNumeric(str: string): boolean;
declare function HasNoSpaces(str: string): boolean;
declare function HasSingleDash(str: string): boolean;
declare function IsSnakeCase(str: string): boolean;
declare function IsCamelCase(str: string): boolean;
declare function IsPascalCase(str: string): boolean;
declare function IsKebabCase(str: string): boolean;
declare function IsUpperSnakeCase(str: string): boolean;
/** web components must be lower case with one and only one dash */
declare function IsValidCustomTag(tagName: string): boolean;
/** alphanumeric, no spaces, no leading numbers, and no special characters,
 *  lowercase */
declare function IsAtomicKeyword(str: string): boolean;
/** convert all non-alphanumeric characters to a space, and replace multiple
 *  spaces with a single space */
declare function ForceAlphanumeric(str: string, delimiter?: string): string;
declare function MakeLowerSnakeCase(str: string): string;
declare function MakeUpperSnakeCase(str: string): string;
declare function MakeKebabCase(str: string): string;
declare function MakePascalCase(str: string): string;
declare function MakeCamelCase(str: string): string;
export { BadString, // 0-length and empty strings also fail
ThrowBadString, // throw error if bad/empty string
IsAlphaNumeric, // alphanumeric with single spaces, trimmed
HasSingleDash, // true if one and only one dash
HasNoSpaces, // true if no spaces
IsSnakeCase, IsCamelCase, IsPascalCase, IsKebabCase, IsUpperSnakeCase, IsValidCustomTag, // check is lower case with one dash
IsAtomicKeyword, // true if alphanumeric with no spaces, lowercase
AssertNumber, // return number|parsed number or throw Error
AssertString, // return string or throw Error
AssertAlphanumeric, // return alphanumeric string or throw Error
AssertKeyword, // return single alphanum word or throw Error
ForceAlphanumeric, // non-alphanumeric chars -> delimiter
MakeLowerSnakeCase, // conformers uses ForceAlphanumeric as base
PreprocessDataText, // normalize text for parsing
MakeUpperSnakeCase, MakeKebabCase, MakePascalCase, MakeCamelCase };
