/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  master entrypoint for ur common library

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// UTILITY EXPORTS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: TERM, CSS, ANSI, ConsoleStyler, TerminalLog */
export * as PROMPTS from './util-prompts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: BadString, ThrowBadString, IsAlphaNumeric, HasSingleDash,
 *         HasNoSpaces
 *  -      IsSnakeCase, IsCamelCase, IsKebabCase, IsPascalCase,
 *         IsUpperSnakeCase, IsValidCustomTag, IsAtomicKeyword,
 *  -      AssetNumber, AssertString, AssertAlphanumeric,
 *         AssertKeyword, ForceAlphanumeric, MakeLowerSnakeCase,
 *  -      PreprocessDataText, MakeUpperSnakeCase, MakeKebabCase,
 *         MakePascalCase, MakeCamelCase */
export * as TEXT from './util-text';

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: APP_LIFECYCLE, UR_EVENTS */
export * from './declare-async';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: TERM_COLORS, CSS_COLORS, ANSI_COLORS */
export * from './declare-colors';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: ENCODING_TYPES, TRIGGER_LOGIC
 *  types: DataEncoding, DataTrigger */
export * from './declare-encodings';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: EXIT_CODES */
export * from './declare-errors'; // deprecated or unused

/// PROCESSES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: NewID, NewFullID, PrefixShortID, DecodeID,
 *         IsValidFormat, IsValidSchema, IsValidPrefix,
 *         SetDefaultSchema, GetDefaultSchema */
export * from './module-uid';

/// DATA OPERATIONS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: NormEntID, NormItem, NormItemList, NormItemDict, NormIDs,
 *         NormStringToValue, DeepClone, DeepCloneObject, DeepCloneArray */
export * from './util-data-norm';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: IsAssetDirname, IsValidDataURI, IsValidDataConfig, IsDataSyncOp,
 *         IsDatasetOp, DecodeDataURI, DecodeDataConfig, DecodeDatasetReq,
 *         DecodeSyncReq, GetDatsetObjectProps, GetBinPropsByDirname */
export * from './util-data-ops';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: Find, Query
 *  test:  m_SetCriteria, m_GetCriteria, m_EnforceFlags, m_AssessPropKeys,
 *         u_matchValues, u_matchRanges */
export { Find, Query } from './util-data-search';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: DIE, NewConsoleError */
export * from './util-error-mgr';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: IsBrowser, IsNode, IsNodeCJS, IsNodeESM */
export * from './util-platform';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** named: IsValidType, SkipOriginType, isSpecialPktType, IsValidChannel,
 *         IsValidAddress, IsValidMessage, AllocateAddress, DecodeMessage,
 *         NormalizeMessage, NormalizeData, IsLocalMessage, IsNetMessage,
 *         IsServerMessage, GetPacketHashString
 * -       VALID_MSG_CHANNELS, VALID_PKT_TYPES, VALID_ADDR_PREFIX,
 *         SKIP_SELF_PKT_TYPES, UADDR_DIGITS, UADDR_NONE */
export * from './util-urnet';
