var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// web-client/sna-web.ts
var sna_web_exports = {};
__export(sna_web_exports, {
  APPCONTEXT: () => sna_web_context_exports,
  AddMessageHandler: () => AddMessageHandler,
  ClientEndpoint: () => ClientEndpoint,
  DATACLIENT: () => sna_dataclient_exports,
  DeleteMessageHandler: () => DeleteMessageHandler,
  GetAppConfig: () => SNA_GetAppConfig,
  GetDanglingHooks: () => GetDanglingHooks,
  GetMachine: () => GetMachine,
  HookAppPhase: () => SNA_HookAppPhase,
  HookPhase: () => HookPhase,
  MOD_DataClient: () => sna_dataclient_default,
  NewComponent: () => SNA_NewComponent2,
  RegisterMessages: () => RegisterMessages,
  RunPhaseGroup: () => RunPhaseGroup,
  SetAppConfig: () => SNA_SetAppConfig,
  Start: () => SNA_Start,
  Status: () => SNA_Status,
  UseComponent: () => SNA_UseComponent
});

// common/util-prompts.ts
var util_prompts_exports = {};
__export(util_prompts_exports, {
  ANSI: () => ANSI_COLORS,
  CSS: () => CSS_COLORS,
  ConsoleStyler: () => makeStyleFormatter,
  TERM: () => TERM_COLORS,
  TerminalLog: () => makeTerminalOut,
  default: () => util_prompts_default
});

// common/declare-colors.ts
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

// common/util-prompts.ts
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
    let PR11;
    let SPC;
    if (prompt.startsWith(" ")) {
      PR11 = ` ${prompt.trim()} `;
      SPC = " ";
    } else {
      PR11 = u_pad(prompt, pad);
      SPC = "    ";
    }
    if (dim) TEXT += TERM_COLORS.Dim;
    console.log(`${RST}${TAG}${PR11}${RST}${TEXT}${SPC}${str}`, ...args, RST);
  } : (str, ...args) => {
    if (args === void 0) args = "";
    let TEXT = TERM_COLORS[textColor];
    let RST = CSS_COLORS.Reset;
    let PR11 = u_pad(prompt, pad);
    console.log(`%c${PR11}%c%c ${str}`, RST, TEXT, ...args);
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

// common/util-urnet.ts
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
  let addr = opt == null ? void 0 : opt.addr;
  let pre = (opt == null ? void 0 : opt.prefix) || "UA";
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

// common/class-urnet-packet.ts
var PR = typeof process !== "undefined" ? "Packet".padEnd(13) : "Packet:";
var LOG = console.log.bind(console);
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
    this.hop_dir = (opt == null ? void 0 : opt.dir) || "req";
    this.hop_rsvp = (opt == null ? void 0 : opt.rsvp) || false;
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
    if (!this.isResponse()) LOG(PR, `would auth ${src_addr} '${msg}'`);
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

// common/class-urnet-servicemap.ts
var PR2 = (
  // @ts-ignore - multiplatform definition check
  typeof process !== "undefined" ? "ServiceMap".padEnd(13) : "ServiceMap".padEnd(11)
);
var LOG2 = console.log.bind(console);
var ServiceMap = class {
  // map of services forwarded to other addresses
  /** constructor: identifier is generally the same as the endpoint UADDR
   *  when used by NetEndpoint e.g. SRV01, SRV02, etc.
   */
  constructor(addr) {
    __publicField(this, "service_addr");
    // unique identifier for this map
    __publicField(this, "handled_svcs");
    // map of services with local handler functions
    __publicField(this, "proxied_svcs");
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
        LOG2(PR2, `${fn2} auto-enabling proxies`);
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

// common/class-urnet-transaction.ts
var DBG = false;
var PR3 = (
  // @ts-ignore - multiplatform definition check
  typeof process !== "undefined" ? "Transact".padEnd(13) : "Transact".padEnd(11)
);
var LOG3 = console.log.bind(console);
var TransactionMgr = class {
  // log of current transactions
  /** create a new transaction manager */
  constructor() {
    // fields
    __publicField(this, "transaction_log");
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
    if (DBG && meta) LOG3(PR3, `${fn2}: additional metadata`, meta);
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

// common/class-urnet-endpoint.ts
var DBG2 = false;
var PR4 = (
  // @ts-ignore - multiplatform definition check
  typeof process !== "undefined" ? "EndPoint".padEnd(13) : "EndPoint".padEnd(11)
);
var LOG4 = console.log.bind(console);
var AGE_INTERVAL = 1e3;
var AGE_MAX = 60 * 30;
var NetEndpoint = class {
  // client registration status
  constructor() {
    __publicField(this, "svc_map");
    // service handler map (include proxies)
    __publicField(this, "trx_mgr");
    // hash->resolver
    //
    __publicField(this, "uaddr");
    // the address for this endpoint
    __publicField(this, "client_socks");
    // uaddr->I_NetSocket
    //
    __publicField(this, "cli_counter");
    // counter for generating unique uaddr
    __publicField(this, "pkt_counter");
    // counter for generating packet ids
    //
    __publicField(this, "cli_gateway");
    // gateway to server
    __publicField(this, "cli_sck_timer");
    // timer for checking socket age
    __publicField(this, "cli_ident");
    // client credentials to request authentication
    __publicField(this, "cli_auth");
    // client access token for
    __publicField(this, "cli_reg");
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
      LOG4(PR4, this.uaddr, `already configured`, [...this.client_socks.keys()]);
    this.client_socks = /* @__PURE__ */ new Map();
    if (this.svc_map.hasProxies())
      LOG4(PR4, this.uaddr, `already configured`, this.svc_map.proxiesList());
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
      LOG4(PR4, `${fn2} invalid uaddr ${typeof uaddr}`);
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
            LOG4(PR4, this.uaddr, `socket ${uaddr} expired`);
          }
        });
      }, AGE_INTERVAL);
      return;
    }
    if (this.cli_sck_timer) clearInterval(this.cli_sck_timer);
    this.cli_sck_timer = null;
    LOG4(PR4, this.uaddr, `timer stopped`);
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
        LOG4(PR4, "src address mismatch", pkt.src_addr, "!= sock", socket.uaddr);
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
        LOG4(PR4, `${fn2} error:`, error);
        return false;
      }
      if (!IsValidAddress(uaddr)) throw Error(`${fn2} invalid uaddr ${uaddr}`);
      this.uaddr = uaddr;
      this.svc_map = new class_urnet_servicemap_default(uaddr);
      if (cli_auth === void 0) throw Error(`${fn2} invalid cli_auth`);
      this.cli_auth = cli_auth;
      if (DBG2) LOG4(PR4, "AUTHENTICATED", uaddr, cli_auth);
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
      LOG4(PR4, `${fn2} error:`, error);
      return regData;
    }
    if (ok) {
      if (DBG2) LOG4(PR4, "REGISTERED", status);
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
      LOG4(PR4, `${fn2} error:`, error);
    } else if (DBG2) {
      console.groupCollapsed(PR4, `DECLARED ${rmsg_list.length} messages`);
      rmsg_list.forEach((msg, i) => LOG4(`${i + 1}	'${msg}'`));
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
      LOG4(PR4, `${fn2} error:`, error);
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
      LOG4(PR4, this.uaddr, fn2, `invalid packet`, pkt);
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
      LOG4(PR4, this.uaddr, fn2, `unknown message ${pkt.msg}`);
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
    LOG4(PR4, `${fn2} unroutable packet`, pkt);
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
    LOG4(PR4, this.uaddr, "would check auth token");
  }
};

