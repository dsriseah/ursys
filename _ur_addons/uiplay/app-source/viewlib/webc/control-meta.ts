/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  input text

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StatelyElement, {
  GetStateGroup,
  UpdateStateGroup
} from './lib/class-stately-element.ts';
import { ParseText } from './lib/meta-parser';

const cn = 'ControlMeta:';

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIControlMeta extends StatelyElement {
  //
  group: string;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');
    slot.style.display = 'none';
    this.shadowRoot!.appendChild(slot);
  }

  connectedCallback() {
    this.group = this.getAttribute('for') || '';
    if (!this.group) throw Error(`${cn} must have a group attribute`);
    const slots = this.shadowRoot!.querySelectorAll('slot');
    if (slots.length !== 1) throw Error(`${cn} must have one slot`);
    const tn = slots[0].assignedNodes()[0];
    if (tn.nodeType !== Node.TEXT_NODE) throw Error(`${cn} must be text node`);
    const stateObj = ParseText(tn.textContent);
    if (!stateObj) throw Error(`${cn} invalid state object`);
    UpdateStateGroup(this.group, stateObj);
  }

  applyState(state: any): void {}

  applyMetadata(metadata: any): void {}
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIControlMeta;
