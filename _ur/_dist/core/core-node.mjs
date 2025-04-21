var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// _ur/node-server/sna-node.mts
var sna_node_exports = {};
__export(sna_node_exports, {
  AddMessageHandler: () => AddMessageHandler,
  Build: () => SNA_Build,
  DeleteMessageHandler: () => DeleteMessageHandler,
  GetDanglingHooks: () => GetDanglingHooks,
  GetMachine: () => GetMachine,
  GetProcessInfo: () => SNA_GetProcessInfo,
  GetServerConfig: () => SNA_GetServerConfig,
  HookPhase: () => HookPhase,
  HookServerPhase: () => SNA_HookServerPhase,
  MOD_DataServer: () => sna_dataserver_exports,
  MultiBuild: () => SNA_MultiBuild,
  NewComponent: () => SNA_NewComponent,
  RegisterMessages: () => RegisterMessages,
  RunPhaseGroup: () => RunPhaseGroup,
  RuntimeInfo: () => SNA_RuntimeInfo,
  ServerEndpoint: () => ServerEndpoint,
  SetServerConfig: () => SNA_SetServerConfig,
  Start: () => SNA_Start,
  Status: () => SNA_Status,
  TerminalLog: () => makeTerminalOut,
  UseComponent: () => SNA_UseComponent
});

// _ur/common/util-prompts.ts
var util_prompts_exports = {};
__export(util_prompts_exports, {
  ANSI: () => ANSI_COLORS,
  CSS: () => CSS_COLORS,
  ConsoleStyler: () => makeStyleFormatter,
  TERM: () => TERM_COLORS,
  TerminalLog: () => makeTerminalOut,
  default: () => util_prompts_default
});

// _ur/common/declare-colors.ts
var TERM_COLORS = {
  // TOUT = TerminalLog(str); TOUT('hi')
  Reset: "\x1B[0m",
  Bright: "\x1B[1m",
  Dim: "\x1B[2m",
  Underscore: "\x1B[4m",
  Blink: "\x1B[5m",
  Reverse: "\x1B[7m",
  Hidden: "\x1B[8m",
  //
  Black: "\x1B[30m",
  White: "\x1B[37m",
  Red: "\x1B[31m",
  Orange: "\x1B[38;5;202m",
  Yellow: "\x1B[33m",
  Green: "\x1B[32m",
  Cyan: "\x1B[36m",
  Blue: "\x1B[34m",
  Purple: "\x1B[35m",
  //
  BgBlack: "\x1B[40m",
  BgGray: "\x1B[100m",
  BgWhite: "\x1B[47m",
  BgRed: "\x1B[41m",
  BgOrange: "\x1B[48;5;202m",
  BgYellow: "\x1B[43m",
  BgCyan: "\x1B[46m",
  BgGreen: "\x1B[42m",
  BgBlue: "\x1B[44m",
  BgPurple: "\x1B[45m",
  BgPink: "\x1B[105m",
  // FORMATS
  TagBlack: "\x1B[30;1m",
  TagWhite: "\x1B[37;1m",
  TagRed: "\x1B[41;37m",
  TagOrange: "\x1B[43;37m",
  TagYellow: "\x1B[43;30m",
  TagGreen: "\x1B[42;30m",
  TagCyan: "\x1B[46;37m",
  TagBlue: "\x1B[44;37m",
  TagPurple: "\x1B[45;37m",
  TagPink: "\x1B[105;1m",
  TagGray: "\x1B[100;37m",
  TagNull: "\x1B[2;37m"
};
var CSS_COMMON = "padding:3px 5px;border-radius:2px;";
var CSS_COLORS = {
  Reset: "color:auto;background-color:auto",
  // COLOR FOREGROUND
  Black: "color:black",
  White: "color:white",
  Red: "color:red",
  Orange: "color:orange",
  Yellow: "color:orange",
  Green: "color:green",
  Cyan: "color:cyan",
  Blue: "color:blue",
  Magenta: "color:magenta",
  Pink: "color:pink",
  // COLOR BACKGROUND
  TagRed: `color:#000;background-color:#f66;${CSS_COMMON}`,
  TagOrange: `color:#000;background-color:#fa4;${CSS_COMMON}`,
  TagYellow: `color:#000;background-color:#fd4;${CSS_COMMON}`,
  TagGreen: `color:#000;background-color:#5c8;${CSS_COMMON}`,
  TagCyan: `color:#000;background-color:#2dd;${CSS_COMMON}`,
  TagBlue: `color:#000;background-color:#2bf;${CSS_COMMON}`,
  TagPurple: `color:#000;background-color:#b6f;${CSS_COMMON}`,
  TagPink: `color:#000;background-color:#f9f;${CSS_COMMON}`,
  TagGray: `color:#fff;background-color:#999;${CSS_COMMON}`,
  TagNull: `color:#999;border:1px solid #ddd;${CSS_COMMON}`,
  // COLOR BACKGROUND DARK (BROWSER ONLY)
  TagDkRed: `color:white;background-color:maroon;${CSS_COMMON}`,
  TagDkOrange: `color:white;background-color:burntorange;${CSS_COMMON}`,
  TagDkYellow: `color:white;background-color:brown;${CSS_COMMON}`,
  TagDkGreen: `color:white;background-color:forestgreen;${CSS_COMMON}`,
  TagDkCyan: `color:white;background-color:cerulean;${CSS_COMMON}`,
  TagDkBlue: `color:white;background-color:darkblue;${CSS_COMMON}`,
  TagDkPurple: `color:white;background-color:indigo;${CSS_COMMON}`,
  TagDkPink: `color:white;background-color:fuchsia;${CSS_COMMON}`
};
TERM_COLORS.TagBuild = TERM_COLORS.TagGray;
TERM_COLORS.TagError = TERM_COLORS.TagRed;
TERM_COLORS.TagAlert = TERM_COLORS.TagOrange;
TERM_COLORS.TagTest = TERM_COLORS.TagRed;
TERM_COLORS.TagSystem = TERM_COLORS.TagGray;
TERM_COLORS.TagServer = TERM_COLORS.TagGray;
TERM_COLORS.TagDatabase = TERM_COLORS.TagCyan;
TERM_COLORS.TagNetwork = TERM_COLORS.TagCyan;
TERM_COLORS.TagUR = TERM_COLORS.TagBlue;
TERM_COLORS.TagURNET = TERM_COLORS.TagBlue;
TERM_COLORS.TagURMOD = TERM_COLORS.TagBlue;
TERM_COLORS.TagAppMain = TERM_COLORS.TagGreen;
TERM_COLORS.TagAppModule = TERM_COLORS.TagGreen;
TERM_COLORS.TagAppState = TERM_COLORS.TagGreen;
TERM_COLORS.TagAppCore = TERM_COLORS.TagGreen;
TERM_COLORS.TagDataCore = TERM_COLORS.TagGreen;
TERM_COLORS.TagUI = TERM_COLORS.TagPurple;
TERM_COLORS.TagPhase = TERM_COLORS.TagPink;
TERM_COLORS.TagEvent = TERM_COLORS.TagPink;
TERM_COLORS.TagStream = TERM_COLORS.TagPink;
CSS_COLORS.TagDebug = `color:#fff;background-color:IndianRed;${CSS_COMMON}`;
CSS_COLORS.TagWarning = `color:#fff;background:linear-gradient(
  -45deg,
  rgb(29,161,242),
  rgb(184,107,107),
  rgb(76,158,135)
);${CSS_COMMON}`;
CSS_COLORS.TagTest = CSS_COLORS.TagRed;
CSS_COLORS.TagSystem = CSS_COLORS.TagGray;
CSS_COLORS.TagServer = CSS_COLORS.TagGray;
CSS_COLORS.TagDatabase = CSS_COLORS.TagCyan;
CSS_COLORS.TagNetwork = CSS_COLORS.TagCyan;
CSS_COLORS.TagUR = `color:CornflowerBlue;border:1px solid CornflowerBlue;${CSS_COMMON}`;
CSS_COLORS.TagURNET = `color:#fff;background-color:MediumSlateBlue;${CSS_COMMON}`;
CSS_COLORS.TagURMOD = `color:#fff;background:linear-gradient(
  -45deg,
  CornflowerBlue 0%,
  LightSkyBlue 25%,
  RoyalBlue 100%
);${CSS_COMMON}`;
CSS_COLORS.TagAppMain = CSS_COLORS.TagGreen;
CSS_COLORS.TagAppModule = CSS_COLORS.TagGreen;
CSS_COLORS.TagAppState = `color:#fff;background-color:Navy;${CSS_COMMON}`;
CSS_COLORS.TagUI = CSS_COLORS.TagDkOrange;
CSS_COLORS.TagEvent = CSS_COLORS.TagDkOrange;
CSS_COLORS.TagStream = CSS_COLORS.TagDkOrange;
CSS_COLORS.TagPhase = `color:#fff;background-color:MediumVioletRed;${CSS_COMMON}`;
var ANSI_COLORS = {
  BLU: "\x1B[34;1m",
  YEL: "\x1B[33;1m",
  RED: "\x1B[31m",
  //
  DIM: "\x1B[2m",
  BLD: "\x1B[1m",
  NRM: "\x1B[0m",
  BRI: "\x1B[1m"
};

// _ur/common/util-prompts.ts
var IS_NODE = typeof window === "undefined";
var IS_MOBILE = !IS_NODE && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);
var DEFAULT_PADDING = IS_NODE ? 10 : 8;
var DEFAULT_SPACE = IS_NODE ? " ".padStart(DEFAULT_PADDING, " ") : " ".padStart(DEFAULT_PADDING + 4, " ");
var DEFAULT_COLOR = "TagNull";
var SHOW = true;
var PROMPT_DICT = {
  // URSYS-RELATED MODULES
  UR: [SHOW, "TagRed"],
  // SERVERS
  APPSRV: [SHOW, "Yellow"],
  GEMSRV: [SHOW, "Yellow"],
  // SPECIAL
  "-": [SHOW, "TagNull"]
};
function u_pad(str, padding = DEFAULT_PADDING) {
  let len = str.length;
  const nbsp = String.fromCharCode(160);
  if (IS_NODE) return `${str.padEnd(padding, " ")}`;
  if (padding === 0) return `${str}`;
  if (len >= padding) str = str.substr(0, padding);
  else str = str.padEnd(padding, nbsp);
  return `${str}`;
}
function m_SetPromptColors(match, color = DEFAULT_COLOR) {
  if (typeof match !== "string") throw Error("match prompt must be string");
  match = match.trim();
  if (match === "") throw Error("match prompt cannot be empty");
  let colorTable = IS_NODE ? TERM_COLORS : CSS_COLORS;
  let validColor = false;
  validColor = colorTable[color] !== void 0;
  if (!validColor) colorTable = IS_NODE ? CSS_COLORS : TERM_COLORS;
  validColor = colorTable[color] !== void 0;
  if (!validColor)
    throw Error(`prompt color ${color} is not defined in either table`);
  PROMPT_DICT[match] = [true, color];
  return colorTable;
}
function m_GetEnvColor(prompt, tagColor) {
  const colorTable = m_SetPromptColors(prompt, tagColor);
  const [dbg_mode, defcol] = PROMPT_DICT[prompt.trim()] || [SHOW, DEFAULT_COLOR];
  const ucolor = colorTable[tagColor];
  const dcolor = colorTable[defcol];
  const color = ucolor || dcolor;
  const reset = colorTable.Reset;
  return [dbg_mode, color, reset];
}
function m_MakeColorArray(prompt, colorName) {
  const [dbg, color, reset] = m_GetEnvColor(prompt, colorName);
  if (!(dbg || IS_NODE)) return [];
  return IS_NODE ? [`${color}${u_pad(prompt)}${reset}   `] : [`%c${u_pad(prompt)}%c `, color, reset];
}
function m_MakeColorPromptFunction(prompt, colorName, opt = {}) {
  const textColor = opt.color || "Reset";
  const dim = opt.dim || false;
  const pad = opt.pad || DEFAULT_PADDING;
  return IS_NODE ? (str, ...args) => {
    if (args === void 0) args = "";
    let TAG = TERM_COLORS[colorName];
    let TEXT = TERM_COLORS[textColor];
    let RST = TERM_COLORS.Reset;
    let PR6;
    let SPC;
    if (prompt.startsWith(" ")) {
      PR6 = ` ${prompt.trim()} `;
      SPC = " ";
    } else {
      PR6 = u_pad(prompt, pad);
      SPC = "    ";
    }
    if (dim) TEXT += TERM_COLORS.Dim;
    console.log(`${RST}${TAG}${PR6}${RST}${TEXT}${SPC}${str}`, ...args, RST);
  } : (str, ...args) => {
    if (args === void 0) args = "";
    let TEXT = TERM_COLORS[textColor];
    let RST = CSS_COLORS.Reset;
    let PR6 = u_pad(prompt, pad);
    console.log(`%c${PR6}%c%c ${str}`, RST, TEXT, ...args);
  };
}
function makeStyleFormatter(prompt, tagColor) {
  if (prompt.startsWith("UR") && tagColor === void 0) tagColor = "TagUR";
  let outArray = m_MakeColorArray(prompt, tagColor);
  if (outArray.length === 0) return () => [];
  if (IS_MOBILE) outArray = [`${prompt}:`];
  const f = (str, ...args) => [...outArray, str, ...args];
  f._ = `
${DEFAULT_SPACE}`;
  return f;
}
function makeTerminalOut(prompt, tagColor = DEFAULT_COLOR, pad = DEFAULT_PADDING) {
  const wrap = m_MakeColorPromptFunction(prompt, tagColor, { pad });
  wrap.warn = m_MakeColorPromptFunction(prompt, "TagYellow", {
    color: "Yellow",
    pad
  });
  wrap.error = m_MakeColorPromptFunction(prompt, "TagRed", {
    color: "Red",
    pad
  });
  wrap.fail = m_MakeColorPromptFunction(prompt, "Red", { color: "Red", pad });
  wrap.pass = m_MakeColorPromptFunction(prompt, "Green", {
    color: "Green",
    pad
  });
  wrap.info = m_MakeColorPromptFunction(prompt, "TagGray", { dim: true, pad });
  wrap.DIM = "\x1B[2m";
  wrap.BRI = "\x1B[1m";
  wrap.RST = "\x1B[0m";
  return wrap;
}
var util_prompts_default = {
  TERM: TERM_COLORS,
  CSS: CSS_COLORS,
  ANSI: ANSI_COLORS,
  ConsoleStyler: makeStyleFormatter,
  TerminalLog: makeTerminalOut
};

// _ur/node-server/sna-node-urnet-server.mts
import PATH3 from "node:path";

// _ur/node-server/file.mts
var file_exports = {};
__export(file_exports, {
  AbsLocalPath: () => AbsLocalPath,
  AsyncFileHash: () => AsyncFileHash,
  AsyncReadFile: () => AsyncReadFile,
  AsyncReadJSON: () => AsyncReadJSON,
  AsyncWriteJSON: () => AsyncWriteJSON,
  DetectedAddonDir: () => DetectedAddonDir,
  DetectedRootDir: () => DetectedRootDir,
  DirExists: () => DirExists,
  EnsureDir: () => EnsureDir,
  EnsureDirChecked: () => EnsureDirChecked,
  FileExists: () => FileExists,
  Files: () => Files,
  FilesHashInfo: () => FilesHashInfo,
  FindParentDir: () => FindParentDir,
  GetDirContent: () => GetDirContent,
  GetPathInfo: () => GetPathInfo,
  GetRootDirs: () => GetRootDirs,
  IsDir: () => IsDir,
  IsFile: () => IsFile,
  ReadFile: () => ReadFile,
  ReadJSON: () => ReadJSON,
  RelLocalPath: () => RelLocalPath,
  RemoveDir: () => RemoveDir,
  Subdirs: () => Subdirs,
  TrimPath: () => TrimPath,
  UnlinkFile: () => UnlinkFile,
  UnsafeWriteFile: () => UnsafeWriteFile,
  WriteJSON: () => WriteJSON,
  u_path: () => u_path,
  u_short: () => u_short
});
import * as fse_cjs from "fs-extra";
import PATH from "node:path";
import { createHash } from "node:crypto";
import * as url from "url";

// _ur/node-server/const-esbuild.mts
var ES_TARGET = "es2018";
var ES_OUTDIR = "_out";

