/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UIGroup is the parent container StatelyElements (viewlib components).
  It is used to distribute state and metadata updates to its children.

  It has a 'group' attribute that is used to identify its slotted children
  that are StatelyElements. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import StatelyElement from './lib/class-stately-element.ts';
import type { StateObj } from '../viewstate-mgr.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CN = 'UIGroup:';
const DBG = true;

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIGroup extends HTMLElement {
  private group: string;
  private uiElements: { [name: string]: StatelyElement };
  private state: StateObj;
  private _slot!: HTMLSlotElement; // save found slot

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `<slot></slot>`;
    this.uiElements = {};
    // bind handlers
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.onStateUpdate = this.onStateUpdate.bind(this);
    this.onMetadataUpdate = this.onMetadataUpdate.bind(this);
  }

  connectedCallback(): void {
    const group = this.getAttribute('group');
    if (!group) throw Error(`${CN} must have a group attribute`);
    this.group = group;
    if (DBG) console.log(`${CN} connectedCallback`, this.group);
    //
    const slot = this.shadowRoot!.querySelector('slot');
    if (!slot) throw Error(`${CN} Slot element not found`);
    this._slot = slot;
    slot.addEventListener('slotchange', this.handleSlotChange);
    document.addEventListener('ui-meta-update', this.onMetadataUpdate);
    document.addEventListener('ui-state-update', this.onStateUpdate);
  }

  disconnectedCallback(): void {
    if (DBG) console.log(`${CN} disconnectedCallback`, this.group);
    this._slot.removeEventListener('slotchange', this.handleSlotChange);
    this.removeEventListener('ui-meta-update', this.onMetadataUpdate);
    this.removeEventListener('ui-state-update', this.onStateUpdate);
  }

  /** called when the slots have changed or rendered, assigning the
   *  group attribute to the slotted elements unless one already exists */
  private handleSlotChange(): void {
    const slotNodes = this._slot.assignedElements();
    // remove uiElements that are no longer in the slot
    Object.keys(this.uiElements).forEach(key => {
      if (!slotNodes.includes(this.uiElements[key])) {
        delete this.uiElements[key];
        if (DBG) console.log(`input ${key} removed from group ${this.group}`);
      }
    });
    slotNodes.forEach(node => {
      if (node instanceof StatelyElement) {
        const inputName = node.getAttribute('name');
        if (!inputName) return;
        this.uiElements[inputName] = node;
        if (node.hasAttribute('group')) return;
        node.setAttribute('group', this.group);
        console.log(`input ${inputName} added to group ${this.group}`);
      }
    });
  }

  /// BOILERPLATE ///

  private onMetadataUpdate = (event: CustomEvent): void => {
    const { group, data } = event.detail;
    if (group !== this.group) return;
    Object.values(this.uiElements).forEach(element => {
      if (element instanceof StatelyElement) {
        element.receiveMetadata(group, data);
      }
    });
  };

  private onStateUpdate = (event: CustomEvent): void => {
    const { group, state } = event.detail;
    // console.log(`onStateUpdate ${group}:`, state);
    if (group !== this.group) return;

    const props = Object.keys(state);
    Object.values(this.uiElements).forEach(element => {
      const isStately = element instanceof StatelyElement;
      if (!isStately) return;
      const matchName = props.includes(element.getName());
      if (!matchName) return;
      element.receiveState(group, state);
    });
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIGroup;
