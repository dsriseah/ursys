/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import YAML from 'js-yaml';
import { TEXT } from 'ursys/client';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj as StateObj } from 'ursys/client';

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function ParseText(metaText: string): StateObj {
  const meta = YAML.load(metaText);
  if (typeof meta !== 'object' || meta === null) {
    throw new Error('Invalid metadata format');
  }
  return meta as StateObj;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function AssertGroupName(name: string): string {
  if (!TEXT.IsAtomicKeyword(name)) throw Error(`Invalid group name: ${name}`);
  return name;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { ParseText, AssertGroupName };
