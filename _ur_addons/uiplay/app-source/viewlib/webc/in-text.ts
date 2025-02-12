/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  input text

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StatelyElement from './lib/class-stately-element.ts';

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class InputText extends StatelyElement {
  //
  input: HTMLInputElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    input.type = 'text';
    this.input = input;
    this.shadowRoot!.appendChild(input);
  }

  applyState(state: any): void {}

  applyMetadata(metadata: any): void {
    const name = this.getAttribute('name');
    if (!name || metadata[name]) return;
    const { placeholder, tooltip, default: def } = metadata[name];
    this.input.setAttribute('placeholder', placeholder || '');
    this.input.setAttribute('title', tooltip || '');
    this.input.value = def || '';
  }

  connectedCallback() {
    this.render();
  }

  render() {}
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputText;
