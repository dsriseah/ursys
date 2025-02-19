/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UIGroup is the parent container StatelyElements (viewlib components).
  It is used to distribute state and metadata updates to its children.

  It has a 'group' attribute that is used to identify its slotted children
  that are StatelyElements. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import StatelyElement from './lib/class-stately-element.ts';
const LOG = console.log.bind(console);
const PR = ConsoleStyler('ui-group', 'TagBlue');

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const CN = 'UIGroup:';
const DBG = true;

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class UIGroup extends HTMLElement {
  private group: string;
  private uiElements: { [name: string]: StatelyElement };
  private _slot!: HTMLSlotElement; // save found slot
  private _evtqueue: CustomEvent[];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot!.innerHTML = `<slot></slot>`;
    this.uiElements = {};
    this._evtqueue = [];
    // bind handlers
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.onStateUpdate = this.onStateUpdate.bind(this);
    this.onMetadataUpdate = this.onMetadataUpdate.bind(this);
  }

  connectedCallback(): void {
    const group = this.getAttribute('group');
    if (!group) throw Error(`${CN} must have a group attribute`);
    this.group = group;
    //
    const slot = this.shadowRoot!.querySelector('slot');
    if (!slot) throw Error(`${CN} Slot element not found`);
    this._slot = slot;
    slot.addEventListener('slotchange', this.handleSlotChange);
    document.addEventListener('ui-meta-update', this.onMetadataUpdate);
    document.addEventListener('ui-state-update', this.onStateUpdate);
  }

  disconnectedCallback(): void {
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
        // console.log(`input ${inputName} added to group ${this.group}`);
      }
    });

    this._processMetaQueue();
  }

  /// BOILERPLATE ///

  private onMetadataUpdate = (event: CustomEvent): void => {
    const { group } = event.detail;
    if (group !== this.group) return;
    //
    const elements = Object.values(this!.uiElements);
    if (elements.length === 0) {
      LOG(...PR('no elements found, queueing event', event));
      this._evtqueue.push(event);
      return;
    }
    this._processMetaQueue();
  };

  private _processMetaQueue = (): void => {
    LOG(...PR('processing metadata queue', this._evtqueue));
    // send metadata to elements with matching name
    this._evtqueue.forEach(event => {
      const { group, type, meta } = event.detail;
      const elements = Object.values(this.uiElements);
      elements.forEach(element => {
        const isStately = element instanceof StatelyElement;
        if (!isStately) return;
        const matchMeta = meta[element.getName()];
        if (!matchMeta) return;
        element.receiveMetadata(matchMeta);
      }); // elements
    }); // _evtqueue
    // clear queue
    this._evtqueue = [];
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
