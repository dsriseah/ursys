/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  input text

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StatelyElement from './lib/class-stately-element.ts';
import type { DataObj, StateObj } from '../viewstate-mgr.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class InputText extends StatelyElement {
  input: HTMLInputElement;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    super.connectedCallback();
    const name = this.initName(); // grabs the name attribute if any
    const group = this.initGroup(); // grabs the group attribute if any
    this.shadowRoot!.innerHTML = `
    <style>
      :host {
        display: grid;
        grid-template-columns: 1fr auto;
        margin: 0.25rem;
      }
      label { padding-right: 0.5rem; }
    </style>
    <label for=${name}}>${name}</label>
    <input type="text" name="${name}" />
    `;
    this.input = this.shadowRoot!.querySelector('input')!;
    this.input.addEventListener('input', this.handleInput);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.input.removeEventListener('input', this.handleInput);
  }

  /// INCOMING METATDATA ///

  /** set attributes of the input element */
  receiveMetadata(name: string, data: DataObj) {
    if (name === this.name) {
      const { value } = data;
      console.log('got metadata', name, data);
    }
  }

  /// LOCAL INPUT HANDLING ///

  private handleInput = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const name = this.getAttribute('name');
    const group = this.getAttribute('group');
    const value = input.value;
    const state = this.encodeState(group, name, value);
    this.sendState(group, { [name]: value });
  };

  /// INCOMING STATE ///

  /** update state of the input element */
  receiveState(groupName: string, state: StateObj) {
    const dobj = this.decodeState(groupName, state);
    if (dobj === undefined) return;
    const { value } = dobj;
    if (value !== this.input.value) {
      this.input.value = value;
    }
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputText;
