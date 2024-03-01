var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// _ur/common/declare-console.js
var require_declare_console = __commonJS({
  "_ur/common/declare-console.js"(exports, module) {
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
    module.exports = {
      TERM_COLORS,
      CSS_COLORS
    };
  }
});

// _ur/common/util-prompts.js
var require_util_prompts = __commonJS({
  "_ur/common/util-prompts.js"(exports, module) {
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
        let PR2 = padString(prompt);
        if (dim)
          TEXT2 += TERM_COLORS.Dim;
        console.log(`${RST}${TAG}${PR2}${RST}${TEXT2}    ${str}`, ...args);
      } : (str, ...args) => {
        if (args === void 0)
          args = "";
        let TEXT2 = TERM_COLORS[textColor];
        let RST = CSS_COLORS.Reset;
        let PR2 = padString(prompt);
        console.log(`%c${PR2}%c%c ${str}`, RST, TEXT2, ...args);
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
    module.exports = {
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

// _ur/common/util-text.js
var require_util_text = __commonJS({
  "_ur/common/util-text.js"(exports, module) {
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
    module.exports = {
      PreprocessDataText
    };
  }
});

// _ur/browser-client/@client.ts
var import_util_prompts = __toESM(require_util_prompts());
var import_util_text = __toESM(require_util_text());

// _ur/common/class-op-seq.ts
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
    __publicField(this, "ops");
    // array of operations
    __publicField(this, "seqName");
    // sequencer name
    __publicField(this, "lastOp");
    // last operation
    __publicField(this, "currentOp");
    // current operation
    __publicField(this, "opIndex");
    // current operation index
    __publicField(this, "opsMap");
    // map opname to index in ops array
    __publicField(this, "subs");
    // map opname to set of subscribers
    __publicField(this, "_disposed");
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

// _ur/common/class-state-mgr.ts
var VM_STATE = {};
var GROUPS = /* @__PURE__ */ new Map();
var USED_PROPS = /* @__PURE__ */ new Map();
var StateMgr = class _StateMgr {
  // queued side effects
  /// CONSTRUCTOR /////////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  constructor(groupName) {
    __publicField(this, "name");
    // the name of this state group
    __publicField(this, "init");
    // true if _initializeState has been called
    __publicField(this, "subs");
    __publicField(this, "queue");
    // queued state changes
    __publicField(this, "taps");
    // queued state interceptor hooks
    __publicField(this, "effects");
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

// _ur/browser-client/@client.ts
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
export {
  CLASS,
  ClientTest,
  makeStyleFormatter as ConsoleStyler,
  export_PROMPTS as PROMPTS,
  class_state_mgr_default as StateMgr,
  export_TEXT as TEXT
};
//# sourceMappingURL=client-esm.js.map
