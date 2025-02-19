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
    const name = this.name;
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
    this.input.addEventListener('input', this.handleTyping);
    this.label = this.shadowRoot!.querySelector('label')!;
    this.label.addEventListener('mouseover', this.handleHover);
    this.label.addEventListener('mouseout', this.handleHoverOut);
    this.tooltip = this.shadowRoot!.querySelector('div.tooltip')!;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.input.removeEventListener('keypress', this.handleKeypress);
    this.input.removeEventListener('input', this.handleTyping);
    this.label.removeEventListener('mouseover', this.handleHover);
    this.label.removeEventListener('mouseout', this.handleHoverOut);
  }

  /// INCOMING METATDATA, STATE ///

  /** UPDATE: data received is already filtered by element's group/name */
  receiveMetadata(meta: DataObj) {
    LOG(...PR(`receiveMetadata[${this.name}]`), meta);
    const { label, tooltip } = meta;
    this.label.innerText = label;
    this.tooltip.innerText = tooltip;
  }

  /** UPDATE: state is already filtered by element's group/name */
  receiveState(state: StateObj) {
    const { value } = state;
    if (value !== this.input.value) {
      this.input.value = value;
      LOG(...PR(`receiveState[${this.name}]`), state);
    } else {
      LOG(...PR(`receiveState[${this.name}] no change`), state);
    }
  }

  /// LOCAL INPUT HANDLING ///

  /** EVENT: submit the value on enter keypress */
  private handleKeypress = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.submitChange();
    }
  };

  /** EVENT: live decode the value on input but don't send */
  private handleTyping = (event: Event): void => {
    const { value } = this.input;
    LOG(...PR(`live decode [${this.name}]`), value);
  };

  /** EVENT: show tooltip on hover */
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

  /** EVENT: hide tooltip on mouseout */
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

  /// USER ACTIONS ///

  /** ACTION: submit the value change to state manager */
  private submitChange = (): void => {
    const state = this.encodeState({ value: this.input.value });
    this.sendState(state);
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default InputText;
