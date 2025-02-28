/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Master Entrypoint for Public UR Common Library

  A currated set of user-facing exports. The commented-out modules are ones
  that are generally used for internal operations.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// UTILITY EXPORTS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: TERM, CSS, ANSI, ConsoleStyler, TerminalLog */
export * as PROMPTS from './util-prompts.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: BadString, ThrowBadString, IsAlphaNumeric, HasSingleDash,
 *         HasNoSpaces
 *  -      IsSnakeCase, IsCamelCase, IsKebabCase, IsPascalCase,
 *         IsUpperSnakeCase, IsValidCustomTag, IsAtomicKeyword,
 *  -      AssetNumber, AssertString, AssertAlphanumeric,
 *         AssertKeyword, ForceAlphanumeric, MakeLowerSnakeCase,
 *  -      PreprocessDataText, MakeUpperSnakeCase, MakeKebabCase,
 *         MakePascalCase, MakeCamelCase */
export * as TEXT from './util-text.ts';

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: APP_LIFECYCLE, UR_EVENTS */
/// export * as DEF_ASYNC from './declare-async.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: TERM_COLORS, CSS_COLORS, ANSI_COLORS */
/// export * as COLORS from './declare-colors.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: ENCODING_TYPES, TRIGGER_LOGIC
 *  types: DataEncoding, DataTrigger */
/// export * from './declare-encodings.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: EXIT_CODES */
/// export * from './declare-errors.ts'; // deprecated or unused

/// PROCESSES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: NewID, NewFullID, PrefixShortID, DecodeID,
 *         IsValidFormat, IsValidSchema, IsValidPrefix,
 *         SetDefaultSchema, GetDefaultSchema */
export * as UID from './module-uid.ts';

/// DATA OPERATIONS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: NormEntID, NormItem, NormItemList, NormItemDict, NormIDs,
 *         NormStringToValue, DeepClone, DeepCloneObject, DeepCloneArray */
export * as NORM from './util-data-norm.ts';

/// INTERNALS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: IsAssetDirname, IsValidDataURI, IsValidDataConfig, IsDataSyncOp,
 *         IsDatasetOp, DecodeDataURI, DecodeDataConfig, DecodeDatasetReq,
 *         DecodeSyncReq, GetDatsetObjectProps, GetBinPropsByDirname */
export * as DATA_UTIL from './util-data-ops.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: Find, Query
 *  test:  m_SetCriteria, m_GetCriteria, m_EnforceFlags, m_AssessPropKeys,
 *         u_matchValues, u_matchRanges */
export * as DATA_QUERY from './util-data-search.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: IsValidType, SkipOriginType, isSpecialPktType, IsValidChannel,
 *         IsValidAddress, IsValidMessage, AllocateAddress, DecodeMessage,
 *         NormalizeMessage, NormalizeData, IsLocalMessage, IsNetMessage,
 *         IsServerMessage, GetPacketHashString
 * -       VALID_MSG_CHANNELS, VALID_PKT_TYPES, VALID_ADDR_PREFIX,
 *         SKIP_SELF_PKT_TYPES, UADDR_DIGITS, UADDR_NONE */
export * as NET_UTIL from './util-urnet.ts';