// _ur/node-server/file.mts
var FSE = fse_cjs.default;
var { TerminalLog, ANSI } = util_prompts_default;
var LOG = TerminalLog("FILE", "TagGreen");
var { YEL, BLU, NRM } = ANSI;
var ROOT;
var DIR_PUBLIC;
var DIR_UR;
var DIR_UR_OUT;
var DIR_BDL_BROWSER;
var DIR_BDL_NODE;
var DIR_UR_ADDS;
var DIR_UR_ADDS_OUT;
function u_init_roots() {
  const fn2 = "u_init_roots:";
  ROOT = DetectedRootDir();
  if (!ROOT) {
    console.log(`Could not find project root containing ${BLU}.nvmrc${NRM} file.`);
    const str1 = `(1) ${YEL}nvm --version${NRM}`;
    const str2 = `(2) ${YEL}node --version${NRM}`;
    const str3 = `(3) ${YEL}node --version > .nvmrc${NRM}`;
    console.log(`Confirm that ${str1} and ${str2} runs in term shell,`);
    console.log(`then run ${str3} from ${BLU}repo root dir${NRM} to create it`);
    console.log("");
    process.exit(1);
  }
  DIR_PUBLIC = u_path("/public");
  DIR_UR = u_path("/_ur");
  DIR_UR_OUT = u_path(`/_ur/${ES_OUTDIR}`);
  DIR_BDL_BROWSER = u_path("/_ur/web-client");
  DIR_BDL_NODE = u_path("/_ur/node-server");
  DIR_UR_ADDS = u_path("/_ur_addons");
  DIR_UR_ADDS_OUT = u_path(`/_ur_addons/${ES_OUTDIR}`);
}
var u_path = (p = "") => {
  if (ROOT === void 0) u_init_roots();
  if (p.length === 0) return ROOT;
  p = PATH.normalize(PATH.join(ROOT, p));
  if (p.endsWith("/")) p = p.slice(0, -1);
  return p;
};
var u_short = (p) => {
  if (ROOT === void 0) u_init_roots();
  if (p.startsWith(ROOT)) return p.slice(ROOT.length + 1);
  return p;
};
function FindParentDir(rootFile, startDir) {
  const fileUrl = import.meta.url || `file://${process.cwd()}`;
  let currentDir = startDir || url.fileURLToPath(new URL(".", fileUrl));
  const u_check_dir = (dir) => FSE.existsSync(PATH.join(dir, rootFile));
  while (currentDir !== PATH.parse(currentDir).root) {
    if (u_check_dir(currentDir)) return currentDir;
    currentDir = PATH.resolve(currentDir, "..");
  }
  return void 0;
}
function DetectedRootDir(rootFile = ".nvmrc") {
  if (typeof ROOT === "string") return ROOT;
  ROOT = FindParentDir(rootFile);
  return ROOT;
}
function DetectedAddonDir(aoName) {
  const fn2 = "DetectedAddonDir";
  const root = DetectedRootDir();
  if (!root) return void 0;
  const adir = PATH.join(root, "_ur_addons");
  const cwd = process.cwd();
  if (!cwd.includes(adir)) {
    if (aoName === void 0)
      throw Error(`${fn2}: autodetect fail; use ${fn2}('addon-name') syntax`);
    if (!DirExists(PATH.join(adir, aoName)))
      throw Error(`${fn2}: addon '${aoName}' not found in ${adir}`);
    return [aoName, PATH.join(adir, aoName)];
  }
  const addon = cwd.slice(adir.length + 1).split(PATH.sep)[0];
  return [addon, PATH.join(adir, addon)];
}
function GetRootDirs() {
  if (ROOT === void 0) u_init_roots();
  return {
    ROOT,
    DIR_PUBLIC,
    DIR_UR,
    DIR_UR_OUT,
    DIR_BDL_BROWSER,
    DIR_BDL_NODE,
    DIR_UR_ADDS,
    DIR_UR_ADDS_OUT
  };
}
function FileExists(filepath) {
  try {
    FSE.accessSync(filepath);
    return true;
  } catch (e) {
    return false;
  }
}
function DirExists(dirpath) {
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
function IsDir(dirpath) {
  try {
    const stat = FSE.statSync(dirpath);
    if (stat.isDirectory()) return true;
    return false;
  } catch (e) {
    LOG(`IsDir: ${dirpath} does not exist`);
    return false;
  }
}
function IsFile(filepath) {
  try {
    const stat = FSE.statSync(filepath);
    if (stat.isFile()) return true;
    return false;
  } catch (e) {
    LOG(`IsFile: ${filepath} does not exist`);
    return false;
  }
}
function EnsureDirChecked(dirpath) {
  const sdir = u_short(dirpath);
  if (!DirExists(dirpath)) {
    LOG(`dir '${sdir}' created`);
    return EnsureDir(dirpath);
  }
  LOG(`dir '${sdir}' exist ok`);
}
function EnsureDir(dirpath) {
  try {
    FSE.ensureDirSync(dirpath);
    return true;
  } catch (err) {
    LOG(`EnsureDir: <${dirpath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
function RemoveDir(dirpath) {
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
function AbsLocalPath(subdir) {
  return u_path(subdir);
}
function RelLocalPath(subdir) {
  const p = u_path(subdir);
  return u_short(p);
}
function GetDirContent(dirpath, opt = { absolute: true }) {
  if (!DirExists(dirpath)) {
    const err = `${dirpath} is not a directory`;
    console.warn(err);
    return void 0;
  }
  const filenames = FSE.readdirSync(dirpath);
  const files = [];
  const dirs = [];
  for (let name of filenames) {
    let path2 = PATH.join(dirpath, name);
    const stat = FSE.lstatSync(path2);
    if (stat.isDirectory()) dirs.push(name);
    else files.push(name);
  }
  return { files, dirs };
}
function Files(dirpath, opt = { absolute: false }) {
  const result = GetDirContent(dirpath);
  if (!result) return void 0;
  if (opt.absolute) return result.files.map((p) => PATH.join(dirpath, p));
  else return result.files;
}
function Subdirs(dirpath, opt = { absolute: false }) {
  const result = GetDirContent(dirpath, opt);
  if (!result) return void 0;
  return result.dirs;
}
function ReadFile(filepath, opt) {
  opt = opt || {};
  opt.encoding = opt.encoding || "utf8";
  return FSE.readFileSync(filepath, opt);
}
async function AsyncReadFile(filepath, opt) {
  opt = opt || {};
  opt.encoding = opt.encoding || "utf8";
  try {
    return await FSE.readFile(filepath, opt);
  } catch (err) {
    LOG(`AsyncReadFile: <${filepath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
async function UnsafeWriteFile(filepath, rawdata) {
  let file = FSE.createWriteStream(filepath, { emitClose: true });
  file.write(rawdata);
  file.on("error", () => LOG("error on write"));
  file.end();
}
function WriteJSON(filepath, obj = {}) {
  FSE.writeFileSync(filepath, JSON.stringify(obj, null, 2));
}
function ReadJSON(filepath) {
  let rawdata = FSE.readFileSync(filepath);
  return JSON.parse(rawdata);
}
async function AsyncReadJSON(filepath) {
  const rawdata = await AsyncReadFile(filepath);
  return JSON.parse(rawdata);
}
async function AsyncWriteJSON(filepath, obj) {
  if (typeof obj !== "string") obj = JSON.stringify(obj, null, 2);
  await UnsafeWriteFile(filepath, obj);
}
async function UnlinkFile(filepath) {
  try {
    FSE.unlinkSync(filepath);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") return false;
    console.log(err.code);
  }
}
async function AsyncFileHash(filepath, algo = "md5") {
  const hash = createHash(algo);
  const stream = FSE.createReadStream(filepath);
  stream.on("data", (data) => hash.update(data));
  await new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  return hash.digest("hex");
}
async function FilesHashInfo(filepaths, algo = "md5") {
  const hashInfo = [];
  for (let fp of filepaths) {
    const hash = await AsyncFileHash(fp, algo);
    const { filename, basename: basename3, ext } = GetPathInfo(fp);
    hashInfo.push({ filepath: fp, filename, basename: basename3, ext, hash });
  }
  return hashInfo;
}
function TrimPath(p = "") {
  p = PATH.join(p);
  if (p.startsWith("/")) p = p.slice(1);
  if (p.endsWith("/")) p = p.slice(0, -1);
  return p;
}
function GetPathInfo(path2) {
  const bn = PATH.basename(path2, PATH.extname(path2));
  const en = PATH.extname(path2).slice(1);
  const dn = PATH.dirname(path2);
  return {
    isDir: en.length === 0,
    isFile: en.length > 0,
    filename: `${bn}.${en}`,
    dirname: dn,
    basename: bn,
    ext: en
  };
}

// _ur/node-server/appserver.mts
var appserver_exports = {};
__export(appserver_exports, {
  AddMessageHandler: () => AddMessageHandler,
  DeleteMessageHandler: () => DeleteMessageHandler,
  GetAppInstance: () => GetAppInstance,
  ListenHTTP: () => ListenHTTP,
  ListenWSS: () => ListenWSS,
  RegisterMessages: () => RegisterMessages,
  ServerEndpoint: () => ServerEndpoint,
  Start: () => Start,
  Stop: () => Stop,
  StopHTTP: () => StopHTTP,
  StopWSS: () => StopWSS
});
import express from "express";
import serveIndex from "serve-index";
import { WebSocketServer } from "ws";

// _ur/common/util-urnet.ts
var util_urnet_exports = {};
__export(util_urnet_exports, {
  AllocateAddress: () => AllocateAddress,
  DecodeMessage: () => DecodeMessage,
  GetPacketHashString: () => GetPacketHashString,
  IsLocalMessage: () => IsLocalMessage,
  IsNetMessage: () => IsNetMessage,
  IsServerMessage: () => IsServerMessage,
  IsValidAddress: () => IsValidAddress,
  IsValidChannel: () => IsValidChannel,
  IsValidMessage: () => IsValidMessage,
  IsValidType: () => IsValidType,
  NormalizeData: () => NormalizeData,
  NormalizeMessage: () => NormalizeMessage,
  SKIP_SELF_PKT_TYPES: () => SKIP_SELF_PKT_TYPES,
  SkipOriginType: () => SkipOriginType,
  UADDR_DIGITS: () => UADDR_DIGITS,
  UADDR_NONE: () => UADDR_NONE,
  VALID_ADDR_PREFIX: () => VALID_ADDR_PREFIX,
  VALID_MSG_CHANNELS: () => VALID_MSG_CHANNELS,
  VALID_PKT_TYPES: () => VALID_PKT_TYPES,
  isSpecialPktType: () => isSpecialPktType
});
var VALID_MSG_CHANNELS = ["SYNC", "NET", "SRV", "LOCAL", ""];
var VALID_PKT_TYPES = [
  "ping",
  "signal",
  "send",
  "call",
  "_auth",
  // special packet
  "_reg",
  // special packet
  "_decl"
  // special packet
];
var VALID_ADDR_PREFIX = ["???", "UR_", "WSS", "UDS", "MQT", "SRV"];
var SKIP_SELF_PKT_TYPES = ["call", "send"];
var UADDR_DIGITS = 3;
var USED_ADDRS = /* @__PURE__ */ new Set();
var zeroPad = `0`.padStart(UADDR_DIGITS, "0");
var UADDR_NONE = `???${zeroPad}`;
function IsValidType(msg_type) {
  return VALID_PKT_TYPES.includes(msg_type);
}
function SkipOriginType(msg_type) {
  return SKIP_SELF_PKT_TYPES.includes(msg_type);
}
function isSpecialPktType(msg_type) {
  if (!IsValidType(msg_type)) return false;
  return msg_type.startsWith("_");
}
function IsValidChannel(msg_chan) {
  return VALID_MSG_CHANNELS.includes(msg_chan);
}
function IsValidAddress(addr) {
  if (typeof addr !== "string") return false;
  let prelen = 0;
  if (!VALID_ADDR_PREFIX.some((pre) => {
    prelen = pre.length;
    return addr.startsWith(pre);
  }))
    return false;
  const num = parseInt(addr.slice(prelen));
  if (isNaN(num)) return false;
  return true;
}
function IsValidMessage(msg) {
  try {
    return DecodeMessage(msg);
  } catch (err) {
    console.log(err.message);
    console.log(err.stack.split("\n").slice(1).join("\n").trim());
    return void 0;
  }
}
var ADDR_MAX_ID = 0;
function AllocateAddress(opt) {
  const fn2 = "AllocateAddress";
  let addr = opt?.addr;
  let pre = opt?.prefix || "UA";
  if (addr === void 0) {
    let id = ++ADDR_MAX_ID;
    let padId = `${id}`.padStart(UADDR_DIGITS, "0");
    addr = `${pre}${padId}`;
  } else if (USED_ADDRS.has(addr)) {
    throw Error(`${fn2} - address ${addr} already allocated`);
  }
  USED_ADDRS.add(addr);
  return addr;
}
function DecodeMessage(msg) {
  if (typeof msg !== "string") throw Error(`message must be string: ${msg}`);
  if (msg !== msg.toUpperCase()) throw Error(`message must be uppercase: ${msg}`);
  if (msg.endsWith("_")) throw Error(`message can not end with _: ${msg}`);
  const bits = msg.split(":");
  if (bits.length === 0) throw Error(`invalid empty message`);
  if (bits.length > 2) throw Error(`invalid channel:message format ${msg}`);
  let [chan, name] = bits;
  if (bits.length === 1) {
    name = chan;
    chan = "LOCAL";
  }
  if (chan === "") chan = "LOCAL";
  if (!IsValidChannel(chan))
    throw Error(`prefix must be ${VALID_MSG_CHANNELS.join(" ").trim()} not ${chan}`);
  return [chan, name];
}
function NormalizeMessage(msg) {
  let [chan, name] = DecodeMessage(msg);
  if (chan === "LOCAL") chan = "";
  return `${chan}:${name}`;
}
function NormalizeData(data) {
  if (!Array.isArray(data)) return data;
  if (data.length === 0) return void 0;
  for (let i = 0; i < data.length; i++) if (data[i] === void 0) data[i] = {};
  if (data.length == 1) return data[0];
  return data;
}
function IsLocalMessage(msg) {
  const [chan] = DecodeMessage(msg);
  return chan === "LOCAL";
}
function IsNetMessage(msg) {
  const [chan] = DecodeMessage(msg);
  return chan === "NET" || chan === "SRV" || chan === "SYNC";
}
function IsServerMessage(msg) {
  const [chan] = DecodeMessage(msg);
  return chan === "SRV" || chan === "SYNC";
}
function GetPacketHashString(pkt) {
  return `${pkt.src_addr}:${pkt.id}`;
}

// _ur/common/class-urnet-packet.ts
var PR = typeof process !== "undefined" ? "Packet".padEnd(13) : "Packet:";
var LOG2 = console.log.bind(console);
var NetPacket = class {
  id;
  // network-wide unique id for this packet
  msg_type;
  // ping, signal, send, call
  msg;
  // name of the URNET message
  data;
  // payload of the URNET message
  auth;
  // authentication token
  src_addr;
  // URNET address of the sender
  hop_seq;
  // URNET addresses that have seen this packet
  hop_log;
  // log of debug messages by hop
  hop_dir;
  // direction of the packet 'req' or 'res'
  hop_rsvp;
  // whether the packet is a response to a request
  err;
  // returned error message
  constructor(msg, data) {
    this.id = void 0;
    this.src_addr = void 0;
    this.hop_rsvp = false;
    this.hop_seq = [];
    this.hop_log = [];
    this.auth = void 0;
    this.err = void 0;
    if (data !== void 0) this.data = data;
    if (typeof msg === "string") {
      if (!IsValidMessage(msg)) throw Error(`invalid msg format: ${msg}`);
      this.msg = msg;
    }
  }
  /** after creating a new packet, use setMeta() to assign id and envelope
   *  meta used for routing and return packets
   */
  setMeta(msg_type, opt) {
    if (!IsValidType(msg_type)) throw Error(`invalid msg_type: ${msg_type}`);
    this.msg_type = msg_type;
    this.hop_dir = opt?.dir || "req";
    this.hop_rsvp = opt?.rsvp || false;
  }
  /** add hop to the hop sequence */
  addHop(hop) {
    if (!IsValidAddress(hop)) throw Error(`invalid hop: ${hop}`);
    this.hop_seq.push(hop);
  }
  /** utility setters w/ checks - - - - - - - - - - - - - - - - - - - - - - **/
  /** manually set the source address, with check */
  setSrcAddr(s_addr) {
    if (!IsValidAddress(s_addr)) throw Error(`invalid src_addr: ${s_addr}`);
    if (this.hop_seq.length > 0 && this.hop_seq[0] !== s_addr)
      throw Error(`src_addr ${s_addr} != ${this.hop_seq[0]}`);
    this.src_addr = s_addr;
    return this;
  }
  /** manually set direction */
  setDir(dir) {
    if (dir !== "req" && dir !== "res") throw Error(`invalid dir: ${dir}`);
    this.hop_dir = dir;
    return this;
  }
  /** set the authorization token */
  setAuth(auth) {
    if (typeof auth !== "string") {
      LOG2("setAuth: invalid auth", auth);
      throw Error(`invalid auth: ${auth}`);
    }
    this.auth = auth;
    return this;
  }
  /** set message and data */
  setMsgData(msg, data) {
    this.setMsg(msg);
    this.setData(data);
    return this;
  }
  /** set message */
  setMsg(msg) {
    this.msg = msg;
    return this;
  }
  /** set data */
  setData(data) {
    this.data = data;
    return this;
  }
  /** merge data */
  mergeData(data) {
    this.data = { ...this.data, ...data };
    return this;
  }
  /** packet reconstruction - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** make a packet from existing JSON */
  setFromJSON(json) {
    if (typeof json !== "string")
      throw Error(`invalid json: ${json}, is ${typeof json}`);
    return this.deserialize(json);
  }
  /** make a packet from existing object */
  setFromObject(pktObj) {
    const fn2 = "setFromObject";
    if (typeof pktObj !== "object")
      throw Error(`invalid pktObj: ${pktObj}, is ${typeof pktObj}`);
    this.id = pktObj.id;
    this.msg = pktObj.msg;
    this.data = pktObj.data;
    this.src_addr = pktObj.src_addr;
    this.hop_log = pktObj.hop_log;
    this.msg_type = pktObj.msg_type;
    this.hop_seq = pktObj.hop_seq;
    this.hop_dir = pktObj.hop_dir;
    this.hop_rsvp = pktObj.hop_rsvp;
    this.err = pktObj.err;
    this.auth = pktObj.auth;
    return this;
  }
  /** packet transport  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** rsvp required? */
  hasRsvp() {
    return this.hop_rsvp;
  }
  lastHop() {
    return this.hop_seq[this.hop_seq.length - 1];
  }
  hasAuth() {
    return this.auth !== void 0;
  }
  /** types that begin with _ are protocol messages that bypass dispatchPacket() */
  isSpecialPkt() {
    return this.msg_type.startsWith("_");
  }
  /** authorization packets are the first packet sent on a client connection to
   *  the message gateway server. They must not have a src_addr aassigned, using
   *  the special UADDR_NONE value instead.
   */
  isBadAuthPkt() {
    let error = "";
    let a = this.msg_type === "_auth";
    let b = this.msg === "SRV:AUTH";
    let c = this.src_addr === UADDR_NONE;
    if (!a) error += `msg_type ${this.msg_type} not _auth. `;
    if (!b) error += `msg ${this.msg} not SRV:AUTH. `;
    if (!c) error += `src_addr ${this.src_addr} not ${UADDR_NONE} `;
    if (error.length > 0) return `isBadAuthPkt: ${error}`;
    return void 0;
  }
  /** registration packets are sent on a client connection after
   *  authentication. They must have a src_addr assigned, which was returned
   *  by the server in the response to the auth packet, and this must match
   *  the server's stored uaddr for the client connection.
   */
  isBadRegPkt(socket) {
    let error = "";
    let a = this.msg_type === "_reg";
    let b = this.msg === "SRV:REG";
    let c = this.src_addr === socket.uaddr;
    if (!a) error += `msg_type ${this.msg_type} not _reg. `;
    if (!b) error += `msg ${this.msg} not SRV:REG. `;
    if (!c) error += `src_addr ${this.src_addr} not ${socket.uaddr}. `;
    if (error.length > 0) return `isBadRegPkt: ${error}`;
    return void 0;
  }
  authenticate(socket) {
    const { msg, src_addr, hop_dir, hop_seq } = this;
    if (!this.isResponse()) LOG2(PR, `would auth ${src_addr} '${msg}'`);
    return true;
  }
  isRequest() {
    return this.hop_dir === "req";
  }
  isResponse() {
    return this.hop_dir === "res";
  }
  /** serialization - - - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  serialize() {
    return JSON.stringify(this);
  }
  deserialize(data) {
    try {
      let obj = JSON.parse(data);
      return this.setFromObject(obj);
    } catch (err) {
      LOG2("NetPacket.deserialize failed", data);
    }
  }
  /** information utilities - - - - - - - - - - - - - - - - - - - - - - - - **/
  isValidType(type) {
    return IsValidType(type);
  }
  isValidMessage(msg) {
    return IsValidMessage(msg) !== void 0;
  }
  decodeMessage(msg) {
    return DecodeMessage(msg);
  }
  /** debugging - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** add error string to packet error */
  error(msg) {
    if (!this.err) this.err = "";
    this.err += msg;
    return msg;
  }
  /** manually add a transport-related message eto the hog log. this is not
   *  the same as hop_seq which is used to track the routing of the packet.
   */
  hopLog(msg) {
    const info = `${this.id} ${this.hop_dir}`;
    this.hop_log.push(`${info}: ${msg}`);
    return msg;
  }
};
var class_urnet_packet_default = NetPacket;

// _ur/common/class-urnet-servicemap.ts
var PR2 = (
  // @ts-ignore - multiplatform definition check
  typeof process !== "undefined" ? "ServiceMap".padEnd(13) : "ServiceMap".padEnd(11)
);
var LOG3 = console.log.bind(console);
var ServiceMap = class {
  service_addr;
  // unique identifier for this map
  handled_svcs;
  // map of services with local handler functions
  proxied_svcs;
  // map of services forwarded to other addresses
  /** constructor: identifier is generally the same as the endpoint UADDR
   *  when used by NetEndpoint e.g. SRV01, SRV02, etc.
   */
  constructor(addr) {
    this.service_addr = addr;
    this.handled_svcs = /* @__PURE__ */ new Map();
    this.proxied_svcs = void 0;
  }
  /** call to make this ServiceMap handle proxies */
  enableProxies() {
    const fn2 = "initializeRemotes:";
    if (this.proxied_svcs !== void 0) throw Error(`${fn2} already initialized`);
    this.proxied_svcs = /* @__PURE__ */ new Map();
  }
  /// UTILITIES FOR SPECIAL SERVICES ///
  /** API: add a protocol handler for a given service name, which
   *  are reserved for special services */
  addProtocolHandler(pmsg, handler) {
    const fn2 = "addProtocolHandler:";
    if (typeof pmsg !== "string") throw Error(`${fn2} invalid pmsg`);
    if (typeof handler !== "function") throw Error(`${fn2} invalid handler`);
    const key = NormalizeMessage(pmsg);
  }
  /// HANDLED SERVICES are LOCAL FUNCTIONS ///
  /** API: declare a service handler for a given service name */
  addServiceHandler(msg, handler) {
    const fn2 = "addServiceHandler:";
    if (typeof handler !== "function") throw Error(`${fn2} invalid handler`);
    const key = NormalizeMessage(msg);
    if (!this.handled_svcs.has(key))
      this.handled_svcs.set(key, /* @__PURE__ */ new Set());
    const handler_set = this.handled_svcs.get(key);
    handler_set.add(handler);
  }
  /** API: remove a previously declared service handler for a given service name */
  deleteServiceHandler(msg, handler) {
    const fn2 = "deleteServiceHandler:";
    if (typeof handler !== "function") throw Error(`${fn2} invalid handler`);
    const key = NormalizeMessage(msg);
    const handler_set = this.handled_svcs.get(key);
    if (!handler_set) throw Error(`${fn2} unexpected empty set '${key}'`);
    handler_set.delete(handler);
  }
  /** return list of local handlers for given service name */
  getServiceHandlers(msg) {
    const fn2 = "getServiceHandlers:";
    if (this.handled_svcs === void 0) return [];
    const key = NormalizeMessage(msg);
    if (!this.handled_svcs.has(key))
      this.handled_svcs.set(key, /* @__PURE__ */ new Set());
    const handler_set = this.handled_svcs.get(key);
    if (!handler_set) throw Error(`${fn2} unexpected empty set '${key}'`);
    const handler_list = Array.from(handler_set);
    return handler_list;
  }
  /** return handler list for this endpoint */
  getServiceNames() {
    const list = [];
    this.handled_svcs.forEach((handler_set, key) => {
      list.push(key);
    });
    return list;
  }
  /// PROXIED SERVICES are handled by REMOTE ADDRESSES ///
  /** get list of services allocated to a uaddr */
  getServicesForAddress(uaddr) {
    const fn2 = "getServicesForAddress:";
    if (typeof uaddr !== "string") throw Error(`${fn2} invalid uaddr`);
    const msg_list = [];
    if (this.proxied_svcs === void 0) return msg_list;
    this.proxied_svcs.forEach((addr_set, msg) => {
      if (addr_set.has(uaddr)) msg_list.push(msg);
    });
    return msg_list;
  }
  /** get list of UADDRs that a service name is forwarded to */
  getServiceAddress(msg) {
    const fn2 = "getServiceAddress:";
    const key = NormalizeMessage(msg);
    if (this.proxied_svcs === void 0) return [];
    if (!this.proxied_svcs.has(key))
      this.proxied_svcs.set(key, /* @__PURE__ */ new Set());
    const addr_set = this.proxied_svcs.get(key);
    const addr_list = Array.from(addr_set);
    return addr_list;
  }
  /** register a service handler for a given service name to passed uaddr */
  registerServiceToAddress(uaddr, msgList) {
    const fn2 = "registerServiceToAddress:";
    if (typeof uaddr !== "string") throw Error(`${fn2} invalid uaddr`);
    msgList.forEach((msg) => {
      const key = NormalizeMessage(msg);
      if (this.proxied_svcs === void 0) {
        LOG3(PR2, `${fn2} auto-enabling proxies`);
        this.enableProxies();
      }
      if (!this.proxied_svcs.has(key))
        this.proxied_svcs.set(key, /* @__PURE__ */ new Set());
      const msg_set = this.proxied_svcs.get(key);
      msg_set.add(uaddr);
    });
  }
  /** unregister service handlers for a given service name to passed uaddr */
  deleteServicesForAddress(uaddr) {
    const fn2 = "deleteServicesForAddress:";
    if (typeof uaddr !== "string") throw Error(`${fn2} invalid uaddr`);
    const removed = [];
    this.proxied_svcs.forEach((msg_set, key) => {
      if (msg_set.has(uaddr)) removed.push(key);
      msg_set.delete(uaddr);
    });
    return removed;
  }
  /** utility: return true if this service map has proxies */
  hasProxies() {
    if (this.proxied_svcs === void 0) return false;
    return this.proxied_svcs.size > 0;
  }
  /** utility: return array of proxied services */
  proxiesList() {
    if (this.proxied_svcs === void 0) return [];
    return [...Object.keys(this.proxied_svcs)];
  }
  /** utility: return true if this service map has handlers */
  hasHandlers() {
    if (this.handled_svcs === void 0) return false;
    return this.handled_svcs.size > 0;
  }
  /** utility: return array of handled service names */
  handlersList() {
    if (this.handled_svcs === void 0) return [];
    return [...Object.keys(this.handled_svcs)];
  }
};
var class_urnet_servicemap_default = ServiceMap;

// _ur/common/class-urnet-transaction.ts
var DBG = false;
var PR3 = (
  // @ts-ignore - multiplatform definition check
  typeof process !== "undefined" ? "Transact".padEnd(13) : "Transact".padEnd(11)
);
var LOG4 = console.log.bind(console);
var TransactionMgr = class {
  // fields
  transaction_log;
  // log of current transactions
  /** create a new transaction manager */
  constructor() {
    this.transaction_log = /* @__PURE__ */ new Map();
  }
  /** add a transaction to the transaction log */
  setTransaction(hash, resolver) {
    const fn2 = "setTransaction:";
    const { resolve, reject, msg, ...meta } = resolver;
    if (typeof hash !== "string") throw Error(`${fn2} invalid hash ${hash}`);
    if (typeof msg !== "string") throw Error(`${fn2} invalid msg ${msg}`);
    if (typeof resolve !== "function") throw Error(`${fn2} invalid resolve`);
    if (typeof reject !== "function") throw Error(`${fn2} invalid reject`);
    if (this.transaction_log.has(hash)) throw Error(`${fn2} duplicate hash ${hash}`);
    if (DBG && meta) LOG4(PR3, `${fn2}: additional metadata`, meta);
    this.transaction_log.set(hash, resolver);
  }
  /** lookup a transaction by hash */
  getTransactionByHash(hash) {
    const fn2 = "getTransactionByHash:";
    if (!this.transaction_log.has(hash)) throw Error(`${fn2} hash not found ${hash}`);
    return this.transaction_log.get(hash);
  }
  /** resolve a transaction by hash */
  resolveTransaction(hash) {
    const fn2 = "resolveTransaction:";
    if (!this.transaction_log.has(hash)) throw Error(`${fn2} hash not found ${hash}`);
    const transaction = this.getTransactionByHash(hash);
    this.transaction_log.delete(hash);
    return transaction;
  }
  /** return a list of pending transactions */
  getPendingTransactions() {
    const fn2 = "getPendingTransactionList:";
    const list = [];
    this.transaction_log.forEach((transaction, hash) => {
      const { resolve, reject, ...meta } = transaction;
      list.push({ hash, ...meta });
    });
    return list;
  }
};
var class_urnet_transaction_default = TransactionMgr;

// _ur/common/class-urnet-endpoint.ts
var DBG2 = false;
var PR4 = (
  // @ts-ignore - multiplatform definition check
  typeof process !== "undefined" ? "EndPoint".padEnd(13) : "EndPoint".padEnd(11)
);
var LOG5 = console.log.bind(console);
var AGE_INTERVAL = 1e3;
var AGE_MAX = 60 * 30;
var NetEndpoint = class {
  svc_map;
  // service handler map (include proxies)
  trx_mgr;
  // hash->resolver
  //
  uaddr;
  // the address for this endpoint
  client_socks;
  // uaddr->I_NetSocket
  //
  cli_counter;
  // counter for generating unique uaddr
  pkt_counter;
  // counter for generating packet ids
  //
  cli_gateway;
  // gateway to server
  cli_sck_timer;
  // timer for checking socket age
  cli_ident;
  // client credentials to request authentication
  cli_auth;
  // client access token for
  cli_reg;
  // client registration status
  constructor() {
    this.uaddr = void 0;
    this.cli_ident = void 0;
    this.cli_auth = void 0;
    this.cli_reg = void 0;
    this.cli_gateway = void 0;
    this.client_socks = void 0;
    this.svc_map = void 0;
    this.trx_mgr = new class_urnet_transaction_default();
    this.pkt_counter = 0;
    this.cli_counter = 0;
    this.cli_sck_timer = null;
  }
  /** SERVER API: initialize this endpoint's client server, providing a hardcoded
   *  server UADDR that is distinct from those used by client pools
   */
  configAsServer(srv_addr) {
    const fn2 = "configAsServer:";
    if (!IsValidAddress(srv_addr)) throw Error(`${fn2} invalid srv_addr ${srv_addr}`);
    if (this.uaddr && this.uaddr !== srv_addr) {
      let err = `${fn2} uaddr ${this.uaddr} already set.`;
      throw Error(err);
    }
    this.uaddr = srv_addr;
    this.svc_map = new class_urnet_servicemap_default(srv_addr);
    if (this.client_socks !== void 0)
      LOG5(PR4, this.uaddr, `already configured`, [...this.client_socks.keys()]);
    this.client_socks = /* @__PURE__ */ new Map();
    if (this.svc_map.hasProxies())
      LOG5(PR4, this.uaddr, `already configured`, this.svc_map.proxiesList());
    this.svc_map.enableProxies();
    this.addMessageHandler("SRV:REFLECT", (data) => {
      data.info = `built-in service`;
      return data;
    });
  }
  /** SERVER API: Server data event handler for incoming data from a client connection.
   *  This is the mirror to _ingestServerPacket() function used by client endpoints.
   *  This is the entry point for incoming data from clients */
  _ingestClientPacket(jsonData, socket) {
    let pkt = this.newPacket().deserialize(jsonData);
    let retPkt;
    retPkt = this._handleAuthRequest(pkt, socket);
    if (retPkt) return retPkt;
    retPkt = this._handleRegRequest(pkt, socket);
    if (retPkt) return retPkt;
    retPkt = this._handleDeclRequest(pkt, socket);
    if (retPkt) return retPkt;
    this.dispatchPacket(pkt);
  }
  /** SERVER API: when a client connects to this endpoint, register it as a socket and
   *  allocate a uaddr for it */
  addClient(socket) {
    const fn2 = "addClient:";
    if (typeof socket !== "object") throw Error(`${fn2} invalid socket`);
    if (socket.uaddr !== void 0) throw Error(`${fn2} socket already added`);
    const new_uaddr = AllocateAddress({ prefix: "UR_" });
    socket.uaddr = new_uaddr;
    socket.age = 0;
    socket.auth = void 0;
    socket.msglist = void 0;
    this.client_socks.set(new_uaddr, socket);
    return new_uaddr;
  }
  /** SERVER API: when a client disconnects from this endpoint, delete its socket and
   *  remove all message forwarding */
  removeClient(uaddr_obj) {
    const fn2 = "removeClient:";
    let uaddr = typeof uaddr_obj === "string" ? uaddr_obj : uaddr_obj.uaddr;
    if (typeof uaddr !== "string") {
      LOG5(PR4, `${fn2} invalid uaddr ${typeof uaddr}`);
      return void 0;
    }
    if (!this.client_socks.has(uaddr)) throw Error(`${fn2} unknown uaddr ${uaddr}`);
    this.deleteMessageForAddress(uaddr);
    this.client_socks.delete(uaddr);
    return uaddr;
  }
  /** SERVER API: given a uaddr, return the socket */
  getClient(uaddr) {
    const fn2 = "getClient:";
    if (this.client_socks === void 0) return void 0;
    return this.client_socks.get(uaddr);
  }
  /** SERVER API: start a timer to check for dead sockets */
  enableClientAging(activate) {
    const fn2 = "enableClientAging:";
    if (activate) {
      if (this.cli_sck_timer) clearInterval(this.cli_sck_timer);
      this.cli_sck_timer = setInterval(() => {
        this.client_socks.forEach((socket, uaddr) => {
          socket.age += AGE_INTERVAL;
          if (socket.age > AGE_MAX) {
            LOG5(PR4, this.uaddr, `socket ${uaddr} expired`);
          }
        });
      }, AGE_INTERVAL);
      return;
    }
    if (this.cli_sck_timer) clearInterval(this.cli_sck_timer);
    this.cli_sck_timer = null;
    LOG5(PR4, this.uaddr, `timer stopped`);
  }
  /** SERVER SUPPORT: handle auth packet if the session.auth is not defined */
  _handleAuthRequest(pkt, socket) {
    if (!socket.authenticated()) {
      pkt.setDir("res");
      pkt.addHop(this.uaddr);
      const error = pkt.isBadAuthPkt();
      if (error) {
        console.error(PR4, error);
        pkt.data = { error };
        return pkt;
      }
      const { identity, secret } = pkt.data;
      if (identity) {
        socket.auth = identity;
        pkt.data = { uaddr: socket.uaddr, cli_auth: "ServerProvidedAuthToken" };
      } else {
        pkt.data = { error: "invalid identity" };
      }
      return pkt;
    }
    return void 0;
  }
  /** SERVER SUPPORT: handle registration packet */
  _handleRegRequest(pkt, socket) {
    if (!pkt.isBadRegPkt(socket)) {
      pkt.setDir("res");
      pkt.addHop(this.uaddr);
      if (pkt.msg !== "SRV:REG") {
        pkt.data = { error: `invalid reg packet ${pkt.msg}` };
        return pkt;
      }
      if (pkt.src_addr !== socket.uaddr) {
        LOG5(PR4, "src address mismatch", pkt.src_addr, "!= sock", socket.uaddr);
        pkt.data = { error: "address mismatch" };
        return pkt;
      }
      const { name, type } = pkt.data;
      if (name) {
        const { uaddr } = socket;
        const config = socket.getConfig();
        pkt.data = {
          ok: true,
          status: `registered name:${name} type:${type}`,
          config
        };
        return pkt;
      }
      pkt.data = { error: "registration failed" };
      return pkt;
    }
    return void 0;
  }
  /** SERVER SUPPORT: handle client dynamic definitions */
  _handleDeclRequest(pkt, socket) {
    if (pkt.msg_type === "_decl") {
      pkt.setDir("res");
      pkt.addHop(this.uaddr);
      if (pkt.msg !== "SRV:DEF") {
        console.log("invalid def packet", pkt.msg);
        pkt.data = { error: `invalid def packet ${pkt.msg}` };
        return pkt;
      }
      pkt.data.status = [];
      const { msg_list } = pkt.data;
      const { uaddr } = socket;
      if (Array.isArray(msg_list)) {
        this.registerRemoteMessagesToAddress(uaddr, msg_list);
        pkt.data.status.push(`registered ${msg_list.length} messages`);
      }
      if (pkt.data.status.length === 0) {
        pkt.data = { error: "no definitions" };
        return pkt;
      }
    }
    return void 0;
  }
  /** client connection handshaking - - - - - - - - - - - - - - - - - - - - **/
  /** CLIENT API: client endpoints need to have an "address" assigned to them,
   *  otherwise the endpoint will not work */
  async connectAsClient(gateway, auth) {
    const fn2 = "connectAsClient:";
    if (gateway && typeof gateway.send === "function") {
      this.cli_gateway = gateway;
    } else throw Error(`${fn2} invalid gateway`);
    if (auth) {
      const pkt = this.newAuthPacket(auth);
      const { msg } = pkt;
      let authData = await this._proxySend(pkt, gateway);
      const { uaddr, cli_auth, error } = authData;
      if (error) {
        LOG5(PR4, `${fn2} error:`, error);
        return false;
      }
      if (!IsValidAddress(uaddr)) throw Error(`${fn2} invalid uaddr ${uaddr}`);
      this.uaddr = uaddr;
      this.svc_map = new class_urnet_servicemap_default(uaddr);
      if (cli_auth === void 0) throw Error(`${fn2} invalid cli_auth`);
      this.cli_auth = cli_auth;
      if (DBG2) LOG5(PR4, "AUTHENTICATED", uaddr, cli_auth);
      this.cli_auth = cli_auth;
      return authData;
    }
    throw Error(`${fn2} arg must be identity`);
  }
  /** CLIENT API: Client data event handler for incoming data from the gateway. This is
   *  the mirror to _ingestClientPacket() function that is used by servers. This
   *  is entry point for incoming data from server
   */
  _ingestServerPacket(jsonData, socket) {
    const fn2 = "_ingestServerPacket:";
    const pkt = this.newPacket().deserialize(jsonData);
    if (this.cli_gateway) {
      if (this._handleAuthResponse(pkt)) return;
      if (this._handleRegResponse(pkt)) return;
      if (this._handleDeclResponse(pkt)) return;
    }
    this.dispatchPacket(pkt);
  }
  /** CLIENT API: register client with client endpoint info */
  async declareClientProperties(info) {
    const fn2 = "declareClientProperties:";
    if (!this.cli_gateway) throw Error(`${fn2} no gateway`);
    const pkt = this.newRegPacket();
    pkt.data = { ...info };
    let regData = await this._proxySend(pkt, this.cli_gateway);
    const { ok, status, error } = regData;
    if (error) {
      LOG5(PR4, `${fn2} error:`, error);
      return regData;
    }
    if (ok) {
      if (DBG2) LOG5(PR4, "REGISTERED", status);
      this.cli_reg = info;
      return regData;
    }
    throw Error(`${fn2} unexpected response`, regData);
  }
  /** CLIENT API: declare client messages */
  async declareClientMessages() {
    const fn2 = "declareClientMessages:";
    const msg_list = this.getNetMessageNames();
    const response = await this._declareClientServices({ msg_list });
    const { msg_list: rmsg_list, error } = response;
    if (error) {
      LOG5(PR4, `${fn2} error:`, error);
    } else if (DBG2) {
      console.groupCollapsed(PR4, `DECLARED ${rmsg_list.length} messages`);
      rmsg_list.forEach((msg, i) => LOG5(`${i + 1}	'${msg}'`));
      console.groupEnd();
    }
    return response;
  }
  /** CLIENT SUPPORT: handle authentication response packet directly rather than through
   *  the netcall interface in dispatchPacket() */
  _handleAuthResponse(pkt) {
    const fn2 = "_handleAuthResponse:";
    if (pkt.msg_type !== "_auth") return false;
    if (pkt.hop_dir !== "res") return false;
    this.resolveRemoteHandler(pkt);
    return true;
  }
  /** CLIENT SUPPORT: handle registration response packet directly rather than through
   *  the netcall interface in dispatchPacket() */
  _handleRegResponse(pkt) {
    const fn2 = "_handleRegResponse:";
    if (pkt.msg_type !== "_reg") return false;
    if (pkt.hop_dir !== "res") return false;
    if (pkt.src_addr !== this.uaddr) throw Error(`${fn2} misaddressed packet???`);
    const { data } = pkt;
    this.resolveRemoteHandler(pkt);
    return true;
  }
  /** CLIENT SUPPORT: handle declaration packet */
  _handleDeclResponse(pkt) {
    const fn2 = "_handleDeclResponse:";
    if (pkt.msg_type !== "_decl") return false;
    if (pkt.hop_dir !== "res") return false;
    if (pkt.src_addr !== this.uaddr) throw Error(`${fn2} misaddressed packet???`);
    this.resolveRemoteHandler(pkt);
    return true;
  }
  /** message declaration and invocation - - - - - - - - - - - - - - - - - -**/
  /** API: declare a message handler for a given message */
  addMessageHandler(msg, handler) {
    this.svc_map.addServiceHandler(msg, handler);
  }
  /** API: remove a previously declared message handler for a given message */
  deleteMessageHandler(msg, handler) {
    this.svc_map.deleteServiceHandler(msg, handler);
  }
  /** API: call local message registered on this endPoint only */
  async call(msg, data) {
    const fn2 = "call:";
    if (!IsLocalMessage(msg)) throw Error(`${fn2} '${msg}' not local (drop prefix)`);
    const handlers = this.getMessageHandlers(msg);
    const promises = [];
    handlers.forEach((handler) => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            resolve(handler({ ...data }));
          } catch (err) {
            reject(err);
          }
        })
      );
    });
    if (promises.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    const resData = await Promise.all(promises);
    return resData;
  }
  /** API: send local message registered on this endPoint only, returning no data */
  async send(msg, data) {
    const fn2 = "send:";
    if (!IsLocalMessage(msg)) throw Error(`${fn2} '${msg}' not local (drop prefix)`);
    const handlers = this.getMessageHandlers(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    handlers.forEach((handler) => {
      handler({ ...data });
    });
    return Promise.resolve(true);
  }
  /** API: signal local message registered on this endPoint only, returning no data.
   */
  signal(msg, data) {
    const fn2 = "signal:";
    if (!IsLocalMessage(msg)) throw Error(`${fn2} '${msg}' not local (drop prefix)`);
    const handlers = this.getMessageHandlers(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    handlers.forEach((handler) => {
      handler({ ...data });
    });
  }
  /** API: ping local message, return with number of handlers */
  async ping(msg) {
    const fn2 = "ping:";
    if (!IsLocalMessage(msg)) throw Error(`${fn2} '${msg}' not local (drop prefix)`);
    const handlers = this.getMessageHandlers(msg);
    return Promise.resolve(handlers.length);
  }
  /** API: call net message, resolves when packet returns from server with data */
  async netCall(msg, data) {
    const fn2 = "netCall:";
    if (!IsNetMessage(msg)) throw Error(`${fn2} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta("call", {
      dir: "req",
      rsvp: true
    });
    let resData = await new Promise((resolve, reject) => {
      const meta = { msg, uaddr: this.uaddr };
      const hash = GetPacketHashString(pkt);
      this.trx_mgr.setTransaction(hash, { resolve, reject, ...meta });
      try {
        this.initialSend(pkt);
      } catch (err) {
        reject(err);
      }
    });
    return resData;
  }
  /** API: send net message, returning promise that will resolve when the server has
   *  received and processed/forwarded the message */
  async netSend(msg, data) {
    const fn2 = "netSend:";
    if (!IsNetMessage(msg)) throw Error(`${fn2} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta("send", {
      dir: "req",
      rsvp: true
    });
    let resData = await new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      const meta = { msg, uaddr: this.uaddr };
      this.trx_mgr.setTransaction(hash, { resolve, reject, ...meta });
      try {
        this.initialSend(pkt);
      } catch (err) {
        reject(err);
      }
    });
    return resData;
  }
  /** API: signal net message, returning void (not promise)
   *  used for the idea of 'raising signals' as opposed to 'sending data'. It
   *  resolves immediately when the signal is sent, and does not check with the
   *  server  */
  netSignal(msg, data) {
    const fn2 = "netSignal:";
    if (!IsNetMessage(msg)) throw Error(`${fn2} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta("signal", {
      dir: "req",
      rsvp: false
    });
    this.initialSend(pkt);
  }
  /** API: returns with a list of uaddr from the server which is the uaddr of the
   *  all clients that have registered for the message */
  async netPing(msg) {
    const fn2 = "netPing:";
    if (!IsNetMessage(msg)) throw Error(`${fn2} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg);
    pkt.setMeta("ping", {
      dir: "req",
      rsvp: true
    });
    let resData = await new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      const meta = { msg, uaddr: this.uaddr };
      this.trx_mgr.setTransaction(hash, { resolve, reject, ...meta });
      try {
        this.initialSend(pkt);
      } catch (err) {
        reject(err);
      }
    });
    return resData;
  }
  /** packet utilities  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** declare client attributes is a generic declaration packet that can contain
   *  any number of attributes that the client wants to declare to the server.
   *  for example, see declareClientMessages() */
  async _declareClientServices(def) {
    const fn2 = "_declareClientServices:";
    if (!this.cli_gateway) throw Error(`${fn2} no gateway`);
    const pkt = this.newDeclPacket();
    pkt.data = { ...def };
    const { msg } = pkt;
    let declared = await this._proxySend(pkt, this.cli_gateway);
    const { error, status } = declared;
    if (error) {
      LOG5(PR4, `${fn2} error:`, error);
      return declared;
    }
    if (status) return declared;
    throw Error(`${fn2} unexpected response`, declared);
  }
  /** shuts down the gateway to server, forcing close
   *  Chrome 125.0.6422.77 doesn't seem to send a close frame on reload
   *  Firefox 126.0 doesn't fire beforeunload
   */
  disconnectAsClient() {
    if (this.cli_gateway === void 0) return;
    if (typeof this.cli_gateway.close === "function") {
      this.cli_gateway.close();
    }
    this.cli_gateway = void 0;
  }
  /** endpoint lookup tables - - - - - - - - - - - - - - - - - - - -  - - - **/
  /** return true if the message is handled anywhere */
  packetHasAnyHandler(pkt) {
    const fn2 = "messageHasHandler:";
    const a = this.getMessageHandlers(pkt.msg).length > 0;
    const b = this.isServer() && this.getMessageAddresses(pkt.msg).length > 0;
    return a || b;
  }
  /** get list of messages allocated to a uaddr */
  getMessagesForAddress(uaddr) {
    return this.svc_map.getServicesForAddress(uaddr);
  }
  /** get list of UADDRs that a message is forwarded to */
  getMessageAddresses(msg) {
    return this.svc_map.getServiceAddress(msg);
  }
  /** return list of local handlers for given message */
  getMessageHandlers(msg) {
    return this.svc_map.getServiceHandlers(msg);
  }
  /** informational routing information - - - - - - - - - - - - - - - - - - **/
  /** return handler list for this endpoint */
  getMessageNames() {
    return this.svc_map.getServiceNames();
  }
  /** return only net messages */
  getNetMessageNames() {
    const list = this.svc_map.getServiceNames();
    return list.filter((msg) => IsNetMessage(msg));
  }
  /** server endpoints manage list of messages in clients  - - - - -  - - - **/
  /** register a message handler for a given message to passed uaddr */
  registerRemoteMessagesToAddress(uaddr, msgList) {
    return this.svc_map.registerServiceToAddress(uaddr, msgList);
  }
  /** unregister message handlers for a given message to passed uaddr */
  deleteMessageForAddress(uaddr) {
    return this.svc_map.deleteServicesForAddress(uaddr);
  }
  /** packet interface  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** Receive a single packet from the wire, and determine what to do with it.
   *  It's assumed that _ingestClientPacket() has already handled
   *  authentication for clients before this method is received.
   *  The packet has several possible processing options!
   *  - packet is response to an outgoing transaction
   *  - packet is a message that we handle
   *  - packet is a message that we forward
   *  - packet is unknown message so we return it with error
   *  If the packet has the rsvp flag set, we need to return
   *  it to the source address in the packet with any data
   */
  async dispatchPacket(pkt) {
    const fn2 = "dispatchPacket:";
    if (pkt.isResponse()) {
      if (pkt.src_addr === this.uaddr) {
        this.resolveRemoteHandler(pkt);
      } else {
        this.returnToSender(pkt);
      }
      return;
    }
    if (!pkt.isRequest()) {
      LOG5(PR4, this.uaddr, fn2, `invalid packet`, pkt);
      return;
    }
    if (pkt.msg_type === "ping") {
      const pingArr = this.getMessageAddresses(pkt.msg);
      const pingHandlers = this.getMessageHandlers(pkt.msg);
      if (pingHandlers.length > 0) pingArr.push(this.uaddr);
      pkt.setData(pingArr);
      this.returnToSender(pkt);
      return;
    }
    if (pkt.msg_type === "signal") {
      await this.awaitHandlers(pkt);
      if (this.isServer()) await this.awaitProxiedHandlers(pkt);
      return;
    }
    let retData;
    let remoteData;
    if (this.packetHasAnyHandler(pkt)) {
      retData = await this.awaitHandlers(pkt);
      if (this.isServer()) {
        remoteData = await this.awaitProxiedHandlers(pkt);
        retData = retData.concat(remoteData);
      }
    } else {
      LOG5(PR4, this.uaddr, fn2, `unknown message ${pkt.msg}`);
      retData = { error: `unknown message '${pkt.msg}'` };
    }
    if (!pkt.hasRsvp()) return;
    if (pkt.msg_type === "call") {
      pkt.data = NormalizeData(retData);
    } else if (pkt.msg_type === "send") {
      pkt.data = true;
    }
    this.returnToSender(pkt);
  }
  /** Start a transaction, which returns promises to await. This method
   *  is a queue that uses Promises to wait for the return, which is
   *  triggered by a returning packet in dispatchPacket(pkt).
   */
  async awaitProxiedHandlers(pkt) {
    const fn2 = "awaitProxiedHandlers:";
    if (pkt.hop_dir !== "req") throw Error(`${fn2} packet is not a request`);
    const { gateway, clients } = this.getRoutingInformation(pkt);
    const promises = [];
    if (gateway) {
      const p = this.awaitRemoteHandler(pkt, gateway);
      if (p) promises.push(p);
    }
    if (Array.isArray(clients)) {
      clients.forEach((sock) => {
        const p = this.awaitRemoteHandler(pkt, sock);
        if (p) promises.push(p);
      });
    }
    let data = await Promise.all(promises);
    return data;
  }
  /** Start a handler call, which might have multiple implementors.
   *  Returns data from all handlers as an array or a single item
   */
  async awaitHandlers(pkt) {
    const fn2 = "awaitHandlers:";
    const { msg } = pkt;
    const handlers = this.getMessageHandlers(msg);
    if (handlers.length === 0) return Promise.resolve([]);
    const promises = [];
    handlers.forEach((handler) => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            resolve(handler({ ...pkt.data }, pkt));
          } catch (err) {
            reject(err);
          }
        })
      );
    });
    let data = await Promise.all(promises);
    return data;
  }
  /** Send a single packet on all available interfaces based on the
   *  message. Use for initial outgoing packets only from the
   *  netCall, netSend, netSignal, and netPing methods.
   */
  initialSend(pkt) {
    const fn2 = "initialSend:";
    if (pkt.src_addr === void 0) throw Error(`${fn2}src_addr undefined`);
    if (this.uaddr === void 0) throw Error(`${fn2} uaddr undefined`);
    if (pkt.hop_seq.length !== 0) throw Error(`${fn2} pkt must have no hops yet`);
    if (pkt.msg_type !== "ping" && pkt.data === void 0)
      throw Error(`${fn2} data undefined`);
    const { gateway, clients } = this.getRoutingInformation(pkt);
    pkt.addHop(this.uaddr);
    if (gateway) {
      if (this.cli_reg === void 0) throw Error(`${fn2} endpoint not registered`);
      gateway.send(pkt);
    }
    if (Array.isArray(clients)) {
      clients.forEach((sock) => sock.send(pkt));
    }
  }
  /** Used to forward a transaction from server to a remote client
   */
  awaitRemoteHandler(pkt, sock) {
    const fn2 = "awaitRemoteHandler:";
    const clone = this.clonePacket(pkt);
    clone.id = this.assignPacketId(clone);
    if (pkt.src_addr === sock.uaddr && SkipOriginType(pkt.msg_type)) return;
    return this._proxySend(clone, sock);
  }
  /** Used to resolve a forwarded transaction received by server from
   *  a remote client
   */
  resolveRemoteHandler(pkt) {
    const fn2 = "resolveRemoteHandler:";
    if (pkt.hop_rsvp !== true) throw Error(`${fn2} packet is not RSVP`);
    if (pkt.hop_dir !== "res") throw Error(`${fn2} packet is not a response`);
    if (pkt.hop_seq.length < 2 && !pkt.isSpecialPkt())
      throw Error(`${fn2} packet has no hops`);
    this._proxyReceive(pkt);
  }
  /** utility method for conducting transactions */
  _proxySend(pkt, sock) {
    const fn2 = "_proxySend:";
    const hash = GetPacketHashString(pkt);
    return new Promise((resolve, reject) => {
      const meta = { msg: pkt.msg, uaddr: pkt.src_addr };
      this.trx_mgr.setTransaction(hash, { resolve, reject, ...meta });
      sock.send(pkt);
    });
  }
  /** utility method for completing transactions */
  _proxyReceive(pkt) {
    const fn2 = "_proxyReceive:";
    const hash = GetPacketHashString(pkt);
    const resolver = this.trx_mgr.resolveTransaction(hash);
    if (!resolver) throw Error(`${fn2} no resolver for hash ${hash}`);
    const { resolve, reject } = resolver;
    const { data } = pkt;
    if (pkt.err) reject(pkt.err);
    else resolve(data);
  }
  /** Return a packet to its source address. If this endpoint is a server,
   *  then it might have the socket stored. Otherwise, if this endpoint is
   *  also a client of another server, pass the back through the gateway.
   *  This is used by server endpoints to return packets to clients.
   */
  returnToSender(pkt) {
    const fn2 = "returnToSender:";
    if (pkt.hop_rsvp !== true) throw Error(`${fn2} packet is not RSVP`);
    if (pkt.hop_seq.length < 1) throw Error(`${fn2} packet has no hops`);
    pkt.setDir("res");
    pkt.addHop(this.uaddr);
    const { gateway, src_addr } = this.getRoutingInformation(pkt);
    if (this.isServer()) {
      const socket = this.getClient(src_addr);
      if (socket) socket.send(pkt);
      return;
    }
    if (gateway) {
      gateway.send(pkt);
      return;
    }
    LOG5(PR4, `${fn2} unroutable packet`, pkt);
  }
  /** return array of sockets to use for sending packet,
   *  based on pkt.msg and pkt.src_addr
   */
  getRoutingInformation(pkt) {
    const fn2 = "getRoutingInformation:";
    const { msg, src_addr } = pkt;
    if (!IsNetMessage(msg)) throw Error(`${fn2} '${msg}' is invalid message`);
    const gateway = this.cli_gateway;
    const self_addr = this.uaddr;
    const msg_list = this.getMessageAddresses(msg);
    const clients = [];
    msg_list.forEach((uaddr) => {
      if (uaddr === this.uaddr) return;
      const socket = this.getClient(uaddr);
      if (socket) clients.push(socket);
    });
    return {
      msg,
      src_addr,
      self_addr,
      gateway,
      clients
    };
  }
  /** packet utility - - - - - - - - - - - - - - - - - - - - - - - - - - - -**/
  assignPacketId(pkt) {
    if (pkt.src_addr === void 0) pkt.src_addr = this.uaddr;
    const count = ++this.pkt_counter;
    pkt.id = `pkt[${pkt.src_addr}:${count}]`;
    return pkt.id;
  }
  /** convert JSON to packet and return */
  packetFromJSON(json) {
    const pkt = new class_urnet_packet_default();
    pkt.setFromJSON(json);
    return pkt;
  }
  /** create a new packet with proper address */
  newPacket(msg, data) {
    const fn2 = "newPacket:";
    const pkt = new class_urnet_packet_default(msg, data);
    pkt.setSrcAddr(this.uaddr || UADDR_NONE);
    if (this.cli_auth) pkt.setAuth(this.cli_auth);
    pkt.id = this.assignPacketId(pkt);
    return pkt;
  }
  /** clone a packet with new id */
  clonePacket(pkt) {
    const clone = this.newPacket(pkt.msg, pkt.data);
    clone.setFromJSON(pkt.serialize());
    clone.src_addr = this.uaddr;
    clone.id = this.assignPacketId(clone);
    return clone;
  }
  /** create an authentication packet, which is the first packet that must be sent
   *  after connecting to the server */
  newAuthPacket(authObj) {
    const pkt = this.newPacket("SRV:AUTH", { ...authObj });
    pkt.setMeta("_auth", { rsvp: true });
    pkt.setSrcAddr(UADDR_NONE);
    this.assignPacketId(pkt);
    return pkt;
  }
  /** create a registration packet */
  newRegPacket() {
    const pkt = this.newPacket("SRV:REG");
    pkt.setMeta("_reg", { rsvp: true });
    return pkt;
  }
  /** create a declaration packet shell */
  newDeclPacket() {
    const pkt = this.newPacket("SRV:DEF");
    pkt.setMeta("_decl", { rsvp: true });
    return pkt;
  }
  /** environment utilities - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** return true if this endpoint is managing connections */
  isServer() {
    const hasRemotes = this.svc_map.hasProxies();
    return this.client_socks !== void 0 && hasRemotes;
  }
  /** socket utilities  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** given a socket, see if it's already registered */
  isNewSocket(socket) {
    const fn2 = "isNewSocket:";
    if (typeof socket !== "object") return false;
    return socket.uaddr === void 0;
  }
  /** client endpoints need to have an authentication token to
   *  access URNET beyond registration
   */
  authorizeSocket(auth) {
    const fn2 = "authorizeSocket:";
    LOG5(PR4, this.uaddr, "would check auth token");
  }
};

