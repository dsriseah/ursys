var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// _ur/common/declare-console.js
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

// _ur/common/util-prompts.js
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
        let PR = padString(prompt);
        if (dim)
          TEXT2 += TERM_COLORS.Dim;
        console.log(`${RST}${TAG}${PR}${RST}${TEXT2}    ${str}`, ...args);
      } : (str, ...args) => {
        if (args === void 0)
          args = "";
        let TEXT2 = TERM_COLORS[textColor];
        let RST = CSS_COLORS.Reset;
        let PR = padString(prompt);
        console.log(`%c${PR}%c%c ${str}`, RST, TEXT2, ...args);
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
    function makeTerminalOut5(prompt, tagColor = DEFAULT_COLOR) {
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
      makeTerminalOut: makeTerminalOut5,
      makeHTMLConsole,
      printTagColors,
      colorTagString
    };
  }
});

// _ur/common/declare-async.js
var require_declare_async = __commonJS({
  "_ur/common/declare-async.js"(exports, module2) {
    var APP_LIFECYCLE = {
      SETUP: [
        "INITIALIZE",
        // module data structure init
        "NETWORK",
        // connected to network
        "CONNECT",
        // connected as registered UR application
        "LOAD",
        // load any external data, make connections
        "CONFIG",
        // configure runtime data structures
        "ALLOCATE"
        // alloca
      ],
      RUN: [
        "READY",
        // when viewsystem has completely composed
        "START",
        // start normal execution run
        "RUN",
        // system starts running
        "UPDATE",
        // system is running (periodic call w/ time)
        "STATUS",
        // system status message
        "STOP"
        // system wants to stop current rons
      ],
      ASYNC: [
        "FREEZE",
        // system wants to pause run
        "UNFREEZE"
        // system has paused (periodic call w/ time)
      ],
      SHUTDOWN: [
        "DEALLOCATE",
        // release memory resourcesun
        "UNLOAD",
        // system releases any connecti
        "SHUTDOWN",
        // system is shutting down
        "ZOMBIE",
        // system is dead and needs to reinitialize
        "EXIT"
        // system has ended
      ],
      EXCEPTION: [
        "DISCONNECT",
        // unisys server has gone offline
        "RECONNECT",
        // unisys server has reconnected
        "NETWORK_LOST",
        // network connection lost
        "APP_HALT"
        // system and thrown an error
      ]
    };
    var UR_EVENTS = {
      // dataex module events appear in {dataex,data} message object
      DATAEX: [
        // UrModule initial handshake
        "_CONFIG_REQ",
        // Receive UrModule setup data
        "_CONFIG_ACK",
        // on configuration, return config data to UrModule instance
        // upstream module messages to downstream module
        "DATA",
        // data: chunk from upstream module
        "RESPONSE",
        // control: response from upstream module
        // downstream module messages to upstream module
        "initialize",
        // status: downstream module init
        "start",
        // status:about to start
        "run",
        // status: has started running
        "status",
        // status: periodic update
        "error",
        // status: process-terminating error, w status
        "stop",
        // status: process stoppeed
        "exit",
        // status: process terminated w/ errcode
        "result",
        // data: result of operation
        "request"
        // control: request upstream RESPONSE
      ]
    };
    module2.exports = {
      APP_LIFECYCLE,
      UR_EVENTS
    };
  }
});

// _ur/common/declare-errors.js
var require_declare_errors = __commonJS({
  "_ur/common/declare-errors.js"(exports, module2) {
    var EXIT_CODES = {
      ERR_UR: 444
      // ur runner general error
    };
    module2.exports = {
      EXIT_CODES
    };
  }
});

// _ur/common/util-error-mgr.js
var require_util_error_mgr = __commonJS({
  "_ur/common/util-error-mgr.js"(exports, module2) {
    var { EXIT_CODES } = require_declare_errors();
    var { ERR_UR } = EXIT_CODES;
    var PROMPTS2 = require_util_prompts();
    var { makeTerminalOut: makeTerminalOut5 } = PROMPTS2;
    var ERROUT = makeTerminalOut5("ERR", "TagRed");
    var DIE2 = (...args) => {
      Error.stackTraceLimit = 20;
      let errs = new Error(`UR Process Terminated (${ERR_UR})`).stack.split("\n");
      let myErrs = errs.filter((line) => {
        if (line.includes("at Module."))
          return false;
        if (line.includes("at require "))
          return false;
        return true;
      }).join("\n");
      ERROUT(`\x1B[93m${args.join(" ")}\x1B[0m`);
      ERROUT(myErrs);
      process.exit(ERR_UR);
    };
    var NewConsoleError = (label = "_ERR_", tagColor = "TagRed") => {
      const fn = "NewConsoleError";
      if (typeof label !== "string")
        DIE2(fn, `arg must be a string`);
      const OUT = makeTerminalOut5(label, tagColor);
      return OUT;
    };
    module2.exports = {
      DIE: DIE2,
      NewConsoleError
    };
  }
});

