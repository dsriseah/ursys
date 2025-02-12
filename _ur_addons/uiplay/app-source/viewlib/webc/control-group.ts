/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UIControlGroup is the parent container of UIControlInputs. It listens for
  state changes from its children. It registers itself as a named controlgroup.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import StateElement, { UpdateStateGroup } from './lib/class-stately-element';
import type { DataObj as StateObj } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CN = 'ControlGroup:';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIControlGroup extends StateElement {
  private group: string;
  private inputs: { [name: string]: HTMLInputElement };
  private state: StateObj;
  private _slot!: HTMLSlotElement; // save found slot

  constructor() {
    super();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `<slot></slot>`;
    this.state = {};
    this.inputs = {};
  }

  connectedCallback(): void {
    super.connectedCallback();
    const group = this.getAttribute('state-group');
    if (!group) throw Error(`${CN} must have a group attribute`);
    this.group = group;
    //
    const slot = this.shadowRoot!.querySelector('slot');
    if (!slot) throw Error(`${CN} Slot element not found`);
    slot.addEventListener('slotchange', this.handleSlotChange);
    this._slot = slot;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._slot.removeEventListener('slotchange', this.handleSlotChange);
    Object.values(this.inputs).forEach(input => {
      input.removeEventListener('input', this.handleInputChange);
    });
  }

  private handleSlotChange(): void {
    const slotNodes = this._slot.assignedElements();
    slotNodes.forEach(node => {
      if (node instanceof HTMLInputElement) {
        const inputName = node.getAttribute('name');
        node.addEventListener('input', this.handleInputChange);
        this.inputs[inputName] = node;
        UpdateStateGroup(this.group, { ...this.state });
        this.state[inputName] = node.value;
      }
    });
    this.dispatchStateUpdate();
  }

  private handleInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const inputName = input.getAttribute('name');
    this.state[inputName] = input.value;
    this.dispatchStateUpdate();
  }

  private dispatchStateUpdate(): void {
    this.dispatchEvent(
      new CustomEvent('control-group-update', {
        detail: { group: this.group, state: this.state },
        bubbles: true,
        composed: true
      })
    );
  }

  applyState(state: StateObj): void {
    UpdateStateGroup(this.group, { ...state });
  }

  applyMetadata(metadata: any): void {
    // No-op for now, but could apply metadata to the entire group
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIControlGroup;
