/** decode the addon arguments into useful names
 *  context: called from the addon script forked by launcher, so the
 *  arguments are different from the ones used by ValidateAddon()
 */
declare function DecodeAddonArgs(argv: string[]): string[];
/** given an addonName or addonName/@entryName, return an object with
 *  addonName, entryName, and entryFile and reconcile with addon directory
 *  context: called from the urcli launcher script
 */
declare function ValidateAddon(addon: string): {
    err: string;
    error?: undefined;
    addonName?: undefined;
    entryName?: undefined;
    entryFile?: undefined;
    entryFiles?: undefined;
} | {
    error: string;
    err?: undefined;
    addonName?: undefined;
    entryName?: undefined;
    entryFile?: undefined;
    entryFiles?: undefined;
} | {
    addonName: any;
    entryName: any;
    entryFile: any;
    entryFiles: string[];
    err?: undefined;
    error?: undefined;
};
export { DecodeAddonArgs, // given process.argv, return useful names
ValidateAddon };
