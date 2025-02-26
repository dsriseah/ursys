/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Shared Type Declarations for URSYS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// EXPORT GLOBALS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type * from './ursys'; // operational data parameter and return types
export type * from './urnet'; // urnet messaging system
export type * from './dataset'; // dataset, records, search, and filter types
export type * from './resource'; // resource and manifest types
export type * from './users'; // user: ident, access, auth types
export type * from './sna'; // sri new architecture types

/// EXPORT MODULES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export * as TEXT from '../common/util-text';
export * as PROMPTS from '../common/util-prompts';
export * as NORM from '../common/util-data-norm';
//
export * as SNA from '../node-server/sna-node';
export * as FILE from '../node-server/file';
export * as APPSERV from '../node-server/appserver';
export * as APPBUILD from '../node-server/appbuilder';
export * as PROC from '../node-server/process';
export * as CONSTANTS from '../node-server/constants-urnet';
//
// export { makeStyleFormatter as ConsoleStyler } from '../common/util-prompts';

/// EXPORT COMMON /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type { PhaseMachine } from '../common/class-phase-machine';
export type { SNA_Component } from '../common/class-sna-component';