// _ur/common/class-urnet-socket.ts
var PR5 = typeof process !== "undefined" ? "Socket".padEnd(13) : "Socket:";
var LOG6 = console.log.bind(console);
var NetSocket = class {
  connector;
  // the original connection object
  sendFunc;
  // the outgoing send function for this socket
  closeFunc;
  // function to disconnect
  onDataFunc;
  // the incoming data function for this socket
  getConfigFunc;
  // function to get configuration
  //
  uaddr;
  // assigned uaddr for this socket-ish object
  auth;
  // whatever authentication is needed for this socket
  msglist;
  // messages queued for this socket
  age;
  // number of seconds since this socket was used
  label;
  // name of the socket-ish object
  constructor(connectObj, io) {
    this.connector = connectObj;
    const { send, onData, close, getConfig } = io;
    this.sendFunc = send.bind(connectObj);
    this.closeFunc = close.bind(connectObj);
    this.onDataFunc = onData.bind(connectObj);
    if (typeof getConfig === "function")
      this.getConfigFunc = getConfig.bind(connectObj);
  }
  /** method for sending packets, using stored implementation-specific function */
  send(pkt) {
    this.sendFunc(pkt);
  }
  /** method for receiving packets, using stored implementation-specific function
   *  that invokes the NetEndpoint's appropriate ingest method
   */
  onData(pkt) {
    this.onDataFunc(pkt);
  }
  /** method for closing the connection, using stored implementation-specific
   * function */
  close() {
    this.closeFunc();
  }
  /** method for retrieving the configuration, if available */
  getConfig() {
    if (typeof this.getConfigFunc === "function") {
      return this.getConfigFunc();
    }
    return { error: "no getConfig function was defined" };
  }
  /* returns the native connector object, varies by implementation */
  getConnector() {
    return this.connector;
  }
  /** TODO: placeholder for authentication method */
  authenticated() {
    let a = this.auth !== void 0;
    return a;
  }
};

// _ur/node-server/appserver.mts
var DBG3 = true;
var { DIM, NRM: NRM2, BLU: BLU2, BRI } = ANSI_COLORS;
var LOG7 = makeTerminalOut("URSERVE", "TagBlue");
var APP;
var SERVER;
var WSS;
var EP;
var SERVER_NAME;
var SERVER_PORT;
var SERVER_HOST;
var SRV_UADDR;
var WSS_PATH;
var INDEX_FILE;
var HTTP_DOCS;
var WSS_NAME;
var CLIENT_CFG;
function SaveHTOptions(opt) {
  const fn2 = "SaveHTOptions:";
  const { server_name, http_port, http_host } = opt;
  let { index_file, http_docs } = opt;
  const valid = http_host && http_port;
  if (!valid) return { error: `${fn2} missing http_host or http_port` };
  if (typeof http_docs !== "string") return { error: `${fn2} missing http_docs` };
  if (!DirExists(http_docs)) return { error: `${fn2} http_docs not found` };
  if (typeof index_file !== "string") throw Error(`${fn2} index_file is invalid`);
  INDEX_FILE = index_file;
  HTTP_DOCS = http_docs;
  SERVER_NAME = server_name || "AppServer";
  WSS_NAME = `${SERVER_NAME}-URNET`;
  SERVER_PORT = http_port || 8080;
  SERVER_HOST = http_host || "localhost";
  return GetHTOptions();
}
function GetHTOptions() {
  return {
    server_name: SERVER_NAME,
    //
    wss_name: WSS_NAME,
    http_port: SERVER_PORT,
    http_host: SERVER_HOST,
    index_file: INDEX_FILE,
    http_docs: HTTP_DOCS
  };
}
function SaveWSOptions(opt) {
  const fn2 = "SaveWSOptions:";
  const { wss_path, srv_addr } = opt;
  if (typeof wss_path !== "string") return { error: `${fn2} wss_path is invalid` };
  WSS_PATH = wss_path || "urnet-ws";
  SRV_UADDR = srv_addr || "SRV01";
  return GetWSOptions();
}
function GetClientConfig() {
  return {
    get_client_cfg: CLIENT_CFG
  };
}
function SaveClientConfig(opt) {
  const fn2 = "SaveClientConfig:";
  const { get_client_cfg } = opt;
  if (typeof get_client_cfg !== "function")
    return { error: `${fn2} get_client_cfg is invalid` };
  CLIENT_CFG = get_client_cfg;
  return GetClientConfig();
}
function GetWSOptions() {
  return {
    srv_addr: SRV_UADDR,
    //
    wss_path: WSS_PATH
    //
  };
}
function CheckConfiguration(opt) {
  const htOpts = SaveHTOptions(opt);
  const wsOpts = SaveWSOptions(opt);
  const hookOpts = SaveClientConfig(opt);
  return { ...htOpts, ...wsOpts, ...hookOpts };
}
function ListenHTTP(opt) {
  const fn2 = "ListenHTTP:";
  const { error, http_port, http_host, http_docs, index_file, server_name } = SaveHTOptions(opt);
  if (typeof server_name === "string") SERVER_NAME = server_name;
  return new Promise((resolve, reject) => {
    if (error) {
      reject(error);
      return;
    }
    if (SERVER) {
      reject("HTTP server already started");
      return;
    }
    if (!DirExists(http_docs)) {
      LOG7.info(`Creating directory: ${http_docs}`);
      EnsureDir(http_docs);
    }
    APP = express();
    if (index_file === void 0) APP.get("/", serveIndex(http_docs));
    else {
      const file = `${http_docs}/${index_file}`;
      APP.get("/", (req, res) => {
        if (!FileExists(file)) {
          let out404 = `<h2>No Index File Found</h2>`;
          out404 += `Make sure that 'index.html' exists in your static assets directory before building.`;
          res.status(404).send(out404);
        } else {
          res.sendFile(file);
        }
      });
    }
    APP.use(express.static(http_docs));
    APP.use((req, res, next) => {
      res.status(404).send("Not Found");
    });
    SERVER = APP.listen(http_port, http_host, () => {
      LOG7.info(
        `${SERVER_NAME} started on ${NRM2}${BRI}${BLU2}http://${http_host}:${http_port}`
      );
      resolve();
    });
  });
}
function ListenWSS(opt) {
  const fn2 = "ListenWSS:";
  let { wss_path, srv_addr } = SaveWSOptions(opt);
  if (EP === void 0) EP = new NetEndpoint();
  EP.configAsServer(srv_addr);
  return new Promise((resolve, reject) => {
    if (SERVER === void 0) {
      reject(`${fn2} ${SERVER_NAME} HTTP not started`);
      return;
    }
    const { port, address } = SERVER.address();
    const config = {
      clientTracking: true
    };
    WSS = new WebSocketServer({
      server: SERVER,
      path: `/${wss_path}`,
      // requires leading slash
      clientTracking: true
    });
    WSS.on("connection", (client_link, request) => {
      if (DBG3) LOG7(`${DIM}${WSS_NAME} connect ${request.socket.remoteAddress}${NRM2}`);
      const send = (pkt) => client_link.send(pkt.serialize());
      const onData = (data) => {
        const returnPkt = EP._ingestClientPacket(data, client_sock);
        if (returnPkt) client_link.send(returnPkt.serialize());
      };
      const close = () => {
        if (DBG3) LOG7(`${DIM}client disconnect${NRM2}`);
        client_link.close();
      };
      const getConfig = CLIENT_CFG;
      const client_sock = new NetSocket(client_link, {
        send,
        onData,
        close,
        getConfig
      });
      if (EP.isNewSocket(client_sock)) {
        EP.addClient(client_sock);
        const uaddr = client_sock.uaddr;
        if (DBG3) LOG7(`${uaddr} client connected`);
      }
      client_link.on("message", onData);
      client_link.on("end", () => {
        const uaddr = EP.removeClient(client_sock);
        if (DBG3) LOG7(`${uaddr} client disconnect (ended)`);
      });
      client_link.on("close", () => {
        const uaddr = EP.removeClient(client_sock);
        if (DBG3) LOG7(`${uaddr} client disconnect (closed)`);
      });
      client_link.on("error", (err) => {
        LOG7.error(`.. socket error: ${err}`);
      });
    });
    const location = `ws://${address}:${port}/${wss_path}`;
    LOG7.info(`${WSS_NAME} listening on ${location}`);
    resolve();
  });
}
function StopHTTP() {
  const fn2 = "StopHTTP:";
  LOG7.info(`Stopping ${SERVER_NAME}`);
  return new Promise((resolve, reject) => {
    if (SERVER === void 0) {
      resolve();
      return;
    }
    SERVER.close(() => {
      SERVER = void 0;
      LOG7.info(`${SERVER_NAME} stopped`);
      resolve();
    });
  });
}
function StopWSS() {
  const fn2 = "StopWSS:";
  LOG7.info(`Stopping ${WSS_NAME}`);
  return new Promise((resolve, reject) => {
    if (WSS === void 0) {
      resolve();
      return;
    }
    WSS.close(() => {
      WSS = void 0;
      LOG7.info(`${WSS_NAME} stopped`);
      resolve();
    });
  });
}
function AddMessageHandler(message, msgHandler) {
  EP.addMessageHandler(message, msgHandler);
}
function DeleteMessageHandler(message, pktHandlr) {
  EP.deleteMessageHandler(message, pktHandlr);
}
async function RegisterMessages() {
  const resdata = await EP.declareClientMessages();
}
function GetAppInstance() {
  return APP;
}
function ServerEndpoint() {
  return EP;
}
async function Start(opt) {
  const fn2 = "Start:";
  try {
    CheckConfiguration(opt);
    await ListenHTTP(opt);
    await ListenWSS(opt);
  } catch (err) {
    LOG7.error(`${fn2} ${err}`);
  }
}
async function Stop() {
  const fn2 = "Stop:";
  try {
    await StopWSS();
    await StopHTTP();
  } catch (err) {
    LOG7.error(`${fn2} ${err}`);
  }
}

