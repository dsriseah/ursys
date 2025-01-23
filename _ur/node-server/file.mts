/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Base File System Helpers

  Conventions (see 
  directories should end with a slash

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

import FSE from 'fs-extra';
import PATH from 'node:path';
import PROMPT from '../common/util-prompts.ts';
import * as CRYPTO from 'node:crypto';
import * as url from 'url';
import { pipeline } from 'node:stream/promises';

/// TYPE DECLARATIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type HashInfo = {
  filepath: string;
  filename: string;
  basename: string;
  ext: string;
  hash: string;
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PROMPT.makeTerminalOut('FILE', 'TagGreen');
const DBG = false;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let ROOT: string; // root of the project
let DIR_PUBLIC: string; // path to PUBLIC directory for webapp
let DIR_UR: string; // path to _ur directory
let DIR_UR_DIST: string; // path to browser client code
let DIR_BDL_BROWSER: string; // path to node server code
let DIR_BDL_NODE: string; // path to _ur/dist directory for library out
let DIR_UR_ADDS: string; // path to _ur_mod directory
let DIR_UR_ADDS_DIST: string; // path to _ur_mod/_dist directory

/// PATH UTILITIES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** initialize the ROOT and other root-relative paths for use by
 *  u_path and u_short */
function u_init_roots() {
  const fn = 'u_init_roots:';
  ROOT = DetectedRootDir();
  if (!ROOT) throw Error(`${fn} could not find project root`);
  DIR_PUBLIC = u_path('/public');
  DIR_UR = u_path('/_ur');
  DIR_UR_DIST = u_path('/_ur/_dist');
  DIR_BDL_BROWSER = u_path('/_ur/web-client');
  DIR_BDL_NODE = u_path('/_ur/node-server');
  DIR_UR_ADDS = u_path('/_ur_addons');
  DIR_UR_ADDS_DIST = u_path('/_ur_addons/_dist');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return an absolute path string from root-relative path */
const u_path = (p = '') => {
  if (ROOT === undefined) u_init_roots();
  if (p.length === 0) return ROOT;
  p = PATH.normalize(PATH.join(ROOT, p));
  if (p.endsWith('/')) p = p.slice(0, -1);
  return p; // return normalized path
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** remove ROOT prefix to return shortname */
const u_short = p => {
  if (ROOT === undefined) u_init_roots();
  if (p.startsWith(ROOT)) return p.slice(ROOT.length + 1); // +1 for the slash
  return p; // return path as is if not in ROOT
};

/// DETECTION METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Scan for parent directory that contains a file that uniquely appears in it
 *  Optionally pass any directory below the root of the project */
function FindParentDir(rootFile: string, startDir?: string): string {
  const fileUrl = import.meta.url || `file://${process.cwd()}`;
  let currentDir = startDir || url.fileURLToPath(new URL('.', fileUrl));
  // declare check function
  const u_check_dir = dir => FSE.existsSync(PATH.join(dir, rootFile));
  // walk up the directory tree
  while (currentDir !== PATH.parse(currentDir).root) {
    if (u_check_dir(currentDir)) return currentDir;
    currentDir = PATH.resolve(currentDir, '..');
  }
  return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Scan for parent directory that contains a file that uniquely appears in the
 *  root directory of the project.  To work, pass any directory below the
 *  root of the project. By default, it searches for the .nvmrc file that's
 *  always in an URSYS repo. */
function DetectedRootDir(rootFile: string = '.nvmrc'): string {
  if (typeof ROOT === 'string') return ROOT;
  ROOT = FindParentDir(rootFile);
  return ROOT;
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** when run from an addon directory, return the path to the addon directory
 *  and the detected addon name */
function DetectedAddonDir(aoName?: string): string[] {
  const fn = 'DetectedAddonDir';
  const root = DetectedRootDir();
  if (!root) return undefined;
  const adir = PATH.join(root, '_ur_addons');
  const cwd = process.cwd();
  if (!cwd.includes(adir)) {
    if (aoName === undefined)
      throw Error(`${fn}: autodetect fail; use ${fn}('addon-name') syntax`);
    if (!DirExists(PATH.join(adir, aoName)))
      throw Error(`${fn}: addon '${aoName}' not found in ${adir}`);
    return [aoName, PATH.join(adir, aoName)];
  }
  const addon = cwd.slice(adir.length + 1).split(PATH.sep)[0];
  return [addon, PATH.join(adir, addon)];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return all paths defined by the root detection */
function GetRootDirs() {
  if (ROOT === undefined) u_init_roots();
  return {
    ROOT,
    DIR_PUBLIC,
    DIR_UR,
    DIR_UR_DIST,
    DIR_BDL_BROWSER,
    DIR_BDL_NODE,
    DIR_UR_ADDS,
    DIR_UR_ADDS_DIST
  };
}

/// SYNCHRONOUS FILE AND DIR METHODS //////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function FileExists(filepath): boolean {
  try {
    // accessSync only throws an error; doesn't return a value
    FSE.accessSync(filepath);
    return true;
  } catch (e) {
    return false;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DirExists(dirpath): boolean {
  try {
    const stat = FSE.statSync(dirpath);
    if (stat.isFile()) {
      LOG(`DirExists: ${dirpath} is a file, not a directory`);
      return false;
    }
    return stat.isDirectory();
  } catch {
    return false;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function IsDir(dirpath): boolean {
  try {
    const stat = FSE.statSync(dirpath);
    if (stat.isDirectory()) return true;
    return false;
  } catch (e) {
    LOG(`IsDir: ${dirpath} does not exist`);
    return false;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function IsFile(filepath): boolean {
  try {
    const stat = FSE.statSync(filepath);
    if (stat.isFile()) return true;
    return false;
  } catch (e) {
    LOG(`IsFile: ${filepath} does not exist`);
    return false;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function EnsureDirChecked(dirpath) {
  const sdir = u_short(dirpath);
  if (!DirExists(dirpath)) {
    LOG(`dir '${sdir}' created`);
    return EnsureDir(dirpath);
  }
  LOG(`dir '${sdir}' exist ok`);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function EnsureDir(dirpath) {
  try {
    FSE.ensureDirSync(dirpath);
    return true;
  } catch (err) {
    LOG(`EnsureDir: <${dirpath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function RemoveDir(dirpath): boolean {
  try {
    if (IsDir(dirpath)) {
      FSE.removeSync(dirpath);
      return true;
    }
    const sdir = u_short(dirpath);
    LOG(`RemoveDir: ${sdir} is not a directory`);
    return false;
  } catch (err) {
    const sdir = u_short(dirpath);
    LOG(`EnsureDir: <${sdir}> failed w/ error ${err}`);
    throw new Error(err);
  }
}

/// PATH UTILITIES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** make a string relative to the project root, returning a normalized path */
function AbsLocalPath(subdir: string): string {
  return u_path(subdir);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** make a string that removes the DetectedRootDir() portion of the path */
function RelLocalPath(subdir: string): string {
  const p = u_path(subdir);
  return u_short(p);
}

/// ASYNC DIRECTORY METHODS ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return array of filenames as short names */
function GetDirContent(dirpath, opt = { absolute: true }) {
  if (!DirExists(dirpath)) {
    const err = `${dirpath} is not a directory`;
    console.warn(err);
    return undefined;
  }
  const filenames = FSE.readdirSync(dirpath);
  const files = [];
  const dirs = [];
  for (let name of filenames) {
    let path = PATH.join(dirpath, name);
    const stat = FSE.lstatSync(path);
    if (stat.isDirectory()) dirs.push(name);
    else files.push(name);
  }
  return { files, dirs };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given a dirpath, return all files. optional match extension */
function Files(dirpath, opt = { absolute: false }): string[] {
  const result = GetDirContent(dirpath);
  if (!result) return undefined;
  if (opt.absolute) return result.files.map(p => PATH.join(dirpath, p));
  else return result.files;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Subdirs(dirpath, opt = { absolute: false }): string[] {
  const result = GetDirContent(dirpath, opt);
  if (!result) return undefined;
  return result.dirs;
}

/// FILE READING //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ReadFile(filepath, opt?) {
  opt = opt || {};
  opt.encoding = opt.encoding || 'utf8';
  return FSE.readFileSync(filepath, opt);
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function AsyncReadFile(filepath, opt?) {
  opt = opt || {};
  opt.encoding = opt.encoding || 'utf8';
  try {
    return await FSE.readFile(filepath, opt);
  } catch (err) {
    LOG(`AsyncReadFile: <${filepath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function UnsafeWriteFile(filepath, rawdata) {
  let file = FSE.createWriteStream(filepath, { emitClose: true });
  file.write(rawdata);
  file.on('error', () => LOG('error on write'));
  file.end(); // if this is missing, close event will never fire.
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** synchronous JSON write */
function WriteJSON(filepath, obj = {}) {
  FSE.writeFileSync(filepath, JSON.stringify(obj, null, 2));
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** syncronous JSON read */
function ReadJSON(filepath) {
  let rawdata = FSE.readFileSync(filepath);
  return JSON.parse(rawdata);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function AsyncReadJSON(filepath) {
  const rawdata = (await AsyncReadFile(filepath)) as any;
  return JSON.parse(rawdata);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function AsyncWriteJSON(filepath, obj) {
  if (typeof obj !== 'string') obj = JSON.stringify(obj, null, 2);
  await UnsafeWriteFile(filepath, obj);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function UnlinkFile(filepath) {
  try {
    FSE.unlinkSync(filepath);
    return true;
  } catch (err) {
    if (err.code === 'ENOENT') return false;
    console.log(err.code);
  }
}
/// FILE HASHING //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given a filepath, return the hash of the file */
async function AsyncFileHash(filepath, algo = 'md5') {
  const hash = CRYPTO.createHash(algo);
  const stream = FSE.createReadStream(filepath);
  // wait for buffer to be read
  stream.on('data', data => hash.update(data));
  await new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });
  return hash.digest('hex');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given a list of filepaths, return an array of hash info objects */
async function FilesHashInfo(filepaths, algo = 'md5'): Promise<HashInfo[]> {
  const hashInfo = [];
  for (let fp of filepaths) {
    const hash = await AsyncFileHash(fp, algo);
    const { filename, basename, ext } = GetPathInfo(fp);
    hashInfo.push({ filepath: fp, filename, basename, ext, hash });
  }
  return hashInfo;
}

/// EXTRA PATH HELPERS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given a string '//a//a//aaa/', returns 'a/a/aaa' */
function TrimPath(p: string = ''): string {
  p = PATH.join(p); // remove any duped /
  // remove leading and trailing slashes
  if (p.startsWith('/')) p = p.slice(1);
  if (p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

/// DECODER METHODS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetPathInfo(path: string) {
  const bn = PATH.basename(path, PATH.extname(path));
  const en = PATH.extname(path).slice(1); // remove leading .
  const dn = PATH.dirname(path);
  return {
    isDir: en.length === 0,
    isFile: en.length > 0,
    filename: `${bn}.${en}`,
    dirname: dn,
    basename: bn,
    ext: en
  };
}

/// SYNCHRONOUS TESTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function Test() {
  const files = Files(__dirname);
  if (files.length && files.length > 0) LOG('FM.Files: success');
  else LOG('Files: fail');
  LOG(`found ${files.length} files`);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // micro utilities
  u_path,
  u_short,
  // file and directory existence
  FileExists,
  DirExists,
  IsDir,
  IsFile,
  EnsureDir,
  EnsureDirChecked,
  RemoveDir,
  // path detection and normalization
  GetRootDirs,
  DetectedRootDir,
  DetectedAddonDir,
  FindParentDir,
  AbsLocalPath,
  RelLocalPath,
  TrimPath,
  GetPathInfo,
  AsyncFileHash,
  // directory read
  GetDirContent,
  Files,
  FilesHashInfo,
  Subdirs,
  // file read/write
  ReadFile,
  AsyncReadFile,
  UnsafeWriteFile,
  ReadJSON,
  WriteJSON,
  AsyncReadJSON,
  AsyncWriteJSON,
  // delete
  UnlinkFile,
  //
  Test
};
