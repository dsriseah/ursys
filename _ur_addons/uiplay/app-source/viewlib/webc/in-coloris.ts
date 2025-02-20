/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UIColorPicker imports Coloris

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import UITextInput from './in-text.ts';
import type { DataObj, StateObj } from '../viewstate-mgr.ts';
import { ConsoleStyler } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const LOG = console.log.bind(console);
const PR = ConsoleStyler('in-color', 'TagPink');

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIColorPicker extends UITextInput {
  /** webcomponent lifecycle: element without attributes */
  constructor() {
    super();
  }

  /** webcomponent lifecycle: element attributes are stable */
  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  /// INCOMING METATDATA, STATE ///

  /** UPDATE: data received is already filtered by element's group/name */
  receiveMetadata(meta: DataObj) {}

  /** UPDATE: state is already filtered by element's group/name */
  receiveState(state: StateObj) {}

  /// LOCAL INPUT HANDLING ///

  /// USER ACTIONS ///
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIColorPicker;