// _ur/node-server/appbuilder.mts
var appbuilder_exports = {};
__export(appbuilder_exports, {
  BuildApp: () => BuildApp,
  GetBuildOptions: () => GetBuildOptions,
  MultiBuildApp: () => MultiBuildApp,
  SetBuildOptions: () => SetBuildOptions,
  WatchExtra: () => WatchExtra
});
import { ensureDir } from "fs-extra";
import path from "node:path";
import chokidar from "chokidar";
import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";
var SRC_JS;
var SRC_ASSETS;
var PUBLIC;
var RUNTIME;
var BUNDLE_NAME;
var NOTIFY_CB;
var ENTRY_FILE;
var ENTRY_FILES;
var INDEX_FILE2;
var { DIM: DIM2, NRM: NRM3 } = ANSI_COLORS;
var LOG8 = makeTerminalOut("URBUILD", "TagBlue");
function GetBuildOptions() {
  const fn2 = "m_SavedBuildOptions:";
  const valid = SRC_JS && SRC_ASSETS && PUBLIC;
  if (!valid) return { error: "missing saved build options" };
  return {
    // required values
    source_dir: SRC_JS,
    asset_dir: SRC_ASSETS,
    output_dir: PUBLIC,
    runtime_dir: RUNTIME,
    //
    entry_file: ENTRY_FILE,
    entry_files: ENTRY_FILES,
    index_file: INDEX_FILE2,
    // optional values
    bundle_name: BUNDLE_NAME,
    notify_cb: NOTIFY_CB
  };
}
function SetBuildOptions(opts) {
  const fn2 = "SetBuildOptions:";
  const {
    source_dir,
    asset_dir,
    output_dir,
    runtime_dir,
    entry_file,
    entry_files,
    index_file,
    bundle_name,
    notify_cb
  } = opts;
  const valid = source_dir && asset_dir && output_dir;
  if (!valid) throw Error(`${fn2} source, asset, and output are all required`);
  SRC_JS = source_dir;
  SRC_ASSETS = asset_dir;
  PUBLIC = output_dir;
  RUNTIME = runtime_dir || `${source_dir}/_runtime`;
  ENTRY_FILE = entry_file;
  ENTRY_FILES = entry_files;
  INDEX_FILE2 = index_file;
  BUNDLE_NAME = bundle_name;
  NOTIFY_CB = notify_cb;
  return GetBuildOptions();
}
async function BuildApp(opts) {
  const fn2 = "BuildApp:";
  let { bundle_name, entry_file, notify_cb } = SetBuildOptions(opts);
  if (!bundle_name) bundle_name = path.basename(entry_file);
  ensureDir(PUBLIC);
  const context = await esbuild.context({
    entryPoints: [`${SRC_JS}/${entry_file}`],
    bundle: true,
    loader: { ".js": "jsx" },
    target: ES_TARGET,
    platform: "browser",
    format: "iife",
    sourcemap: true,
    outfile: `${PUBLIC}/js/${bundle_name}`,
    plugins: [
      // @ts-ignore - esbuild-plugin-copy not in types
      copy({
        resolveFrom: "cwd",
        assets: [
          {
            from: [`${SRC_ASSETS}/**/*`],
            to: [`${PUBLIC}/`]
          }
        ],
        watch: true
      }),
      {
        name: "rebuild-notify",
        setup(build) {
          build.onStart(() => {
          });
          build.onEnd(() => {
            if (notify_cb) notify_cb({ changed: "rebuild-notify" });
          });
        }
      }
    ]
  });
  await context.watch();
}
async function MultiBuildApp(opts) {
  const fn2 = "MultiBuildApp:";
  let { entry_files, notify_cb } = SetBuildOptions(opts);
  entry_files = entry_files.map((file) => `${SRC_JS}/${file}`);
  ensureDir(PUBLIC);
  const context = await esbuild.context({
    entryPoints: entry_files,
    bundle: true,
    loader: { ".js": "jsx" },
    target: ES_TARGET,
    platform: "browser",
    format: "esm",
    splitting: true,
    sourcemap: true,
    outdir: `${PUBLIC}/js/`,
    plugins: [
      // @ts-ignore - esbuild-plugin-copy not in types
      copy({
        resolveFrom: "cwd",
        assets: [
          {
            from: [`${SRC_ASSETS}/**/*`],
            to: [`${PUBLIC}/`]
          }
        ],
        watch: true
      }),
      {
        name: "rebuild-notify",
        setup(build) {
          build.onStart(() => {
          });
          build.onEnd(() => {
            if (notify_cb) notify_cb({ changed: "rebuild-notify" });
          });
        }
      }
    ]
  });
  await context.watch();
}
async function WatchExtra(opts) {
  const { watch_dirs, notify_cb } = opts;
  const watcher = chokidar.watch(watch_dirs, {
    persistent: true
  });
  watcher.on("change", async (changed) => {
    const opts2 = GetBuildOptions();
    LOG8(`${DIM2}watch-extra: rebuilding app...${NRM3}`);
    if (opts2.entry_file) await BuildApp(opts2);
    else if (opts2.entry_files) await MultiBuildApp(opts2);
    if (notify_cb) notify_cb({ changed });
    else LOG8(`watch-extra: no notify_cb set`);
  });
}

// _ur/node-server/util-dynamic-import.mts
import FS from "node:fs";
import PATH2 from "node:path";
var LOG9 = makeTerminalOut("DIMPORT", "TagCyan");
var { BLU: BLU3, YEL: YEL2, RED, DIM: DIM3, NRM: NRM4 } = ANSI_COLORS;
async function FindServerModules(absSrcDir) {
  const fn2 = "FindServerModules:";
  if (!FS.existsSync(absSrcDir)) {
    LOG9(`${RED}${fn2} Source directory not found: ${absSrcDir}${NRM4}`);
    return [];
  }
  try {
    const mtsFilter = (file) => file.endsWith(".mts");
    const mtsFiles = (await FS.promises.readdir(absSrcDir)).filter(mtsFilter);
    for (const file of mtsFiles) {
      const absFile = PATH2.join(absSrcDir, file);
      await import(absFile);
    }
    return mtsFiles;
  } catch (error) {
    if (error.message.includes(`find package '_ur`))
      LOG9(`${RED}${fn2} SNA dynamic modules can not use path aliases${NRM4}`);
    throw Error(`${fn2} Error during dynamic import: ${error.message}`);
  }
}
async function FindClientEntryFiles(srcDir) {
  const fn2 = "FindClientEntryFiles:";
  if (!FS.existsSync(srcDir)) {
    LOG9(`${RED}${fn2} Source directory not found: ${srcDir}${NRM4}`);
    return [];
  }
  try {
    const tsFilter = (file) => file.endsWith(".ts") && !file.startsWith("_") && !file.startsWith("auto-");
    const clientFiles = (await FS.promises.readdir(srcDir)).filter(tsFilter);
    return clientFiles;
  } catch (error) {
    throw Error(`${fn2} Error during dynamic import: ${error.message}`);
  }
}
async function MakeAppImports(srcDir) {
  const fn2 = "MakeAppImports:";
  if (!FS.existsSync(srcDir)) {
    LOG9(`${RED}${fn2} Source directory not found: ${srcDir}${NRM4}`);
    return void 0;
  }
  try {
    const clientFiles = await FindClientEntryFiles(srcDir);
    let out = `// sna single import autogenerated file
`;
    if (clientFiles.length === 0) {
      const shortDir = PATH2.basename(srcDir);
      out += `document.body.innerHTML = '<h2>The <i>${shortDir}</i> directory has no source files.</h2>`;
      out += `Add an app.ts file as an entry point. Hide non-entrypoint files in subdirs.';
`;
    }
    for (const file of clientFiles) out += `import './${file}';
`;
    const outFile = "auto-app-imports.ts";
    const outPath = PATH2.join(srcDir, outFile);
    await FS.promises.writeFile(outPath, out);
    return { entryFile: outFile, tsFiles: clientFiles };
  } catch (error) {
    if (error.message.includes(`find package '_ur`))
      LOG9(`${RED}${fn2} SNA dynamic modules can not use path aliases${NRM4}`);
    throw Error(`${fn2} Error during dynamic import: ${error.message}`);
  }
}
async function MakeWebCustomImports(srcDir) {
  const fn2 = "MakeWebCustomImports:";
  if (!FS.existsSync(srcDir)) {
    LOG9(`${RED}${fn2} Source directory not found: ${srcDir}${NRM4}`);
    return void 0;
  }
  try {
    const tsFiles = await FindClientEntryFiles(srcDir);
    const webcFiles = tsFiles.filter((file) => /^[a-z]+-[a-z]+\.ts$/.test(file));
    let out = `// sna webcomponent autogenerated file
`;
    if (webcFiles.length === 0) {
      const shortDir = PATH2.basename(srcDir);
      out += `document.body.innerHTML = '<h2>The <i>${shortDir}</i> directory has no files `;
      out += `that match the two part filename pattern.</h2>`;
      out += `Add an app.ts file as an entry point. Hide non-entrypoint files in subdirs.';
`;
    } else {
      const imports = [];
      const defines = [];
      for (const file of webcFiles) {
        const base = file.slice(0, -3);
        const def = base.replace("-", "_").toUpperCase();
        imports.push(`import ${def} from './${file}';
`);
        defines.push(`  customElements.define('${base}', ${def});
`);
      }
      out += "\n";
      imports.forEach((line) => out += line);
      out += "\n";
      out += `function DeclareComponents() {
`;
      defines.forEach((line) => out += line);
      out += `}

`;
      out += `export { DeclareComponents };
`;
    }
    const id = PATH2.basename(srcDir);
    const outFile = `auto-${id}-imports.ts`;
    const outPath = PATH2.join(srcDir, outFile);
    await FS.promises.writeFile(outPath, out);
    return { webcFile: outFile, webcFiles };
  } catch (error) {
    if (error.message.includes(`find package '_ur`))
      LOG9(`${RED}${fn2} SNA dynamic modules can not use path aliases${NRM4}`);
    throw Error(`${fn2} Error during dynamic import: ${error.message}`);
  }
}

// _ur/node-server/sna-node-context.mts
var LOG10 = makeTerminalOut("SNA.HOOK", "TagCyan");
var DBG4 = true;
var SERVER_CFG = {};
var CFG_STATE = /* @__PURE__ */ new Set();
function SNA_SetLockState(state) {
  if (CFG_STATE.has(state)) {
    throw Error(`Lock state ${state} already set`);
  }
  if (state === "init" && CFG_STATE.size !== 0) {
    throw Error(`Lock state ${state} can only be set first`);
  }
  if (state === "preconfig" && !CFG_STATE.has("init")) {
    throw Error(`Lock state ${state} can only be set after 'init'`);
  }
  if (state === "prehook" && !CFG_STATE.has("preconfig")) {
    throw Error(`Lock state ${state} can only be set after 'preconfig'`);
  }
  if (state === "locked" && !CFG_STATE.has("prehook")) {
    throw Error(`Lock state ${state} can only be set after 'prehook'`);
  }
  CFG_STATE.add(state);
  return state;
}
function SNA_GetLockState(state) {
  return CFG_STATE.has(state);
}
function SNA_SetServerConfig(config) {
  if (config === void 0) return SERVER_CFG;
  if (Object.keys(SERVER_CFG).length === 0) {
    if (DBG4) LOG10(`Setting SNA Global Configuration`);
  } else if (DBG4) LOG10(`Updating SNA Global Configuration`);
  SERVER_CFG = Object.assign(SERVER_CFG, config);
  return { ...SERVER_CFG };
}
function SNA_GetServerConfig() {
  const fn2 = "SNA_GetServerConfig:";
  if (!SNA_GetLockState("preconfig")) {
    const keys = Array.from(CFG_STATE);
    if (keys.length === 0) {
      console.warn(`${fn2} called early; no config keys are set`);
    } else {
      console.warn(`${fn2} early config access detected; has ${keys.join(",")}`);
    }
  }
  return { ...SERVER_CFG };
}
function SNA_GetServerConfigUnsafe() {
  return SERVER_CFG;
}

// _ur/node-server/sna-node-urnet-server.mts
var { BLU: BLU4, YEL: YEL3, RED: RED2, DIM: DIM4, NRM: NRM5 } = ANSI_COLORS;
var WARN = `${YEL3}**${NRM5}`;
var LOG11 = makeTerminalOut("SNA.UNET", "TagCyan");
var DBG5 = true;
function SNA_RuntimeInfo() {
  const { asset_dir, output_dir, runtime_dir } = GetBuildOptions();
  return { asset_dir, output_dir, runtime_dir };
}
function SNA_EnsureAppDirs(rootDir) {
  const source_dir = PATH3.join(rootDir, "app-source");
  const asset_dir = PATH3.join(rootDir, "app-static");
  const output_dir = PATH3.join(rootDir, "_public");
  const runtime_dir = PATH3.join(rootDir, "_runtime");
  const config_dir = PATH3.join(rootDir, "_config");
  const viewlib_dir = PATH3.join(source_dir, "viewlib");
  const webc_dir = PATH3.join(viewlib_dir, "webc");
  RemoveDir(output_dir);
  EnsureDirChecked(source_dir);
  EnsureDirChecked(asset_dir);
  EnsureDirChecked(output_dir);
  EnsureDirChecked(runtime_dir);
  EnsureDirChecked(config_dir);
  EnsureDirChecked(viewlib_dir);
  EnsureDirChecked(webc_dir);
  const CFG = SNA_GetServerConfigUnsafe();
  CFG.runtime_dir = runtime_dir;
  CFG.config_dir = config_dir;
  CFG.source_dir = source_dir;
  CFG.asset_dir = asset_dir;
  CFG.viewlib_dir = viewlib_dir;
  CFG.webc_dir = webc_dir;
  return {
    source_dir,
    asset_dir,
    output_dir,
    runtime_dir,
    config_dir,
    viewlib_dir,
    webc_dir
  };
}
async function SNA_Build(rootDir, opt) {
  LOG11(`SNA Build: Transpiling and bundling javascript`);
  const { source_dir, asset_dir, output_dir, webc_dir } = SNA_EnsureAppDirs(rootDir);
  const sdir = u_short(source_dir);
  const wcdir = u_short(webc_dir);
  const bundle_name = "bundle.js";
  const { entryFile, tsFiles } = await MakeAppImports(source_dir);
  if (tsFiles.length) {
    const ff = tsFiles.length > 1 ? "files" : "file";
    LOG11(`Build: bundling entry ${ff} ${BLU4}${tsFiles.join(" ")}${NRM5}`);
    LOG11(`.. into ${BLU4}${bundle_name}${NRM5}`);
  } else LOG11(`${WARN} Build: No client components in ${sdir}`);
  const { webcFile, webcFiles } = await MakeWebCustomImports(webc_dir);
  if (webcFiles.length) {
    LOG11(`Found web components: ${BLU4}${webcFiles.join(" ")}${NRM5}`);
    LOG11(`import as ${BLU4}${webcFile}${NRM5}`);
  } else LOG11(`${WARN} No web components in ${wcdir}`);
  const notify_cb = m_NotifyCallback;
  const buildOpts = {
    source_dir,
    asset_dir,
    output_dir,
    entry_file: entryFile,
    // relative to source_dir
    bundle_name,
    // hot reload callback, added to esbuild events
    notify_cb
  };
  LOG11(`Using esbuild to assemble website -> ${BLU4}${u_short(output_dir)}${NRM5}`);
  SetBuildOptions(buildOpts);
  await BuildApp(buildOpts);
  const htdocs_short = u_short(buildOpts.output_dir);
  const watch_dirs = [`${source_dir}/**/*`, `${asset_dir}/**/*`];
  LOG11(`Live Reload Service is monitoring ${htdocs_short}`);
  await WatchExtra({
    watch_dirs,
    notify_cb
  });
  const serverOpts = {
    http_port: opt?.port || 8080,
    http_host: "localhost",
    http_docs: output_dir,
    index_file: "index.html",
    wss_path: "sna-ws",
    get_client_cfg: () => {
      const { dataURI } = SNA_GetServerConfigUnsafe();
      return { dataURI };
    }
  };
  await Start(serverOpts);
  const mtsFiles = await FindServerModules(source_dir);
  if (mtsFiles.length)
    LOG11(`Loaded server components: ${BLU4}${mtsFiles.join(" ")}${NRM5}`);
  else LOG11(`${WARN} No server components in '${sdir}'`);
}
async function SNA_MultiBuild(rootDir) {
  LOG11(`SNA MultiBuild: Transpiling and bundling entry files`);
  const { source_dir, asset_dir, output_dir, webc_dir } = SNA_EnsureAppDirs(rootDir);
  const sdir = u_short(source_dir);
  const entryFiles = await FindClientEntryFiles(source_dir);
  if (entryFiles.length) {
    LOG11(`MultiBuild: bundling entry files: ${BLU4}${entryFiles.join(" ")}${NRM5}`);
  } else {
    LOG11(`${WARN} MultiBuild: No entry files in ${sdir}`);
    return;
  }
  const { webcFile, webcFiles } = await MakeWebCustomImports(webc_dir);
  if (webcFiles.length) {
    LOG11(`Found web components: ${BLU4}${webcFiles.join(" ")}${NRM5}`);
    LOG11(`import as ${BLU4}${webcFile}${NRM5}`);
  } else LOG11(`${WARN} No web components in ${webc_dir}`);
  const notify_cb = m_NotifyCallback;
  const buildOpts = {
    source_dir,
    asset_dir,
    output_dir,
    entry_files: entryFiles,
    // relative to source_dir
    // hot reload callback, added to esbuild events
    notify_cb
  };
  LOG11(`Using esbuild to assemble website -> ${BLU4}${u_short(output_dir)}${NRM5}`);
  SetBuildOptions(buildOpts);
  await MultiBuildApp(buildOpts);
  const htdocs_short = u_short(buildOpts.output_dir);
  const watch_dirs = [`${source_dir}/**/*`, `${asset_dir}/**/*`];
  LOG11(`Live Reload Service is monitoring ${htdocs_short}`);
  await WatchExtra({
    watch_dirs,
    notify_cb
  });
  const serverOpts = {
    http_port: 8080,
    http_host: "localhost",
    http_docs: output_dir,
    index_file: "index.html",
    wss_path: "sna-ws",
    get_client_cfg: () => {
      const { dataURI } = SNA_GetServerConfig();
      return { dataURI };
    }
  };
  await Start(serverOpts);
  const mtsFiles = await FindServerModules(source_dir);
  if (mtsFiles.length)
    LOG11(`Loaded server components: ${BLU4}${mtsFiles.join(" ")}${NRM5}`);
  else LOG11(`${WARN} No server components in ${sdir}`);
}
function m_NotifyCallback(data) {
  const { changed } = data || {};
  if (changed === void 0 || changed === "rebuild-notify") {
    return;
  }
  if (changed.endsWith(".mts")) {
    return;
  }
  let hot = [".ts", ".css", ".html"].some((e) => changed.endsWith(e));
  if (hot) {
    const EP2 = ServerEndpoint();
    if (DBG5) LOG11(`${DIM4}notify change: ${u_short(changed)}${NRM5}`);
    EP2.netSignal("NET:UR_HOT_RELOAD_APP", { changed });
    return;
  }
  if (DBG5) LOG11(`${DIM4}unhandled notify change: ${u_short(changed)}${NRM5}`);
}

