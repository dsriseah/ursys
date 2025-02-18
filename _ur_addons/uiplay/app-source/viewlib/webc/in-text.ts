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
    this.input.addEventListener('keypress', this.handleKeypress);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.input.removeEventListener('input', this.handleKeypress);
  }

  /// INCOMING METATDATA, STATE ///

  /** set attributes of the input element */
  receiveMetadata(name: string, data: DataObj) {
    if (name === this.name) {
      const { value } = data;
      console.log('got metadata', name, data);
    }
  }

  /** update state of the input element, which matches the props */
  receiveState(groupName: string, state: StateObj) {
    // console.log('receiveState:', groupName, state);
    const props = this.decodeState(groupName, state);
    if (props === undefined) {
      console.warn(`decodeState: ${groupName} failed`, groupName);
      return;
    }
    // console.log('props', props);
    const { value } = props;
    if (value !== this.input.value) {
      this.input.value = value;
    } else {
      console.log(`receiveState: '${this.getName()}' value not changed ${value}`);
    }
  }

  /// LOCAL INPUT HANDLING ///

  private handleKeypress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.dispatchValue();
    }
  };

  private dispatchValue = (): void => {
    const name = this.getAttribute('name');
    const group = this.getAttribute('group');
    const props = { value: this.input.value };
    const state = this.encodeState(group, name, props);
    if (state === undefined) {
      console.warn(`encodeState: ${group}/${name} failed`, props);
      return;
    }
    // console.log(`dispatchValue: ${group}/${name}`, state);
    this.sendState(group, state);
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputText;
