/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UIMetadata reads its contained YAML text and parses it into a metadata object,
  which is then sent to the centralized state manager that distributes 
  changes to all StatelyGroups. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ParseText } from './lib/meta-parser.ts';
import { UpdateMetadata } from '../viewstate-mgr.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const cn = 'UIMetadata:';

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIMetadata extends HTMLElement {
  //
  group: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');
    slot.style.display = 'none';
    this.shadowRoot!.appendChild(slot);
  }

  /** parses the YAML text and sends it to the state manager */
  connectedCallback() {
    this.group = this.getAttribute('for') || '';
    if (!this.group) throw Error(`${cn} must have a group attribute`);
    const slots = this.shadowRoot!.querySelectorAll('slot');
    if (slots.length !== 1) throw Error(`${cn} must have one slot`);
    const tn = slots[0].assignedNodes()[0];
    if (tn.nodeType !== Node.TEXT_NODE) throw Error(`${cn} must be text node`);
    const metaObj = ParseText(tn.textContent);
    if (!metaObj) throw Error(`${cn} invalid metadata format`);
    UpdateMetadata(this.group, metaObj);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIMetadata;