// _ur/common/class-phase-machine.ts
var DBG6 = false;
var LOG12 = console.log.bind(console);
var WARN2 = console.warn.bind(console);
var m_machines = /* @__PURE__ */ new Map();
var m_queue = /* @__PURE__ */ new Map();
function m_DecodeHookSelector(sel) {
  const fn2 = "m_DecodeHookSelector:";
  if (typeof sel !== "string") throw Error("arg must be non-empty string");
  const regex = /([^/]+)\/([^:]+):?([^:]*)/;
  let [_, machine, phase, event] = sel.match(regex) || [];
  if (!machine || !phase) throw Error(`${fn2} invalid hook selector '${sel}'`);
  if (machine && machine !== machine.toUpperCase())
    throw Error(`${fn2} machine name must be uppercase`);
  if (phase && phase !== phase.toUpperCase())
    throw Error(`${fn2} phase name must be uppercase`);
  if (!event) event = "exec";
  if (!["enter", "exec", "exit"].includes(event))
    throw Error(`${fn2} invalid event name '${event}'`);
  if (DBG6) console.log(`${fn2} ${machine} / ${phase} : ${event}`);
  return [machine, phase, event];
}
function m_DecodePhaseGroup(pm, phaseID) {
  if (!(pm instanceof PhaseMachine)) throw Error("arg1 must be PhaseMachine");
  return pm.lookupPhaseGroup(phaseID);
}
function m_ProcessHookQueue(pmName) {
  const fn2 = "m_ProcessHookQueue:";
  const machine = m_machines.get(pmName);
  if (!machine) return;
  const qhooks = m_queue.get(pmName) || [];
  if (DBG6) LOG12(`phasemachine '${pmName}' has ${qhooks.length} queued ops`);
  try {
    qhooks.forEach((hook) => machine.addHookEntry(hook.phase, hook));
    m_queue.delete(pmName);
  } catch (e) {
    console.warn("Error while processing queued phasemachine hooks");
    throw Error(e.toString());
  }
}
var PhaseMachine = class {
  pm_name;
  pm_state;
  phase_hooks;
  // name -> addHookEntry[]
  phase_membership;
  phase_def;
  phase_timer;
  constructor(pmName, phases) {
    if (typeof pmName !== "string") throw Error("arg1 must be string");
    if (pmName.length < 1) throw Error("arg1 string.length must be > 1");
    if (m_machines.has(pmName)) throw Error(`already registered '${pmName}'`);
    this.pm_name = pmName.toUpperCase();
    this.phase_hooks = /* @__PURE__ */ new Map();
    this.phase_membership = /* @__PURE__ */ new Map();
    this.phase_def = phases;
    this.pm_state = {
      _cur_phase: "",
      // current operation
      _cur_group: ""
      // current operation group
    };
    this.phase_timer = null;
    const groupList = Object.keys(this.phase_def);
    groupList.forEach((pgroup) => {
      this.phase_hooks.set(pgroup, []);
      this.phase_def[pgroup].forEach((p) => {
        this.phase_hooks.set(p, []);
        this.phase_membership.set(p, pgroup);
      });
    });
    m_machines.set(pmName, this);
    m_ProcessHookQueue(pmName);
  }
  // end constructor
  /// GETTER SETTER ///
  /** setter: update current phase */
  set cur_phase(phase) {
    this.pm_state._cur_phase = phase;
  }
  /** setter: update current phase group */
  set cur_group(group) {
    this.pm_state._cur_group = group;
  }
  /** return current phase */
  get cur_phase() {
    return this.pm_state._cur_phase;
  }
  /** return current phase group */
  get cur_group() {
    return this.pm_state._cur_group;
  }
  /** return the list of phasegroups or phases in the group */
  getPhaseList(phase) {
    if (phase === void 0) {
      const groups = Object.keys(this.phase_def);
      return groups;
    }
    const group = this.phase_def[phase];
    if (group === void 0) return [];
    return group;
  }
  /// PHASE OPERATIONS ///
  /** API: register an Operations Handler. <op> is a string constant
   *  define in phase_def and converted into the MAP. <f> is a function that
   *  will be invoked during the operation, and it can return a promise or value.
   */
  addHookEntry(phid, hook) {
    const fn2 = "addHookEntry:";
    const hookEntry = this.phase_hooks.get(phid);
    if (hookEntry === void 0) {
      WARN2(`${fn2} '${phid}' is not defined in ${this.pm_name} phase def`);
      return;
    }
    this.phase_hooks.get(phid).push(hook);
    if (DBG6) LOG12(`${fn2} added hook for ${phid}`);
  }
  /** API: execute all hooks associated with a phase event. If any phase
   *  returns a Promise, the function will wait for it to resolve before
   *  returning.
   */
  async _promiseHookEvaluation(phid, evt) {
    const fn2 = "_promiseHookEvaluation:";
    if (phid.startsWith("PHASE_")) this.cur_group = phid;
    else {
      this.cur_group = this.phase_membership.get(phid);
      this.cur_phase = phid;
    }
    let hooks = this.phase_hooks.get(phid);
    if (hooks.length === 0) return Promise.resolve([]);
    const promises = [];
    for (const hook of hooks) {
      const hookFunc = hook[evt];
      if (hookFunc === void 0) return;
      let retval = hookFunc(this.pm_name, phid);
      if (retval instanceof Promise) {
        promises.push(retval);
      }
    }
    if (promises.length > 0) return await Promise.all(promises);
  }
  /** API: execute all Promises associated with a Phase Group in serial order,
   *  waiting for each to resolve before executing the next. If there are hooks
   *  associated with the PhaseGroup, they fire after all Phases have completed.
   */
  async invokeGroupHooks(pgroup) {
    const fn2 = "invokeGroupHooks:";
    this.cur_group = pgroup;
    await this._promiseHookEvaluation(pgroup, "enter");
    const phaseList = this.phase_def[pgroup];
    for (const phase of phaseList) {
      if (DBG6) console.log(`${fn2} entering group ${phase}`);
      await this._promiseHookEvaluation(phase, "enter");
      await this._promiseHookEvaluation(phase, "exec");
      await this._promiseHookEvaluation(phase, "exit");
    }
    await this._promiseHookEvaluation(pgroup, "exec");
    await this._promiseHookEvaluation(pgroup, "exit");
  }
  /** helper: return hook function array for a given phase or phase group.
   *  It defaults to returning the 'exec' function.
   */
  getHookFunctions(phid, evt = "exec") {
    const hooks = this.phase_hooks.get(phid);
    return hooks.map((hook) => hook[evt]);
  }
  /** helper: check for phase group membership */
  lookupPhaseGroup(phid) {
    const fn2 = "lookupPhaseGroup:";
    if (typeof phid !== "string") throw Error(`${fn2} arg must be string`);
    if (this.phase_def[phid]) return phid;
    return this.phase_membership.get(phid);
  }
  /** helper: check for valid phase selector */
  hasHook(psel) {
    const fn2 = "hasHook:";
    const [machine, phase] = m_DecodeHookSelector(psel);
    return this.phase_hooks.has(phase);
  }
  /** helper: print current phase information to console */
  consolePhaseInfo(pr = "PhaseInfo", bg = "MediumVioletRed") {
    const phaseInfo = `${this.pm_name}/${this.cur_group}:${this.cur_phase}`;
    LOG12(
      `%c${pr}%c`,
      `color:#fff;background-color:${bg};padding:3px 10px;border-radius:10px;`,
      "color:auto;background-color:auto"
    );
    return phaseInfo;
  }
  /// STATIC CLASS API ///
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: Register a PhaseHook at any time. If the machine doesn't yet exist,
   *  the hook will be queued until the machine is created */
  static HookPhase(selector, fn2) {
    const [machine, phase, event] = m_DecodeHookSelector(selector);
    const pm = m_machines.get(machine);
    const hook = { phase, [event]: fn2 };
    if (pm) {
      pm.addHookEntry(phase, hook);
      return;
    }
    if (!m_queue.has(machine)) m_queue.set(machine, []);
    const mq = m_queue.get(machine);
    mq.push(hook);
    m_ProcessHookQueue(machine);
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: Execute a PhaseGroup in a machine. If the machine doesn't yet exist,
   *  the function will throw an error. */
  static async RunPhaseGroup(selector) {
    const fn2 = "RunPhaseGroup:";
    const [machine, phaseID] = m_DecodeHookSelector(selector);
    const pm = m_machines.get(machine);
    if (!pm) throw Error(`machine '${machine}' not yet defined`);
    const phaseGroup = m_DecodePhaseGroup(pm, phaseID);
    if (phaseGroup === void 0)
      throw Error(`${fn2} phaseGroup '${phaseID}' is undefined`);
    await pm.invokeGroupHooks(phaseGroup);
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return a list of all pending machines that have not been hooked. */
  static GetDanglingHooks() {
    let out = [];
    for (const [name, hooks] of m_queue)
      for (const hook of hooks) out.push(`${name}/${hook.phase}`);
    if (out.length === 0) return null;
    return out;
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return a string of all current machines and their phase_def */
  static GetMachineStates() {
    let out = [];
    for (const [name, m] of m_machines)
      out.push(`${name}[${m.cur_group}.${m.cur_phase}]`);
    return out;
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** API: return initialized PhaseMachine if it exists */
  static GetMachine(name) {
    return m_machines.get(name);
  }
  // end class PhaseMachine
};
function HookPhase(selector, fn2) {
  PhaseMachine.HookPhase(selector, fn2);
}
async function RunPhaseGroup(selector) {
  await PhaseMachine.RunPhaseGroup(selector);
}
function GetDanglingHooks() {
  return PhaseMachine.GetDanglingHooks();
}
function GetMachine(name) {
  return m_machines.get(name);
}

// _ur/common/class-sna-component.ts
var SNA_Component = class {
  _name;
  AddComponent;
  PreConfig;
  PreHook;
  Subscribe;
  Unsubscribe;
  constructor(name, config) {
    if (typeof name !== "string") throw Error("SNA_Component: bad name");
    this._name = name;
    const { AddComponent, PreConfig, PreHook: PreHook2, Subscribe, Unsubscribe } = config;
    this.AddComponent = AddComponent;
    this.PreConfig = PreConfig;
    this.PreHook = PreHook2;
    this.Subscribe = Subscribe;
    this.Unsubscribe = Unsubscribe;
  }
};
function SNA_NewComponent(name, config) {
  return new SNA_Component(name, config);
}

// _ur/common/util-text.ts
var util_text_exports = {};
__export(util_text_exports, {
  AssertAlphanumeric: () => AssertAlphanumeric,
  AssertKeyword: () => AssertKeyword,
  AssertNumber: () => AssertNumber,
  AssertString: () => AssertString,
  BadString: () => BadString,
  ForceAlphanumeric: () => ForceAlphanumeric,
  HasNoSpaces: () => HasNoSpaces,
  HasSingleDash: () => HasSingleDash,
  IsAlphaNumeric: () => IsAlphaNumeric,
  IsAtomicKeyword: () => IsAtomicKeyword,
  IsCamelCase: () => IsCamelCase,
  IsKebabCase: () => IsKebabCase,
  IsPascalCase: () => IsPascalCase,
  IsSnakeCase: () => IsSnakeCase,
  IsUpperSnakeCase: () => IsUpperSnakeCase,
  IsValidCustomTag: () => IsValidCustomTag,
  MakeCamelCase: () => MakeCamelCase,
  MakeKebabCase: () => MakeKebabCase,
  MakeLowerSnakeCase: () => MakeLowerSnakeCase,
  MakePascalCase: () => MakePascalCase,
  MakeUpperSnakeCase: () => MakeUpperSnakeCase,
  PreprocessDataText: () => PreprocessDataText,
  ThrowBadString: () => ThrowBadString
});
function BadString(str) {
  if (typeof str !== "string") return true;
  if (str.length === 0) return true;
  if (str.trim().length === 0) return true;
  return false;
}
function ThrowBadString(str) {
  if (BadString(str)) throw Error(`${str} is not a string`);
}
function AssertNumber(num) {
  if (typeof num === "number") return num;
  if (typeof num === "string") {
    const parsed = parseFloat(num);
    if (!isNaN(parsed)) return parsed;
  }
  throw Error(`Expected number, got ${num}`);
}
function AssertString(str) {
  if (BadString(str)) throw Error("AssertString: not a string");
  return str;
}
function AssertKeyword(str) {
  if (!IsAtomicKeyword(str)) throw Error("AssertKeyword: not a keyword");
  return str;
}
function AssertAlphanumeric(str) {
  if (BadString(str)) throw Error("AssertAlphanumeric: not a string");
  if (IsAlphaNumeric(str)) return str;
  throw Error(`AssertAlphanumeric: ${str} is not alphanumeric`);
}
function PreprocessDataText(str) {
  if (BadString(str)) throw Error("PreprocessDataText: not a string");
  let normalizedStr = str.replace(/\r\n|\r/g, "\n");
  normalizedStr = normalizedStr.split("\n").map((line) => line.replace(/\s+$/, "")).map((line) => line.replace(/^\s+/, "")).join("\n");
  normalizedStr = normalizedStr.replace(/\t/g, "  ");
  let lines = normalizedStr.split("\n");
  const processDelimited = (line, delimiter) => {
    let parts = line.split(delimiter);
    for (let i = 0; i < parts.length; i++) {
      parts[i] = parts[i].trim();
      parts[i] = parts[i].replace(/\s+/g, " ");
    }
    return parts.join(delimiter);
  };
  for (let i = 0; i < lines.length; i++) {
    lines[i] = processDelimited(lines[i], ",");
    lines[i] = processDelimited(lines[i], ":");
  }
  normalizedStr = lines.join("\n").trim();
  return normalizedStr + "\n";
}
function IsAlphaNumeric(str) {
  ThrowBadString(str);
  const alphaNumeric = /^[a-zA-Z0-9\s]+$/.test(str);
  const singleSpaces = !/\s{2,}/.test(str);
  const trimmed = str.trim() === str;
  const noLeadNum = !/^[0-9]/.test(str);
  return alphaNumeric && singleSpaces && noLeadNum && trimmed;
}
function HasNoSpaces(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  return noSpaces;
}
function HasSingleDash(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  const singleDash = str.split("-").length - 1 === 1;
  return noSpaces && singleDash;
}
function IsSnakeCase(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  const snakeCase = /^[a-z_]+$/.test(str);
  return noSpaces && snakeCase;
}
function IsCamelCase(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  const camelCase = /^[a-z]+[A-Z][a-z]*$/.test(str);
  return noSpaces && camelCase;
}
function IsPascalCase(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  const pascalCase = /^[A-Z][a-z]*$/.test(str);
  return noSpaces && pascalCase;
}
function IsKebabCase(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  const kebabCase = /^[a-z]+(-[a-z]+)*$/.test(str);
  return noSpaces && kebabCase;
}
function IsUpperSnakeCase(str) {
  ThrowBadString(str);
  const noSpaces = !/\s/.test(str);
  const upperSnakeCase = /^[A-Z_]+$/.test(str);
  return noSpaces && upperSnakeCase;
}
function IsValidCustomTag(tagName) {
  ThrowBadString(tagName);
  const noSpaces = !/\s/.test(tagName);
  const oneDash = tagName.split("-").length - 1 === 1;
  const lowerCase = tagName === tagName.toLowerCase();
  return noSpaces && oneDash && lowerCase;
}
function IsAtomicKeyword(str) {
  ThrowBadString(str);
  const noSpaces = HasNoSpaces(str);
  const isAN = IsAlphaNumeric(str);
  const noLeadNum = !/^[0-9]/.test(str);
  const noSpecial = !/[^a-zA-Z0-9]/.test(str);
  const isLower = str === str.toLowerCase();
  return noSpaces && isAN && noLeadNum && noSpecial && isLower;
}
function ForceAlphanumeric(str, delimiter = " ") {
  ThrowBadString(str);
  const alphaNumeric = str.trim().replace(/[^a-zA-Z0-9\s]/g, " ");
  return alphaNumeric.replace(/\s+/g, delimiter);
}
function MakeLowerSnakeCase(str) {
  return ForceAlphanumeric(str, "_").toLowerCase();
}
function MakeUpperSnakeCase(str) {
  return ForceAlphanumeric(str, "_").toUpperCase();
}
function MakeKebabCase(str) {
  return ForceAlphanumeric(str, "-").toLowerCase();
}
function MakePascalCase(str) {
  const alphaNumeric = ForceAlphanumeric(str, " ");
  const parts = alphaNumeric.split(" ");
  const capitalized = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return capitalized.join("");
}
function MakeCamelCase(str) {
  const alphaNumeric = ForceAlphanumeric(str, " ");
  const parts = alphaNumeric.split(" ");
  const capitalized = parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  capitalized[0] = capitalized[0].toLowerCase();
  return capitalized.join("");
}

// _ur/node-server/sna-node-hooks.mts
var { BLU: BLU5, YEL: YEL4, RED: RED3, DIM: DIM5, NRM: NRM6 } = ANSI_COLORS;
var LOG13 = makeTerminalOut("SNA.HOOK", "TagCyan");
var DBG7 = true;
var COMPONENTS = /* @__PURE__ */ new Set();
var PM;
function SNA_NewComponent2(name, config) {
  return new SNA_Component(name, config);
}
function SNA_UseComponent(component) {
  const fn2 = "SNA_UseComponent:";
  const { _name, PreHook: PreHook2 } = component;
  if (typeof _name !== "string")
    throw Error(`${fn2} bad SNA component: missing _name`);
  if (!IsSnakeCase(_name))
    throw Error(`${fn2} bad SNA component: _name ${_name} must be snake_case`);
  if (COMPONENTS.has(component)) LOG13(`SNA_Component '${_name}' already registered`);
  if (DBG7) LOG13(`Registering SNA_Component: '${_name}'`);
  COMPONENTS.add(component);
  const { AddComponent } = component;
  if (typeof AddComponent === "function")
    AddComponent({ f_AddComponent: SNA_UseComponent });
}
function SNA_HookServerPhase(phase, fn2) {
  HookPhase(`SNA/${phase}`, fn2);
}
async function SNA_LifecycleStart() {
  const fn2 = "SNA_LifecycleStart:";
  if (PM === void 0)
    PM = new PhaseMachine("SNA", {
      PHASE_INIT: [
        "SRV_BOOT",
        // boot the system
        "SRV_INIT",
        // allocate system data structures
        "SRV_CONFIG"
        // configure the system
      ],
      PHASE_LOAD: [
        "LOAD_INIT",
        // initialize data structures
        "LOAD_FILES",
        // load data from server
        "LOAD_CONFIG"
        // finalize data
      ],
      PHASE_CONNECT: [
        "EXPRESS_INIT",
        // express allocate data structures
        "EXPRESS_CONFIG",
        // express add middleware routes
        "EXPRESS_READY",
        // express server is ready to start
        "EXPRESS_LISTEN",
        // express server is listening
        "URNET_LISTEN"
        // ursys network is listening on socket-ish connection
      ],
      PHASE_RUN: [
        "SRV_START",
        // server process start hook
        "SRV_RUN"
        // server process run hook
      ],
      PHASE_READY: [
        "SRV_READY"
        // server is ready to run
      ],
      PHASE_SHUTDOWN: [
        "SRV_KILLED",
        // server process kill signal detected
        "SRV_TERMINATED",
        // server process terminate detected
        "SRV_CLOSE",
        // server process close hook
        "SRV_STOP"
        // server proccess stop hook
      ],
      PHASE_DISCONNECT: [
        "SRV_DISCONNECT"
        // server upstream host disconnect hook
      ],
      PHASE_ERROR: ["SRV_ERROR"]
    });
  if (!SNA_SetLockState("init")) LOG13(`${RED3}lockstate 'init' fail${NRM6}`);
  const SRV_CFG_COPY = { ...SNA_GetServerConfigUnsafe() };
  for (const component of COMPONENTS) {
    const { PreConfig, _name } = component;
    if (typeof PreConfig === "function") {
      if (DBG7) LOG13(`Configuring SNA_Component '${_name}'`);
      PreConfig(SRV_CFG_COPY);
    }
  }
  if (!SNA_SetLockState("preconfig")) LOG13(`${RED3}lockstate 'preconfig' fail${NRM6}`);
  for (const component of COMPONENTS) {
    const { PreHook: PreHook2, _name } = component;
    if (typeof PreHook2 === "function") {
      if (DBG7) LOG13(`Initializing SNA_Component '${_name}'`);
      PreHook2();
    }
  }
  if (!SNA_SetLockState("prehook")) LOG13(`${RED3}lockstate 'prehook' fail${NRM6}`);
  if (DBG7) LOG13(`SNA Node Lifecycle Starting`);
  await RunPhaseGroup("SNA/PHASE_INIT");
  await RunPhaseGroup("SNA/PHASE_LOAD");
  await RunPhaseGroup("SNA/PHASE_CONNECT");
  await RunPhaseGroup("SNA/PHASE_RUN");
  await RunPhaseGroup("SNA/PHASE_READY");
  if (!SNA_SetLockState("locked")) LOG13(`${RED3}lockstate 'prehook' fail${NRM6}`);
  const dooks = GetDanglingHooks();
  if (dooks) {
    LOG13(`${RED3} *** ERROR *** dangling phase hooks detected${NRM6}`, dooks);
  }
}
function SNA_LifecycleStatus() {
  const status = {};
  const cfg_valid = SNA_GetLockState("preconfig");
  const hooks_valid = SNA_GetLockState("prehook");
  if (PM === void 0)
    Object.assign(status, {
      preconfig: cfg_valid,
      prehook: hooks_valid,
      phaseGroup: void 0,
      phase: void 0,
      message: "SNA PhaseMachine is undefined"
    });
  else {
    const { cur_group, cur_phase } = PM;
    const lastPhaseGroup = PM.getPhaseList("PHASE_READY");
    const lastPhase = lastPhaseGroup[lastPhaseGroup.length - 1];
    Object.assign(status, {
      preconfig: cfg_valid,
      prehook: hooks_valid,
      phaseGroup: PM.cur_group,
      phase: PM.cur_phase,
      completed: cur_phase === lastPhase
    });
    status.message = `SNA current lifecycle: '${cur_group}/${cur_phase}'`;
    if (status.completed) status.message += " [completed]";
  }
  return status;
}

// _ur/node-server/sna-dataserver.mts
var sna_dataserver_exports = {};
__export(sna_dataserver_exports, {
  CloseBin: () => CloseBin,
  CloseDataset: () => CloseDataset,
  LoadDataset: () => LoadDataset,
  OpenBin: () => OpenBin,
  PersistDataset: () => PersistDataset,
  default: () => sna_dataserver_default
});

// _ur/common/util-data-norm.ts
var util_data_norm_exports = {};
__export(util_data_norm_exports, {
  DeepClone: () => DeepClone,
  DeepCloneArray: () => DeepCloneArray,
  DeepCloneObject: () => DeepCloneObject,
  NormEntID: () => m_NormEntityID,
  NormIDs: () => NormIDs,
  NormItem: () => NormItem,
  NormItemDict: () => NormItemDict,
  NormItemList: () => NormItemList,
  NormStringToValue: () => NormStringToValue
});
function m_NormEntityID(id) {
  const fn2 = "m_NormEntityID:";
  if (typeof id === "string") return id;
  if (typeof id === "number") return String(id);
  return void 0;
}
function m_NormDataObj(obj) {
  const fn2 = "m_NormDataObj:";
  if (typeof obj !== "object") throw Error(`${fn2} invalid input ${obj}`);
  let foundID;
  const norm = {};
  for (const key of Object.keys(obj)) {
    if (key === "_id") {
      foundID = m_NormEntityID(obj[key]);
      if (foundID === void 0) throw Error(`${fn2} invalid _id ${obj[key]}`);
      continue;
    }
    if (typeof obj[key] === "string") {
      norm[key] = obj[key];
    } else {
      norm[key] = obj[key];
    }
  }
  return [norm, foundID];
}
function NormStringToValue(str) {
  const fn2 = "NormString:";
  if (str === "") return void 0;
  if (str === "true") return true;
  if (str === "false") return false;
  if (str.match(/^\d+$/)) return Number(str);
  return str;
}
function NormItem(item, schema) {
  const fn2 = " NormItem:";
  let [dataObj, foundID] = m_NormDataObj(item);
  return { _id: foundID, ...dataObj };
}
function NormItemList(items, schema) {
  const fn2 = "NormItemList:";
  const normeds = [];
  for (const item of items) {
    const normed = NormItem(item, schema);
    if (normed === void 0) return [void 0, `${fn2} invalid item ${item}`];
    normeds.push(normed);
  }
  return [normeds, void 0];
}
function NormItemDict(dict, schema) {
  const fn2 = "NormItemDict:";
  const normeds = {};
  for (const key in dict) {
    const normed = NormItem(dict[key], schema);
    if (normed === void 0) return [void 0, `${fn2} invalid item ${dict[key]}`];
    normeds[key] = normed;
  }
  return [normeds, void 0];
}
function NormIDs(ids) {
  const fn2 = "NormItemIDs:";
  let normed = ids.map((id) => m_NormEntityID(id));
  if (normed.includes(void 0)) return void 0;
}
function DeepCloneArray(arr) {
  const fn2 = "DeepCloneArray:";
  if (!Array.isArray(arr)) throw Error(`${fn2} invalid input ${arr}`);
  return arr.map((item) => {
    if (Array.isArray(item)) return DeepCloneArray(item);
    if (typeof item === "object") return DeepCloneObject(item);
    return item;
  });
}
function DeepCloneObject(obj) {
  const fn2 = "DeepCloneObject:";
  if (typeof obj !== "object") throw Error(`${fn2} invalid input ${obj}`);
  const clone = {};
  if (obj === null) return null;
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (Array.isArray(val)) {
      clone[key] = DeepCloneArray(val);
      return;
    }
    if (typeof val === "object") {
      clone[key] = DeepCloneObject(val);
      return;
    }
    clone[key] = val;
  });
  return clone;
}
function DeepClone(obj) {
  const clone = {};
  for (const key in obj) {
    const val = obj[key];
    if (Array.isArray(val)) {
      clone[key] = DeepCloneArray(val);
      continue;
    }
    if (typeof val === "object") {
      clone[key] = DeepCloneObject(val);
      continue;
    }
    if (typeof val === "number") clone[key] = String(val);
    else clone[key] = val;
  }
  return clone;
}

// _ur/common/util-data-search.ts
var util_data_search_exports = {};
__export(util_data_search_exports, {
  Find: () => Find,
  Query: () => Query,
  m_AssessPropKeys: () => m_AssessPropKeys,
  m_EnforceFlags: () => m_EnforceFlags,
  m_GetCriteria: () => m_GetCriteria,
  m_SetCriteria: () => m_SetCriteria,
  u_matchRanges: () => u_matchRanges,
  u_matchValues: () => u_matchValues
});

// _ur/common/class-data-recordset.ts
var fn = "RecordSet";
var RecordSet = class {
  //
  src_items;
  // source items
  cur_items;
  // transformed items
  cur_meta;
  // metadata
  //
  page_index;
  // current page index (0-based)
  page_size;
  // current page size in items
  page_count;
  // total number of pages
  pages;
  // paginated items
  //
  constructor(items) {
    if (!Array.isArray(items)) {
      throw Error(`${fn} requires an array of items`);
    }
    const [normed, error] = NormItemList(items);
    if (error) throw Error(`${fn} ${error}`);
    this.src_items = normed;
    this.reset();
  }
  /** return true if the current list is paginated */
  _nop() {
    if (this.page_index !== void 0) return;
    return "call paginate() first";
  }
  /// NON-CHAINING TERMINAL LIST METHODS ///
  /** return the current transformed items */
  getItems() {
    return DeepCloneArray(this.cur_items);
  }
  /** return the current metadata. can provide a name which will
   *  be searched first in groups, then in the top level metadata.
   */
  getStats(name) {
    let result;
    if (name === void 0) result = this.cur_meta;
    else if (this.cur_meta.groups && this.cur_meta.groups[name])
      result = this.cur_meta.groups[name];
    else if (this.cur_meta[name]) result = this.cur_meta[name];
    return result;
  }
  /** return the original source items */
  getSrcItems() {
    return DeepCloneArray(this.src_items);
  }
  /// CHAINING METHODS ///
  /** sorts the current list. if no sort options are passed,
   *  the list is sorted by the first field in ascending order
   */
  sort(sOpt) {
    let { sortBy, preFilter, postFilter } = sOpt || {};
    if (preFilter) {
      this.cur_items = preFilter(this.cur_items);
    }
    if (sortBy === void 0) {
      const [firstKey] = Object.keys(this.cur_items[0]);
      sortBy = { [firstKey]: "sort_asc" };
    }
    Object.keys(sortBy).forEach((sortField) => {
      const sortType = sortBy[sortField];
      switch (sortType) {
        case "sort_asc":
          this.cur_items.sort((a, b) => a[sortField] > b[sortField] ? 1 : -1);
          break;
        case "sort_desc":
          this.cur_items.sort((a, b) => a[sortField] < b[sortField] ? 1 : -1);
          break;
        case "random":
          this.cur_items.sort(() => Math.random() - 0.5);
          break;
        default:
          break;
      }
    });
    if (postFilter) {
      this.cur_items = postFilter(this.cur_items);
    }
    return this;
  }
  /** */
  format(fOpt) {
    const { includeFields, transformBy } = fOpt || {};
    let items = [];
    this.cur_items.forEach((item) => {
      let newItem = {};
      if (includeFields) {
        includeFields.forEach((field) => {
          if (item[field] !== void 0) newItem[field] = item[field];
          else console.warn(`${fn} missing field: ${field}`);
        });
      }
      if (transformBy) {
        Object.entries(transformBy).forEach((entry) => {
          const [field, xform] = entry;
          if (typeof xform === "function") newItem[field] = xform(item);
          else console.warn(`${fn} invalid transform function for field: ${field}`);
        });
      }
      items.push(newItem);
    });
    return this;
  }
  /** */
  analyze(testOpts) {
    const { groupBy, statTests } = testOpts || {};
    let groups;
    let stats;
    if (groupBy) {
      groups = {};
      Object.entries(groupBy).forEach((entry) => {
        const [groupField, groupTest] = entry;
        groups[groupField] = groupTest(this.cur_items);
      });
    }
    if (statTests) {
      stats = {};
      Object.entries(statTests).forEach((entry) => {
        const [stat, test] = entry;
        if (stat === "groups") throw Error(`${fn} 'groups' is a reserved stat name`);
        stats[stat] = test(this.cur_items);
      });
    }
    if (!groups && !stats)
      throw Error(`${fn} no groupBy or summarizeBy options provided`);
    this.cur_meta = { groups, ...stats };
    return this;
  }
  /** resets the current item set to beginning */
  reset() {
    this.cur_items = DeepCloneArray(this.src_items);
    return this;
  }
  /// CHAINING PAGINATION ///
  /** API: main pagination, using 1-based indexing */
  paginate(pageSize = 10) {
    const fn2 = "paginate:";
    let pidx = 0;
    this.page_size = pageSize;
    this.page_index = 1;
    this.pages = [];
    this.cur_items.forEach((item, ii) => {
      if (ii % this.page_size === 0) pidx++;
      if (this.pages[pidx - 1] === void 0) this.pages[pidx - 1] = [];
      this.pages[pidx - 1].push(item);
    });
    this.page_count = this.pages.length;
    return this;
  }
  /** API: set the current page index */
  goPage(index) {
    const fn2 = "goPage:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    if (index < 1 || index > this.page_count)
      throw Error(`${fn2} invalid index ${index}`);
    this.page_index = index;
    return this;
  }
  /** API: advance to the next page */
  nextPage() {
    const fn2 = "nextPage:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    const total = this.page_count;
    if (this.page_index < total) this.page_index++;
    return this;
  }
  /** API: go back a page */
  prevPage() {
    const fn2 = "prevPage:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    if (this.page_index > 1) this.page_index--;
    return this;
  }
  /// TERMINAL PAGINATION METHODS ///
  /** return the page items of the current page */
  getPage() {
    const fn2 = "pageItems:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    return this.pages[this.page_index - 1];
  }
  /** return the current 1-based page index */
  getPageIndex() {
    const fn2 = "pageIndex:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    return this.page_index;
  }
  /** return the total number of pages */
  getPageCount() {
    const fn2 = "pageCount:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    return this.page_count;
  }
  /** return the current page size */
  getPageSize() {
    const fn2 = "getPageSize:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    return this.page_size;
  }
  /** return true if this is the last page */
  isLastPage() {
    const fn2 = "isLastPage:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    return this.page_index === this.page_count - 1;
  }
  /** return true if this is the first page */
  isFirstPage() {
    const fn2 = "isFirstPage:";
    if (this._nop()) throw Error(`${fn2} ${this._nop()}`);
    return this.page_index === 0;
  }
};

// _ur/common/util-data-search.ts
var QUERY_STATE = { criteria: {}, flags: {}, props: {} };
function m_SetCriteria(criteria) {
  QUERY_STATE.criteria = criteria;
  QUERY_STATE.flags = u_getFlagsFromSearchOptions(criteria);
  return QUERY_STATE;
}
function m_GetCriteria() {
  return QUERY_STATE;
}
function u_getFlagsFromSearchOptions(criteria) {
  const { _lowercaseProps, _forceValue, _forceNull, _cloneItems } = criteria;
  const _flcp = _lowercaseProps || false;
  const _fval = _forceValue || void 0;
  const _fnul = _forceNull || false;
  const _clone = _cloneItems === void 0 ? true : _cloneItems;
  if (typeof _flcp !== "boolean") throw Error("_lowercaseProps invalid type");
  if (typeof _fval !== "string" && _fval !== void 0)
    throw Error("_forceValue invalid type");
  if (typeof _fnul !== "boolean") throw Error("_forceNull invalid type");
  if (typeof _clone !== "boolean") throw Error("_cloneItems invalid type");
  const { missingFields, hasFields, matchExact, matchRange, matchCount } = criteria;
  const b_miss = Array.isArray(missingFields) ? missingFields : void 0;
  const b_has = Array.isArray(hasFields) ? hasFields : void 0;
  const match_exact = typeof matchExact === "object" ? matchExact : void 0;
  const match_range = typeof matchRange === "object" ? matchRange : void 0;
  const count = typeof matchCount === "number" ? matchCount : void 0;
  const { preFilter, postFilter } = criteria;
  const f_pre = typeof preFilter === "function" ? preFilter : void 0;
  const f_post = typeof postFilter === "function" ? postFilter : void 0;
  return {
    _flcp,
    // force prop keys to lowercase
    _fval,
    // force numeric values to strings or numeric strings to numbers
    _fnul,
    // force undefined to null
    _clone,
    // return cloned items, not originals
    b_miss,
    // check for these missing fields
    b_has,
    // check that these fields are present
    match_exact,
    // match these exact values no more no less
    match_range,
    // match these ranges for values
    count,
    // limit the number of matches
    f_pre,
    // pre-filter function
    f_post
    // post-filter function
  };
}
function u_conformObject(mutable, flags) {
  const { _fval, _fnul, _flcp } = flags || QUERY_STATE.flags;
  if (mutable === null) return null;
  Object.keys(mutable).forEach((key) => {
    let value = mutable[key];
    if (_flcp) {
      mutable.delete(key);
      key = key.toLowerCase();
      mutable[key] = value;
    }
    if (Array.isArray(value)) {
      mutable[key] = u_conformArray(value);
      return;
    }
    if (typeof value === "string" && !_fval) {
      const num = Number(value);
      if (!isNaN(num)) mutable[key] = num;
    }
    if (typeof value === "number" && _fval) {
      mutable[key] = String(value);
      return;
    }
    if (value === void 0 && _fnul) {
      mutable[key] = null;
      return;
    }
    if (typeof value === "object") {
      mutable[key] = u_conformObject(value);
      return;
    }
    mutable[key] = value;
  });
  return mutable;
}
function u_conformArray(muts) {
  return muts.map((item) => {
    if (Array.isArray(item)) return u_conformArray(item);
    if (typeof item === "object") return u_conformObject(item);
    return item;
  });
}
function u_hasProps(item, plist) {
  let foundCount = 0;
  for (const key of plist) if (item[key] !== void 0) foundCount++;
  return foundCount === plist.length;
}
function u_hasMissingProps(item, plist) {
  const missing = [];
  for (const key of plist) if (item[key] === void 0) missing.push(key);
  return missing.length > 0;
}
function u_matchValues(item, mObj) {
  let match = true;
  for (const [key, value] of Object.entries(mObj)) {
    match &&= item[key] === value;
  }
  return match;
}
function u_cast_value(val) {
  if (!isNaN(parseFloat(val))) return Number(parseFloat(val));
  if (typeof val === "string") return String(val);
  throw Error("u_cast_num: value is not string or number");
}
function u_matchRanges(item, rObj) {
  const fn2 = "u_matchRanges:";
  let match = true;
  for (const [prop, parms] of Object.entries(rObj)) {
    let bits = parms.split(" ");
    let [op, arg1, arg2] = bits.filter((bit) => bit.trim() !== "");
    let ival = u_cast_value(item[prop]);
    let a = u_cast_value(arg1);
    if (op === "gt") match &&= ival > a;
    if (op === "lt") match &&= ival < a;
    if (op === "gte") match &&= ival >= a;
    if (op === "lte") match &&= ival <= a;
    if (op === "eq") match &&= ival === a;
    if (op === "ne") match &&= ival !== a;
    if (op === "between") {
      let b = u_cast_value(arg2);
      match &&= ival >= a && ival <= b;
    }
  }
  return match;
}
function m_EnforceFlags(mutable) {
  const {
    _fval,
    // force prop values to strings
    _fnul,
    // force undefined to null
    _flcp,
    // force prop keys to lowercase
    _clone
    // clone the item
  } = QUERY_STATE.flags;
  if (_clone) mutable = DeepClone(mutable);
  Object.keys(mutable).forEach((key) => {
    let value = mutable[key];
    if (_flcp) {
      delete mutable[key];
      key = key.toLowerCase();
      mutable[key] = value;
    }
    if (Array.isArray(value)) {
      mutable[key] = u_conformArray(value);
      return;
    }
    if (typeof value === "number" && _fval) {
      mutable[key] = String(value);
      return;
    }
    if (value === void 0 && _fnul) {
      mutable[key] = null;
      return;
    }
    if (typeof value === "object") {
      mutable[key] = u_conformObject(value);
      return;
    }
    mutable[key] = value;
  });
  return mutable;
}
function m_AssessPropKeys(item, plist) {
  const ff = [];
  const mm = [];
  const xx = [];
  Object.keys(item).forEach((key) => {
    if (plist.includes(key)) ff.push(key);
    else xx.push(key);
  });
  Object.keys(plist).forEach((key) => {
    if (!ff.includes(key)) mm.push(key);
  });
  const found = ff.length === 0 ? ff : void 0;
  const missing = mm.length === 0 ? mm : void 0;
  const extra = xx.length === 0 ? xx : void 0;
  QUERY_STATE.props = { found, missing, extra };
  return QUERY_STATE.props;
}
function Find(items, criteria) {
  const fn2 = "Find:";
  if (criteria === void 0) return [];
  if (Object.keys(criteria).length === 0) return [];
  const { flags } = m_SetCriteria(criteria);
  const { _clone, b_miss, b_has, match_exact, match_range, count } = flags;
  if (items === void 0) throw Error(`${fn2} items are undefined`);
  let item;
  let ii;
  const found = [];
  for (item of items) {
    if (found.length >= count) break;
    ii = _clone ? { ...item } : item;
    let match = true;
    if (b_miss) match &&= u_hasMissingProps(ii, b_miss);
    if (b_has) match &&= u_hasProps(ii, b_has);
    if (match_exact) match &&= u_matchValues(ii, match_exact);
    if (match_range) match &&= u_matchRanges(ii, match_range);
    if (match) found.push(ii);
  }
  return found;
}
function Query(items, criteria) {
  return new RecordSet(Find(items, criteria));
}

// _ur/common/class-event-machine.ts
var LOG14 = console.log.bind(console);
var WARN3 = console.warn.bind(console);
var m_machines2 = /* @__PURE__ */ new Map();
var EventMachine = class {
  //
  emClass;
  listeners;
  eventNames;
  /// INITIALIZATION ///
  /** require a unique class name for the event machine */
  constructor(emClass) {
    if (!this._okClassName(emClass)) throw Error(`bad classname ${emClass}`);
    this.emClass = emClass;
    this.listeners = /* @__PURE__ */ new Map();
    m_machines2.set(emClass, this);
  }
  /** validate event class name, which must be lower_snake_case */
  _okClassName(eventClass) {
    let validClass = typeof eventClass === "string" && eventClass.length > 0;
    validClass = validClass && eventClass.indexOf("_") !== -1;
    validClass = validClass && eventClass === eventClass.toLowerCase();
    return validClass;
  }
  /// EVENT NAME REGISTRATION ///
  /** validate event names  */
  _okEventName(eventName) {
    let validType = typeof eventName === "string" && eventName.length > 0;
    validType = validType && eventName[0] === eventName[0].toLowerCase();
    if (this.eventNames !== void 0)
      validType = validType && this.eventNames.has(eventName);
    return validType;
  }
  /** define event descriptions for the event machine */
  defineEvent(eventName, eventDesc) {
    if (!this._okEventName(eventName)) throw Error(`bad event name ${eventName}`);
    if (this.eventNames.has(eventName)) throw Error("Event name already defined");
    if (this.eventNames === void 0) this.eventNames = /* @__PURE__ */ new Map();
    this.eventNames.set(eventName, eventDesc);
  }
  /// EVENT MACHINE METHODS ///
  /** Add a listener for an event. You can subscribe '*' wildcard event handlers */
  on(eventName, listener) {
    if (!this._okEventName(eventName)) throw Error(`bad event name ${eventName}`);
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, /* @__PURE__ */ new Set());
    }
    this.listeners.get(eventName).add(listener);
  }
  /** Remove a listener for an event. Remove '*' wildcard events here too */
  off(eventName, listener) {
    if (!this._okEventName(eventName)) throw Error(`bad event name ${eventName}`);
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).delete(listener);
    }
  }
  /** Add a one-time listener for an event. Wildcard '*' listeners are disallowed. */
  once(eventName, listener) {
    if (!this._okEventName(eventName)) throw Error(`bad event name ${eventName}`);
    if (eventName === "*") throw Error("wildcard once events are not allowed");
    const onceListener = (eventName2, param) => {
      listener(eventName2, param);
      this.off(eventName2, onceListener);
    };
    this.on(eventName, onceListener);
  }
  /** Emit an event with optional arguments. Wildcard event listeners are registered to
   *  '*' and fired on every event */
  emit(eventName, param) {
    if (!this._okEventName(eventName)) throw Error(`bad event name ${eventName}`);
    const dispatchTo = /* @__PURE__ */ new Set();
    if (this.listeners.has(eventName)) {
      this.listeners.get(eventName).forEach((listener) => {
        dispatchTo.add(listener);
      });
    }
    if (this.listeners.has("*")) {
      this.listeners.get("*").forEach((listener) => {
        dispatchTo.add(listener);
      });
    }
    dispatchTo.forEach((listener) => {
      listener(eventName, param);
    });
    dispatchTo.clear();
  }
};

