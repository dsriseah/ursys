/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  input text

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StatelyElement from './lib/class-stately-element.ts';
import type { DataObj, StateObj } from '../viewstate-mgr.ts';
import { ConsoleStyler } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = true;
const LOG = console.log.bind(console);
const PR = ConsoleStyler('in-text', 'TagPink');

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class InputText extends StatelyElement {
  input: HTMLInputElement;
  label: HTMLLabelElement;
  tooltip: HTMLDivElement;
  timer: ReturnType<typeof setTimeout>;

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
      div.tooltip {
        position: fixed;
        background-color: gray;
        color: white;
        padding: 5px;
        z-index: 1000;
        display: none;
      }
    </style>
    <label for=${name}}>${name}</label>
    <input type="text" name="${name}" />
    <div class="tooltip"></div>
    `;
    this.input = this.shadowRoot!.querySelector('input')!;
    this.input.addEventListener('keypress', this.handleKeypress);
    this.label = this.shadowRoot!.querySelector('label')!;
    this.label.addEventListener('mouseover', this.handleHover);
    this.label.addEventListener('mouseout', this.handleHoverOut);
    this.tooltip = this.shadowRoot!.querySelector('div.tooltip')!;
  }

  private handleHover = (event: MouseEvent): void => {
    const { style: tt } = this.tooltip;
    // position tooltip above label
    const rect = this.label.getBoundingClientRect();
    tt.top = `${rect.top - 30}px`;
    tt.left = `${rect.left}px`;
    const { style: ll } = this.label;
    ll.color = 'maroon';
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      tt.display = 'block';
      this.timer = null;
    }, 1000);
  };

  private handleHoverOut = (event: MouseEvent): void => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    const { style } = this.tooltip;
    style.display = 'none';
    const { style: ll } = this.label;
    ll.color = 'inherit';
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    this.input.removeEventListener('input', this.handleKeypress);
  }

  /// INCOMING METATDATA, STATE ///

  /** data received is already filters by group and name */
  receiveMetadata(meta: DataObj) {
    LOG(...PR(`receiveMetadata[${this.name}]`), meta);
    const { label, tooltip } = meta;
    this.label.innerText = label;
    this.tooltip.innerText = tooltip;
  }

  /** UPDATE: receive state change */
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

  /** EVENT: submit the value on enter keypress */
  private handleKeypress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.submitChange();
    }
  };

  /** ACTION: submit the value change to state manager */
  private submitChange = (): void => {
    const name = this.getAttribute('name');
    const group = this.getAttribute('group');
    const props = { value: this.input.value };
    const state = this.encodeState(group, name, props);
    if (state === undefined) {
      console.warn(`encodeState: ${group}/${name} failed`, props);
      return;
    }
    // console.log(`submitChange: ${group}/${name}`, state);
    this.sendState(group, state);
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputText;
