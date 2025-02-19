/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  input button

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StatelyElement from './lib/class-stately-element.ts';
import type { DataObj, StateObj } from '../viewstate-mgr.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class InputButton extends StatelyElement {
  //
  button: HTMLButtonElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('connectedCallback', this.name);
    const name = this.initName();
    const group = this.initGroup();
    this.shadowRoot!.innerHTML = `
    <button>${name}</button>
    `;
    this.button = this.shadowRoot!.querySelector('button')!;
    this.button.addEventListener('click', this.handleClick);
  }

  /// INCOMING METATDATA ///

  receiveMetadata(name: string, data: DataObj) {}

  /// LOCAL INPUT HANDLING ///

  private handleClick = (event: Event): void => {
    console.log('clicked', this.name);
    event.preventDefault();
    if (DBG) console.log('in-button', this.name);
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputButton;