// _ur/common/abstract-data-databin.ts
var DataBin = class {
  //
  name;
  // name of this collection
  _type;
  // type of this collection (.e.g ItemList);
  _prefix;
  // when set, this is the prefix for the ids
  _ord_digits;
  // if _prefix is set, then number of zero-padded digits
  _ord_highest;
  // current highest ordinal
  _notifier;
  // event machine for listeners
  /// INITIALIZE ///
  /** base constuctor. call with super(). by default, the _prefix is empty and
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name) {
    this.name = col_name;
    this._init();
  }
  _init() {
    this._prefix = "";
    this._ord_digits = 3;
    this._ord_highest = 0;
  }
  /// SERIALIZATION METHODS ///
  /** API: create a new instance from a compatible state object. note that
   *  OVERRIDING derived classes must handle the _ord_highest calculation */
  _setFromDataObj(data) {
    let { name, _prefix, _ord_digits, _ord_highest } = data;
    if (_prefix === void 0) _prefix = "";
    if (_ord_digits === void 0) _ord_digits = 3;
    if (_ord_highest === void 0) _ord_highest = 0;
    if (name === void 0) return { error: "name missing" };
    if (typeof name !== "string") return { error: "name must be a string" };
    if (typeof _prefix !== "string") return { error: "_prefix must be a string" };
    if (typeof _ord_digits !== "number")
      return { error: "_ord_digits must be a number" };
    if (typeof _ord_highest !== "number")
      return { error: "_ord_highest must be a number" };
    this.name = name;
    this._prefix = _prefix;
    this._ord_digits = _ord_digits;
    this._ord_highest = _ord_highest;
    return { name, _prefix, _ord_digits, _ord_highest };
  }
  /** API: return a data object that represents the current state */
  _getDataObj() {
    return {
      name: this.name,
      _prefix: this._prefix,
      _ord_digits: this._ord_digits,
      _ord_highest: this._ord_highest
    };
  }
  /** find the highest id in the _list. EntityIDs are _prefix string + padded number, so
   *  we can just sort the _list and return the last one */
  newID() {
    const fn2 = "newID:";
    let id;
    if (this._ord_highest > 0) {
      id = (++this._ord_highest).toString();
    } else {
      let maxID = this._findMaxID();
      this._ord_highest = maxID;
      id = (++this._ord_highest).toString();
    }
    const idstr = this._prefix ? id.padStart(this._ord_digits, "0") : id;
    return `${this._prefix}${idstr}`;
  }
  /** decode an id into its _prefix and number */
  decodeID(id) {
    const fn2 = "decodeID:";
    if (!id.startsWith(this._prefix)) return { foreign: id };
    const ord = id.slice(this._prefix.length);
    return { prefix: this._prefix, ord: parseInt(ord) };
  }
  /// NOTIFIER METHODS ///
  /** add a listener to the event machine */
  on(event, lis) {
    if (!this._notifier) this._notifier = new EventMachine(`databin_${this.name}`);
    this._notifier.on(event, lis);
    return {};
  }
  /** remove a listener from the event machine */
  off(event, lis) {
    if (this._notifier) this._notifier.off(event, lis);
    return { error: `off: no notifier for listener ${lis.name}` };
  }
  /** notify listeners of 'change' event */
  notify(evt, data) {
    if (typeof evt !== "string") return { error: "notify: evt must be a string" };
    if (this._notifier) this._notifier.emit(evt, data);
    return {};
  }
};

// _ur/common/class-data-itemlist.ts
var ItemList = class extends DataBin {
  // from base class
  // name: DataBinID; // name of this collection
  // _type: DataBinType; // type of this collection (.e.g ItemList);
  // _prefix: string; // when set, this is the prefix for the ids
  // _ord_digits: number; // if _prefix is set, then number of zero-padded digits
  // _ord_highest: number; // current highest ordinal
  _list;
  // list storage
  /// INITIALIZATION ///
  /** constuctor takes ItemListOptions. If there are no options defined,
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name, opt) {
    super(col_name);
    const fn2 = "ItemList:";
    this._list = [];
    this._type = this.constructor.name;
    let { idPrefix, startOrd, ordDigits } = opt || {};
    if (col_name === void 0) throw Error(`${fn2} collection name is required`);
    if (typeof col_name !== "string")
      throw Error(`${fn2} collection name must be a string`);
    this.name = col_name;
    if (idPrefix === void 0) idPrefix = "";
    if (typeof idPrefix !== "string")
      throw Error(`${fn2} idPrefix must be a string when specified`);
    this._prefix = idPrefix || "";
    this._ord_digits = ordDigits || 3;
    this._ord_highest = startOrd || 0;
  }
  /// SERIALIZATION METHODS ///
  /** implement search for max_id in the current list */
  _findMaxID() {
    let maxID = 0;
    for (const li of this._list) {
      const { prefix, ord, foreign } = this.decodeID(li._id);
      if (foreign) continue;
      if (ord > maxID) maxID = ord;
    }
    return maxID;
  }
  /** API: create a new instance from a compatible state object */
  _setFromDataObj(data) {
    const fn2 = "ItemList._setFromDataObj:";
    let result = super._setFromDataObj(data);
    if (result.error) return { error: `${fn2} ${result.error}` };
    const { items } = data;
    if (!Array.isArray(items)) return { error: `${fn2} _list must be an array` };
    const [norm_list, norm_error] = NormItemList(items);
    if (norm_error) return { error: `${fn2} ${norm_error}` };
    this._list = norm_list;
    this._ord_highest = this._findMaxID();
    return { items: [...this._list] };
  }
  /** API: return a data object that represents the current state */
  _getDataObj() {
    const data = super._getDataObj();
    if (data.error) return { error: data.error };
    return { ...data, items: [...this._list] };
  }
  /** API: serialize JSON into the appropriate data structure */
  _serializeToJSON() {
    const data = this._getDataObj();
    return JSON.stringify(data);
  }
  /** API: deserialize data structure into the appropriate JSON */
  _deserializeFromJSON(json) {
    const fn2 = "_deserializeFromJSON:";
    try {
      const sobj = JSON.parse(json);
      const { error } = this._setFromDataObj(sobj);
      if (error) throw Error(error);
      return { instance: this };
    } catch (err) {
      return { error: `${fn2} ${err.message}` };
    }
  }
  /// LIST ID METHODS ///
  // DataBin base methods: decodeID, newID
  /// LIST METHODS ///
  /** given the name of a _list and an array of objects, add the objects to the
   *  _list and return the _list if successful, undefined otherwise */
  add(items) {
    const fn2 = "add:";
    if (!Array.isArray(items))
      return { error: `${fn2} items must be an array of objects` };
    if (items.length === 0) return { error: `${fn2} items array is empty` };
    const copies = items.map((item) => ({ ...item }));
    for (let item of copies) {
      if (item._id !== void 0)
        return { error: `${fn2} item already has an _id ${item._id}` };
      item._id = this.newID();
    }
    for (let item of items) {
      if (this._list.find((obj) => obj._id === item._id))
        return { error: `${fn2} item ${item._id} already exists in ${this.name}` };
    }
    const added = [...copies];
    this._list.push(...added);
    this.notify("add", { added });
    return { added };
  }
  /** return the entire _list or the subset of ids
   *  identified in the ids array, in order of the ids array. Return a COPY
   *  of the objects, not the original objects */
  read(ids) {
    const fn2 = "read:";
    if (ids === void 0) {
      return { items: [...this._list] };
    }
    const items = ids.map((id) => this._list.find((obj) => obj._id === id));
    if (items.includes(void 0)) {
      return { error: `${fn2} one or more ids not found in ${this.name}` };
    }
    return { items };
  }
  /** Update the objects in the _list with the items provided through shallow
   *  merge. If there items that don't have an _id field or if the _id field
   *  doesn't already exist in the _list, return { error }. Return a copy of _list
   *  if successful */
  update(items) {
    const fn2 = "update:";
    if (!Array.isArray(items) || items === void 0)
      return { error: `${fn2} items must be an array` };
    if (items.length === 0) return { error: `${fn2} items array is empty` };
    const [norm_items, norm_error] = NormItemList(items);
    if (norm_error) return { error: `${fn2} ${norm_error}` };
    for (const item of norm_items) {
      const idx = this._list.findIndex((obj) => obj._id === item._id);
      if (idx === -1)
        return { error: `${fn2} item ${item._id} not found in ${this.name}` };
      Object.assign(this._list[idx], item);
    }
    const updated = [...this._list];
    this.notify("update", { updated });
    return { updated };
  }
  /** Overwrite the objects. Unlike ListUpdate, this will not merge but replace
   *  the items. The items must exist to be replaced */
  replace(items) {
    const fn2 = "replace:";
    if (!Array.isArray(items) || items === void 0)
      return { error: `${fn2} items must be an array` };
    if (items.length === 0) return { error: `${fn2} items array is empty` };
    const [norm_items, norm_error] = NormItemList(items);
    if (norm_error) return { error: `${fn2} ${norm_error}` };
    const replaced = [];
    const skipped = [];
    for (const item of norm_items) {
      const idx = this._list.findIndex((obj) => obj._id === item._id);
      if (idx === -1) {
        skipped.push({ ...item });
        continue;
      }
      const old_obj = { ...this._list[idx] };
      replaced.push(old_obj);
      this._list[idx] = item;
    }
    const error = skipped.length > 0 ? `${fn2} ${skipped.length} items not found in ${this.name}` : void 0;
    this.notify("replace", { replaced, skipped, error });
    return { replaced, skipped, error };
  }
  /** Add the items to the _list. If an already exists in the _list, update it
   *  instead. Return a copy of the _list */
  write(items) {
    const fn2 = "write:";
    const added = [];
    const updated = [];
    for (const item of items) {
      const idx = this._list.findIndex((obj) => {
        if (obj._id === void 0) return false;
        return obj._id === item._id;
      });
      if (idx === -1) {
        item._id = this.newID();
        this._list.push(item);
        added.push({ ...item });
      } else {
        Object.assign(this._list[idx], item);
        updated.push({ ...this._list[idx] });
      }
    }
    this.notify("write", { updated, added });
    return { added, updated };
  }
  /** Delete the objects in the _list with the ids provided. If there are any
   *  ids that don't exist in the _list, return { error }. Return a copy of the
   *  deleted items if successful */
  deleteIDs(ids) {
    const fn2 = "deleteIDs:";
    if (!Array.isArray(ids) || ids === void 0)
      return { error: `${fn2} ids must be an array` };
    const del_ids = NormIDs(ids);
    const itemIDs = [];
    for (const id of del_ids) {
      const idx = this._list.findIndex((obj) => obj._id === id);
      if (idx === -1) return { error: `${fn2} item ${id} not found in ${this.name}` };
      itemIDs.push(id);
    }
    const deletedIDs = [];
    for (const id of itemIDs) {
      const idx = this._list.findIndex((obj) => obj._id === id);
      const item = this._list.splice(idx, 1);
      deletedIDs.push(...item);
    }
    this.notify("deleteID", { deletedIDs });
    return { deletedIDs };
  }
  /** Given a set of objects, delete them from the _list by looking-up their id
   *  fields. Return a copy of the _list */
  delete(items) {
    const fn2 = "delete:";
    if (!Array.isArray(items) || items === void 0)
      return { error: `${fn2} items must be an array of objects` };
    if (items.length === 0) return { error: `${fn2} items array is empty` };
    const [norm_items, norm_error] = NormItemList(items);
    if (norm_error) return { error: `${fn2} ${norm_error}` };
    const deleted = [];
    for (const item of norm_items) {
      const idx = this._list.findIndex((obj) => obj._id === item._id);
      if (idx === -1)
        return { error: `${fn2} item ${item._id} not found in ${this.name}` };
      const del_item = this._list.splice(idx, 1);
      deleted.push(...del_item);
    }
    this.notify("delete", { deleted });
    return { deleted };
  }
  /** erase all the entries in the _list, but do not reset the max_ord or _prefix */
  clear() {
    this._list = [];
    this._ord_highest = 0;
    this.notify("clear", {});
  }
  /** alternative getter returning unwrapped items */
  get(ids) {
    const { items } = this.read(ids);
    return items;
  }
  /// SEARCH METHODS ///
  /** Search for matching items in the list using options, return found items */
  find(criteria) {
    const items = this._list;
    return Find(items, criteria);
  }
  /** Search for matching items in the list, return Recordset */
  query(criteria) {
    const items = this._list;
    return Query(items, criteria);
  }
};

// _ur/common/util-data-ops.ts
var util_data_ops_exports = {};
__export(util_data_ops_exports, {
  DecodeDataConfig: () => DecodeDataConfig,
  DecodeDataURI: () => DecodeDataURI,
  DecodeDatasetReq: () => DecodeDatasetReq,
  DecodeManifest: () => DecodeManifest,
  DecodeSchemaID: () => DecodeSchemaID,
  DecodeSyncReq: () => DecodeSyncReq,
  GetBinPropsByDirname: () => GetBinPropsByDirname,
  GetDatasetObjectProps: () => GetDatasetObjectProps,
  IsAssetDirname: () => IsAssetDirname,
  IsDataSyncOp: () => IsDataSyncOp,
  IsDatasetOp: () => IsDatasetOp,
  IsValidDataConfig: () => IsValidDataConfig,
  IsValidDataURI: () => IsValidDataURI
});
var DSET_MODES = ["local", "local-ro", "sync", "sync-ro"];
var DSET_FSMAP = {
  "itemdicts": { type: "ItemDict", ext: "json" },
  "itemlists": { type: "ItemList", ext: "json" }
  // 'schemas': { type: 'Schema', ext: 'json' },
  // 'stringlists': { type: 'StringList' },
  // 'filelists': { type: 'FileList' },
  // 'appconfigs': { type: 'AppConfig' },
  // 'runconfigs': { type: 'RunConfig' },
  // 'runstates': { type: 'RunState' },
  // 'runlogs': { type: 'RunLog' },
  // 'sessions': { type: 'RunSession' },
  // 'templates': { type: 'Template', ext: 'json' },
  // 'sprites': { type: 'Sprite', ext: 'png' },
};
var DATASET_BINS = Object.keys(DSET_FSMAP);
var DATASET_DIRS = Object.keys(DSET_FSMAP);
var DATA_SYNCOPS = [];
DATA_SYNCOPS.push("CLEAR", "GET", "ADD", "UPDATE", "WRITE", "DELETE", "REPLACE");
DATA_SYNCOPS.push("FIND", "QUERY");
var DATASET_OPS = [
  "LOAD",
  "UNLOAD",
  "PERSIST",
  "GET_MANIFEST",
  "GET_DATA"
];
function GetDatasetObjectProps() {
  return [...DATASET_BINS];
}
function IsAssetDirname(dirname) {
  return DATASET_DIRS.includes(dirname);
}
function IsDataSyncOp(op) {
  return DATA_SYNCOPS.includes(op);
}
function IsDatasetOp(op) {
  return DATASET_OPS.includes(op);
}
function DecodeSchemaID(schemaID) {
  if (typeof schemaID !== "string") return { error: "schema must be a string" };
  const [root, name, param3, ...extra] = schemaID.split(":");
  if (extra.length > 0) return { error: `extra segment(s) '${extra.join(":")}'` };
  const [version, ...param4] = param3.split(";");
  if (version === void 0) return { error: "missing version tag" };
  const tags = {};
  if (param4) {
    param4.forEach((tag) => {
      if (tag.length === 0) return;
      let [key, val] = tag.split("=");
      tags[key] = NormStringToValue(val);
    });
  }
  return {
    root,
    name,
    version,
    tags
  };
}
function DecodeManifest(manifest) {
  const { _dataURI, _meta } = manifest;
  if (typeof _dataURI !== "string") return { error: "bad _dataURI" };
  if (typeof _meta !== "object") return { error: "bad _metaInfo" };
  const { itemlists, itemdicts } = manifest;
  return {
    _dataURI,
    _meta,
    itemlists,
    itemdicts
  };
}
function GetBinPropsByDirname(dirname) {
  const entry = DSET_FSMAP[dirname];
  if (entry) return entry;
}
function DecodeDataURI(dataURI) {
  if (typeof dataURI !== "string") return { error: "not a string" };
  const [orgDomain, param2, param3, ...extra] = dataURI.split(":");
  if (extra.length > 0) return { error: `extra segment '${extra.join(":")}'` };
  if (param2 === void 0) return { error: "missing bucketID" };
  const [bucketID, ...instancePath] = param2.split("/");
  if (instancePath && instancePath.length < 1) return { error: "missing instanceID" };
  const instanceID = instancePath.join("/");
  const appID = instancePath[0];
  const tags = {};
  if (param3 !== void 0) {
    param3.split(";").forEach((tag) => {
      if (tag.length === 0) return;
      let [key, val] = tag.split("=");
      tags[key] = NormStringToValue(val);
    });
  }
  return {
    orgDomain,
    bucketID,
    instanceID,
    appID,
    tags
  };
}
function DecodeDataConfig(configObj) {
  if (configObj === void 0) return { error: "missing configObj" };
  const { mode } = configObj;
  if (!DSET_MODES.includes(mode)) return { error: "invalid mode" };
  return { mode };
}
function IsValidDataURI(dataURI) {
  return DecodeDataURI(dataURI).error === void 0;
}
function IsValidDataConfig(configObj) {
  return DecodeDataConfig(configObj).error === void 0;
}
function DecodeSyncReq(syncReq) {
  const { accToken, op, binID, ids, items, searchOpt } = syncReq;
  if (IsDataSyncOp(op) === false) return { error: `op ${op} not recognized` };
  if (!binID) return { error: "binID is required" };
  if (typeof binID !== "string") return { error: "binID must be a string" };
  if (ids) {
    if (!Array.isArray(ids)) return { error: "ids must be an array" };
    if (ids.some((id) => typeof id !== "string"))
      return { error: "ids must be an array of string IDs" };
  }
  if (items) {
    if (!Array.isArray(items)) return { error: "items must be an array" };
    if (items.some((item) => typeof item !== "object"))
      return { error: "items must be an array of objects" };
  }
  if (searchOpt) {
    if (typeof searchOpt !== "object")
      return { error: "searchOpt must be an object" };
    if (Object.keys(searchOpt).length === 0)
      return { error: "searchOpt must have at least one key" };
    if (searchOpt.preFilter || searchOpt.postFilter) {
      return { error: "filters not supported for remote ops" };
    }
  }
  return { binID, op, accToken, ids, items, searchOpt };
}
function DecodeDatasetReq(req) {
  const fn2 = "DecodeDatasetReq:";
  const { dataURI, authToken, op } = req;
  if (!dataURI) return { error: `${fn2} dataURI is required` };
  if (!op) return { error: `${fn2} op is required` };
  if (!IsDatasetOp(op)) return { error: `${fn2} op [${op}] not recognized` };
  if (typeof dataURI !== "string") return { error: `${fn2} dataURI must be a string` };
  return { dataURI, authToken, op };
}

// _ur/common/class-data-dataset.ts
var LOG15 = console.log.bind(console);
var CTYPES = ["ItemDict", "ItemList"];
function m_IsValidDatasetURI(dataURI) {
  return DecodeDataURI(dataURI).error === void 0;
}
function m_IsValidBinType(cType) {
  return CTYPES.includes(cType);
}
var Dataset = class {
  //
  dataset_name;
  // the name of this list manager
  manifest;
  _dataURI;
  // the URI of the dataset
  open_bins;
  // open bins are subject to sync
  acc_toks;
  // access tokens for each bin
  //
  LISTS;
  // FOLDERS: { [ref_name: DataBinID]: ItemDict };
  // see https://github.com/dsriseah/ursys/discussions/25 for other bin types
  // docfolders
  // files
  // state
  // logs
  // templates
  // config
  /// CONSTRUCTOR ///
  constructor(dataURI, manifest) {
    if (m_IsValidDatasetURI(dataURI)) {
      this._dataURI = dataURI;
    } else {
      console.error("bad dataURI", dataURI);
      throw Error(`invalid dataURI passed to Dataset`);
    }
    if (manifest !== void 0) {
      if (typeof manifest === "object" && DecodeManifest(manifest)) {
        this.manifest = manifest;
      } else {
        console.warn("bad manifest", manifest);
        throw Error(`invalid optional manifest passed to Dataset`);
      }
    }
    this._init();
  }
  /** private: initialize the dataset */
  _init() {
    this.open_bins = /* @__PURE__ */ new Set();
    this.LISTS = {};
  }
  /** private: mark a bin as open */
  _markBinOpen(binName) {
    const fn2 = "_markBinOpen:";
    if (this.open_bins.has(binName))
      throw Error(`${fn2} bin '${binName}' is already open`);
    this.open_bins.add(binName);
  }
  /** private: mark a bin as closed */
  _markBinClosed(binName) {
    const fn2 = "_markBinClosed:";
    if (!this.open_bins.has(binName))
      throw Error(`${fn2} bin '${binName}' is already closed`);
    this.open_bins.delete(binName);
  }
  /// SERIALIZATION METHODS ///
  /** return DataObj representation of the dataset */
  _getDataObj() {
    const lists = {};
    for (const [binID, bin] of Object.entries(this.LISTS)) {
      lists[binID] = bin._getDataObj();
    }
    const docs = {};
    return {
      _dataURI: this._dataURI,
      ItemLists: lists,
      ItemDicts: docs
    };
  }
  /** given a dataset object, set the dataset properties */
  _setFromDataObj(dataObj) {
    const { _dataURI, ItemDicts, ItemLists } = dataObj;
    if (_dataURI) this._dataURI = _dataURI;
    const found = {};
    if (ItemLists) {
      found.ItemLists = [];
      for (const [name, dataBinObj] of Object.entries(ItemLists)) {
        const bin = this.createDataBin(name, "ItemList");
        const { error, items: i } = bin._setFromDataObj(dataBinObj);
        if (error) return { error };
        found.ItemLists.push(name);
      }
    }
    if (ItemDicts) {
      found.ItemDicts = [];
      for (const [name, dataBinObj] of Object.entries(ItemDicts)) {
        const bin = this.createDataBin(name, "ItemDict");
        const { error, items: i } = bin._setFromDataObj(dataBinObj);
        if (error) return { error };
        found.ItemDicts.push(name);
      }
    }
    return found;
  }
  _serializeToJSON() {
    return JSON.stringify(this._getDataObj());
  }
  _deserializeFromJSON(json) {
    this._setFromDataObj(JSON.parse(json));
  }
  /// UNIVERSAL BIN METHODS ///
  /** API: Retrieve the manifest object for the dataset */
  getManifest() {
    return this.manifest;
  }
  /** API: Given a bin name, return the bin. Since bin names are unique, this
   *  method will return just one bin. */
  getDataBin(binName, binType) {
    const fn2 = "openDataBin:";
    if (binType && m_IsValidBinType(binType))
      return this.getDataBinByType(binName, binType);
    let bin;
    bin = this.LISTS[binName];
    return bin;
  }
  /** API: Given a bin name and type, return the bin. */
  getDataBinByType(binName, binType) {
    const fn2 = "openBinByType:";
    let bin;
    switch (binType) {
      case "ItemList":
        bin = this.getItemList(binName);
        break;
    }
    return bin;
  }
  /** API: create a new bin by name and type. */
  createDataBin(binName, binType) {
    const fn2 = "createDataBin:";
    let bin;
    switch (binType) {
      case "ItemList":
        bin = this.createItemList(binName);
        break;
      default:
        throw Error(`${fn2} bin type '${binType}' not recognized`);
    }
    return bin;
  }
  /** API: close a bin by name */
  deleteDataBin(binName) {
    const fn2 = "closeDataBin:";
    if (this.LISTS[binName] === void 0)
      throw Error(`${fn2} bin '${binName}' not found`);
    delete this.LISTS[binName];
  }
  // track open vs closed bins (speculative need)
  /** API: Given a bin name, return the bin. Since bin names are unique, this
   *  method will return just one bin. */
  openDataBin(binName, binType) {
    let bin = this.getDataBin(binName, binType);
    this._markBinOpen(binName);
    return bin;
  }
  /** API: close bin */
  closeDataBin(binName) {
    const fn2 = "closeDataBin:";
    if (!this.open_bins.has(binName))
      throw Error(`${fn2} bin '${binName}' not opened`);
    this._markBinClosed(binName);
    return binName;
  }
  /// ITEM LIST METHODS ///
  /** Given the name of a list, create a new list and return the list
   *  instance */
  createItemList(listName, opt) {
    const fn2 = "createItemList:";
    if (this.LISTS[listName] !== void 0)
      throw Error(`${fn2} list '${listName}' already exists`);
    const list = new ItemList(listName, opt);
    this.LISTS[listName] = list;
    return this.LISTS[listName];
  }
  /** Given the name of a list, clear the list of all items and retain the
   *  same list instance and max ordinal count */
  clearItemList(listName) {
    const fn2 = "clearItemList:";
    const list = this.LISTS[listName];
    if (list === void 0) throw Error(`${fn2} list '${listName}' not found`);
    list.clear();
    return list;
  }
  /** Given the name of a list, return the entire list */
  getItemList(listName) {
    const fn2 = "getItemList:";
    const list = this.LISTS[listName];
    if (list === void 0) throw Error(`${fn2} list '${listName}' not found`);
    return list;
  }
  /// DOC FOLDER METHODS ///
  /** Given the name of a folder, create a new folder and return the folder
   *  instance */
  createDocFolder(folderName) {
  }
  clearDocFolder(folderName) {
  }
  getDocFolder(folderName) {
  }
};

