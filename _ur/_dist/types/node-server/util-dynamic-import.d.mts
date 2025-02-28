/** API: import all server modules in the provided directory. Ignores files
 *  that are in subdirectories (useful for hiding). */
declare function FindServerModules(absSrcDir: string): Promise<string[]>;
/** API: return all the client modules in the provided directory. */
declare function FindClientEntryFiles(srcDir: string): Promise<string[]>;
/** API: write a temp file that imports client modules that can be used as
 *  the entry point for a web bundler. */
declare function MakeAppImports(srcDir: string): Promise<{
    entryFile: string;
    tsFiles: string[];
}>;
/** API: write a temp file that imports web components matching the file
 *  pattern part-part.ts to make a single import */
declare function MakeWebCustomImports(srcDir: string): Promise<{
    webcFile: string;
    webcFiles: string[];
}>;
export { FindServerModules, // import all server modules in the provided directory
FindClientEntryFiles, // return all the client modules in the provided directory
MakeAppImports, // write a temp file that imports client modules
MakeWebCustomImports };
