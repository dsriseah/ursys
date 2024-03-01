var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// _ur_addons/@addons-client.ts
var addons_client_exports = {};
__export(addons_client_exports, {
  AddonClientTest: () => AddonClientTest,
  CLASS: () => CLASS2
});
module.exports = __toCommonJS(addons_client_exports);

// _ur/_dist/client-esm.js
var client_esm_exports = {};
__export(client_esm_exports, {
  CLASS: () => CLASS,
  ClientTest: () => ClientTest,
  ConsoleStyler: () => makeStyleFormatter,
  PROMPTS: () => export_PROMPTS,
  StateMgr: () => class_state_mgr_default,
  TEXT: () => export_TEXT
});
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp2 = Object.prototype.hasOwnProperty;
var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps2 = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp2.call(to, key) && key !== except)
        __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps2(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField2 = (obj, key, value) => {
  __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var require_declare_console = __commonJS({
  "_ur/common/declare-console.js"(exports, module2) {
    var TERM_COLORS = {
      // TOUT = makeTerminalOut(str); TOUT('hi')
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
    module2.exports = {
      TERM_COLORS,
      CSS_COLORS
    };
  }
});
var require_util_prompts = __commonJS({
  "_ur/common/util-prompts.js"(exports, module2) {
    var IS_NODE = typeof window === "undefined";
    var IS_MOBILE = !IS_NODE && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    var D_CONSOLE = require_declare_console();
    var { TERM_COLORS, CSS_COLORS } = D_CONSOLE;
    var DEFAULT_PADDING = IS_NODE ? 10 : 8;
    var DEFAULT_SPACE = IS_NODE ? " ".padStart(DEFAULT_PADDING, " ") : " ".padStart(DEFAULT_PADDING + 4, " ");
    var DEFAULT_COLOR = "TagNull";
    var HTCONSOLES = {};
    var SHOW = true;
    var PROMPT_DICT = {
      // URSYS-RELATED MODULES
      "UR": [SHOW, "TagRed"],
      // SERVERS
      "APPSRV": [SHOW, "Yellow"],
      "GEMSRV": [SHOW, "Yellow"],
      // SPECIAL
      "-": [SHOW, "TagNull"]
    };
    function padString(str, padding = DEFAULT_PADDING) {
      let len = str.length;
      const nbsp = String.fromCharCode(160);
      if (IS_NODE)
        return `${str.padEnd(padding, " ")}`;
      if (padding === 0)
        return `${str}`;
      if (len >= padding)
        str = str.substr(0, padding);
      else
        str = str.padEnd(padding, nbsp);
      return `${str}`;
    }
    function m_SetPromptColors(match, color = DEFAULT_COLOR) {
      if (typeof match !== "string")
        throw Error("match prompt must be string");
      match = match.trim();
      if (match === "")
        throw Error("match prompt cannot be empty");
      let colorTable = IS_NODE ? TERM_COLORS : CSS_COLORS;
      let validColor = false;
      validColor = colorTable[color] !== void 0;
      if (!validColor)
        colorTable = IS_NODE ? CSS_COLORS : TERM_COLORS;
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
      if (!(dbg || IS_NODE))
        return [];
      return IS_NODE ? [`${color}${padString(prompt)}${reset}   `] : [`%c${padString(prompt)}%c `, color, reset];
    }
    function m_MakeColorPromptFunction(prompt, colorName, opt = {}) {
      const textColor = opt.color || "Reset";
      const dim = opt.dim || false;
      return IS_NODE ? (str, ...args) => {
        if (args === void 0)
          args = "";
        let TAG = TERM_COLORS[colorName];
        let TEXT2 = TERM_COLORS[textColor];
        let RST = TERM_COLORS.Reset;
        let PR22 = padString(prompt);
        if (dim)
          TEXT2 += TERM_COLORS.Dim;
        console.log(`${RST}${TAG}${PR22}${RST}${TEXT2}    ${str}`, ...args);
      } : (str, ...args) => {
        if (args === void 0)
          args = "";
        let TEXT2 = TERM_COLORS[textColor];
        let RST = CSS_COLORS.Reset;
        let PR22 = padString(prompt);
        console.log(`%c${PR22}%c%c ${str}`, RST, TEXT2, ...args);
      };
    }
    function m_GetDivText(id) {
      const el = document.getElementById(id);
      if (!el) {
        console.log(`GetDivText: element ${id} does not exist`);
        return void 0;
      }
      const text = el.textContent;
      if (text === void 0) {
        console.log(`HTMLTextOut: element ${id} does not have textContent`);
        return {};
      }
      el.style.whiteSpace = "pre";
      el.style.fontFamily = "monospace";
      return { element: el, text };
    }
    function m_HTMLTextJumpRow(row, lineBuffer, id) {
      const { element, text } = m_GetDivText(id);
      if (text === void 0)
        return lineBuffer;
      if (lineBuffer.length === 0) {
        console.log(`initializing linebuffer from element id='${id}'`);
        lineBuffer = text.split("\n");
      }
      if (row > lineBuffer.length - 1) {
        const count = row + 1 - lineBuffer.length;
        for (let i = count; i > 0; i--)
          lineBuffer.push("");
      }
      return lineBuffer;
    }
    function m_HTMLTextPrint(str = "", lineBuffer, id) {
      const { element, text } = m_GetDivText(id);
      if (!text)
        return lineBuffer;
      lineBuffer.push(str);
      element.textContent = lineBuffer.join("\n");
      return lineBuffer;
    }
    function m_HTMLTextPlot(str = "", lineBuffer, id, row = 0, col = 0) {
      const { element, text } = m_GetDivText(id);
      if (!element)
        return lineBuffer;
      if (text === void 0) {
        console.log(`HTMLTextOut: element ${id} does not have textContent`);
        return lineBuffer;
      }
      lineBuffer = m_HTMLTextJumpRow(row, lineBuffer, id);
      let line = lineBuffer[row];
      if (line === void 0) {
        console.log(`HTMLTextOut: unexpected line error for line ${row}`);
        return lineBuffer;
      }
      if (col + str.length > line.length + str.length) {
        for (let i = 0; i < col + str.length - line.length; i++)
          line += " ";
      }
      let p1 = line.substr(0, col);
      let p3 = line.substr(col + str.length, line.length - (col + str.length));
      lineBuffer[row] = `${p1}${str}${p3}`;
      element.textContent = lineBuffer.join("\n");
      return lineBuffer;
    }
    function makeStyleFormatter2(prompt, tagColor) {
      if (prompt.startsWith("UR") && tagColor === void 0)
        tagColor = "TagUR";
      let outArray = m_MakeColorArray(prompt, tagColor);
      if (outArray.length === 0)
        return () => [];
      if (IS_MOBILE)
        outArray = [`${prompt}:`];
      const f = (str, ...args) => [...outArray, str, ...args];
      f._ = `
${DEFAULT_SPACE}`;
      return f;
    }
    function makeErrorFormatter(pr = "") {
      const bg = "rgba(255,0,0,1)";
      const bga = "rgba(255,0,0,0.15)";
      pr = `ERROR ${pr}`.trim();
      return (str, ...args) => [
        `%c${pr}%c${str}`,
        `color:#fff;background-color:${bg};padding:3px 7px 3px 10px;border-radius:10px 0 0 10px;`,
        `color:${bg};background-color:${bga};padding:3px 5px;`,
        ...args
      ];
    }
    function makeWarningFormatter(pr = "") {
      const bg = "rgba(255,150,0,1)";
      const bga = "rgba(255,150,0,0.15)";
      pr = `WARN ${pr}`.trim();
      return (str, ...args) => [
        `%c${pr}%c${str}`,
        `color:#fff;background-color:${bg};padding:3px 7px 3px 10px;border-radius:10px 0 0 10px;`,
        `color:${bg};background-color:${bga};padding:3px 5px;`,
        ...args
      ];
    }
    function dbgPrint(pr, bg = "MediumVioletRed") {
      return [
        `%c${pr}%c`,
        `color:#fff;background-color:${bg};padding:3px 10px;border-radius:10px;`,
        "color:auto;background-color:auto"
      ];
    }
    function colorTagString(str, tagColor) {
      return m_MakeColorArray(str, tagColor);
    }
    function makeTerminalOut(prompt, tagColor = DEFAULT_COLOR) {
      const wrap = m_MakeColorPromptFunction(prompt, tagColor);
      wrap.warn = m_MakeColorPromptFunction(prompt, "TagYellow", { color: "Yellow" });
      wrap.error = m_MakeColorPromptFunction(prompt, "TagRed", { color: "Red" });
      wrap.fail = m_MakeColorPromptFunction(prompt, "Red", { color: "Red" });
      wrap.pass = m_MakeColorPromptFunction(prompt, "Green", { color: "Green" });
      wrap.info = m_MakeColorPromptFunction(prompt, "TagGray", { dim: true });
      wrap.DIM = "\x1B[2m";
      wrap.BRI = "\x1B[1m";
      wrap.RST = "\x1B[0m";
      return wrap;
    }
    function makeHTMLConsole(divId, row = 0, col = 0) {
      const ERP = makeStyleFormatter2("makeHTMLConsole", "Red");
      let buffer = [];
      if (typeof divId !== "string")
        throw Error("bad id");
      if (!document.getElementById(divId)) {
        console.warn(...ERP(`id '${divId}' doesn't exist`));
        return {
          print: () => {
          },
          plot: () => {
          },
          clear: () => {
          },
          gotoRow: () => {
          }
        };
      }
      let hcon;
      if (HTCONSOLES[divId]) {
        hcon = HTCONSOLES[divId];
      } else {
        hcon = {
          buffer: [],
          plot: (str, y = row, x = col) => {
            buffer = m_HTMLTextPlot(str, buffer, divId, y, x);
          },
          print: (str) => {
            buffer = m_HTMLTextPrint(str, buffer, divId);
          },
          clear: (startRow = 0, endRow = buffer.length) => {
            buffer.splice(startRow, endRow);
          },
          gotoRow: (row2) => {
            buffer = m_HTMLTextJumpRow(row2, buffer, divId);
          }
        };
        HTCONSOLES[divId] = hcon;
      }
      return hcon;
    }
    function printTagColors() {
      const colortable = IS_NODE ? TERM_COLORS : CSS_COLORS;
      const colors = Object.keys(colortable).filter((element) => element.includes("Tag"));
      const reset = colortable.Reset;
      const out = "dbg_colors";
      if (!IS_NODE)
        console.groupCollapsed(out);
      colors.forEach((key) => {
        const color = colortable[key];
        const items = IS_NODE ? [`${padString(out)} - (node) ${color}${key}${reset}`] : [`(browser) %c${key}%c`, color, reset];
        console.log(...items);
      });
      if (!IS_NODE)
        console.groupEnd();
    }
    module2.exports = {
      TERM: TERM_COLORS,
      CSS: CSS_COLORS,
      padString,
      makeStyleFormatter: makeStyleFormatter2,
      makeErrorFormatter,
      makeWarningFormatter,
      dbgPrint,
      makeTerminalOut,
      makeHTMLConsole,
      printTagColors,
      colorTagString
    };
  }
});
var require_util_text = __commonJS({
  "_ur/common/util-text.js"(exports, module2) {
    function PreprocessDataText(str) {
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
        lines[i] = processDelimited(lines[i], ",", { preserve: true });
        lines[i] = processDelimited(lines[i], ":", { preserve: true });
      }
      normalizedStr = lines.join("\n").trim();
      return normalizedStr + "\n";
    }
    module2.exports = {
      PreprocessDataText
    };
  }
});
var import_util_prompts = __toESM(require_util_prompts());
var import_util_text = __toESM(require_util_text());
var OPSEQS = /* @__PURE__ */ new Map();
function m_ValidateSeqName(sn) {
  const fn = "m_ValidateSeqName";
  const pcErr = "name must be PascalCase string";
  if (sn === "")
    throw Error(`${fn}: ${pcErr}`);
  if (sn === void 0)
    throw Error(`${fn}: ${pcErr}`);
  if (typeof sn !== "string")
    throw Error(`${fn}: ${pcErr}`);
  if (sn !== sn[0].toUpperCase() + sn.slice(1))
    throw Error(`${fn}: ${pcErr}`);
  if (sn.trim() !== sn)
    throw Error(`${fn}: name must not have leading/trailing spaces`);
}
function m_ValidateActiveSeq(seq) {
  if (seq instanceof OpSequencer) {
    if (seq._disposed)
      throw Error(`sequencer ${seq.seqName} is disposed`);
    else
      return;
  }
  throw Error("not a sequence instance or undefined");
}
function m_ValidateNodeName(nn) {
  const fn = "m_ValidateNodeName";
  if (nn === "")
    throw Error(`${fn}: name must be lc string`);
  if (nn === void 0)
    throw Error(`${fn}: name must be lc string`);
  if (typeof nn !== "string")
    throw Error(`${fn}: name must be lc string`);
  if (nn !== nn.toLowerCase())
    throw Error(`${fn}: name must be lc`);
  if (nn.trim() !== nn)
    throw Error(`${fn}: name must not have leading/trailing spaces`);
}
var OpSequencer = class _OpSequencer {
  // true if disposed
  constructor(seqName) {
    __publicField2(this, "ops");
    __publicField2(this, "seqName");
    __publicField2(this, "lastOp");
    __publicField2(this, "currentOp");
    __publicField2(this, "opIndex");
    __publicField2(this, "opsMap");
    __publicField2(this, "subs");
    __publicField2(this, "_disposed");
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
    const fn = "addOp";
    if (data === void 0)
      throw Error(`${fn}: arg2 must be TOpNode`);
    if (typeof name !== "string")
      throw Error(`${fn}: arg1 must be name:string`);
    if (typeof data._name === "string")
      throw Error(`${fn}: node ${name} reused`);
    if (data._index !== void 0)
      throw Error(`${fn}: node ${name} reused`);
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(name);
    if (this.opIndex !== -1)
      throw Error(`${fn}: sequencer already started`);
    if (this.hasOp(name))
      throw Error(`${fn}: node '${name}' already exists`);
    const index = this.ops.length;
    this.opsMap.set(name, index);
    const newData = { ...data };
    if (opt == null ? void 0 : opt.mutable)
      Object.freeze(newData);
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
    const fn = "deleteOp";
    console.error(`${fn}: not implemented by design`);
  }
  /* --- access operations --- */
  data(key) {
    m_ValidateActiveSeq(this);
    if (typeof key === "string")
      return this.currentOp.data[key];
    return this.currentOp.data;
  }
  length() {
    m_ValidateActiveSeq(this);
    return this.ops.length;
  }
  /* --- sequencer operations --- */
  start() {
    const fn = "start";
    m_ValidateActiveSeq(this);
    if (this.opIndex !== -1)
      throw Error(`${fn}: sequencer already started`);
    if (this.ops.length === 0)
      throw Error(`${fn}: no operations to run`);
    this.opIndex = 0;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  current() {
    const fn = "current";
    m_ValidateActiveSeq(this);
    if (this.opIndex === -1)
      throw Error(`${fn}: sequencer not started`);
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  stop() {
    const fn = "stop";
    m_ValidateActiveSeq(this);
    if (this.opIndex === -1)
      throw Error("stop: sequencer not started");
    this.opIndex = -1;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  next() {
    const fn = "next";
    if (this.opIndex === -1)
      return this.start();
    m_ValidateActiveSeq(this);
    if (this.opIndex === this.ops.length - 1)
      return void 0;
    ++this.opIndex;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  previous() {
    const fn = "previous";
    m_ValidateActiveSeq(this);
    if (this.opIndex === -1)
      throw Error(`${fn}: sequencer not started`);
    if (this.opIndex === 0)
      return void 0;
    --this.opIndex;
    this._update();
    this._notifyChange();
    return this.ops[this.opIndex];
  }
  /* --- node events --- */
  subscribe(opName, subf) {
    const fn = "onEnter";
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(opName);
    if (!this.hasOp(opName))
      throw Error(`${fn}: node '${opName}' does not exist`);
    if (!this.subs.has(opName))
      this.subs.set(opName, /* @__PURE__ */ new Set());
    this.subs.get(opName).add(subf);
  }
  unsubscribe(name, subf) {
    const fn = "onEnter";
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(name);
    if (!this.hasOp(name))
      throw Error(`${fn}: node '${name}' does not exist`);
    const subs = this.subs.get(name);
    if (subs.has(subf))
      subs.delete(subf);
  }
  _update() {
    const fn = "_update";
    m_ValidateActiveSeq(this);
    this.lastOp = this.currentOp;
    this.currentOp = this.ops[this.opIndex];
  }
  _notifyChange() {
    const fn = "_notifyChange";
    m_ValidateActiveSeq(this);
    const subs = this.subs.get(this.currentOp._opName);
    if (subs)
      subs.forEach((subf) => subf(this.currentOp, this.lastOp, this));
  }
  /* --- node utilities --- */
  hasOp(opName) {
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(opName);
    return this.ops.some((op) => op._opName === opName);
  }
  matchOp(opName) {
    const fn = "matchOp";
    m_ValidateActiveSeq(this);
    m_ValidateNodeName(opName);
    if (!this.hasOp(opName))
      throw Error(`${fn}: node '${opName}' does not exist`);
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
var class_op_seq_default = OpSequencer;
var VM_STATE = {};
var GROUPS = /* @__PURE__ */ new Map();
var USED_PROPS = /* @__PURE__ */ new Map();
var StateMgr = class _StateMgr {
  // queued side effects
  /// CONSTRUCTOR /////////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor(groupName) {
    __publicField2(this, "name");
    __publicField2(this, "init");
    __publicField2(this, "subs");
    __publicField2(this, "queue");
    __publicField2(this, "taps");
    __publicField2(this, "effects");
    if (typeof groupName !== "string")
      throw Error("groupName must be a string");
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
    if (typeof key === "string" && key.length > 0)
      return state[key];
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
    } else
      throw Error("SendState: invalid vmState update received, got:");
  }
  /** Subscribe to state. The subscriber function looks like:
   *  ( vmStateEvent, currentState ) => void
   */
  subscribeState(subFunc) {
    if (typeof subFunc !== "function")
      throw Error("subscriber must be function");
    if (this.subs.has(subFunc))
      console.warn("duplicate subscriber function");
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
    if (typeof effectFunc !== "function")
      throw Error("effect must be a function");
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
        if (k === "_group")
          return;
        const assTo = USED_PROPS.get(k);
        if (assTo !== void 0)
          throw Error(`${k} already assigned to ${assTo}`);
        USED_PROPS.set(k, this.name);
      });
      VM_STATE[this.name] = stateObj;
      this.init = true;
    } else
      throw Error(`${this.name} does't exist in VM_STATE`);
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
    if (typeof tapFunc !== "function")
      throw Error(`'${tapFunc}' is not a function`);
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
      if (keyTest === false)
        console.warn(`isValidState: '${k}' not a valid key`);
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
      if (Array.isArray(stateObj[k]))
        stateObj[k] = [...stateObj[k]];
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
    if (!this._isValidState(stateObj))
      return void 0;
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
      if (typeof callback === "function")
        callbacks.push(callback);
      action = this.queue.shift();
    }
    callbacks.forEach((f) => f());
    this._doEffect();
  }
  /** execute effect functions that have been queued, generally if there
   *  are no pending state changes
   */
  _doEffect() {
    if (this.queue.length > 0)
      return;
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
    if (typeof groupName !== "string")
      throw Error(`${groupName} is not a string`);
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
    if (typeof groupName !== "string")
      throw Error(`${groupName} is not a string`);
    const bucket = groupName.trim().toUpperCase();
    if (bucket !== groupName)
      throw Error(`groupNames should be all uppercase, not ${bucket}`);
    const state = VM_STATE[bucket];
    if (!state)
      throw Error(`stateGroup ${bucket} is not defined`);
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
var class_state_mgr_default = StateMgr;
var { makeStyleFormatter } = import_util_prompts.default;
var PR = makeStyleFormatter("UR", "TagCyan");
var CLASS = {
  OpSequencer: class_op_seq_default,
  StateMgr: class_state_mgr_default
};
function ClientTest() {
  console.log(...PR("System Integration of new URSYS module successful!"));
}
var export_PROMPTS = import_util_prompts.default;
var export_TEXT = import_util_text.default;

// _ur_addons/net/urnet-types.ts
var VALID_MSG_CHANNELS = ["NET", "SRV", "LOCAL", ""];
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
var UADDR_DIGITS = 3;
var USED_ADDRS = /* @__PURE__ */ new Set();
var zeroPad = `0`.padStart(UADDR_DIGITS, "0");
var UADDR_NONE = `???${zeroPad}`;
function IsValidType(msg_type) {
  return VALID_PKT_TYPES.includes(msg_type);
}
function IsValidChannel(msg_chan) {
  return VALID_MSG_CHANNELS.includes(msg_chan);
}
function IsValidAddress(addr) {
  if (typeof addr !== "string")
    return false;
  let prelen = 0;
  if (!VALID_ADDR_PREFIX.some((pre) => {
    prelen = pre.length;
    return addr.startsWith(pre);
  }))
    return false;
  const num = parseInt(addr.slice(prelen));
  if (isNaN(num))
    return false;
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
  const fn = "AllocateAddress";
  let addr = opt == null ? void 0 : opt.addr;
  let pre = (opt == null ? void 0 : opt.prefix) || "UA";
  if (addr === void 0) {
    let id = ++ADDR_MAX_ID;
    let padId = `${id}`.padStart(UADDR_DIGITS, "0");
    addr = `${pre}${padId}`;
  } else if (USED_ADDRS.has(addr)) {
    throw Error(`${fn} - address ${addr} already allocated`);
  }
  USED_ADDRS.add(addr);
  return addr;
}
function DecodeMessage(msg) {
  if (typeof msg !== "string")
    throw Error(`message must be string: ${msg}`);
  if (msg !== msg.toUpperCase())
    throw Error(`message must be uppercase: ${msg}`);
  const bits = msg.split(":");
  if (bits.length === 0)
    throw Error(`invalid empty message`);
  if (bits.length > 2)
    throw Error(`invalid channel:message format ${msg}`);
  let [chan, name] = bits;
  if (bits.length === 1) {
    name = chan;
    chan = "LOCAL";
  }
  if (chan === "")
    chan = "LOCAL";
  if (!IsValidChannel(chan))
    throw Error(`prefix must be ${VALID_MSG_CHANNELS.join(" ").trim()} not ${chan}`);
  return [chan, name];
}
function NormalizeMessage(msg) {
  let [chan, name] = DecodeMessage(msg);
  if (chan === "LOCAL")
    chan = "";
  return `${chan}:${name}`;
}
function NormalizeData(data) {
  if (Array.isArray(data) && data.length == 1)
    return data[0];
  return data;
}
function IsLocalMessage(msg) {
  const [chan] = DecodeMessage(msg);
  return chan === "LOCAL";
}
function IsNetMessage(msg) {
  const [chan] = DecodeMessage(msg);
  return chan === "NET" || chan === "SRV";
}
function GetPacketHashString(pkt) {
  return `${pkt.src_addr}:${pkt.id}`;
}

// _ur_addons/net/class-urnet-packet.ts
var PR2 = typeof process !== "undefined" ? "Packet".padEnd(13) : "Packet:";
var LOG = (...args) => console.log(PR2, ...args);
var NetPacket = class {
  // returned error message
  constructor(msg, data) {
    __publicField(this, "id");
    // network-wide unique id for this packet
    __publicField(this, "msg_type");
    // ping, signal, send, call
    __publicField(this, "msg");
    // name of the URNET message
    __publicField(this, "data");
    // payload of the URNET message
    __publicField(this, "auth");
    // authentication token
    __publicField(this, "src_addr");
    // URNET address of the sender
    __publicField(this, "hop_seq");
    // URNET addresses that have seen this packet
    __publicField(this, "hop_log");
    // log of debug messages by hop
    __publicField(this, "hop_dir");
    // direction of the packet 'req' or 'res'
    __publicField(this, "hop_rsvp");
    // whether the packet is a response to a request
    __publicField(this, "err");
    this.id = void 0;
    this.src_addr = void 0;
    this.hop_rsvp = false;
    this.hop_seq = [];
    this.hop_log = [];
    this.auth = void 0;
    this.err = void 0;
    if (data !== void 0)
      this.data = data;
    if (typeof msg === "string") {
      if (!IsValidMessage(msg))
        throw Error(`invalid msg format: ${msg}`);
      this.msg = msg;
    }
  }
  /** after creating a new packet, use setMeta() to assign id and envelope
   *  meta used for routing and return packets
   */
  setMeta(msg_type, opt) {
    if (!IsValidType(msg_type))
      throw Error(`invalid msg_type: ${msg_type}`);
    this.msg_type = msg_type;
    this.hop_dir = (opt == null ? void 0 : opt.dir) || "req";
    this.hop_rsvp = (opt == null ? void 0 : opt.rsvp) || false;
  }
  /** add hop to the hop sequence */
  addHop(hop) {
    if (!IsValidAddress(hop))
      throw Error(`invalid hop: ${hop}`);
    this.hop_seq.push(hop);
  }
  /** utility setters w/ checks - - - - - - - - - - - - - - - - - - - - - - **/
  /** manually set the source address, with check */
  setSrcAddr(s_addr) {
    if (!IsValidAddress(s_addr))
      throw Error(`invalid src_addr: ${s_addr}`);
    if (this.hop_seq.length > 0 && this.hop_seq[0] !== s_addr)
      throw Error(`src_addr ${s_addr} != ${this.hop_seq[0]}`);
    this.src_addr = s_addr;
    return this;
  }
  /** manually set direction */
  setDir(dir) {
    if (dir !== "req" && dir !== "res")
      throw Error(`invalid dir: ${dir}`);
    this.hop_dir = dir;
    return this;
  }
  /** set the authorization token */
  setAuth(auth) {
    if (typeof auth !== "string") {
      LOG("setAuth: invalid auth", auth);
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
    const fn = "setFromObject";
    if (typeof pktObj !== "object")
      throw Error(`invalid pktObj: ${pktObj}, is ${typeof pktObj}`);
    this.id = pktObj.id;
    this.msg = pktObj.msg;
    if (pktObj.data === void 0)
      LOG(fn, `... pktObj${pktObj.id} .data is undefined`);
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
  isRsvp() {
    return this.hop_rsvp;
  }
  lastHop() {
    return this.hop_seq[this.hop_seq.length - 1];
  }
  /** types that begin with _ are protocol messages that bypass pktReceive() */
  isProtocol() {
    return this.msg_type.startsWith("_");
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
      LOG("NetPacket.deserialize failed", data);
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
    if (!this.err)
      this.err = "";
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

// _ur_addons/net/class-urnet-endpoint.ts
var DBG = false;
var PR3 = typeof process !== "undefined" ? "EndPoint".padEnd(13) : "EndPoint:";
var LOG2 = (...args) => DBG && console.log(PR3, ...args);
var AGE_INTERVAL = 1e3;
var AGE_MAX = 60 * 30;
function _PKT(ep, fn, text, pkt) {
  let { id, msg, msg_type } = pkt;
  if (id === void 0 && msg_type === "_reg")
    id = `pkt[${UADDR_NONE}:0]`;
  let out = `${ep.urnet_addr} ${text} '${msg}' `.padEnd(40, "~");
  out += ` ${id.padEnd(12)} ${fn}`;
  return out;
}
var NetEndpoint = class {
  // client registration status
  constructor() {
    __publicField(this, "urnet_addr");
    // the address for this endpoint
    //
    __publicField(this, "cli_gateway");
    // gateway to server
    __publicField(this, "srv_socks");
    // uaddr->I_NetSocket
    __publicField(this, "srv_msgs");
    // msg->uaddr[]
    __publicField(this, "msg_handlers");
    // msg->handlers[]
    __publicField(this, "transactions");
    // hash->resolver
    //
    __publicField(this, "cli_counter");
    // counter for generating unique uaddr
    __publicField(this, "pkt_counter");
    // counter for generating packet ids
    //
    __publicField(this, "cli_sck_timer");
    // timer for checking socket age
    __publicField(this, "cli_ident");
    // client credentials to request authentication
    __publicField(this, "cli_auth");
    // client access token for
    __publicField(this, "cli_reg");
    this.urnet_addr = void 0;
    this.cli_ident = void 0;
    this.cli_auth = void 0;
    this.cli_reg = void 0;
    this.cli_gateway = void 0;
    this.srv_socks = void 0;
    this.srv_msgs = void 0;
    this.msg_handlers = /* @__PURE__ */ new Map();
    this.transactions = /* @__PURE__ */ new Map();
    this.pkt_counter = 0;
    this.cli_counter = 0;
    this.cli_sck_timer = null;
  }
  /** client connection management  - - - - - - - - - - - - - - - - - - - - **/
  /** return true if this endpoint is managing connections */
  configAsServer(srv_addr) {
    const fn = "configAsServer:";
    if (!IsValidAddress(srv_addr))
      throw Error(`${fn} invalid srv_addr ${srv_addr}`);
    if (this.urnet_addr && this.urnet_addr !== srv_addr) {
      let err = `${fn} urnet_addr ${this.urnet_addr} already set.`;
      err += `currently, `;
      throw Error(err);
    }
    this.urnet_addr = srv_addr;
    if (this.srv_socks !== void 0)
      LOG2(this.urnet_addr, `already configured`, [...this.srv_socks.keys()]);
    this.srv_socks = /* @__PURE__ */ new Map();
    if (this.srv_msgs !== void 0)
      LOG2(this.urnet_addr, `already configured`, [...this.srv_msgs.keys()]);
    this.srv_msgs = /* @__PURE__ */ new Map();
    this.registerMessage("SRV:REFLECT", (data) => {
      return { memo: "defaults defined in Endpoint.configAsServer" };
    });
  }
  /** return true if this endpoint is managing connections */
  isServer() {
    return this.srv_socks !== void 0 && this.srv_msgs !== void 0;
  }
  /** socket utilities  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** given a socket, see if it's already registered */
  isNewSocket(socket) {
    const fn = "isNewSocket:";
    if (typeof socket !== "object")
      return false;
    return socket.uaddr === void 0;
  }
  /** client endpoints need to have an authentication token to
   *  access URNET beyond registration
   */
  authorizeSocket(auth) {
    const fn = "authorizeSocket:";
    LOG2(this.urnet_addr, "would check auth token");
  }
  /** return true if this socket passes authentication status */
  isAuthorizedSocket(socket) {
    const fn = "authorizeSocket:";
    LOG2(fn, "would check JWT in socket.auth");
    LOG2(this.urnet_addr, "would check JWT in socket.auth");
    if (!socket.auth)
      return false;
    return true;
  }
  /** endpoint client management  - - - - - - - - - - - - - - - - - - - - - **/
  /** Server data event handler for incoming data from a client connection.
   *  This is the mirror to _serverDataIngest() function used by client endpoints.
   * This is the entry point for incoming data from clients */
  _clientDataIngest(jsonData, socket) {
    let pkt = this.newPacket().deserialize(jsonData);
    let retPkt;
    retPkt = this.handleClientAuth(pkt, socket);
    if (retPkt)
      return retPkt;
    retPkt = this.handleClientReg(pkt, socket);
    if (retPkt)
      return retPkt;
    retPkt = this.handleClientDeclare(pkt, socket);
    if (retPkt)
      return retPkt;
    if (pkt.auth) {
      LOG2(".. would check authentication token");
      this.pktReceive(pkt);
      return;
    }
    pkt.setDir("res");
    pkt.addHop(this.urnet_addr);
    pkt.data = { error: "unauthorized packet rejected" };
    return pkt;
  }
  /** handle auth packet */
  handleClientAuth(pkt, socket) {
    if (socket.auth === void 0) {
      pkt.setDir("res");
      pkt.addHop(this.urnet_addr);
      if (pkt.msg_type === "_auth") {
        if (pkt.msg !== "SRV:AUTH") {
          pkt.data = { error: `invalid auth packet ${pkt.msg}` };
          return pkt;
        }
      }
      const { identity } = pkt.data;
      if (identity) {
        socket.auth = identity;
        pkt.data = { uaddr: socket.uaddr, cli_auth: "AnAuthToken" };
      } else {
        pkt.data = { error: "invalid identity" };
      }
      return pkt;
    }
    return void 0;
  }
  /** handle registration packet */
  handleClientReg(pkt, socket) {
    if (pkt.msg_type === "_reg") {
      pkt.setDir("res");
      pkt.addHop(this.urnet_addr);
      if (pkt.msg !== "SRV:REG") {
        pkt.data = { error: `invalid reg packet ${pkt.msg}` };
        return pkt;
      }
      if (pkt.src_addr !== socket.uaddr) {
        LOG2("src address mismatch", pkt.src_addr, "!= sock", socket.uaddr);
        pkt.data = { error: "address mismatch" };
        return pkt;
      }
      const { name, type } = pkt.data;
      if (name) {
        const { uaddr } = socket;
        pkt.data = { ok: true, status: `registered name:${name} type:${type}` };
        return pkt;
      }
      pkt.data = { error: "registration failed" };
      return pkt;
    }
    return void 0;
  }
  /** handle client dynamic definitions */
  handleClientDeclare(pkt, socket) {
    if (pkt.msg_type === "_decl") {
      pkt.setDir("res");
      pkt.addHop(this.urnet_addr);
      if (pkt.msg !== "SRV:DEF") {
        pkt.data = { error: `invalid def packet ${pkt.msg}` };
        return pkt;
      }
      pkt.data.status = [];
      const { msg_list } = pkt.data;
      const { uaddr } = socket;
      if (Array.isArray(msg_list)) {
        this.registerRemoteMessages(uaddr, msg_list);
        pkt.data.status.push(`registered ${msg_list.length} messages`);
      }
      if (pkt.data.status.length === 0) {
        pkt.data = { error: "no definitions" };
        return pkt;
      }
    }
    return void 0;
  }
  /** when a client connects to this endpoint, register it as a socket and
   *  allocate a uaddr for it */
  addClient(socket) {
    const fn = "addClient:";
    if (typeof socket !== "object")
      throw Error(`${fn} invalid socket`);
    if (socket.uaddr !== void 0)
      throw Error(`${fn} socket already added`);
    const new_uaddr = AllocateAddress({ prefix: "UR_" });
    socket.uaddr = new_uaddr;
    socket.age = 0;
    socket.auth = void 0;
    socket.msglist = void 0;
    this.srv_socks.set(new_uaddr, socket);
    return new_uaddr;
  }
  /** given a uaddr, return the socket */
  getClient(uaddr) {
    const fn = "getClient:";
    if (this.srv_socks === void 0)
      return void 0;
    return this.srv_socks.get(uaddr);
  }
  /** when a client disconnects from this endpoint, delete its socket and
   *  remove all message forwarding */
  removeClient(uaddr_obj) {
    const fn = "removeClient:";
    let uaddr = typeof uaddr_obj === "string" ? uaddr_obj : uaddr_obj.uaddr;
    if (typeof uaddr !== "string") {
      LOG2(`${fn} invalid uaddr ${typeof uaddr}`);
      return void 0;
    }
    if (!this.srv_socks.has(uaddr))
      throw Error(`${fn} unknown uaddr ${uaddr}`);
    this._delRemoteMessages(uaddr);
    this.srv_socks.delete(uaddr);
    return uaddr;
  }
  /** start a timer to check for dead sockets */
  enableClientAging(activate) {
    const fn = "enableClientAging:";
    if (activate) {
      if (this.cli_sck_timer)
        clearInterval(this.cli_sck_timer);
      this.cli_sck_timer = setInterval(() => {
        this.srv_socks.forEach((socket, uaddr) => {
          socket.age += AGE_INTERVAL;
          if (socket.age > AGE_MAX) {
            if (DBG)
              LOG2(this.urnet_addr, `socket ${uaddr} expired`);
          }
        });
      }, AGE_INTERVAL);
      return;
    }
    if (this.cli_sck_timer)
      clearInterval(this.cli_sck_timer);
    this.cli_sck_timer = null;
    if (DBG)
      LOG2(this.urnet_addr, `timer stopped`);
  }
  /** client connection handshaking - - - - - - - - - - - - - - - - - - - - **/
  /** Client data event handler for incoming data from the gateway.
   *  This is the mirror to _clientDataIngest() function that is used by servers.
   *  This is entry point for incoming data from server */
  _serverDataIngest(jsonData, socket) {
    const fn = "_serverDataIngest:";
    const pkt = this.newPacket().deserialize(jsonData);
    if (this.cli_gateway) {
      if (this.handleAuthResponse(pkt))
        return;
      if (this.handleRegResponse(pkt))
        return;
    }
    this.pktReceive(pkt);
  }
  /** client endpoints need to have an "address" assigned to them, otherwise
   *  the endpoint will not work */
  async connectAsClient(gateway, auth) {
    const fn = "connectAsClient:";
    if (gateway && typeof gateway.send === "function") {
      this.cli_gateway = gateway;
    } else
      throw Error(`${fn} invalid gateway`);
    if (auth) {
      const pkt = this.newAuthPacket(auth);
      const { msg } = pkt;
      const requestAuth = new Promise((resolve, reject) => {
        const hash = GetPacketHashString(pkt);
        if (this.transactions.has(hash))
          throw Error(`${fn} duplicate hash ${hash}`);
        const meta = { msg, uaddr: this.urnet_addr };
        this.transactions.set(hash, { resolve, reject, ...meta });
        try {
          this.cli_gateway.send(pkt);
        } catch (err) {
          reject(err);
        }
      });
      let authData = await requestAuth;
      const { uaddr, cli_auth, error } = authData;
      if (error) {
        LOG2(`${fn} error:`, error);
        return false;
      }
      if (!IsValidAddress(uaddr))
        throw Error(`${fn} invalid uaddr ${uaddr}`);
      this.urnet_addr = uaddr;
      if (cli_auth === void 0)
        throw Error(`${fn} invalid cli_auth`);
      this.cli_auth = cli_auth;
      LOG2("** AUTHENTICATED **", uaddr, cli_auth);
      this.cli_auth = cli_auth;
      return authData;
    }
    throw Error(`${fn} arg must be identity`);
  }
  /** create a authentication packet, which is the first packet that must be sent
   *  after connecting to the server */
  newAuthPacket(authObj) {
    const pkt = this.newPacket("SRV:AUTH", { ...authObj });
    pkt.setMeta("_auth", { rsvp: true });
    pkt.setSrcAddr(UADDR_NONE);
    this.assignPacketId(pkt);
    return pkt;
  }
  /** handle authentication response packet directly rather than through
   *  the netcall interface in pktReceive() */
  handleAuthResponse(pkt) {
    const fn = "handleAuthResponse:";
    if (pkt.msg_type !== "_auth")
      return false;
    if (pkt.hop_dir !== "res")
      return false;
    this.pktResolveRequest(pkt);
    return true;
  }
  /** register client with client endpoint info */
  async registerClient(info) {
    const fn = "registerClient:";
    if (!this.cli_gateway)
      throw Error(`${fn} no gateway`);
    const pkt = this.newRegPacket();
    pkt.data = { ...info };
    const { msg } = pkt;
    const requestReg = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash))
        throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.urnet_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.cli_gateway.send(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let regData = await requestReg;
    const { ok, status, error } = regData;
    if (error) {
      LOG2(`${fn} error:`, error);
      return regData;
    }
    if (ok) {
      LOG2("** REGISTERED **", status);
      this.cli_reg = info;
      return regData;
    }
    throw Error(`${fn} unexpected response`, regData);
  }
  /** create a registration packet */
  newRegPacket() {
    const pkt = this.newPacket("SRV:REG");
    pkt.setMeta("_reg", { rsvp: true });
    return pkt;
  }
  /** handle registration response packet directly rather than through
   *  the netcall interface in pktReceive() */
  handleRegResponse(pkt) {
    const fn = "handleRegResponse:";
    if (pkt.msg_type !== "_reg")
      return false;
    if (pkt.hop_dir !== "res")
      return false;
    if (pkt.src_addr !== this.urnet_addr)
      throw Error(`${fn} misaddressed packet???`);
    this.pktResolveRequest(pkt);
    return true;
  }
  /** declare client messages */
  async clientDeclare() {
    const msg_list = this.listNetMessages();
    return await this.clientDeclareServices({ msg_list });
  }
  /** declare client attributes */
  async clientDeclareServices(def) {
    const fn = "clientDeclareServices:";
    if (!this.cli_gateway)
      throw Error(`${fn} no gateway`);
    const pkt = this.newDeclPacket();
    pkt.data = { ...def };
    const { msg } = pkt;
    const decSvcs = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash))
        throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.urnet_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.cli_gateway.send(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let declared = await decSvcs;
    const { error, status } = declared;
    if (error) {
      LOG2(`${fn} error:`, error);
      return declared;
    }
    if (status) {
      LOG2("** DECLARED **", status);
      return declared;
    }
    throw Error(`${fn} unexpected response`, declared);
  }
  /** create a definition packet */
  newDeclPacket() {
    const pkt = this.newPacket("SRV:DEF");
    pkt.setMeta("_decl", { rsvp: true });
    return pkt;
  }
  handleDeclResponse(pkt) {
    const fn = "handleDeclResponse:";
    if (pkt.msg_type !== "_decl")
      return false;
    if (pkt.hop_dir !== "res")
      return false;
    if (pkt.src_addr !== this.urnet_addr)
      throw Error(`${fn} misaddressed packet???`);
    this.pktResolveRequest(pkt);
    return true;
  }
  /** disables down the gateway */
  disconnectAsClient() {
    this.cli_gateway = void 0;
  }
  /** endpoint lookup tables - - - - - - - - - - - - - - - - - - - -  - - - **/
  /** get list of messages allocated to a uaddr */
  getMessagesForAddress(uaddr) {
    const fn = "getMessagesForAddress:";
    if (!this.isServer())
      return [];
    if (typeof uaddr !== "string")
      throw Error(`${fn} invalid uaddr`);
    if (!this.srv_socks.has(uaddr))
      throw Error(`${fn} unknown uaddr ${uaddr}`);
    const msg_list = [];
    this.srv_msgs.forEach((addr_set, msg) => {
      if (addr_set.has(uaddr))
        msg_list.push(msg);
    });
    return msg_list;
  }
  /** get list of UADDRs that a message is forwarded to */
  getAddressesForMessage(msg) {
    const fn = "getAddressesForMessage:";
    if (!this.isServer())
      return [];
    if (typeof msg !== "string")
      throw Error(`${fn} invalid msg`);
    const key = NormalizeMessage(msg);
    if (!this.srv_msgs.has(key))
      this.srv_msgs.set(key, /* @__PURE__ */ new Set());
    const addr_set = this.srv_msgs.get(key);
    const addr_list = Array.from(addr_set);
    return addr_list;
  }
  /** return list of local handlers for given message */
  getHandlersForMessage(msg) {
    const fn = "getHandlersForMessage:";
    if (typeof msg !== "string")
      throw Error(`${fn} invalid msg`);
    const key = NormalizeMessage(msg);
    if (!this.msg_handlers.has(key))
      this.msg_handlers.set(key, /* @__PURE__ */ new Set());
    const handler_set = this.msg_handlers.get(key);
    if (!handler_set)
      throw Error(`${fn} unexpected empty set '${key}'`);
    const handler_list = Array.from(handler_set);
    return handler_list;
  }
  /** informational routing information - - - - - - - - - - - - - - - - - - **/
  /** return handler list for this endpoint */
  listMessages() {
    const list = [];
    this.msg_handlers.forEach((handler_set, key) => {
      list.push(key);
    });
    return list;
  }
  /** return only net messages */
  listNetMessages() {
    const list = [];
    this.msg_handlers.forEach((handler_set, key) => {
      if (IsNetMessage(key))
        list.push(key);
    });
    return list;
  }
  /** return list of active transactions for this endpoint */
  listTransactions() {
    const fn = "listTransactions:";
    const list = [];
    this.transactions.forEach((transaction, hash) => {
      const { msg, uaddr } = transaction;
      list.push({ hash, msg, uaddr });
    });
    return list;
  }
  /** server endpoints manage list of messages in clients  - - - - -  - - - **/
  /** register a message handler for a given message to passed uaddr */
  registerRemoteMessages(uaddr, msgList) {
    const fn = "registerRemoteMessages:";
    if (typeof uaddr !== "string")
      throw Error(`${fn} invalid uaddr`);
    if (!this.srv_socks.has(uaddr))
      throw Error(`${fn} unknown uaddr ${uaddr}`);
    this._setRemoteMessages(uaddr, msgList);
  }
  /** secret utility function for registerRemoteMessages */
  _setRemoteMessages(uaddr, msgList) {
    const fn = "_setRemoteMessages:";
    msgList.forEach((msg) => {
      if (typeof msg !== "string")
        throw Error(`${fn} invalid msg`);
      if (msg !== msg.toUpperCase())
        throw Error(`${fn} msg must be uppercase`);
      const key = NormalizeMessage(msg);
      if (!this.srv_msgs.has(key))
        this.srv_msgs.set(key, /* @__PURE__ */ new Set());
      const msg_set = this.srv_msgs.get(key);
      msg_set.add(uaddr);
    });
  }
  /** unregister message handlers for a given message to passed uaddr */
  _delRemoteMessages(uaddr) {
    const fn = "_delRemoteMessages:";
    if (typeof uaddr !== "string")
      throw Error(`${fn} invalid uaddr`);
    if (!this.srv_socks.has(uaddr))
      throw Error(`${fn} unknown uaddr ${uaddr}`);
    const removed = [];
    this.srv_msgs.forEach((msg_set, key) => {
      if (msg_set.has(uaddr))
        removed.push(key);
      msg_set.delete(uaddr);
    });
    return removed;
  }
  /** packet utility - - - - - - - - - - - - - - - - - - - - - - - - - - - -**/
  assignPacketId(pkt) {
    if (pkt.src_addr === void 0)
      pkt.src_addr = this.urnet_addr;
    const count = ++this.pkt_counter;
    pkt.id = `pkt[${pkt.src_addr}:${count}]`;
    return pkt.id;
  }
  /** convert JSON to packet and return */
  packetFromJSON(json) {
    const pkt = new NetPacket();
    pkt.setFromJSON(json);
    return pkt;
  }
  /** create a new packet with proper address */
  newPacket(msg, data) {
    const fn = "newPacket:";
    const pkt = new NetPacket(msg, data);
    pkt.setSrcAddr(this.urnet_addr || UADDR_NONE);
    if (this.cli_auth)
      pkt.setAuth(this.cli_auth);
    pkt.id = this.assignPacketId(pkt);
    return pkt;
  }
  /** clone a packet with new id */
  clonePacket(pkt) {
    const clone = this.newPacket(pkt.msg, pkt.data);
    clone.setFromJSON(pkt.serialize());
    clone.src_addr = this.urnet_addr;
    clone.id = this.assignPacketId(clone);
    return clone;
  }
  /** message declaration and invocation - - - - - - - - - - - - - - - - - -**/
  /** declare a message handler for a given message */
  registerMessage(msg, handler) {
    const fn = "registerMessage:";
    if (typeof msg !== "string")
      throw Error(`${fn} invalid msg`);
    if (msg !== msg.toUpperCase())
      throw Error(`${fn} msg must be uppercase`);
    if (typeof handler !== "function")
      throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    if (!this.msg_handlers.has(key))
      this.msg_handlers.set(key, /* @__PURE__ */ new Set());
    const handler_set = this.msg_handlers.get(key);
    handler_set.add(handler);
  }
  /** remove a previously declared message handler for a given message */
  removeHandler(msg, handler) {
    const fn = "removeHandler:";
    if (typeof msg !== "string")
      throw Error(`${fn} invalid msg`);
    if (typeof handler !== "function")
      throw Error(`${fn} invalid handler`);
    const key = NormalizeMessage(msg);
    const handler_set = this.msg_handlers.get(key);
    if (!handler_set)
      throw Error(`${fn} unexpected empty set '${key}'`);
    handler_set.delete(handler);
  }
  /** call local message registered on this endPoint only */
  async call(msg, data) {
    const fn = "call:";
    if (!IsLocalMessage(msg))
      throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
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
  /** send local message registered on this endPoint only, returning no data */
  async send(msg, data) {
    const fn = "send:";
    if (!IsLocalMessage(msg))
      throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    handlers.forEach((handler) => {
      handler({ ...data });
    });
    return Promise.resolve(true);
  }
  /** signal local message registered on this endPoint only, returning no data.
   */
  async signal(msg, data) {
    const fn = "signal:";
    if (!IsLocalMessage(msg))
      throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    handlers.forEach((handler) => {
      handler({ ...data });
    });
    return Promise.resolve(true);
  }
  /** ping local message, return with number of handlers */
  async ping(msg) {
    const fn = "ping:";
    if (!IsLocalMessage(msg))
      throw Error(`${fn} '${msg}' not local (drop prefix)`);
    const handlers = this.getHandlersForMessage(msg);
    return Promise.resolve(handlers.length);
  }
  /** call net message, resolves when packet returns from server with data */
  async netCall(msg, data) {
    const fn = "netCall:";
    if (!IsNetMessage(msg))
      throw Error(`${fn} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta("call", {
      dir: "req",
      rsvp: true
    });
    const p = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash))
        throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.urnet_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.pktSendRequest(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let resData = await p;
    return resData;
  }
  /** send net message, returning promise that will resolve when the server has
   *  received and processed/forwarded the message */
  async netSend(msg, data) {
    const fn = "netSend:";
    if (!IsNetMessage(msg))
      throw Error(`${fn} '${msg}' missing NET prefix`);
    const p = new Promise((resolve, reject) => {
      const pkt = this.newPacket(msg, data);
      pkt.setMeta("send", {
        dir: "req",
        rsvp: true
      });
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash))
        throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.urnet_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.pktSendRequest(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let resData = await p;
    return resData;
  }
  /** signal net message, returning void (not promise)
   *  used for the idea of 'raising signals' as opposed to 'sending data'. It
   *  resolves immediately when the signal is sent, and does not check with the
   *  server  */
  netSignal(msg, data) {
    const fn = "netSignal:";
    if (!IsNetMessage(msg))
      throw Error(`${fn} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg, data);
    pkt.setMeta("signal", {
      dir: "req",
      rsvp: false
    });
    this.pktSendRequest(pkt);
  }
  /** returns with a list of uaddr from the server which is the uaddr of the
   *  all clients that have registered for the message */
  async netPing(msg) {
    const fn = "netPing:";
    if (!IsNetMessage(msg))
      throw Error(`${fn} '${msg}' missing NET prefix`);
    const pkt = this.newPacket(msg);
    pkt.setMeta("ping", {
      dir: "req",
      rsvp: true
    });
    const p = new Promise((resolve, reject) => {
      const hash = GetPacketHashString(pkt);
      if (this.transactions.has(hash))
        throw Error(`${fn} duplicate hash ${hash}`);
      const meta = { msg, uaddr: this.urnet_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      try {
        this.pktSendRequest(pkt);
      } catch (err) {
        reject(err);
      }
    });
    let resData = await p;
    return resData;
  }
  /** packet interface  - - - - - - - - - - - - - - - - - - - - - - - - - - **/
  /** Receive a single packet from the wire, and determine
   *  what to do with it. The packet has several possible
   *  processing options!
   *  - packet is response to an outgoing transaction
   *  - packet is a message that we handle
   *  - packet is a message that we forward
   *  - packet is unknown message so we return it with error
   *  If the packet has the rsvp flag set, we need to return
   *  it to the source address in the packet with any data
   */
  async pktReceive(pkt) {
    try {
      const fn = "pktReceive:";
      if (pkt.isResponse()) {
        if (pkt.src_addr === this.urnet_addr)
          this.pktResolveRequest(pkt);
        else
          this.pktSendResponse(pkt);
        return;
      }
      if (!pkt.isRequest()) {
        LOG2(this.urnet_addr, fn, `invalid packet`, pkt);
        return;
      }
      if (pkt.msg_type === "ping") {
        const addrs = this.getAddressesForMessage(pkt.msg);
        const handlers = this.getHandlersForMessage(pkt.msg);
        if (handlers.length > 0)
          addrs.push(this.urnet_addr);
        pkt.setData(addrs);
        this.pktSendResponse(pkt);
        return;
      }
      if (pkt.msg_type === "signal") {
        if (DBG)
          LOG2(_PKT(this, fn, "-recv-sig-", pkt), pkt.data);
        LOG2("would handle signal", pkt.msg);
      }
      const { msg } = pkt;
      let retData;
      if (this.msg_handlers.has(msg)) {
        retData = await this.pktAwaitHandlers(pkt);
      } else if (this.srv_msgs.has(msg)) {
        retData = await this.pktAwaitRequest(pkt);
      } else {
        LOG2(this.urnet_addr, fn, `unknown message '${msg}'`, pkt);
        retData = { error: `unknown message '${msg}'` };
      }
      if (!pkt.isRsvp())
        return;
      if (pkt.msg_type !== "call")
        pkt.data = true;
      else {
        retData = NormalizeData(retData);
        pkt.setData(retData);
      }
      this.pktSendResponse(pkt);
    } catch (err) {
      LOG2(err.message);
      LOG2(err.stack.split("\n").slice(1).join("\n").trim());
    }
  }
  /** Send a single packet on all available interfaces based on the
   *  message. And endpoint can be a client (with gateway) or a server
   *  (with clients). Use for initial outgoing packets only.
   */
  pktSendRequest(pkt) {
    const fn = "pktSendRequest:";
    if (pkt.src_addr === void 0)
      throw Error(`${fn}src_addr undefined`);
    if (this.urnet_addr === void 0)
      throw Error(`${fn} urnet_addr undefined`);
    if (pkt.hop_seq.length !== 0)
      throw Error(`${fn} pkt must have no hops yet`);
    if (pkt.msg_type !== "ping" && pkt.data === void 0)
      throw Error(`${fn} data undefined`);
    if (DBG)
      LOG2(_PKT(this, fn, "-send-req-", pkt), pkt.data);
    const { gateway, clients } = this.pktGetSocketRouting(pkt);
    pkt.addHop(this.urnet_addr);
    if (gateway) {
      if (this.cli_reg === void 0)
        throw Error(`${fn} endpoint not registered`);
      gateway.send(pkt);
    }
    if (Array.isArray(clients)) {
      clients.forEach((sock) => sock.send(pkt));
    }
  }
  /** Given a packet and a socket, clone it and then return a
   *  promise that sends it out on all network interfaces. This
   *  is used by server endpoints as a utility to send a clone
   *  packet on a particular socket to a particular address.
   */
  pktQueueRequest(pkt, sock) {
    const fn = "pktQueueRequest:";
    const clone = this.clonePacket(pkt);
    clone.id = this.assignPacketId(clone);
    const hash = GetPacketHashString(clone);
    if (this.transactions.has(hash))
      throw Error(`${fn} duplicate hash ${hash}`);
    const p = new Promise((resolve, reject) => {
      const meta = { msg: pkt.msg, uaddr: pkt.src_addr };
      this.transactions.set(hash, { resolve, reject, ...meta });
      sock.send(clone);
    });
    return p;
  }
  /** Resolve a transaction when a packet is returned to it through
   *  pktReceive(pkt) which determines that it is a returning transaction
   */
  pktResolveRequest(pkt) {
    const fn = "pktResolveRequest:";
    if (pkt.hop_rsvp !== true)
      throw Error(`${fn} packet is not RSVP`);
    if (pkt.hop_dir !== "res")
      throw Error(`${fn} packet is not a response`);
    if (pkt.hop_seq.length < 2 && !pkt.isProtocol())
      throw Error(`${fn} packet has no hops`);
    const hash = GetPacketHashString(pkt);
    const resolver = this.transactions.get(hash);
    if (!resolver)
      throw Error(`${fn} no resolver for hash ${hash}`);
    const { resolve, reject } = resolver;
    const { data } = pkt;
    if (DBG)
      LOG2(_PKT(this, fn, "-recv-res-", pkt), pkt.data);
    if (pkt.err)
      reject(pkt.err);
    else
      resolve(data);
    this.transactions.delete(hash);
  }
  /** Return a packet to its source address. If this endpoint is a server,
   *  then it might have the socket stored. Otherwise, if this endpoint is
   *  also a client of another server, pass the back through the gateway.
   *  This is used by server endpoints to return packets to clients.
   */
  pktSendResponse(pkt) {
    const fn = "pktSendResponse:";
    if (pkt.hop_rsvp !== true)
      throw Error(`${fn} packet is not RSVP`);
    if (pkt.hop_seq.length < 1)
      throw Error(`${fn} packet has no hops`);
    pkt.setDir("res");
    pkt.addHop(this.urnet_addr);
    if (DBG)
      LOG2(_PKT(this, fn, "-send-res-", pkt), pkt.data);
    const { gateway, src_addr } = this.pktGetSocketRouting(pkt);
    if (this.isServer()) {
      const socket = this.getClient(src_addr);
      if (socket)
        socket.send(pkt);
      return;
    }
    if (gateway) {
      gateway.send(pkt);
      return;
    }
    if (DBG)
      LOG2(`${fn} unroutable packet`, pkt);
  }
  /** Start a transaction, which returns promises to await. This method
   *  is a queue that uses Promises to wait for the return, which is
   *  triggered by a returning packet in pktReceive(pkt).
   */
  async pktAwaitRequest(pkt) {
    const fn = "pktAwaitRequest:";
    if (pkt.hop_dir !== "req")
      throw Error(`${fn} packet is not a request`);
    const { gateway, clients } = this.pktGetSocketRouting(pkt);
    const promises = [];
    if (gateway) {
      if (DBG)
        LOG2(_PKT(this, fn, "-wait-req-", pkt), pkt.data);
      promises.push(this.pktQueueRequest(pkt, gateway));
    }
    if (Array.isArray(clients)) {
      if (DBG)
        LOG2(_PKT(this, fn, "-wait-req-", pkt), pkt.data);
      clients.forEach((sock) => {
        promises.push(this.pktQueueRequest(pkt, sock));
      });
    }
    let data = await Promise.all(promises);
    if (Array.isArray(data) && data.length === 1)
      data = data[0];
    if (DBG)
      LOG2(_PKT(this, fn, "-retn-req-", pkt), pkt.data);
    return data;
  }
  /** Start a handler call, which might have multiple implementors.
   *  Returns data from all handlers as an array or a single item
   */
  async pktAwaitHandlers(pkt) {
    const fn = "pktAwaitHandlers:";
    const { msg } = pkt;
    const handlers = this.getHandlersForMessage(msg);
    if (handlers.length === 0)
      return Promise.resolve({ error: `no handler for '${msg}'` });
    const promises = [];
    if (DBG)
      LOG2(_PKT(this, fn, "-wait-hnd-", pkt), pkt.data);
    handlers.forEach((handler) => {
      promises.push(
        new Promise((resolve, reject) => {
          try {
            resolve(handler({ ...pkt.data }));
          } catch (err) {
            reject(err);
          }
        })
      );
    });
    let data = await Promise.all(promises);
    if (Array.isArray(data) && data.length === 1)
      data = data[0];
    if (DBG)
      LOG2(_PKT(this, fn, "-retn-hnd-", pkt), pkt.data);
    return data;
  }
  /** return array of sockets to use for sending packet,
   *  based on pkt.msg and pkt.src_addr
   */
  pktGetSocketRouting(pkt) {
    const fn = "pktGetSocketRouting:";
    const { msg, src_addr } = pkt;
    if (!IsNetMessage(msg))
      throw Error(`${fn} '${msg}' is invalid message`);
    const gateway = this.cli_gateway;
    const self_addr = this.urnet_addr;
    const msg_list = this.getAddressesForMessage(msg);
    const clients = [];
    msg_list.forEach((uaddr) => {
      LOG2("uaddr", uaddr);
      if (uaddr === this.urnet_addr)
        return;
      const socket = this.getClient(uaddr);
      if (socket)
        clients.push(socket);
    });
    return {
      msg,
      src_addr,
      self_addr,
      gateway,
      clients
    };
  }
};

// _ur_addons/net/class-urnet-socket.ts
var PR4 = typeof process !== "undefined" ? "Socket".padEnd(13) : "Socket:";
var NetSocket = class {
  // name of the socket-ish object
  constructor(connectObj, io) {
    __publicField(this, "connector");
    // the original connection object
    __publicField(this, "sendFunc");
    // the outgoing send function for this socket
    __publicField(this, "onDataFunc");
    // the incoming data function for this socket
    //
    __publicField(this, "uaddr");
    // assigned uaddr for this socket-ish object
    __publicField(this, "auth");
    // whatever authentication is needed for this socket
    __publicField(this, "msglist");
    // messages queued for this socket
    __publicField(this, "age");
    // number of seconds since this socket was used
    __publicField(this, "label");
    this.connector = connectObj;
    const { send, onData } = io;
    this.sendFunc = send.bind(connectObj);
    this.onDataFunc = onData.bind(connectObj);
  }
  send(pkt) {
    this.sendFunc(pkt);
  }
  getConnector() {
    return this.connector;
  }
};

// _ur_addons/@addons-client.ts
var { ConsoleStyler } = client_esm_exports;
var PF = ConsoleStyler("UR/ADD", "TagPink");
var CLASS2 = {
  NetEndpoint,
  NetSocket,
  NetPacket
};
function AddonClientTest() {
  console.log(...PF("System Integration of new URSYS addon successful!"));
}
//# sourceMappingURL=addons-client-cjs.js.map
