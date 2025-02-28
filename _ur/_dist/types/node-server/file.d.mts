type HashInfo = {
    filepath: string;
    filename: string;
    basename: string;
    ext: string;
    hash: string;
};
/** return an absolute path string from root-relative path */
declare const u_path: (p?: string) => string;
/** remove ROOT prefix to return shortname */
declare const u_short: (p: any) => any;
/** Scan for parent directory that contains a file that uniquely appears in it
 *  Optionally pass any directory below the root of the project */
declare function FindParentDir(rootFile: string, startDir?: string): string;
/** Scan for parent directory that contains a file that uniquely appears in the
 *  root directory of the project.  To work, pass any directory below the
 *  root of the project. By default, it searches for the .nvmrc file that's
 *  always in an URSYS repo. */
declare function DetectedRootDir(rootFile?: string): string;
/** when run from an addon directory, return the path to the addon directory
 *  and the detected addon name */
declare function DetectedAddonDir(aoName?: string): string[];
/** return all paths defined by the root detection */
declare function GetRootDirs(): {
    ROOT: string;
    DIR_PUBLIC: string;
    DIR_UR: string;
    DIR_UR_OUT: string;
    DIR_BDL_BROWSER: string;
    DIR_BDL_NODE: string;
    DIR_UR_ADDS: string;
    DIR_UR_ADDS_OUT: string;
};
declare function FileExists(filepath: any): boolean;
declare function DirExists(dirpath: any): boolean;
declare function IsDir(dirpath: any): boolean;
declare function IsFile(filepath: any): boolean;
declare function EnsureDirChecked(dirpath: any): boolean;
declare function EnsureDir(dirpath: any): boolean;
declare function RemoveDir(dirpath: any): boolean;
/** make a string relative to the project root, returning a normalized path */
declare function AbsLocalPath(subdir: string): string;
/** make a string that removes the DetectedRootDir() portion of the path */
declare function RelLocalPath(subdir: string): string;
/** return array of filenames as short names */
declare function GetDirContent(dirpath: any, opt?: {
    absolute: boolean;
}): {
    files: any[];
    dirs: any[];
};
/** given a dirpath, return all files. optional match extension */
declare function Files(dirpath: any, opt?: {
    absolute: boolean;
}): string[];
declare function Subdirs(dirpath: any, opt?: {
    absolute: boolean;
}): string[];
declare function ReadFile(filepath: any, opt?: any): any;
declare function AsyncReadFile(filepath: any, opt?: any): Promise<any>;
declare function UnsafeWriteFile(filepath: any, rawdata: any): Promise<void>;
/** synchronous JSON write */
declare function WriteJSON(filepath: any, obj?: {}): void;
/** syncronous JSON read */
declare function ReadJSON(filepath: any): any;
declare function AsyncReadJSON(filepath: any): Promise<any>;
declare function AsyncWriteJSON(filepath: any, obj: any): Promise<void>;
declare function UnlinkFile(filepath: any): Promise<boolean>;
/** given a filepath, return the hash of the file */
declare function AsyncFileHash(filepath: any, algo?: string): Promise<string>;
/** given a list of filepaths, return an array of hash info objects */
declare function FilesHashInfo(filepaths: any, algo?: string): Promise<HashInfo[]>;
/** given a string '//a//a//aaa/', returns 'a/a/aaa' */
declare function TrimPath(p?: string): string;
declare function GetPathInfo(path: string): {
    isDir: boolean;
    isFile: boolean;
    filename: string;
    dirname: string;
    basename: string;
    ext: string;
};
export { u_path, u_short, FileExists, DirExists, IsDir, IsFile, EnsureDir, EnsureDirChecked, RemoveDir, GetRootDirs, DetectedRootDir, DetectedAddonDir, FindParentDir, AbsLocalPath, RelLocalPath, TrimPath, GetPathInfo, AsyncFileHash, GetDirContent, Files, FilesHashInfo, Subdirs, ReadFile, AsyncReadFile, UnsafeWriteFile, ReadJSON, WriteJSON, AsyncReadJSON, AsyncWriteJSON, UnlinkFile };
