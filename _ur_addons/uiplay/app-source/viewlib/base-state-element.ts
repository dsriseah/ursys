/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  A UIStateElement is a base class for all UI components need to 
  (1) communicate value changes to a centralized state manager 
  (2) initialize their options and metadata from a YAML textNode 
      associated with it.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import type { DataObj as StateObj } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const STATE_GROUPS = new Map<string, StateObj>();

/// HELPER FUNCTIONS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetStateGroup(name: string): StateObj {
  const stateGroup = STATE_GROUPS.get(name);
  if (!stateGroup) throw Error(`DataGroup '${name}' not found`);
  return stateGroup;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function UpdateStateGroup(name: string, data: StateObj): void {
  const group = STATE_GROUPS.get(name) || {};
  STATE_GROUPS.set(name, { ...group, ...data });
}

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
abstract class UIStateElement extends HTMLElement {
  constructor() {
    super();
    this.updateMetadata = this.updateMetadata.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  /// ABSTRACT METHODS ///

  abstract applyMetadata(metadata: StateObj): void;
  abstract applyState(data: StateObj): void;

  /// WEB COMPONENT LIFECYCLE EVENTS ///

  connectedCallback(): void {
    document.addEventListener('ui-metadata-update', this.updateMetadata);
    document.addEventListener('ui-data-update', this.updateState);
  }

  disconnectedCallback(): void {
    document.removeEventListener('ui-metadata-update', this.updateMetadata);
    document.removeEventListener('ui-data-update', this.updateState);
  }

  /// (1) HANDLE DATA CHANGES ///

  private updateState(event: CustomEvent): void {
    const { id, data } = event.detail;
    const group = STATE_GROUPS.get(id) || {};
    UpdateStateGroup(id, { ...group, ...data });

    this.applyState(STATE_GROUPS.get(id)!);
  }

  /// (2) HANDLE METADATA CHANGES ///

  private updateMetadata(): void {
    const record = this.getAttribute('data-record');
    const yamlData = document.querySelector(`data-yaml[data-for="${record}"]`);
    if (!yamlData) return;

    // const metadata = YAML.parse(yamlData.textContent);
    const dummydata = {};
    this.applyMetadata(dummydata);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIStateElement; // the class
export { GetStateGroup, UpdateStateGroup }; // global methods