// _ur/node-server/sna-dataobj-adapter.mts
import * as PATH4 from "node:path";

// _ur/common/abstract-dataobj-adapter.ts
var DataObjAdapter = class {
  //
  dataURI;
  accToken;
  // access token
  //
  constructor(opt) {
    if (typeof opt === "object") {
      const { dataURI, accToken } = opt;
      this.dataURI = dataURI;
      this.accToken = accToken;
    }
  }
};

// _ur/node-server/sna-dataobj-adapter.mts
var MANIFEST_FILENAME = "00-manifest";
async function m_GetPredefinedManifests(dataPath) {
  const allfiles = Files(dataPath);
  const mfiles = allfiles.filter((f) => f.startsWith(MANIFEST_FILENAME) && f.endsWith(".json")).sort();
  if (mfiles.length > 0) {
    const manifestObjs = [];
    for (let f of mfiles) {
      const obj = ReadJSON(`${dataPath}/${f}`);
      manifestObjs.push({ manifest: obj, manifest_src: f });
    }
    return manifestObjs;
  }
  return [];
}
async function m_GetDirFilesInfo(assetPath) {
  const files = Files(assetPath, { absolute: true });
  const info = await FilesHashInfo(files);
  return info;
}
async function m_GetDataBinEntries(dataPath, assetPath) {
  const subdirPath = PATH4.join(dataPath, assetPath);
  const filesInfo = await m_GetDirFilesInfo(subdirPath);
  const entries = [];
  for (let info of filesInfo) {
    const { filename, basename: basename3, ext, hash } = info;
    const { type: binType, ext: binExt } = GetBinPropsByDirname(assetPath);
    if (ext !== binExt) continue;
    const asset = {
      name: basename3,
      ext,
      type: binType,
      uri: `${assetPath}/${filename}`,
      hash
    };
    entries.push(asset);
  }
  return entries;
}
async function m_MakeDataBinManifest(dataPath) {
  const raw_manifest = {};
  const { dirs } = GetDirContent(dataPath);
  const assetDirs = dirs.filter((d) => IsAssetDirname(d));
  if (assetDirs.length === 0) {
    return void 0;
  }
  for (const assetDir of assetDirs) {
    switch (assetDir) {
      case "itemlists":
      case "itemdicts":
        raw_manifest[assetDir] = await m_GetDataBinEntries(dataPath, assetDir);
        break;
      default:
        throw Error(`unimplemented asset processor for: ${assetDir}`);
    }
  }
  return raw_manifest;
}
async function GetManifestFromPath(dataPath) {
  const pathInfo = GetPathInfo(dataPath);
  if (pathInfo.isFile)
    return { error: `${dataPath} appears to be a file request, not a directory` };
  if (DirExists(dataPath)) {
    const manifestObjs = await m_GetPredefinedManifests(dataPath);
    if (manifestObjs.length > 0) return manifestObjs[0];
    const dataManifest = await m_MakeDataBinManifest(dataPath);
    return { manifest: dataManifest, manifest_src: "auto-generated" };
  }
  return { error: `${dataPath} does not exist` };
}
function MakePathFromDataURI(dataURI, rootDir) {
  const { orgDomain, bucketID, instanceID } = DecodeDataURI(dataURI);
  const orgPath = orgDomain;
  const bucketPath = bucketID;
  const dataPath = PATH4.join(orgPath, bucketPath, instanceID);
  if (rootDir === void 0) return dataPath;
  if (typeof rootDir !== "string") throw Error("rootDir must be a string");
  if (DirExists(rootDir)) return PATH4.join(rootDir, dataPath);
  throw Error(`MakePathFromDataURI: rootDir ${rootDir} does not exist`);
}
var SNA_DataObjAdapter = class extends DataObjAdapter {
  //
  data_dir;
  // root data directory
  /// INITIALIZERS ///
  constructor(opt) {
    super(opt);
    if (opt?.dataDir) this.setDataDir(opt?.dataDir);
  }
  /// IMPLEMENTATION-SPECIFIC METHODS ///
  /** extended method to set the data directory for this filesystem-based
   *  data object adapter */
  setDataDir(dataDir) {
    if (typeof dataDir !== "string") {
      throw new Error("dataDir must be a string");
    }
    if (!DirExists(dataDir)) {
      throw new Error(`dataDir ${dataDir} does not exist`);
    }
    this.data_dir = dataDir;
  }
  /// ABSTRACT API METHOD IMPLEMENTATION ///
  /** returns manifest object from the filesystem */
  async getManifest(dataURI) {
    if (this.data_dir === void 0) {
      throw Error(`getManifest: data_dir not set`);
    }
    const dataPath = MakePathFromDataURI(dataURI, this.data_dir);
    const {
      manifest: raw_manifest,
      manifest_src,
      error
    } = await GetManifestFromPath(dataPath);
    if (error) return { error };
    const manifest = Object.assign(
      {
        _dataURI: dataURI,
        _meta: {
          author: "sna-dataobj-adapter",
          source: manifest_src,
          create_time: (/* @__PURE__ */ new Date()).toISOString(),
          modify_time: (/* @__PURE__ */ new Date()).toISOString(),
          description: "auto-generated manifest"
        }
      },
      raw_manifest
    );
    return { manifest };
  }
  /** construct a dataset object from the filesystem */
  async readDatasetObj(dataURI) {
    const { manifest, error } = await this.getManifest(dataURI);
    if (error) return { error };
    const { _dataURI, _meta, itemlists, itemdicts } = manifest;
    if (_dataURI !== dataURI)
      return {
        error: "mismatched dataURI",
        errorInfo: `src:${_dataURI} req:${dataURI}`
      };
    const dataPath = MakePathFromDataURI(dataURI, this.data_dir);
    const data = {
      _dataURI
    };
    if (itemlists) {
      data.ItemLists = {};
      for (let list of itemlists) {
        const { name, uri, type } = list;
        const path2 = PATH4.join(dataPath, uri);
        const binObj = await ReadJSON(path2);
        data.ItemLists[name] = binObj;
      }
    }
    if (itemdicts) {
      data.ItemDicts = {};
      for (let dict of itemdicts) {
        const { name, uri, type } = dict;
        const path2 = PATH4.join(dataPath, uri);
        const binObj = await ReadJSON(path2);
        data.ItemDicts[name] = binObj;
      }
    }
    return data;
  }
  /** write dataset object to the filesystem */
  async writeDatasetObj(dataURI, dsObj) {
    const dataPath = MakePathFromDataURI(dataURI, this.data_dir);
    const { _dataURI, ItemLists, ItemDicts } = dsObj;
    if (_dataURI !== dataURI)
      return {
        error: "mismatched dataURI",
        errorInfo: `src:${_dataURI} req:${dataURI}`
      };
    const saved = [];
    if (ItemLists) {
      for (let [name, binObj] of Object.entries(ItemLists)) {
        const uri = `${name}.json.bak`;
        const path2 = PATH4.join(dataPath, "itemlists", uri);
        await WriteJSON(path2, binObj);
        saved.push(PATH4.basename(path2));
      }
    }
    if (ItemDicts) {
      for (let [name, binObj] of Object.entries(ItemDicts)) {
        const uri = `${name}.json.bak`;
        const path2 = PATH4.join(dataPath, "itemdicts", uri);
        await WriteJSON(path2, binObj);
        saved.push(PATH4.basename(path2));
      }
    }
    return { status: `saved: ${saved.join(", ")}` };
  }
  /** read databin object from the filesystem */
  async readDataBinObj(dataURI, binID) {
    console.log("would get databin obj");
    return {};
  }
  /** write databin object to the filesystem */
  async writeDataBinObj(dataURI, binID, dataObj) {
    console.log("would save databin obj");
    return {};
  }
};

// _ur/node-server/sna-dataserver.mts
var LOG16 = makeTerminalOut("SNA.DSRV", "TagBlue");
var DATASETS = {};
var DSFS = new SNA_DataObjAdapter();
var cur_data_uri = "";
async function LoadDataset(dataURI) {
  let dset = DATASETS[dataURI];
  if (dset) return { status: "already loaded", manifest: dset.manifest };
  const { manifest, error } = await DSFS.getManifest(dataURI);
  if (error) return { error };
  dset = new Dataset(dataURI, manifest);
  DATASETS[dataURI] = dset;
  const dataObj = await DSFS.readDatasetObj(dataURI);
  DATASETS[dataURI]._setFromDataObj(dataObj);
  cur_data_uri = dataURI;
  return { status: "ok", manifest };
}
async function CloseDataset(dataURI) {
  return { error: "not implemented" };
}
async function PersistDataset(dataURI) {
  const dset = DATASETS[dataURI];
  if (dset === void 0) return { error: `dataset [${dataURI}] not found` };
  const dataObj = dset._getDataObj();
  const { error, status } = await DSFS.writeDatasetObj(dataURI, dataObj);
  if (error) return { error };
  return { status };
}
async function GetDatasetData(dataURI) {
  const dset = DATASETS[dataURI || cur_data_uri];
  if (dset === void 0) return { error: `dataset [${dataURI}] not found` };
  const dataObj = {
    _dataURI: dset._dataURI,
    ...dset._getDataObj()
  };
  return dataObj;
}
async function GetManifest(dataURI) {
  const dset = DATASETS[dataURI || cur_data_uri];
  return dset.getManifest();
}
function OpenBin(binName, options) {
  const { binType, autoCreate } = options;
  const DSET = DATASETS[cur_data_uri];
  let bin = DSET.openDataBin(binName);
  return { bin };
}
function CloseBin(bin) {
  const { name } = bin;
  const DSET = DATASETS[cur_data_uri];
  let binName = DSET.closeDataBin(name);
  return { binName };
}
async function _handleDatasetOp(opParams) {
  const fn2 = "_handleDatasetOp:";
  const { dataURI, authToken, op, error } = DecodeDatasetReq(opParams);
  if (error) return { error };
  let result;
  switch (op) {
    case "LOAD":
      result = LoadDataset(dataURI);
      break;
    case "UNLOAD":
      result = CloseDataset(dataURI);
      break;
    case "PERSIST":
      result = PersistDataset(dataURI);
      break;
    case "GET_DATA":
      result = GetDatasetData(dataURI);
      break;
    case "GET_MANIFEST":
      result = GetManifest(dataURI);
      LOG16("** would return manifest");
      result = { manifest: "{}" };
      break;
    default:
      result = { error: `${fn2} op [${op}] not recognized` };
  }
  return result;
}
async function _handleDataOp(opParams) {
  const { binID, op, items, ids, searchOpt, error } = DecodeSyncReq(opParams);
  if (error) return { error };
  const DSET = DATASETS[cur_data_uri];
  const bin = DSET.getDataBin(binID);
  if (bin === void 0) return { error: `DSRV: bin [${binID}] not found` };
  switch (op) {
    case "GET":
      if (ids) return bin.read(ids);
      return bin.get();
    case "ADD":
      if (items) return bin.add(items);
      return { error: "DSRV: items required for ADD operation" };
    case "UPDATE":
      if (items) return bin.update(items);
      return { error: "DSRV: items required for UPDATE operation" };
    case "WRITE":
      if (items) return bin.write(items);
      return { error: "DSRV: items required for WRITE operation" };
    case "DELETE":
      if (ids) return bin.deleteIDs(ids);
      if (items) return bin.delete(items);
      return { error: "DSRV: ids or items required for DELETE operation" };
    case "REPLACE":
      if (items) return bin.replace(items);
      return { error: "DSRV: items required for REPLACE operation" };
    case "CLEAR":
      return bin.clear();
    case "FIND":
      if (searchOpt) return bin.find(searchOpt);
      return { error: "DSRV: searchOpt required for FIND operation" };
    case "QUERY":
      if (searchOpt) return bin.query(searchOpt);
      return { error: "DSRV: searchOpt required for QUERY operation" };
    default:
      return { error: `DSRV: operation ${op} not recognized` };
  }
}
function PreHook() {
  const { runtime_dir } = SNA_GetServerConfig();
  DSFS.setDataDir(runtime_dir);
  SNA_HookServerPhase("EXPRESS_READY", () => {
    AddMessageHandler("SYNC:SRV_DSET", _handleDatasetOp);
    AddMessageHandler("SYNC:SRV_DATA", _handleDataOp);
  });
}
var sna_dataserver_default = SNA_NewComponent2("dataserver", {
  PreHook
});

// _ur/node-server/sna-node.mts
var { BLU: BLU6, YEL: YEL5, RED: RED4, DIM: DIM6, NRM: NRM7 } = ANSI_COLORS;
var LOG17 = makeTerminalOut("SNA", "TagCyan");
async function SNA_Start() {
  SNA_UseComponent(sna_dataserver_default);
  SNA_HookServerPhase("SRV_READY", LOG17("Server Ready"));
  await SNA_LifecycleStart();
}
function SNA_Status() {
  const fn2 = "SNA_Status:";
  const dooks = GetDanglingHooks();
  const status = SNA_LifecycleStatus();
  return {
    dooks,
    ...status
  };
}
function SNA_GetProcessInfo(proc = process) {
  const scriptPath = proc.argv[1];
  const scriptDir = scriptPath.split("/").slice(0, -1).join("/");
  const scriptName = scriptPath.split("/").pop();
  const args = proc.argv.slice(2);
  return [scriptDir, scriptName, args];
}

// _ur/node-server/assetserver.mts
var assetserver_exports = {};
__export(assetserver_exports, {
  AssetManifest_Middleware: () => AssetManifest_Middleware,
  DeliverManifest: () => DeliverManifest,
  SetupServer: () => SetupServer
});
import * as FSE2 from "fs-extra";
import PATH6 from "path";
import express2 from "express";
import serveIndex2 from "serve-index";

// _ur/node-server/util-express.mts
import * as PATH5 from "node:path";
function GetReqInfo(req, baseRoute) {
  if (typeof baseRoute !== "string") {
    req = baseRoute;
    baseRoute = "";
  }
  if (baseRoute.endsWith("/")) baseRoute = baseRoute.slice(0, -1);
  if (typeof req !== "object") {
    console.log("error: arg1 should be route, arg2 should be request objets");
    return void 0;
  }
  const hostRoute = baseRoute === "" ? "" : `/${baseRoute}`;
  const baseURL = `${req.protocol}://${req.headers.host}${hostRoute}`;
  const fullURL = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  const host = req.headers.host;
  const { pathname, searchParams } = new URL(req.url, baseURL);
  const basename3 = PATH5.basename(pathname);
  const extname2 = PATH5.extname(pathname);
  return {
    // given req to http://domain.com/path/to/name?foo=12&bar
    baseURL,
    // http://domain.com/route
    fullURL,
    // http://domains.com/route/path/base
    pathname,
    // we want /path/base
    basename: basename3,
    // we want base
    extname: extname2,
    // we want ext of base if it exists
    host,
    // we want domain.com
    searchParams
    // [SearchParameterObject]
  };
}

// _ur/node-server/assetserver.mts
var PACKAGE_NAME = "URSYS-ASSETSERVER";
var MANIFEST_FILENAME2 = "00-manifest";
var APP2;
var m_asset_path;
var m_asset_uri;
var m_asset_counter = 1e3;
function m_GetPredefinedManifests2(dataPath) {
  const allfiles = Files(dataPath);
  const mfiles = allfiles.filter((f) => f.startsWith(MANIFEST_FILENAME2) && f.endsWith(".json")).sort();
  if (mfiles.length > 0) {
    const manifestObjs = [];
    for (let f of mfiles) {
      const obj = ReadJSON(`${dataPath}/${f}`);
      manifestObjs.push(obj);
    }
    return manifestObjs;
  }
  return [];
}
async function m_GetAssetFileInfo(assetPath) {
  const files = Files(assetPath);
  const assetInfo = await FilesHashInfo(files);
  return assetInfo;
}
async function m_MakeManifestObj(assetDirs) {
  const manifest = {};
  for (const subdir of assetDirs) {
    const assetInfo = await m_GetAssetFileInfo(subdir);
    const entries = [];
    for (let info of assetInfo) {
      const assetId = m_asset_counter++;
      const { filename, ext, hash } = info;
      const asset = {
        assetId,
        assetName: filename,
        assetUrl: `${subdir}/${filename}`,
        assetType: ext,
        hash
      };
      entries.push(asset);
    }
    manifest[subdir] = entries;
  }
  return manifest;
}
async function DeliverManifest(req, res, next) {
  const manifest = {};
  const { fullURL, pathname, searchParams } = GetReqInfo(req);
  const path2 = PATH6.join(m_asset_path, pathname);
  if (!searchParams.has("manifest")) {
    next();
    return;
  }
  const pathInfo = GetPathInfo(path2);
  if (pathInfo.isFile) {
    const err = `${fullURL} appears to be a file request, not a directory`;
    res.status(400).send(err);
    return;
  }
  if (DirExists(path2)) {
    const mdata = m_GetPredefinedManifests2(path2);
    if (mdata.length > 0) {
      res.json(mdata);
      return;
    }
    const { dirs } = GetDirContent(path2);
    const assetDirs = dirs.filter((d) => IsAssetDirname(d));
    if (assetDirs.length > 0) {
      m_MakeManifestObj(assetDirs).then((result) => {
        res.json(result);
      });
      return;
    }
    return;
  }
}
function AssetManifest_Middleware(opts) {
  const { assetPath, assetURI } = opts;
  return (req, res, next) => {
    m_asset_path = assetPath;
    m_asset_uri = assetURI;
    DeliverManifest(req, res, next);
  };
}
function SetupServer() {
  const fn2 = "SetupServer:";
  const assetPath = "abspath-to/asset-dir";
  const assetURI = "https://server/asset-dir";
  FSE2.ensureDirSync(PATH6.join(assetPath));
  const INDEX_TEXT = `${PACKAGE_NAME} - GEMSTEP MAIN CONTROL PROGRAM HOST `;
  const INDEX_SEND = PATH6.join(assetPath, "_serverId.txt");
  FSE2.writeFileSync(INDEX_SEND, INDEX_TEXT);
  if (APP2) throw Error(`${fn2} server already set up`);
  APP2 = express2();
  APP2.use(
    "/assets",
    AssetManifest_Middleware({ assetPath, assetURI }),
    // should be gs_assets_hosted
    express2.static(assetPath),
    // UR.MediaProxy_Middleware({}) // asset host servers do not proxy
    serveIndex2(assetPath, { "icons": true })
  );
}

// _ur/node-server/process.mts
var process_exports = {};
__export(process_exports, {
  DecodeAddonArgs: () => DecodeAddonArgs,
  ValidateAddon: () => ValidateAddon
});
import process2 from "node:process";
import PATH7 from "node:path";
var LOG18 = makeTerminalOut("PROCESS", "TagGreen");
function m_DecodeAddonName(shortPath) {
  let addonName, entryName;
  if (typeof shortPath !== "string") {
    LOG18("error: arg must be a string path not", typeof shortPath);
    return {};
  }
  const pathbits = shortPath.split("@");
  if (pathbits.length === 2) {
    addonName = pathbits[0];
    entryName = pathbits[1];
  } else if (pathbits.length === 1) {
    addonName = shortPath;
  } else return { error: `error: '${shortPath}' has too many '@'` };
  if (entryName !== void 0 && typeof entryName !== "string")
    return { err: `error: can't parse @entryname` };
  if (entryName) {
    if (entryName.indexOf(".") !== -1)
      return { err: `error: entryName '${entryName}' must not contain '.'` };
  }
  if (entryName !== void 0) entryName = `@${entryName}`;
  return { addonName, entryName };
}
function DecodeAddonArgs(argv) {
  let [
    ,
    a_enp,
    // abs path to entry script (e.g. launched entrypoint)
    addonName,
    // passed addon name from launcher script
    ...args
    // passed parameters from launcher script
  ] = argv || process2.argv;
  const addonScript = PATH7.basename(a_enp, PATH7.extname(a_enp));
  return [
    addonScript,
    // script name of entry point
    addonName,
    // passed addon name (e.g. 'net')
    ...args
    // passed arguments
  ];
}
function ValidateAddon(addon) {
  const ADDONS = PATH7.join(DetectedRootDir(), "_ur_addons");
  if (!DirExists(ADDONS)) {
    return { err: `directory ${ADDONS} does not exist` };
  }
  const f_dir = (item) => !(item.startsWith("_") || item === "node_modules");
  const a_dirs = Subdirs(ADDONS).filter(f_dir);
  let { addonName, entryName, error } = m_DecodeAddonName(addon);
  if (error) return { error };
  if (!a_dirs.includes(addonName))
    return {
      err: `error: addon '${addonName}' not found in ${ADDONS} directory`
    };
  const addon_dir = PATH7.join(ADDONS, addonName);
  const a_files = Files(addon_dir);
  if (!a_files) {
    return { err: `error: addon '${addonName}' directory has no files` };
  }
  const entryFiles = a_files.filter((item) => item.startsWith("@"));
  if (entryFiles.length === 0) {
    return { err: `error: addon '${addonName}' has no @entryfiles` };
  }
  let entryFile;
  if (!entryName) {
    if (entryFiles.length > 0) {
      entryFile = entryFiles[0];
      entryName = PATH7.basename(entryFile, PATH7.extname(entryFile));
      return {
        addonName,
        entryName,
        entryFile,
        entryFiles
      };
    }
    return { err: `addon '${addonName}' has no @entry files` };
  }
  const regex = new RegExp(`${entryName}\\.[^\\.]+$`, "i");
  entryFile = entryFiles.find((filename) => regex.test(filename));
  if (!entryFile) {
    return { err: `error: entry '${entryName}' not found in '${addonName}' addon` };
  }
  return {
    addonName,
    entryName,
    entryFile,
    entryFiles
  };
}

// _ur/node-server/ur-addon-mgr.mts
var ur_addon_mgr_exports = {};
__export(ur_addon_mgr_exports, {
  ProcTest: () => ProcTest,
  UR_Fork: () => UR_Fork
});
import { fork } from "node:child_process";
import { join as join2 } from "node:path";

// _ur/node-server/class-urmodule.mts
import { EventEmitter } from "node:events";
import { Readable, Writable, Duplex, Transform } from "node:stream";
import { ChildProcess } from "node:child_process";
var LOG19 = makeTerminalOut("URMOD", "TagYellow");
var UrModule = class _UrModule {
  //
  id = void 0;
  modObj = void 0;
  // the wrapped module
  modName = "";
  // descriptive name (optional)
  modType = "";
  // modType of module object implementation
  modIn = void 0;
  // instance of UrModule
  modOut = void 0;
  // instance of UrModule
  //
  protocol = void 0;
  inputBuffer = [];
  outputBuffer = [];
  error = "";
  //
  static modtype_enum = ["null", "event", "fork", "stream", "urnet"];
  static buffer_size = 100;
  static id_counter = 100;
  /** constructor
   *  this class wraps the provided object with a standardized interface,
   *  supporting the types defined in this.modtype_enum. It performs a runtime
   *  check to determine the modType of the provided object.
   *  @param {object} obj an eventEmitter, process, or stream
   *  @param {object} modIn instance of UrModule
   *  @param {object} modOut instance of UrModule
   */
  constructor(mobj, opt) {
    this.protocol = void 0;
    this.modType = _UrModule.modtype_enum[0];
    this.id = _UrModule.id_counter++;
    this.manageFork = this.manageFork.bind(this);
    const { input, output, name } = opt || {};
    if (typeof name === "string") this.setName(name);
    LOG19(`UrModule '${u_modname(this)}' constructing`);
    if (mobj instanceof ChildProcess) {
      this.modType = "fork";
      this.modObj = mobj;
      this.manageFork();
    } else if (u_is_stream(mobj)) {
      this.modType = "stream";
    } else if (mobj.HandleMessage && mobj.Call) {
      this.modType = "urnet";
    } else if (mobj instanceof EventEmitter) {
      this.modType = "event";
    } else {
      this.error = "UrModule(): not an eventEmitter, process, or stream";
      console.log(this.error);
      throw new Error(this.error);
    }
    LOG19("linking");
    this.linkModules(input, output);
    LOG19("*** TODO *** process running goes here");
  }
  /** set the name of the module */
  setName(name) {
    if (typeof name !== "string")
      throw new Error("UrModule.setName(): name must be a string");
    this.modName = name;
  }
  /** set up the handler for a child process that is compatible with
   *  the UrModule interface.
   */
  manageFork() {
    if (this.modObj === void 0) throw new Error("manageFork(): modObj undefined");
    this.modObj.on("message", (msg) => {
      LOG19(`[${u_modname(this)}] DATAEX:`, msg);
      const { dataex, data } = msg;
      if (dataex === "_CONFIG_ACK") {
        const { protocol } = data;
        if (typeof protocol === "string") {
          this.protocol = protocol;
          this.activateInput();
          this.activateOutput();
        }
      }
    });
    this.modObj.send({ dataex: "_CONFIG_REQ", data: {} });
  }
  /** initializes datalink for connected modules. it's called
   *  by the constructor implictly.
   */
  linkModules(modIn, modOut) {
    if (this.modIn !== void 0 || this.modOut !== void 0) {
      this.error = "UrModule.linkModules(): already linked";
      throw new Error(this.error);
    }
    if (modIn !== void 0) {
      if (modIn instanceof _UrModule) {
        this.modIn = modIn;
      } else {
        this.error = "UrModule.connect(): invalid modIn";
        throw new Error(this.error);
      }
    }
    if (modOut !== void 0) {
      if (modOut instanceof _UrModule) {
        this.modOut = modOut;
      } else {
        this.error = "UrModule.connect(): invalid modOut";
        throw new Error(this.error);
      }
    }
  }
  /** the input modules are a data source, so we expect to
   *  receive data messages as well as handshake information.
   *  Uses URDEX protocol: expects 'DATA' message
   */
  activateInput() {
    this.modIn.on("message", (msg) => {
      const { dataex, data } = msg;
      switch (dataex) {
        case "DATA":
          this.bufferInput(data);
          break;
        default:
          LOG19("unhandled input dataex:", dataex);
          break;
      }
    });
    LOG19("awaiting input");
  }
  /** the output modules will communicate their status back
   *  to this module, providing events to signal what's going
   *  on.
   *  Uses URDEX protocol
   */
  activateOutput() {
    LOG19("connecting to output module");
    this.modOut.on("message", (msg) => {
      const { dataex, data } = msg;
      switch (dataex) {
        case "exit":
          break;
        default:
          LOG19("unknown output dataex:", dataex);
          break;
      }
    });
  }
  /** URDEX PROTOCOL *********************************************************/
  /** used to buffer input data as it is received, but not processed. Each
   *  chunk of data is of whatever modType is to be expected from the upstream
   *  module.
   *  @param {object} data the data to be buffered
   */
  bufferInput(data = {}) {
    this.inputBuffer.push(data);
    if (this.inputBuffer.length > _UrModule.buffer_size) {
      this.error = "overflow";
    }
  }
  /** retrieve buffered data one chunk at a time */
  getInputData() {
    if (this.inputBuffer.length === 0) {
      this.error = "underflow";
      return void 0;
    }
    this.error = "";
    return this.inputBuffer.shift();
  }
};
var u_is_stream = (obj) => obj instanceof Readable || obj instanceof Writable || obj instanceof Duplex || obj instanceof Transform;
var u_modname = (instance) => instance.modName || instance.id;
var class_urmodule_default = UrModule;

// _ur/common/declare-errors.ts
var EXIT_CODES = {
  ERR_UR: 444
  // ur runner general error
};

// _ur/common/util-error-mgr.ts
var { ERR_UR } = EXIT_CODES;
var ERROUT = makeTerminalOut("ERR", "TagRed");
var DIE = (...args) => {
  Error.stackTraceLimit = 20;
  let errs = new Error(`UR Process Terminated (${ERR_UR})`).stack.split("\n");
  let myErrs = errs.filter((line) => {
    if (line.includes("at Module.")) return false;
    if (line.includes("at require ")) return false;
    return true;
  }).join("\n");
  ERROUT(`\x1B[93m${args.join(" ")}\x1B[0m`);
  ERROUT(myErrs);
  process.exit(ERR_UR);
};

