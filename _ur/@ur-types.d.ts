/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Shared Type Declarations for URSYS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export * from './_types/ursys'; // operational data parameter and return types
export * from './_types/urnet'; // urnet messaging system
export * from './_types/dataset'; // dataset, records, search, and filter types
export * from './_types/resource'; // resource and manifest types
export * from './_types/users'; // user: ident, access, auth types
export * from './_types/sna'; // sri new architecture types
export type { SNA_ComponentProps, SNA_Component } from './common/class-sna-component'; // sna module interface
