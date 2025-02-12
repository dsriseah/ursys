/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  input button

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StatelyElement from './lib/class-stately-element.ts';

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class InputButton extends StatelyElement {
  //
  button: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    this.button = button;
    this.shadowRoot!.appendChild(button);
  }

  applyState(state: any): void {}

  applyMetadata(metadata: any): void {
    const name = this.getAttribute('name');
    if (!name || metadata[name]) return;
    const { label } = metadata[name];
    this.button.textContent = label || '<???>';
  }

  connectedCallback() {
    this.render();
  }

  render() {}
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputButton;
