/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS CORE TYPES
  This is the base set of types that are used throughout the URSYS system, 
  including other type declarations

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// DATA PARAMETER AND RETURN TYPES ///////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// we use various object conventions
export type DataObj = { [key: string]: any };
export type ErrObj = { error?: string; errorCode?: string; errorInfo?: string };
export type OpResult = DataObj & ErrObj;
