/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UIControlGroup is the parent container of UIControlInputs. It listens for
  state changes from its children. It registers itself as a named controlgroup.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StateElement, { GetStateGroup } from './base-state-element';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIControlInput extends StateElement {
  protected input: HTMLInputElement;

  constructor() {
    super();
    this.input = document.createElement('input');
    this.shadowRoot!.appendChild(this.input);
  }

  applyState(state: any): void {}

  applyMetadata(metadata: any): void {
    const name = this.getAttribute('name');
    if (name && metadata[name]) {
      const { placeholder, tooltip, default: def } = metadata[name];
      this.input.setAttribute('placeholder', placeholder || '');
      this.input.setAttribute('title', tooltip || '');
      this.input.value = def || '';
    }
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIControlInput;
