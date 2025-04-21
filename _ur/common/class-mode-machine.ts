/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ModeMachine

  composites sets of input triggers to produce derived output triggers

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPES & INTERFACES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj } from '../_types/dataset.ts';
import type { DataEncoding } from './declare-encodings.d.ts';
type ModeMachineClass = string; // lower_snake_case
type ModeName = `::${string}`; // PascalCase

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const LOG = console.log.bind(console);
const WARN = console.warn.bind(console);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const m_machines: Map<ModeMachineClass, ModeMachine> = new Map();

/// PRIVATE HELPERS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// URSYS PhaseMachine CLASS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class ModeMachine {
  //
  mmClass: ModeMachineClass;
  modeNames: Set<ModeName>;

  /// INITIALIZATION ///

  /** require a unique class name for the event machine */
  constructor(mmClass: ModeMachineClass) {
    if (!this._okClass(mmClass)) throw Error(`bad emClass ${mmClass}`);
    this.mmClass = mmClass;
    m_machines.set(mmClass, this);
  }

  /** validate mode machine class name, which must be lower_snake_case */
  _okClass(mmClass: ModeMachineClass) {
    let validClass = typeof mmClass === 'string' && mmClass.length > 0;
    validClass = validClass && mmClass.indexOf('_') !== -1;
    validClass = validClass && mmClass === mmClass.toLowerCase();
    return validClass;
  }

  /// MODE NAME REGISTRATION ///

  /** validate mode names  */
  _okMode(modeName: ModeName) {
    let validType = typeof modeName === 'string' && modeName.length > 0;
    validType = validType && modeName.slice(0, 2) === '::';
    validType = validType && modeName[3] === modeName[3].toUpperCase();
  }
}

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default ModeMachine;
export { ModeMachine };