// common/class-urnet-socket.ts
var PR5 = typeof process !== "undefined" ? "Socket".padEnd(13) : "Socket:";
var LOG5 = console.log.bind(console);
var NetSocket = class {
  // name of the socket-ish object
  constructor(connectObj, io) {
    __publicField(this, "connector");
    // the original connection object
    __publicField(this, "sendFunc");
    // the outgoing send function for this socket
    __publicField(this, "closeFunc");
    // function to disconnect
    __publicField(this, "onDataFunc");
    // the incoming data function for this socket
    __publicField(this, "getConfigFunc");
    // function to get configuration
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

// web-client/sna-web-context.ts
var sna_web_context_exports = {};
__export(sna_web_context_exports, {
  AddMessageHandlers: () => AddMessageHandlers,
  SNA_GetAppConfig: () => SNA_GetAppConfig,
  SNA_GetAppConfigUnsafe: () => SNA_GetAppConfigUnsafe,
  SNA_GetLockState: () => SNA_GetLockState,
  SNA_SetAppConfig: () => SNA_SetAppConfig,
  SNA_SetLockState: () => SNA_SetLockState
});
var LOG6 = console.log.bind(console);
var PR6 = makeStyleFormatter("sna.ctxt", "TagGray");
var DBG3 = false;
var APP_CFG = {};
var CFG_STATE = /* @__PURE__ */ new Set();
function SNA_SetLockState(state) {
  if (CFG_STATE.has(state)) return void 0;
  if (state === "init" && CFG_STATE.size !== 0) return void 0;
  if (state === "preconfig" && !CFG_STATE.has("init")) return void 0;
  if (state === "prehook" && !CFG_STATE.has("preconfig")) return void 0;
  if (state === "locked" && !CFG_STATE.has("prehook")) return void 0;
  CFG_STATE.add(state);
  return state;
}
function SNA_GetLockState(state) {
  return CFG_STATE.has(state);
}
function SNA_SetAppConfig(config) {
  if (config === void 0) return APP_CFG;
  if (Object.keys(APP_CFG).length === 0) {
    if (DBG3) LOG6(...PR6(`Setting SNA Global Configuration`));
  } else if (DBG3) LOG6(...PR6(`Updating SNA Global Configuration`));
  APP_CFG = Object.assign(APP_CFG, config);
  if (DBG3) LOG6(...PR6("SetAppConfig()", APP_CFG));
  return { ...APP_CFG };
}
function SNA_GetAppConfig() {
  const fn2 = "SNA_GetAppConfig:";
  if (SNA_GetLockState("preconfig") === false) {
    console.warn(`${fn2} Derived config should be set in PreHook at earliest.`);
    console.warn(`Complete config is guaranteed at lifecycle start.`);
  }
  return { ...APP_CFG };
}
function SNA_GetAppConfigUnsafe() {
  return APP_CFG;
}
function HandleUpdateMessage(data) {
}
function AddMessageHandlers(EP2) {
  EP2.addMessageHandler("SNA/SET_APP_CONFIG", HandleUpdateMessage);
}

// web-client/sna-web-urnet-client.ts
var LOG7 = console.log.bind(console);
var PR7 = makeStyleFormatter("sna.unet", "TagGray");
var SERVER_LINK;
var EP = new NetEndpoint();
function SNA_NetConnect() {
  const wss_url = "/sna-ws";
  const promiseConnect = new Promise((resolve) => {
    SERVER_LINK = new WebSocket(wss_url);
    SERVER_LINK.addEventListener("open", async () => {
      const send = (pkt) => SERVER_LINK.send(pkt.serialize());
      const onData = (event) => EP._ingestServerPacket(event.data, client_sock);
      const close = () => SERVER_LINK.close();
      const client_sock = new NetSocket(SERVER_LINK, { send, onData, close });
      SERVER_LINK.addEventListener("message", onData);
      SERVER_LINK.addEventListener("close", () => {
        EP.disconnectAsClient();
      });
      window.addEventListener("beforeunload", EP.disconnectAsClient);
      const auth = { identity: "my_voice_is_my_passport", secret: "crypty" };
      const resdata = await EP.connectAsClient(client_sock, auth);
      if (resdata.error) {
        console.error(resdata.error);
        resolve(false);
        return;
      }
      const info = { name: "WebClient", type: "client" };
      const regdata = await EP.declareClientProperties(info);
      if (regdata.error) {
        console.error(regdata.error);
        resolve(false);
        return;
      }
      const { config } = regdata;
      if (config) SNA_SetAppConfig(config);
      resolve(true);
    });
  });
  return promiseConnect;
}
function ClientEndpoint() {
  if (!EP) throw Error("ClientEndpoint not initialized");
  return EP;
}
async function RegisterMessages() {
  const resdata = await EP.declareClientMessages();
  return resdata;
}
function AddMessageHandler(message, handler) {
  EP.addMessageHandler(message, handler);
}
function DeleteMessageHandler(message, handler) {
  EP.deleteMessageHandler(message, handler);
}

// common/class-phase-machine.ts
var DBG4 = false;
var LOG8 = console.log.bind(console);
var WARN = console.warn.bind(console);
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
  if (DBG4) console.log(`${fn2} ${machine} / ${phase} : ${event}`);
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
  if (DBG4) LOG8(`phasemachine '${pmName}' has ${qhooks.length} queued ops`);
  try {
    qhooks.forEach((hook) => machine.addHookEntry(hook.phase, hook));
    m_queue.delete(pmName);
  } catch (e) {
    console.warn("Error while processing queued phasemachine hooks");
    throw Error(e.toString());
  }
}
var PhaseMachine = class {
  constructor(pmName, phases) {
    __publicField(this, "pm_name");
    __publicField(this, "pm_state");
    __publicField(this, "phase_hooks");
    // name -> addHookEntry[]
    __publicField(this, "phase_membership");
    __publicField(this, "phase_def");
    __publicField(this, "phase_timer");
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
      WARN(`${fn2} '${phid}' is not defined in ${this.pm_name} phase def`);
      return;
    }
    this.phase_hooks.get(phid).push(hook);
    if (DBG4) LOG8(`${fn2} added hook for ${phid}`);
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
      if (DBG4) console.log(`${fn2} entering group ${phase}`);
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
    LOG8(
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

// common/class-sna-component.ts
var SNA_Component = class {
  constructor(name, config) {
    __publicField(this, "_name");
    __publicField(this, "AddComponent");
    __publicField(this, "PreConfig");
    __publicField(this, "PreHook");
    __publicField(this, "Subscribe");
    __publicField(this, "Unsubscribe");
    if (typeof name !== "string") throw Error("SNA_Component: bad name");
    this._name = name;
    const { AddComponent, PreConfig: PreConfig2, PreHook: PreHook2, Subscribe: Subscribe2, Unsubscribe: Unsubscribe2 } = config;
    this.AddComponent = AddComponent;
    this.PreConfig = PreConfig2;
    this.PreHook = PreHook2;
    this.Subscribe = Subscribe2;
    this.Unsubscribe = Unsubscribe2;
  }
};
function SNA_NewComponent(name, config) {
  return new SNA_Component(name, config);
}

// web-client/sna-web-hooks.ts
var LOG9 = console.log.bind(console);
var PR8 = makeStyleFormatter("sna.hook", "TagGray");
var DBG5 = true;
var COMPONENTS = /* @__PURE__ */ new Set();
var PM;
var { HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks } = PhaseMachine;
function SNA_NewComponent2(name, config) {
  return new SNA_Component(name, config);
}
function SNA_UseComponent(component) {
  const fn2 = "SNA_UseComponent:";
  const { _name } = component;
  if (typeof _name !== "string")
    throw Error(`${fn2} bad SNA component: missing _name`);
  if (COMPONENTS.has(component))
    LOG9(...PR8(`SNA_Component '${_name}' already registered`));
  if (DBG5) LOG9(...PR8(`Registering SNA_Component: '${_name}'`));
  COMPONENTS.add(component);
  const { AddComponent } = component;
  if (typeof AddComponent === "function") {
    if (DBG5) LOG9(...PR8(`.. '${_name}' is adding modules`));
    AddComponent({ f_AddComponent: SNA_UseComponent });
  }
}
async function SNA_LifecycleStart() {
  const fn2 = "SNA_LifecycleStart:";
  if (PM === void 0)
    PM = new PhaseMachine("SNA", {
      PHASE_BOOT: [
        "APP_PAGE",
        // app initial page load complete
        "APP_BOOT"
        // for minimal initialization of data structure
      ],
      PHASE_INIT: [
        "DOM_READY"
        // the app's initial page has rendered fully
      ],
      PHASE_CONNECT: [
        "OpRe",
        // start the network connection
        "NET_AUTH",
        // hook for authentication setup
        "NET_REGISTER",
        // hook for registration info
        "NET_READY",
        // ursys network is active and registered
        "NET_DECLARE",
        // hook for declaring messages to URNET
        "NET_ACTIVE",
        // system is listen for messages
        "NET_DATASET"
        // hook for dataset connection
      ],
      PHASE_LOAD: [
        "LOAD_DATA",
        // load data from server
        "LOAD_CONFIG",
        // load configuration
        "LOAD_ASSETS"
        // load assets
      ],
      PHASE_CONFIG: [
        "APP_CONFIG",
        // app configure based on loaded data, config, etc
        "APP_READY"
        // app is completely configured
      ],
      PHASE_RUN: [
        "APP_RESET",
        // app sets initial settings
        "APP_START",
        // app starts running
        "APP_RUN"
        // app is running (terminal phase)
      ],
      /* independent groups */
      PHASE_SHUTDOWN: [
        "APP_CLOSE",
        // app is close hook
        "NET_DISCONNECT",
        // network disconnected hook
        "APP_STOP"
        // app stop hook
      ],
      PHASE_ERROR: ["APP_ERROR"]
    });
  if (!SNA_SetLockState("init")) LOG9(...PR8(`lockstate 'init' fail`));
  const APP_CFG_COPY = { ...SNA_GetAppConfigUnsafe() };
  for (const component of COMPONENTS) {
    const { PreConfig: PreConfig2, _name } = component;
    if (typeof PreConfig2 === "function") {
      if (DBG5) LOG9(...PR8(`PreConfig SNA_Component '${_name}'`));
      PreConfig2(APP_CFG_COPY);
    }
  }
  if (!SNA_SetLockState("preconfig")) LOG9(...PR8(`lockstate 'preconfig' fail`));
  for (const component of COMPONENTS) {
    const { PreHook: PreHook2, _name } = component;
    if (typeof PreHook2 === "function") {
      if (DBG5) LOG9(...PR8(`PreHook SNA_Component '${_name}'`));
      PreHook2();
    }
  }
  if (!SNA_SetLockState("prehook")) LOG9(...PR8(`lockstate 'prehook' fail`));
  if (DBG5) LOG9(...PR8(`SNA App Lifecycle is starting`));
  await RunPhaseGroup("SNA/PHASE_BOOT");
  await RunPhaseGroup("SNA/PHASE_INIT");
  await RunPhaseGroup("SNA/PHASE_CONNECT");
  await RunPhaseGroup("SNA/PHASE_LOAD");
  await RunPhaseGroup("SNA/PHASE_CONFIG");
  await RunPhaseGroup("SNA/PHASE_RUN");
  if (!SNA_SetLockState("locked")) LOG9(...PR8(`lockstate 'locked' fail`));
  const dooks = GetDanglingHooks();
  if (dooks) {
    LOG9(...PR8(`*** ERROR *** dangling phase hooks detected`), dooks);
  }
}
function SNA_HookAppPhase(phase, fn2) {
  HookPhase(`SNA/${phase}`, fn2);
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
    const lastPhaseGroup = PM.getPhaseList("PHASE_RUN");
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

// web-client/sna-dataclient.ts
var sna_dataclient_exports = {};
__export(sna_dataclient_exports, {
  Activate: () => Activate,
  Add: () => Add,
  Clear: () => Clear,
  Configure: () => Configure,
  Delete: () => Delete,
  DeleteIDs: () => DeleteIDs,
  Find: () => Find2,
  Get: () => Get,
  Persist: () => Persist,
  Query: () => Query2,
  Replace: () => Replace,
  SetDataFromObject: () => SetDataFromObject,
  Subscribe: () => Subscribe,
  Unsubscribe: () => Unsubscribe,
  Update: () => Update,
  Write: () => Write,
  default: () => sna_dataclient_default
});

// common/util-data-norm.ts
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

// common/util-data-search.ts
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

// common/class-data-recordset.ts
var fn = "RecordSet";
var RecordSet = class {
  // paginated items
  //
  constructor(items) {
    //
    __publicField(this, "src_items");
    // source items
    __publicField(this, "cur_items");
    // transformed items
    __publicField(this, "cur_meta");
    // metadata
    //
    __publicField(this, "page_index");
    // current page index (0-based)
    __publicField(this, "page_size");
    // current page size in items
    __publicField(this, "page_count");
    // total number of pages
    __publicField(this, "pages");
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

// common/util-data-search.ts
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
    match && (match = item[key] === value);
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
    if (op === "gt") match && (match = ival > a);
    if (op === "lt") match && (match = ival < a);
    if (op === "gte") match && (match = ival >= a);
    if (op === "lte") match && (match = ival <= a);
    if (op === "eq") match && (match = ival === a);
    if (op === "ne") match && (match = ival !== a);
    if (op === "between") {
      let b = u_cast_value(arg2);
      match && (match = ival >= a && ival <= b);
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
    if (b_miss) match && (match = u_hasMissingProps(ii, b_miss));
    if (b_has) match && (match = u_hasProps(ii, b_has));
    if (match_exact) match && (match = u_matchValues(ii, match_exact));
    if (match_range) match && (match = u_matchRanges(ii, match_range));
    if (match) found.push(ii);
  }
  return found;
}
function Query(items, criteria) {
  return new RecordSet(Find(items, criteria));
}

// common/class-event-machine.ts
var LOG10 = console.log.bind(console);
var WARN2 = console.warn.bind(console);
var m_machines2 = /* @__PURE__ */ new Map();
var EventMachine = class {
  /// INITIALIZATION ///
  /** require a unique class name for the event machine */
  constructor(emClass) {
    //
    __publicField(this, "emClass");
    __publicField(this, "listeners");
    __publicField(this, "eventNames");
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

// common/abstract-data-databin.ts
var DataBin = class {
  // event machine for listeners
  /// INITIALIZE ///
  /** base constuctor. call with super(). by default, the _prefix is empty and
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name) {
    //
    __publicField(this, "name");
    // name of this collection
    __publicField(this, "_type");
    // type of this collection (.e.g ItemList);
    __publicField(this, "_prefix");
    // when set, this is the prefix for the ids
    __publicField(this, "_ord_digits");
    // if _prefix is set, then number of zero-padded digits
    __publicField(this, "_ord_highest");
    // current highest ordinal
    __publicField(this, "_notifier");
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

// common/class-data-itemlist.ts
var ItemList = class extends DataBin {
  // list storage
  /// INITIALIZATION ///
  /** constuctor takes ItemListOptions. If there are no options defined,
   *  the ids created will be simple integers. If you define an idPrefix,
   *  then the ids will be the prefix + zero-padded number */
  constructor(col_name, opt) {
    super(col_name);
    // from base class
    // name: DataBinID; // name of this collection
    // _type: DataBinType; // type of this collection (.e.g ItemList);
    // _prefix: string; // when set, this is the prefix for the ids
    // _ord_digits: number; // if _prefix is set, then number of zero-padded digits
    // _ord_highest: number; // current highest ordinal
    __publicField(this, "_list");
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

// common/util-data-ops.ts
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

// common/class-data-dataset.ts
var LOG11 = console.log.bind(console);
var CTYPES = ["ItemDict", "ItemList"];
function m_IsValidDatasetURI(dataURI) {
  return DecodeDataURI(dataURI).error === void 0;
}
function m_IsValidBinType(cType) {
  return CTYPES.includes(cType);
}
var Dataset = class {
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
    //
    __publicField(this, "dataset_name");
    // the name of this list manager
    __publicField(this, "manifest");
    __publicField(this, "_dataURI");
    // the URI of the dataset
    __publicField(this, "open_bins");
    // open bins are subject to sync
    __publicField(this, "acc_toks");
    // access tokens for each bin
    //
    __publicField(this, "LISTS");
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

// common/abstract-dataset-adapter.ts
var DatasetAdapter = class {
  constructor() {
    /** access token **/
    __publicField(this, "accToken");
  }
};

// web-client/sna-dataclient.ts
var PR9 = makeStyleFormatter("SNA.DCI", "TagBlue");
var LOG12 = console.log.bind(console);
var DBG6 = true;
var DSET;
var DS_URI;
var DS_MODE;
var F_ReadOnly = false;
var F_SyncInit = false;
var REMOTE;
var DefaultDatasetAdapter = class extends DatasetAdapter {
  // inherited fields
  // this.accToken:string
  /** select the "current dataset to use" on master server */
  async selectDataset(dataURI) {
    const EP2 = ClientEndpoint();
    if (EP2) {
      const res = await EP2.netCall("SYNC:SRV_DSET", { dataURI, op: "LOAD" });
      return res;
    }
  }
  /** return either the current dataset object or the one
   *  specified by dataURI */
  async getDataObj(dataURI) {
    const EP2 = ClientEndpoint();
    if (EP2) {
      const res = await EP2.netCall("SYNC:SRV_DSET", {
        dataURI: dataURI || DS_URI,
        op: "GET_DATA"
      });
      return res;
    }
  }
  /** perform a data collection (databin) operation, returning
   *  the status of the operation (but never data) */
  async syncData(syncReq) {
    const EP2 = ClientEndpoint();
    if (EP2) {
      const res = await EP2.netCall("SYNC:SRV_DATA", syncReq);
      return res;
    }
  }
  /** perform a dataset operation, returning the status of the operation */
  async execDataset(syncReq) {
    const EP2 = ClientEndpoint();
    if (EP2) {
      const res = await EP2.netCall("SYNC:SRV_DSET", syncReq);
      return res;
    }
  }
  /** catch-all implementation-specific error handler */
  async handleError(errData) {
    Promise.resolve();
  }
};
var DefaultAdapter = new DefaultDatasetAdapter();
function HandleSyncData(sync) {
  const { binID, binType, seqNum, status, error, skipped } = sync;
  const { items, updated, added, deleted, replaced } = sync;
  const bin = DSET.getDataBin(binID);
  if (bin === void 0) {
    LOG12(...PR9("ERROR: Bin not found:", binID));
    return;
  }
  if (error) {
    LOG12(...PR9("ERROR:", error));
    return;
  }
  if (Array.isArray(skipped)) {
    LOG12(...PR9("ERROR: skipped:", skipped));
    return;
  }
  if (Array.isArray(items)) bin.write(items);
  if (Array.isArray(updated)) bin.update(updated);
  if (Array.isArray(added)) bin.add(added);
  if (Array.isArray(deleted)) bin.delete(deleted);
  if (Array.isArray(replaced)) bin.replace(replaced);
}
async function Configure(dataURI, opt) {
  const fn2 = "SetDataURI:";
  if (DSET !== void 0) throw Error(`${fn2} dataset already set`);
  let res;
  res = DecodeDataURI(dataURI);
  if (res.error) return { error: `DecodeDataURI ${res.error}` };
  res = DecodeDataConfig(opt);
  if (res.error) return { error: `DecodeDataConfig ${res.error}` };
  const { mode } = res;
  DS_URI = dataURI;
  DSET = new Dataset(DS_URI);
  switch (mode) {
    case "local":
      F_ReadOnly = false;
      F_SyncInit = false;
      REMOTE = void 0;
      break;
    case "local-ro":
      F_ReadOnly = true;
      F_SyncInit = false;
      REMOTE = void 0;
      break;
    case "sync":
      F_ReadOnly = false;
      F_SyncInit = true;
      REMOTE = DefaultAdapter;
      break;
    case "sync-ro":
      F_ReadOnly = true;
      F_SyncInit = true;
      REMOTE = DefaultAdapter;
      break;
    default:
      return { error: `unknown mode ${mode}` };
  }
  if (REMOTE) {
    AddMessageHandler("SYNC:CLI_DATA", HandleSyncData);
    await RegisterMessages();
  }
  return { dataURI, adapter: REMOTE, handlers: ["SYNC:CLI_DATA"] };
}
async function Activate() {
  if (DSET === void 0) return { error: "must call Configure() first" };
  if (F_SyncInit) {
    const res = await REMOTE.selectDataset(DS_URI);
    if (res.error) {
      console.error("Activate(): error selecting dataset:", res.error);
      return res;
    }
    if (res.status === "ok") {
      LOG12(...PR9(`Activate existing dataURI:`, res.dataURI));
    } else {
      LOG12(...PR9(`Activate status [${res.status}]`));
    }
    const ds = await REMOTE.getDataObj();
    if (ds.error) {
      console.error("Activate(): error fetching dataset:", ds.error);
      return ds;
    }
    const found = DSET._setFromDataObj(ds);
    return { dataURI: DS_URI, found: Object.keys(found) };
  }
}
async function SetDataFromObject(data) {
  const fn2 = "SetDataFromObject:";
  if (DSET === void 0) return { error: "must call Configure() first" };
  LOG12(...PR9(fn2, "data:", data));
  const { _dataURI } = data;
  if (_dataURI !== DS_URI) return { error: "dataURI mismatch" };
  const { ItemLists } = data;
  for (const [binID, binDataObj] of Object.entries(ItemLists)) {
    LOG12(...PR9("SetDataFromObject: creating", binID));
    const bin = DSET.createDataBin(binID, "ItemList");
    bin._setFromDataObj(binDataObj);
  }
  return { dataURI: DS_URI, ItemLists: Object.keys(ItemLists) };
}
async function Persist() {
  if (REMOTE) {
    const res = await REMOTE.execDataset({ dataURI: DS_URI, op: "PERSIST" });
    return res;
  }
  return { error: "no remote adapter" };
}
async function Get(binID, ids) {
  const syncReq = { op: "GET", binID, ids };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    LOG12(...PR9("Get:", binID, res));
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.get(ids);
  throw Error(`Get: bin [${binID}] not found`);
}
async function Add(binID, items) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "ADD", binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.add(items);
  throw Error(`Add: bin [${binID}] not found`);
}
async function Update(binID, items) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "UPDATE", binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.update(items);
  throw Error(`Update: bin [${binID}] not found`);
}
async function Write(binID, items) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "WRITE", binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.write(items);
  throw Error(`Write: bin [${binID}] not found`);
}
async function Delete(binID, items) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "DELETE", binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.delete(items);
}
async function DeleteIDs(binID, ids) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "DELETE", binID, ids };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.deleteIDs(ids);
}
async function Replace(binID, items) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "REPLACE", binID, items };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.replace(items);
  throw Error(`Replace: bin [${binID}] not found`);
}
async function Clear(binID) {
  if (F_ReadOnly) return { error: "readonly mode" };
  const syncReq = { op: "CLEAR", binID };
  if (REMOTE) {
    const res = await REMOTE.syncData(syncReq);
    return res;
  }
  const bin = DSET.getDataBin(binID);
  bin.clear();
  if (bin) return {};
  throw Error(`Clear: bin [${binID}] not found`);
}
async function Find2(binID, crit) {
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.find(crit);
  throw Error(`Find: bin [${binID}] not found`);
}
async function Query2(binID, query) {
  const bin = DSET.getDataBin(binID);
  if (bin) return bin.query(query);
  throw Error(`Query: bin [${binID}] not found`);
}
function PreConfig(config) {
  const { dataset } = config;
  if (dataset) {
    const { dataURI, syncMode } = dataset;
    if (!dataURI) return { error: "missing dataURI property" };
    if (!syncMode) return { error: "missing syncMode property" };
    DS_URI = dataURI;
    DS_MODE = syncMode;
    return { dataURI, syncMode };
  }
  return { error: "missing dataset property" };
}
function PreHook() {
  SNA_HookAppPhase("NET_DATASET", async () => {
    let dataURI = DS_URI;
    const opts = { mode: DS_MODE };
    let res;
    res = await Configure(dataURI, opts);
    if (res.error) throw Error(`Configure ${res.error}`);
    res = await Activate();
  });
}
function Subscribe(binID, evHdl) {
  if (typeof binID !== "string") return { error: "binID must be a string" };
  if (typeof evHdl !== "function") return { error: "evHdl must be a function" };
  if (DSET === void 0) return { error: "must call Configure() first" };
  const bin = DSET.getDataBin(binID);
  if (bin) {
    bin.on("*", evHdl);
    if (DBG6) LOG12(...PR9("Subscribe:", binID, "subscribed"));
    return { binID, eventName: "*", success: true };
  }
  if (DBG6) LOG12(...PR9("Subscribe:", binID, "not found"));
  return { error: `bin [${binID}] not found` };
}
function Unsubscribe(binID, evHdl) {
  if (DSET === void 0) return { error: "must call Configure() first" };
  const bin = DSET.getDataBin(binID);
  if (bin) bin.off("*", evHdl);
}
var sna_dataclient_default = SNA_NewComponent("dataclient", {
  PreConfig,
  PreHook,
  Subscribe,
  Unsubscribe
});

// web-client/sna-web.ts
var LOG13 = console.log.bind(console);
var PR10 = makeStyleFormatter("sna", "TagGray");
async function SNA_Start(config) {
  const { no_urnet, no_hmr } = config || {};
  if (!no_urnet) {
    SNA_HookAppPhase("DOM_READY", SNA_NetConnect);
    SNA_HookAppPhase("NET_READY", async () => {
      if (!no_hmr) {
        AddMessageHandler("NET:UR_HOT_RELOAD_APP", async () => {
          LOG13(
            "%cHot Reload Requested. Complying in 1 sec...",
            "color: #f00; font-size: larger; font-weight: bold;"
          );
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        });
      } else {
        LOG13(
          `%cHot Module Reload disabled`,
          "color: #f00; font-size: larger; font-weight: bold;"
        );
      }
    });
    SNA_HookAppPhase("NET_DECLARE", async () => {
      await RegisterMessages();
    });
  } else {
    const css = "color: #ff0000;padding:4px 8px;background-color:#ff000020;font-weight:bold;";
    LOG13(`%cSTANDALONE MODE (URNET DISABLED)`, css);
  }
  SNA_HookAppPhase("APP_RUN", () => {
    const css = "color: #008000;padding:4px 8px;background-color:#00800020;font-weight:bold;";
    LOG13(`%cSNA App Initialization Complete`, css);
  });
  await SNA_LifecycleStart();
}
function SNA_Status() {
  const dooks = GetDanglingHooks();
  const status = SNA_LifecycleStatus();
  return {
    dooks,
    ...status
  };
}

// common/util-text.ts
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

// common/module-uid.ts
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

// common/@common-classes.ts
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

// common/class-mode-machine.ts
var LOG14 = console.log.bind(console);
var WARN3 = console.warn.bind(console);
var m_machines3 = /* @__PURE__ */ new Map();
var ModeMachine = class {
  /// INITIALIZATION ///
  /** require a unique class name for the event machine */
  constructor(mmClass) {
    //
    __publicField(this, "mmClass");
    __publicField(this, "modeNames");
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

// common/class-op-seq.ts
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
    if (opt == null ? void 0 : opt.mutable) Object.freeze(newData);
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

// common/class-state-mgr.ts
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

// common/abstract-dataobj-adapter.ts
var DataObjAdapter = class {
  // access token
  //
  constructor(opt) {
    //
    __publicField(this, "dataURI");
    __publicField(this, "accToken");
    if (typeof opt === "object") {
      const { dataURI, accToken } = opt;
      this.dataURI = dataURI;
      this.accToken = accToken;
    }
  }
};

// common/class-data-manifest.ts
var WARN4 = console.warn;
var DatasetManifest = class {
  //
  constructor(maniObj) {
    //
    __publicField(this, "_manifest");
    __publicField(this, "_dataURI");
    __publicField(this, "_metaInfo");
    __publicField(this, "_bins");
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
    if (bin[binName]) WARN4(`addBin: overwriting existing bin ${binName}`);
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

// common/@common-classes.ts
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
  common_classes_exports as CLASS,
  makeStyleFormatter as ConsoleStyler,
  util_data_search_exports as DATA_QUERY,
  util_data_ops_exports as DATA_UTIL,
  util_urnet_exports as NET_UTIL,
  util_data_norm_exports as NORM,
  util_prompts_exports as PROMPTS,
  sna_web_exports as SNA,
  util_text_exports as TEXT,
  module_uid_exports as UID
};
//# sourceMappingURL=core-web-esm.js.map