// _ur/node-server/ur-addon-mgr.mts
var LOG20 = util_prompts_default.TerminalLog("UPROC", "TagCyan");
var DBG8 = true;
var LAUNCH_PREFIX = "@";
var { DIR_UR_ADDS: DIR_UR_ADDS2 } = GetRootDirs();
var URDIR = "";
async function UR_Fork(modname, opt = {}) {
  const fn2 = `UR_Fork ${modname}:`;
  LOG20(fn2, "starting");
  let child;
  const { input, output, cwd } = m_ParseOptions(opt);
  if (cwd) URDIR = cwd;
  if (URDIR.endsWith("/")) URDIR = URDIR.slice(0, -1);
  let { modpath, entry } = m_ParseModulePathString(modname, fn2);
  let forkPath = `${URDIR}/${modpath}`;
  if (DBG8) LOG20("searching", u_short(forkPath), "for modules");
  const entryFiles = m_ReadModuleEntryFiles(modpath);
  if (DBG8) LOG20("found entryfiles", entryFiles);
  if (entry) {
    if (!entryFiles.includes(entry))
      DIE(fn2, `error: %{entry} is not in ${URDIR}${modpath}`);
    if (DBG8) LOG20(`launching '${u_short(forkPath)}/${entry}'`);
    child = fork(entry, { cwd: forkPath });
    return child;
  }
  if (entryFiles.length === 0)
    DIE(fn2, `error: no @entry modules found in ${URDIR}${modpath}`);
  entry = entryFiles[0];
  if (DBG8) LOG20(`launching '${modpath}/${entry}'`);
  child = fork(entry, { cwd: `${URDIR}${modpath}/` });
  const urmod = new class_urmodule_default(child, { name: `${modpath}/${entry}` });
  return urmod;
}
function m_ParseOptions(opt) {
  const fn2 = "m_ParseOptions";
  let { input, output, cwd = "" } = opt;
  if (input) {
    if (!(input instanceof class_urmodule_default))
      throw new Error(`${fn2}: input must be UrModule instance or undefined`);
  }
  if (output) {
    if (!(output instanceof class_urmodule_default))
      throw new Error(`${fn2}: output must be UrModule instance or undefined`);
  }
  if (cwd) {
    if (typeof cwd !== "string")
      throw new Error(`${fn2}: cwd must be string or undefined`);
  } else {
    cwd = DIR_UR_ADDS2;
  }
  return {
    input,
    output,
    cwd
  };
}
function m_ParseModulePathString(modname, fn2 = "m_ParseModulePathString") {
  let modpath, entry;
  if (typeof modname !== "string")
    DIE(fn2, "error: arg1 must be a string path not", typeof modname);
  const pathbits = modname.split("/");
  if (pathbits.length === 2) {
    modpath = pathbits[0];
    entry = pathbits[1];
  } else if (pathbits.length === 1) {
    modpath = modname;
  } else DIE(fn2, "error: arg1 syntax path too deep");
  if (entry !== void 0 && typeof entry !== "string")
    DIE(fn2, "error: bad module entry");
  if (entry && !entry.startsWith("@"))
    DIE(fn2, `error: entrypoint '${entry}' must begin with @`);
  return { modpath, entry };
}
function m_ReadModuleEntryFiles(modname) {
  const fn2 = "m_ReadModuleEntryFiles:";
  const modulePath = join2(URDIR, modname);
  if (!DirExists(modulePath)) {
    console.log("error", modulePath);
    DIE(fn2, "error:", modname, `not found in ${URDIR} directory`);
  }
  const files = Files(modulePath);
  const entryFiles = files.filter((file) => file.startsWith(LAUNCH_PREFIX));
  return entryFiles;
}
function ProcTest() {
  console.log("proc test");
}

// _ur/common/module-uid.ts
var module_uid_exports = {};
__export(module_uid_exports, {
  DecodeID: () => DecodeID,
  GetDefaultSchema: () => GetDefaultSchema,
  IsValidFormat: () => IsValidFormat,
  IsValidPrefix: () => IsValidPrefix,
  IsValidSchema: () => IsValidSchema,
  NewFullID: () => NewFullID,
  NewID: () => NewID,
  PrefixShortID: () => PrefixShortID,
  SetDefaultSchema: () => SetDefaultSchema
});
var SCHEMAS = {
  "meme": {
    "n": "node",
    "e": "edge",
    "p": "project"
  }
};
var DEFAULT_SCHEMA = "";
var ID_COUNTER = 0;
function DecodeID(uid) {
  if (!IsValidFormat(uid)) return [];
  let bits = uid.split(":");
  if (bits.length < 1 || bits.length > 2) return [];
  if (bits.length === 1) bits.unshift("");
  const [schema, prefix] = bits;
  bits = prefix.split("-");
  if (bits.length !== 2) return [];
  return [schema, ...bits];
}
function NewID(prefix, int) {
  const fn2 = "ShortID:";
  if (int !== void 0) {
    if (typeof int !== "number") throw new Error(`${fn2} invalid id ${int}`);
    if (int < 0) throw new Error(`${fn2} negative id ${int}`);
    if (int % 1 !== 0) throw new Error(`${fn2} non-integer id ${int}`);
  } else {
    int = ID_COUNTER++;
  }
  const uid = `${prefix}-${int}`;
  return uid;
}
function NewFullID(schema, prefix, int) {
  const fn2 = "EncodeID:";
  const shortUID = NewID(prefix, int);
  if (!IsValidSchema(schema)) throw new Error(`${fn2} unknown schema ${schema}`);
  if (!IsValidPrefix(`${schema}:${prefix}`))
    throw new Error(`${fn2} unknown prefix ${prefix}`);
  const uid = `${schema}:${prefix}-${int}`;
  return uid;
}
function PrefixShortID(uid, prefix) {
  const [_, id] = DecodeID(uid);
  return NewID(prefix, parseInt(id));
}
function IsValidFormat(uid) {
  const isLowerCase = uid === uid.toLowerCase();
  const isFullForm = /^[\w]+:[\w]+-[\d]+$/.test(uid);
  const isShortForm = /^[\w]+-[\d]+$/.test(uid);
  return isLowerCase && (isFullForm || isShortForm);
}
function IsValidSchema(schema) {
  return Object.keys(SCHEMAS).includes(schema);
}
function IsValidPrefix(sch_pre) {
  const fn2 = "IsValidPrefix:";
  const bits = sch_pre.split(":");
  if (bits.length > 2) throw new Error(`${fn2} Invalid schema prefix ${sch_pre}`);
  if (bits.length === 1) bits.unshift("");
  const [schema, prefix] = bits;
  const isValidSchema = IsValidSchema(schema);
  const isValidPrefix = Object.keys(SCHEMAS[schema]).includes(prefix);
  return isValidSchema && isValidPrefix;
}
function SetDefaultSchema(schema) {
  const fn2 = "SetDefaultSchema:";
  if (!IsValidSchema(schema)) throw new Error(`${fn2} Invalid schema ${schema}`);
  DEFAULT_SCHEMA = schema;
}
function GetDefaultSchema() {
  return DEFAULT_SCHEMA;
}

// _ur/common/@common-classes.ts
var common_classes_exports = {};
__export(common_classes_exports, {
  DataBin: () => DataBin,
  DataObjAdapter: () => DataObjAdapter,
  Dataset: () => Dataset,
  DatasetAdapter: () => DatasetAdapter,
  DatasetManifest: () => DatasetManifest,
  EventMachine: () => EventMachine,
  ItemList: () => ItemList,
  ModeMachine: () => ModeMachine,
  NetEndpoint: () => NetEndpoint,
  NetPacket: () => NetPacket,
  NetSocket: () => NetSocket,
  OpSequencer: () => OpSequencer,
  PhaseMachine: () => PhaseMachine,
  RecordSet: () => RecordSet,
  SNA_Component: () => SNA_Component,
  ServiceMap: () => ServiceMap,
  StateMgr: () => StateMgr,
  TransactionMgr: () => TransactionMgr,
  default: () => common_classes_default
});

// _ur/common/class-mode-machine.ts
var LOG21 = console.log.bind(console);
var WARN4 = console.warn.bind(console);
var m_machines3 = /* @__PURE__ */ new Map();
var ModeMachine = class {
  //
  mmClass;
  modeNames;
  /// INITIALIZATION ///
  /** require a unique class name for the event machine */
  constructor(mmClass) {
    if (!this._okClass(mmClass)) throw Error(`bad emClass ${mmClass}`);
    this.mmClass = mmClass;
    m_machines3.set(mmClass, this);
  }
  /** validate mode machine class name, which must be lower_snake_case */
  _okClass(mmClass) {
    let validClass = typeof mmClass === "string" && mmClass.length > 0;
    validClass = validClass && mmClass.indexOf("_") !== -1;
    validClass = validClass && mmClass === mmClass.toLowerCase();
    return validClass;
  }
  /// MODE NAME REGISTRATION ///
  /** validate mode names  */
  _okMode(modeName) {
    let validType = typeof modeName === "string" && modeName.length > 0;
    validType = validType && modeName.slice(0, 2) === "::";
    validType = validType && modeName[3] === modeName[3].toUpperCase();
  }
};

// _ur/common/class-op-seq.ts
var OPSEQS = /* @__PURE__ */ new Map();
function m_ValidateSeqName(sn) {
  const fn2 = "m_ValidateSeqName";
  const pcErr = "name must be PascalCase string";
  if (sn === "") throw Error(`${fn2}: ${pcErr}`);
  if (sn === void 0) throw Error(`${fn2}: ${pcErr}`);
  if (typeof sn !== "string") throw Error(`${fn2}: ${pcErr}`);
  if (sn !== sn[0].toUpperCase() + sn.slice(1)) throw Error(`${fn2}: ${pcErr}`);
  if (sn.trim() !== sn)
    throw Error(`${fn2}: name must not have leading/trailing spaces`);
}
function m_ValidateActiveSeq(seq) {
  if (seq instanceof OpSequencer) {
    if (seq._disposed) throw Error(`sequencer ${seq.seqName} is disposed`);
    else return;
  }
  throw Error("not a sequence instance or undefined");
}
function m_ValidateNodeName(nn) {
  const fn2 = "m_ValidateNodeName";
  if (nn === "") throw Error(`${fn2}: name must be lc string`);
  if (nn === void 0) throw Error(`${fn2}: name must be lc string`);
  if (typeof nn !== "string") throw Error(`${fn2}: name must be lc string`);
  if (nn !== nn.toLowerCase()) throw Error(`${fn2}: name must be lc`);
  if (nn.trim() !== nn)
    throw Error(`${fn2}: name must not have leading/trailing spaces`);
}
var OpSequencer = class _OpSequencer {
  ops;
  // array of operations
  seqName;
  // sequencer name
  lastOp;
  // last operation
  currentOp;
  // current operation
  opIndex;
  // current operation index
  opsMap;
  // map opname to index in ops array
  subs;
  // map opname to set of subscribers
  _disposed;
  // true if disposed
  constructor(seqName) {
    m_ValidateSeqName(seqName);
    seqName = seqName.trim().toUpperCase();
    if (OPSEQS.has(seqName)) {
      console.warn(
        `(not an error) '${seqName}' construction duplicate, returning existing instance`
      );
      return OPSEQS.get(seqName);
    }
    this.seqName = seqName;
    this.ops = [];
    this.opsMap = /* @__PURE__ */ new Map();
    this.opIndex = -1;
    this.currentOp = null;
    this.lastOp = null;
    this.subs = /* @__PURE__ */ new Map();
    this._disposed = false;
    OPSEQS.set(seqName, this);
  }
  /* --- add nodes --- */
  /** given nodeName and a source TOpNode, add a clone of the source node to the sequencer */
  addOp(name, data, opt) {
    const fn2 = "addOp";
    if (data === void 0) throw Error(`${fn2}: arg2 must be TOpNode`);
    if (typeof name !== "string") throw Error(`${fn2}: arg1 must be name:string`);
    if (typeof data._name === "string") throw Error(`${fn2}: node ${name} reused`);
    if (data._index !== void 0) throw Error(`${fn2}: node ${name} reused`);
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(name);
    if (this.opIndex !== -1) throw Error(`${fn2}: sequencer already started`);
    if (this.hasOp(name)) throw Error(`${fn2}: node '${name}' already exists`);
    const index = this.ops.length;
    this.opsMap.set(name, index);
    const newData = { ...data };
    if (opt?.mutable) Object.freeze(newData);
    const newNode = {
      _opIndex: index,
      _seqName: this.seqName,
      _opName: name,
      data: newData
    };
    this.ops.push(newNode);
    return newNode;
  }
  deleteOp(name) {
    const fn2 = "deleteOp";
    console.error(`${fn2}: not implemented by design`);
  }
  /* --- access operations --- */
  data(key) {
    m_ValidateActiveSeq(this);
    if (typeof key === "string") return this.currentOp.data[key];
    return this.currentOp.data;
  }
  length() {
    m_ValidateActiveSeq(this);
    return this.ops.length;
  }
  /* --- sequencer operations --- */
  start() {
    const fn2 = "start";
    m_ValidateActiveSeq(this);
    if (this.opIndex !== -1) throw Error(`${fn2}: sequencer already started`);
    if (this.ops.length === 0) throw Error(`${fn2}: no operations to run`);
    this.opIndex = 0;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  current() {
    const fn2 = "current";
    m_ValidateActiveSeq(this);
    if (this.opIndex === -1) throw Error(`${fn2}: sequencer not started`);
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  stop() {
    const fn2 = "stop";
    m_ValidateActiveSeq(this);
    if (this.opIndex === -1) throw Error("stop: sequencer not started");
    this.opIndex = -1;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  next() {
    const fn2 = "next";
    if (this.opIndex === -1) return this.start();
    m_ValidateActiveSeq(this);
    if (this.opIndex === this.ops.length - 1) return void 0;
    ++this.opIndex;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  previous() {
    const fn2 = "previous";
    m_ValidateActiveSeq(this);
    if (this.opIndex === -1) throw Error(`${fn2}: sequencer not started`);
    if (this.opIndex === 0) return void 0;
    --this.opIndex;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  /* --- node events --- */
  subscribe(opName, subf) {
    const fn2 = "onEnter";
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(opName);
    if (!this.hasOp(opName)) throw Error(`${fn2}: node '${opName}' does not exist`);
    if (!this.subs.has(opName)) this.subs.set(opName, /* @__PURE__ */ new Set());
    this.subs.get(opName).add(subf);
  }
  unsubscribe(name, subf) {
    const fn2 = "onEnter";
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(name);
    if (!this.hasOp(name)) throw Error(`${fn2}: node '${name}' does not exist`);
    const subs = this.subs.get(name);
    if (subs.has(subf)) subs.delete(subf);
  }
  _update() {
    const fn2 = "_update";
    m_ValidateActiveSeq(this);
    this.lastOp = this.currentOp;
    this.currentOp = this.ops[this.opIndex];
  }
  _notifyChange() {
    const fn2 = "_notifyChange";
    m_ValidateActiveSeq(this);
    const subs = this.subs.get(this.currentOp._opName);
    if (subs) subs.forEach((subf) => subf(this.currentOp, this.lastOp, this));
  }
  /* --- node utilities --- */
  hasOp(opName) {
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(opName);
    return this.ops.some((op) => op._opName === opName);
  }
  matchOp(opName) {
    const fn2 = "matchOp";
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(opName);
    if (!this.hasOp(opName)) throw Error(`${fn2}: node '${opName}' does not exist`);
    return opName === this.ops[this.opIndex]._opName;
  }
  /** remove all nodes and subscribers */
  dispose() {
    _OpSequencer.DeleteSequencer(this.seqName);
  }
  /* --- static utilities --- */
  static GetSequencer(seqName) {
    m_ValidateSeqName(seqName);
    return OPSEQS.get(seqName);
  }
  static DeleteSequencer(seqName) {
    const seq = _OpSequencer.GetSequencer(seqName);
    seq.opsMap.clear();
    seq.subs.forEach((subs) => subs.clear());
    seq.ops.length = 0;
    seq._disposed = true;
    OPSEQS.delete(seqName);
  }
};

// _ur/common/class-state-mgr.ts
var VM_STATE = {};
var GROUPS = /* @__PURE__ */ new Map();
var USED_PROPS = /* @__PURE__ */ new Map();
var StateMgr = class _StateMgr {
  name;
  // the name of this state group
  init;
  // true if _initializeState has been called
  subs;
  queue;
  // queued state changes
  taps;
  // queued state interceptor hooks
  effects;
  // queued side effects
  /// CONSTRUCTOR /////////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor(groupName) {
    if (typeof groupName !== "string") throw Error("groupName must be a string");
    groupName = groupName.trim().toUpperCase();
    if (GROUPS.has(groupName)) {
      console.warn(
        `(not an error) '${groupName}' construction duplicate, returning existing instance`
      );
      return GROUPS.get(groupName);
    }
    this.name = groupName;
    this.init = false;
    this.subs = /* @__PURE__ */ new Set();
    this.queue = [];
    this.taps = [];
    this.effects = [];
    VM_STATE[this.name] = {};
    this.state = this.state.bind(this);
    this.sendState = this.sendState.bind(this);
    this.subscribeState = this.subscribeState.bind(this);
    this.unsubscribeState = this.unsubscribeState.bind(this);
    this.queueEffect = this.queueEffect.bind(this);
    this._initializeState = this._initializeState.bind(this);
    this._setState = this._setState.bind(this);
    this._insertStateEvent = this._insertStateEvent.bind(this);
    this._interceptState = this._interceptState.bind(this);
    this._isValidState = this._isValidState.bind(this);
    this._mergeState = this._mergeState.bind(this);
    this._notifySubs = this._notifySubs.bind(this);
    this._enqueue = this._enqueue.bind(this);
    this._dequeue = this._dequeue.bind(this);
    this._doEffect = this._doEffect.bind(this);
    GROUPS.set(this.name, this);
  }
  /// MAIN CLASS METHODS //////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** Return a COPY of the current clonedEvent */
  state(key) {
    const state = this._derefProps({ ...VM_STATE[this.name] });
    if (typeof key === "string" && key.length > 0) return state[key];
    return state;
  }
  /** Handle a clonedEvent update from a subscribing module. The incoming
   *  vmstateEvent is checked against the master state object to ensure it
   *  contains valid keys. Any filter functions are allowed to mutate a copy of
   *  the incoming state event.
   *  @param {object} vmStateEvent - object with group-specific props
   */
  sendState(vmStateEvent, callback) {
    if (this._isValidState(vmStateEvent)) {
      const clonedEvent = this._cloneStateObject(vmStateEvent);
      this.taps.forEach((tap) => tap(clonedEvent));
      const action = { stateEvent: clonedEvent, callback };
      this._enqueue(action);
    } else throw Error("SendState: invalid vmState update received, got:");
  }
  /** Subscribe to state. The subscriber function looks like:
   *  ( vmStateEvent, currentState ) => void
   */
  subscribeState(subFunc) {
    if (typeof subFunc !== "function") throw Error("subscriber must be function");
    if (this.subs.has(subFunc)) console.warn("duplicate subscriber function");
    this.subs.add(subFunc);
  }
  /** Unsubscribe state */
  unsubscribeState(subFunc) {
    if (!this.subs.delete(subFunc))
      console.warn("function not subscribed for", this.name);
  }
  /** When executing a side effect from a component, use this method to
   *  hold it until after all state updates have completed, so the DOM
   *  is stable
   */
  queueEffect(effectFunc) {
    if (typeof effectFunc !== "function") throw Error("effect must be a function");
    this.effects.push(effectFunc);
    this._doEffect();
  }
  /// CLASS HELPER METHODS ////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** Set the state object directly. used to initialize the state from within
   *  an appcore module. skips state validation because the VM_STATE entry
   *  is an empty object
   */
  _initializeState(stateObj) {
    if (this.init)
      throw Error(`_initializeState: store '${this.name}' already initialized`);
    Object.keys(stateObj).forEach((k) => {
      if (k.toLowerCase() !== k)
        throw Error(`_initializeState: props must be lowercase, not '${k}'`);
      if (stateObj[k] === void 0)
        throw Error(
          `_initializeState: prop '${k}' value can't be undefined (use null instead)`
        );
    });
    if (VM_STATE[this.name]) {
      Object.keys(stateObj).forEach((k) => {
        if (k === "_group") return;
        const assTo = USED_PROPS.get(k);
        if (assTo !== void 0) throw Error(`${k} already assigned to ${assTo}`);
        USED_PROPS.set(k, this.name);
      });
      VM_STATE[this.name] = stateObj;
      this.init = true;
    } else throw Error(`${this.name} does't exist in VM_STATE`);
  }
  /** In some cases, we want to update state but not trigger subscribers
   *  related to it. Alias for _mergeState()
   */
  _setState(vmState) {
    this._mergeState(vmState);
  }
  /** When SendState() is invoked, give the instance manager a change to
   *  inspect the incoming state and do a side-effect and/or a filter.
   *  They will run in order of interceptor registration
   *  @param {function} tapFunc - receive stateEvent to mutate or act-on
   */
  _interceptState(tapFunc) {
    if (typeof tapFunc !== "function") throw Error(`'${tapFunc}' is not a function`);
    this.taps.push(tapFunc);
  }
  /** Allow synthesis of a state event by adding to queue without
   *  immediately executing it. For use by _interceptState only.
   *  Creates an action { stateObj, callback }
   */
  _insertStateEvent(stateEvent, callback) {
    this._enqueue({ stateEvent, callback });
  }
  /** Return true if the event object conforms to expectations (see below) */
  _isValidState(stateObj) {
    const curState = VM_STATE[this.name];
    let keysOk = true;
    Object.keys(stateObj).forEach((k) => {
      const keyTest = keysOk && curState[k] !== void 0;
      if (keyTest === false) console.warn(`isValidState: '${k}' not a valid key`);
      keysOk = keysOk && keyTest;
    });
    return keysOk;
  }
  /** Scan the object properties for arrays, and mutate with a new array.
   *  In the case of an array containing references, the references will still
   *  be the same but the array itself will be different
   */
  _derefProps(stateObj) {
    Object.keys(stateObj).forEach((k) => {
      if (Array.isArray(stateObj[k])) stateObj[k] = [...stateObj[k]];
    });
    return stateObj;
  }
  /** Utility method to clone state event. It handles array cloning as well but
   *  is otherwise a shallow clone
   */
  _cloneStateObject(stateObj) {
    const clone = this._derefProps({ ...stateObj });
    return clone;
  }
  /** Take a clonedEvent event object and update the VM_STATE entry with
   *  its property values. This creates an entirely new state object
   */
  _mergeState(stateObj) {
    if (!this._isValidState(stateObj)) return void 0;
    const newState = this._derefProps({
      ...VM_STATE[this.name],
      ...stateObj
    });
    VM_STATE[this.name] = newState;
    return newState;
  }
  /** Forward the event to everyone. The vmStateEvent object contains
   *  properties that changed only, appending a 'stateGroup' identifier
   *  that tells you who sent it. Sends a read-only copy.
   */
  _notifySubs(stateObj) {
    setTimeout(() => {
      const subs = [...this.subs.values()];
      stateObj.stateGroup = this.name;
      const currentState = this._derefProps({ ...VM_STATE[this.name] });
      subs.forEach((sub) => sub(stateObj, currentState));
    });
  }
  /** Placeholder queueing system that doesn't do much now.
   *  An action is { vmStateEvent, callback }
   */
  _enqueue(action) {
    const { stateEvent, callback } = action;
    if (!this._isValidState(stateEvent)) {
      console.warn("bad vmStateEvent", stateEvent);
      return;
    }
    if (callback && typeof callback !== "function") {
      console.warn("call must be function, not", typeof callback, callback);
      return;
    }
    this.queue.push(action);
    this._dequeue();
  }
  /** Placeholder dequeing system that doesn't do much now.
   *  An action is { vmStateEvent, callback }
   */
  _dequeue() {
    const callbacks = [];
    let action = this.queue.shift();
    while (action !== void 0) {
      const { vmStateEvent, callback } = action;
      this._mergeState(vmStateEvent);
      this._notifySubs(vmStateEvent);
      if (typeof callback === "function") callbacks.push(callback);
      action = this.queue.shift();
    }
    callbacks.forEach((f) => f());
    this._doEffect();
  }
  /** execute effect functions that have been queued, generally if there
   *  are no pending state changes
   */
  _doEffect() {
    if (this.queue.length > 0) return;
    setTimeout(() => {
      let effect = this.effects.shift();
      while (effect !== void 0) {
        effect();
        effect = this.effects.shift();
      }
    });
  }
  /// STATIC METHODS //////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** Return a state manager instance if it exists, undefined if not. Throws
   *  errors if there are issues with the name */
  static GetStateManager(groupName) {
    if (typeof groupName !== "string") throw Error(`${groupName} is not a string`);
    const bucket = groupName.trim().toUpperCase();
    if (bucket !== groupName)
      throw Error(`groupNames should be all uppercase, not ${bucket}`);
    return GROUPS[bucket];
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** return a locked copy of the state of a particular named state group.
   *  Unlike GetStateManager, this returns just the data object.
   */
  static GetStateData(groupName) {
    if (typeof groupName !== "string") throw Error(`${groupName} is not a string`);
    const bucket = groupName.trim().toUpperCase();
    if (bucket !== groupName)
      throw Error(`groupNames should be all uppercase, not ${bucket}`);
    const state = VM_STATE[bucket];
    if (!state) throw Error(`stateGroup ${bucket} is not defined`);
    const readOnlyState = { ...state };
    for (const prop of Object.keys(readOnlyState)) {
      Object.defineProperty(readOnlyState, prop, {
        writable: false
      });
    }
    return readOnlyState;
  }
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /** return a Stage Manager instance. This just hides the new operator that
   *  purposefully always returns an instance of an existing group if it
   *  already exists
   */
  static GetInstance(groupName) {
    return new _StateMgr(groupName);
  }
};

// _ur/common/abstract-dataset-adapter.ts
var DatasetAdapter = class {
  /** access token **/
  accToken;
};

// _ur/common/class-data-manifest.ts
var WARN5 = console.warn;
var DatasetManifest = class {
  //
  _manifest;
  _dataURI;
  _metaInfo;
  _bins;
  //
  constructor(maniObj) {
    if (maniObj === void 0) {
      this._manifest = {};
      return;
    }
    this._setFromManifestObj(maniObj);
  }
  /// INITIALIZERS ///
  /** utility method to set the instance from an object */
  _setFromManifestObj(maniObj) {
    const { error, ...decoded } = DecodeManifest(maniObj);
    if (error) throw Error(`error constructing DatasetManifest: ${error}`);
    const { _dataURI, _meta, ...bins } = decoded;
    this._manifest = decoded;
    this._dataURI = _dataURI;
    if (typeof bins !== "object") return;
    this._bins = /* @__PURE__ */ new Map();
    Object.keys(bins).forEach((binType) => {
      const binDict = bins[binType];
      this._bins.set(binType, binDict);
    });
  }
  /// BUILDERS ///
  setDataURI(dataURI) {
    const { error } = DecodeDataURI(dataURI);
    if (error) throw Error(`error setting dataURI '${dataURI}': ${error}`);
    this._dataURI = dataURI;
  }
  setMeta(meta) {
    this._metaInfo = meta;
  }
  /** add a bin to the manifest */
  addBinEntry(binType, binName, binURI) {
    if (!this._bins.has(binType)) this._bins.set(binType, {});
    const bin = this._bins.get(binType);
    if (bin[binName]) WARN5(`addBin: overwriting existing bin ${binName}`);
    bin[binName] = binURI;
  }
  /// GENERATORS ///
  /** return a new manifest object */
  getManifestObj() {
    const { _dataURI, _metaInfo } = this;
    const bins = {};
    this._bins.forEach((dict, type) => {
      bins[type] = { ...dict };
    });
    return {
      _dataURI,
      _meta: _metaInfo,
      ...bins
    };
  }
  /// ACCESSORS (RETURN COPIES) ///
  /** retrieve the dataURI of this manifest*/
  get dataURI() {
    return this._dataURI;
  }
  /** retrieve a copy of the meta info for this manifest */
  get meta() {
    return { ...this._metaInfo };
  }
  /** return a copy of the bins map as object */
  getBinURIs() {
    const bins = {};
    this._bins.forEach((binDict, binType) => {
      bins[binType] = { ...binDict };
    });
    return bins;
  }
};

// _ur/common/@common-classes.ts
var common_classes_default = {
  EventMachine,
  ModeMachine,
  OpSequencer,
  PhaseMachine,
  SNA_Component,
  StateMgr,
  NetEndpoint,
  NetPacket,
  ServiceMap,
  NetSocket,
  TransactionMgr,
  DataBin,
  DataObjAdapter,
  DatasetAdapter,
  Dataset,
  ItemList,
  DatasetManifest,
  RecordSet
};
export {
  ur_addon_mgr_exports as ADDON,
  appbuilder_exports as APPBUILD,
  appserver_exports as APPSERV,
  assetserver_exports as ASSETSERV,
  common_classes_exports as CLASS,
  util_data_search_exports as DATA_QUERY,
  util_data_ops_exports as DATA_UTIL,
  file_exports as FILE,
  util_urnet_exports as NET_UTIL,
  util_data_norm_exports as NORM,
  process_exports as PROC,
  util_prompts_exports as PROMPTS,
  sna_node_exports as SNA,
  util_text_exports as TEXT,
  makeTerminalOut as TerminalLog,
  module_uid_exports as UID
};
//# sourceMappingURL=core-node.mjs.map