// _ur/common/util-text.js
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

// _ur/node-server/@server.mts
var server_exports = {};
__export(server_exports, {
  ADDONMGR: () => ur_addon_mgr_exports,
  APPSERV: () => appserver_exports,
  CLASS: () => CLASS,
  ENV: () => env_node_exports,
  FILE: () => files_exports,
  Initialize: () => Initialize,
  PR: () => makeTerminalOut4,
  PROC: () => processes_exports,
  TEXT: () => import_util_text.default
});
module.exports = __toCommonJS(server_exports);

// _ur/node-server/ur-addon-mgr.mts
var ur_addon_mgr_exports = {};
__export(ur_addon_mgr_exports, {
  ProcTest: () => ProcTest,
  UR_Fork: () => UR_Fork
});
var import_node_child_process2 = require("node:child_process");
var import_node_path3 = require("node:path");

// _ur/node-server/files.mts
var files_exports = {};
__export(files_exports, {
  AbsLocalPath: () => AbsLocalPath,
  AsyncReadFile: () => AsyncReadFile,
  AsyncReadJSON: () => AsyncReadJSON,
  AsyncWriteJSON: () => AsyncWriteJSON,
  DetectedRootDir: () => DetectedRootDir,
  DirExists: () => DirExists,
  EnsureDir: () => EnsureDir,
  FileExists: () => FileExists,
  Files: () => Files,
  IsDir: () => IsDir,
  IsFile: () => IsFile,
  ReadFile: () => ReadFile,
  RelLocalPath: () => RelLocalPath,
  RemoveDir: () => RemoveDir,
  ShortPath: () => ShortPath,
  Subdirs: () => Subdirs,
  Test: () => Test,
  UnlinkFile: () => UnlinkFile,
  UnsafeWriteFile: () => UnsafeWriteFile
});
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_node_path = __toESM(require("node:path"), 1);
var import_util_prompts = __toESM(require_util_prompts(), 1);
var url = __toESM(require("url"), 1);
var import_meta = {};
function m_Dirname() {
  if (import_meta)
    return url.fileURLToPath(new URL(".", import_meta.url));
  return __dirname;
}
function DetectedRootDir(rootfile = ".nvmrc") {
  if (typeof DETECTED_DIR === "string")
    return DETECTED_DIR;
  let currentDir = m_Dirname();
  const check_dir = (dir) => import_fs_extra.default.existsSync(import_node_path.default.join(dir, rootfile));
  while (currentDir !== import_node_path.default.parse(currentDir).root) {
    if (check_dir(currentDir)) {
      DETECTED_DIR = currentDir;
      return DETECTED_DIR;
    }
    currentDir = import_node_path.default.resolve(currentDir, "..");
  }
  return void 0;
}
var LOG = import_util_prompts.default.makeTerminalOut(" FILE", "TagGreen");
var DETECTED_DIR;
var DBG = false;
function FileExists(filepath) {
  try {
    import_fs_extra.default.accessSync(filepath);
    return true;
  } catch (e) {
    return false;
  }
}
function DirExists(dirpath) {
  try {
    const stat = import_fs_extra.default.statSync(dirpath);
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
    const stat = import_fs_extra.default.statSync(dirpath);
    if (stat.isDirectory())
      return true;
    return false;
  } catch (e) {
    LOG(`IsDir: ${dirpath} does not exist`);
    return false;
  }
}
function IsFile(filepath) {
  try {
    const stat = import_fs_extra.default.statSync(filepath);
    if (stat.isFile())
      return true;
    return false;
  } catch (e) {
    LOG(`IsFile: ${filepath} does not exist`);
    return false;
  }
}
function EnsureDir(dirpath) {
  try {
    import_fs_extra.default.ensureDirSync(dirpath);
    return true;
  } catch (err) {
    LOG(`EnsureDir: <${dirpath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
function RemoveDir(dirpath) {
  try {
    if (IsDir(dirpath))
      import_fs_extra.default.removeSync(dirpath);
    return true;
  } catch (err) {
    LOG(`EnsureDir: <${dirpath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
function AbsLocalPath(subdir) {
  const root = DetectedRootDir();
  if (!root)
    throw Error("AbsLocalPath: could not find project root");
  return import_node_path.default.normalize(import_node_path.default.join(root, subdir));
}
function RelLocalPath(subdir) {
  const root = DetectedRootDir();
  if (!root)
    throw Error("AbsLocalPath: could not find project root");
  const path = import_node_path.default.normalize(import_node_path.default.join(root, subdir));
  return path.slice(root.length);
}
function ShortPath(path) {
  const root = DetectedRootDir();
  if (!root)
    throw Error("ShortPath: could not find project root");
  return path.slice(root.length);
}
function GetDirContent(dirpath) {
  if (!DirExists(dirpath)) {
    const err = `${dirpath} is not a directory`;
    console.warn(err);
    return void 0;
  }
  const filenames = import_fs_extra.default.readdirSync(dirpath);
  const files = [];
  const dirs = [];
  for (let name of filenames) {
    let path = import_node_path.default.join(dirpath, name);
    const stat = import_fs_extra.default.lstatSync(path);
    if (stat.isDirectory())
      dirs.push(name);
    else
      files.push(name);
  }
  return { files, dirs };
}
function Files(dirpath, opt = {}) {
  const result = GetDirContent(dirpath);
  if (!result)
    return void 0;
  const basenames = result.files.map((p) => import_node_path.default.basename(p));
  if (DBG)
    LOG(`found ${basenames.length} files in ${dirpath}`);
  return basenames;
}
function Subdirs(dirpath) {
  const result = GetDirContent(dirpath);
  if (!result)
    return void 0;
  return result.dirs;
}
function ReadFile(filepath, opt) {
  opt = opt || {};
  opt.encoding = opt.encoding || "utf8";
  return import_fs_extra.default.readFileSync(filepath, opt);
}
async function AsyncReadFile(filepath, opt) {
  opt = opt || {};
  opt.encoding = opt.encoding || "utf8";
  try {
    return await import_fs_extra.default.readFile(filepath, opt);
  } catch (err) {
    LOG(`AsyncReadFile: <${filepath}> failed w/ error ${err}`);
    throw new Error(err);
  }
}
async function UnsafeWriteFile(filepath, rawdata) {
  let file = import_fs_extra.default.createWriteStream(filepath, { emitClose: true });
  file.write(rawdata);
  file.on("error", () => LOG("error on write"));
  file.end();
}
async function AsyncReadJSON(filepath) {
  const rawdata = await AsyncReadFile(filepath);
  return JSON.parse(rawdata);
}
async function AsyncWriteJSON(filepath, obj) {
  if (typeof obj !== "string")
    obj = JSON.stringify(obj, null, 2);
  await UnsafeWriteFile(filepath, obj);
}
async function UnlinkFile(filepath) {
  try {
    import_fs_extra.default.unlinkSync(filepath);
    return true;
  } catch (err) {
    if (err.code === "ENOENT")
      return false;
    console.log(err.code);
  }
}
function Test() {
  const files = Files(__dirname);
  if (files.length && files.length > 0)
    LOG("FM.Files: success");
  else
    LOG("Files: fail");
  LOG(`found ${files.length} files`);
}

// _ur/node-server/class-urmodule.mts
var import_node_events = require("node:events");
var import_node_stream = require("node:stream");
var import_declare_async = __toESM(require_declare_async(), 1);
var import_node_child_process = require("node:child_process");
var import_util_prompts2 = __toESM(require_util_prompts(), 1);
var { URDEX } = import_declare_async.default.UR_EVENTS;
var LOG2 = (0, import_util_prompts2.makeTerminalOut)(" URMOD", "TagYellow");
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
    if (typeof name === "string")
      this.setName(name);
    LOG2(`UrModule '${u_modname(this)}' constructing`);
    if (mobj instanceof import_node_child_process.ChildProcess) {
      this.modType = "fork";
      this.modObj = mobj;
      this.manageFork();
    } else if (u_is_stream(mobj)) {
      this.modType = "stream";
    } else if (mobj.HandleMessage && mobj.Call) {
      this.modType = "urnet";
    } else if (mobj instanceof import_node_events.EventEmitter) {
      this.modType = "event";
    } else {
      this.error = "UrModule(): not an eventEmitter, process, or stream";
      console.log(this.error);
      throw new Error(this.error);
    }
    LOG2("linking");
    this.linkModules(input, output);
    LOG2("*** TODO *** process running goes here");
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
    if (this.modObj === void 0)
      throw new Error("manageFork(): modObj undefined");
    this.modObj.on("message", (msg) => {
      LOG2(`[${u_modname(this)}] DATAEX:`, msg);
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
          LOG2("unhandled input dataex:", dataex);
          break;
      }
    });
    LOG2("awaiting input");
  }
  /** the output modules will communicate their status back
   *  to this module, providing events to signal what's going
   *  on.
   *  Uses URDEX protocol
   */
  activateOutput() {
    LOG2("connecting to output module");
    this.modOut.on("message", (msg) => {
      const { dataex, data } = msg;
      switch (dataex) {
        case "exit":
          break;
        default:
          LOG2("unknown output dataex:", dataex);
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
var u_is_stream = (obj) => obj instanceof import_node_stream.Readable || obj instanceof import_node_stream.Writable || obj instanceof import_node_stream.Duplex || obj instanceof import_node_stream.Transform;
var u_modname = (instance) => instance.modName || instance.id;
var class_urmodule_default = UrModule;

// _ur/node-server/env-node.mts
var env_node_exports = {};
__export(env_node_exports, {
  DIR_BDL_BROWSER: () => DIR_BDL_BROWSER,
  DIR_BDL_NODE: () => DIR_BDL_NODE,
  DIR_PUBLIC: () => DIR_PUBLIC,
  DIR_UR: () => DIR_UR,
  DIR_UR_ADDS: () => DIR_UR_ADDS,
  DIR_UR_DIST: () => DIR_UR_DIST,
  DirExists: () => DirExists,
  GetPaths: () => GetPaths,
  MakePath: () => u_path,
  ROOT: () => ROOT,
  SetRootPaths: () => SetRootPaths,
  ShortPath: () => u_short
});
var import_node_path2 = require("node:path");
var DBG2 = false;
var ROOT = "";
var DIR_PUBLIC;
var DIR_UR;
var DIR_UR_DIST;
var DIR_BDL_BROWSER;
var DIR_BDL_NODE;
var DIR_UR_ADDS;
var u_path = (path = "") => {
  if (ROOT === "")
    throw new Error("SetRoot() must be called");
  if (path.length === 0)
    return ROOT;
  path = (0, import_node_path2.normalize)((0, import_node_path2.join)(ROOT, path));
  if (path.endsWith("/"))
    path = path.slice(0, -1);
  return path;
};
var u_short = (path) => {
  if (path.startsWith(ROOT))
    return path.slice(ROOT.length);
  return path;
};
function SetRootPaths(path) {
  if (ROOT.length > 0)
    return GetPaths();
  if (DirExists(path)) {
    ROOT = path;
    DIR_PUBLIC = u_path("/public");
    DIR_UR = u_path("/_ur");
    DIR_UR_DIST = u_path("/_ur/_dist");
    DIR_BDL_BROWSER = u_path("/_ur/browser-client");
    DIR_BDL_NODE = u_path("/_ur/node-server");
    DIR_UR_ADDS = u_path("/_ur_addons");
    if (DBG2) {
      console.log(DIR_PUBLIC);
      console.log(DIR_UR);
      console.log(DIR_UR_DIST);
      console.log(DIR_BDL_BROWSER);
      console.log(DIR_BDL_NODE);
      console.log(DIR_UR_ADDS);
    }
    return GetPaths();
  }
  console.log(`SetRoot: ${path} does not exist`);
}
function GetPaths() {
  if (ROOT === "")
    throw new Error("GetPath: SetRoot() has to be called prior");
  return {
    ROOT,
    DIR_PUBLIC,
    DIR_UR,
    DIR_BDL_BROWSER,
    DIR_BDL_NODE,
    DIR_UR_DIST,
    DIR_UR_ADDS
  };
}

// _ur/node-server/ur-addon-mgr.mts
var import_util_error_mgr = __toESM(require_util_error_mgr(), 1);
var import_util_prompts3 = __toESM(require_util_prompts(), 1);
var LOG3 = import_util_prompts3.default.makeTerminalOut(" UPROC", "TagCyan");
var DBG3 = true;
var { DIE } = import_util_error_mgr.default;
var LAUNCH_PREFIX = "@";
var URDIR = "";
async function UR_Fork(modname, opt = {}) {
  const fn = `UR_Fork ${modname}:`;
  LOG3(fn, "starting");
  let child;
  const { input, output, cwd } = m_ParseOptions(opt);
  if (cwd)
    URDIR = cwd;
  if (URDIR.endsWith("/"))
    URDIR = URDIR.slice(0, -1);
  let { modpath, entry } = m_ParseModulePathString(modname, fn);
  let forkPath = `${URDIR}/${modpath}`;
  if (DBG3)
    LOG3("searching", u_short(forkPath), "for modules");
  const entryFiles = m_ReadModuleEntryFiles(modpath);
  if (DBG3)
    LOG3("found entryfiles", entryFiles);
  if (entry) {
    if (!entryFiles.includes(entry))
      DIE(fn, `error: %{entry} is not in ${URDIR}${modpath}`);
    if (DBG3)
      LOG3(`launching '${u_short(forkPath)}/${entry}'`);
    child = (0, import_node_child_process2.fork)(entry, { cwd: forkPath });
    return child;
  }
  if (entryFiles.length === 0)
    DIE(fn, `error: no @entry modules found in ${URDIR}${modpath}`);
  entry = entryFiles[0];
  if (DBG3)
    LOG3(`launching '${modpath}/${entry}'`);
  child = (0, import_node_child_process2.fork)(entry, { cwd: `${URDIR}${modpath}/` });
  const urmod = new class_urmodule_default(child, { name: `${modpath}/${entry}` });
  return urmod;
}
function m_ParseOptions(opt) {
  const fn = "m_ParseOptions";
  let { input, output, cwd = "" } = opt;
  if (input) {
    if (!(input instanceof class_urmodule_default))
      throw new Error(`${fn}: input must be UrModule instance or undefined`);
  }
  if (output) {
    if (!(output instanceof class_urmodule_default))
      throw new Error(`${fn}: output must be UrModule instance or undefined`);
  }
  if (cwd) {
    if (typeof cwd !== "string")
      throw new Error(`${fn}: cwd must be string or undefined`);
  } else {
    cwd = DIR_UR_ADDS;
  }
  return {
    input,
    output,
    cwd
  };
}
function m_ParseModulePathString(modname, fn = "m_ParseModulePathString") {
  let modpath, entry;
  if (typeof modname !== "string")
    DIE(fn, "error: arg1 must be a string path not", typeof modname);
  const pathbits = modname.split("/");
  if (pathbits.length === 2) {
    modpath = pathbits[0];
    entry = pathbits[1];
  } else if (pathbits.length === 1) {
    modpath = modname;
  } else
    DIE(fn, "error: arg1 syntax path too deep");
  if (entry !== void 0 && typeof entry !== "string")
    DIE(fn, "error: bad module entry");
  if (entry && !entry.startsWith("@"))
    DIE(fn, `error: entrypoint '${entry}' must begin with @`);
  return { modpath, entry };
}
function m_ReadModuleEntryFiles(modname) {
  const fn = "m_ReadModuleEntryFiles:";
  const modulePath = (0, import_node_path3.join)(URDIR, modname);
  if (!DirExists(modulePath)) {
    console.log("error", modulePath);
    DIE(fn, "error:", modname, `not found in ${URDIR} directory`);
  }
  const files = Files(modulePath);
  const entryFiles = files.filter((file) => file.startsWith(LAUNCH_PREFIX));
  return entryFiles;
}
function ProcTest() {
  console.log("proc test");
}

// _ur/node-server/appserver.mts
var appserver_exports = {};
__export(appserver_exports, {
  ClearAppOut: () => ClearAppOut,
  GetAppOut: () => GetAppOut,
  StartAppServer: () => StartAppServer,
  Watch: () => Watch,
  WriteAppOut: () => WriteAppOut
});
var import_chokidar = require("chokidar");
var import_express = __toESM(require("express"), 1);
var import_util_prompts4 = __toESM(require_util_prompts(), 1);
var TERM = (0, import_util_prompts4.makeTerminalOut)("UR", "TagBlue");
var APP_OUT = [];
var GetAppOut = () => APP_OUT.join("\n");
var WriteAppOut = (msg) => APP_OUT.push(msg);
var ClearAppOut = () => APP_OUT = [];
function StartAppServer() {
  const app = (0, import_express.default)();
  app.get("/", (req, res) => {
    let text = GetAppOut();
    res.send(`<pre>${text}</pre>`);
  });
  const server = app.listen(3e3, () => {
    TERM("Example app listening on port 3000!");
  });
  process.on("exit", () => {
    TERM("exiting express app");
    server.close();
  });
  process.on("SIGINT", () => {
    console.log("exiting express app");
    server.close((err) => {
      if (err) {
        TERM.error(err);
        process.exit(1);
      }
      process.exit();
    });
  });
}
function Watch() {
  const watcher = (0, import_chokidar.watch)("./_ur/**");
  watcher.on("change", (path) => {
    TERM("watcher: path changed", path);
  });
}

// _ur/node-server/processes.mts
var processes_exports = {};
__export(processes_exports, {
  DecodeAddonArgs: () => DecodeAddonArgs,
  ValidateAddon: () => ValidateAddon
});
var import_util_prompts5 = __toESM(require_util_prompts(), 1);
var import_node_process = __toESM(require("node:process"), 1);
var import_node_path4 = __toESM(require("node:path"), 1);
var LOG4 = (0, import_util_prompts5.makeTerminalOut)("PROCESS", "TagGreen");
function m_DecodeAddonName(shortPath) {
  let addonName, entryName;
  if (typeof shortPath !== "string") {
    LOG4("error: arg must be a string path not", typeof shortPath);
    return {};
  }
  const pathbits = shortPath.split("@");
  if (pathbits.length === 2) {
    addonName = pathbits[0];
    entryName = pathbits[1];
  } else if (pathbits.length === 1) {
    addonName = shortPath;
  } else
    return { err: `error: '${shortPath}' has too many '@'` };
  if (entryName !== void 0 && typeof entryName !== "string")
    return { err: `error: can't parse @entryname` };
  if (entryName) {
    if (entryName.indexOf(".") !== -1)
      return { err: `error: entryName '${entryName}' must not contain '.'` };
  }
  if (entryName !== void 0)
    entryName = `@${entryName}`;
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
  ] = argv || import_node_process.default.argv;
  const addonScript = import_node_path4.default.basename(a_enp, import_node_path4.default.extname(a_enp));
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
  const ADDONS = import_node_path4.default.join(DetectedRootDir(), "_ur_addons");
  if (!DirExists(ADDONS)) {
    return { err: `directory ${ADDONS} does not exist` };
  }
  const f_dir = (item) => !(item.startsWith("_") || item === "node_modules");
  const a_dirs = Subdirs(ADDONS).filter(f_dir);
  let { addonName, entryName, err } = m_DecodeAddonName(addon);
  if (err)
    return { err };
  if (!a_dirs.includes(addonName))
    return {
      err: `error: addon '${addonName}' not found in ${ADDONS} directory`
    };
  const addon_dir = import_node_path4.default.join(ADDONS, addonName);
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
      entryName = import_node_path4.default.basename(entryFile, import_node_path4.default.extname(entryFile));
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

// _ur/node-server/@server.mts
var import_util_text = __toESM(require_util_text(), 1);
var import_util_prompts6 = __toESM(require_util_prompts(), 1);

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
    if (opt?.mutable)
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

// _ur/node-server/@server.mts
var { makeTerminalOut: makeTerminalOut4 } = import_util_prompts6.default;
var CLASS = {
  OpSequencer: class_op_seq_default,
  StateMgr: class_state_mgr_default,
  UrModule: class_urmodule_default
};
function Initialize(options) {
  const { rootDir } = options;
  SetRootPaths(rootDir);
}
var { makeStyleFormatter } = import_util_prompts6.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ADDONMGR,
  APPSERV,
  CLASS,
  ENV,
  FILE,
  Initialize,
  PR,
  PROC,
  TEXT
});
//# sourceMappingURL=server.cjs.map
