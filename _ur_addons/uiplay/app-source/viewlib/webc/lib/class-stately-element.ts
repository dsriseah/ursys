/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  A UIStatelyElement is a base class for all UI components need to 
  (1) communicate value changes to a centralized state manager 
  (2) initialize their options and template from a YAML textNode 
      associated with it.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { UpdateMetadata, UpdateStateGroup } from '../../viewstate-mgr.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj, StateObj } from '../../viewstate-mgr.ts';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** UIStatelyElement maintains connection with the centralized state manager
 *  and metadata manager above. It provides a base class for all UI components
 *  that need to communicate with the state manager and metadata manager. */
class UIStatelyElement extends HTMLElement {
  //
  name: string;
  group: string;
  //
  constructor() {
    super();
  }

  /// UTILITY ACCESSORS ///

  /** set this.name from string or from attribute */
  initName(name?: string): string {
    if (name === undefined) {
      if (this.getAttribute('name') === undefined) return;
      this.name = this.getAttribute('name');
      return this.name;
    }
    if (typeof name !== 'string')
      throw Error('UIStatelyElement name attribute must be a string');
    this.name = name;
    return this.name;
  }

  /** set this.group from string or from attribute */
  initGroup(group?: string): string {
    if (group === undefined) {
      if (this.getAttribute('group') === undefined) return;
      this.group = this.getAttribute('group');
      return this.group;
    }
    if (typeof group !== 'string')
      throw Error('UIStatelyElement group attribute must be a string');
    this.group = group;
    return this.group;
  }

  getName(): string {
    return this.name || this.getAttribute('name');
  }

  getGroup(): string {
    return this.group || this.getAttribute('group');
  }

  /// SUBCLASSER METHODS ///

  /** subclassers override to receive metadata */
  receiveMetadata(metagroup: string, meta: DataObj): void {}

  /** subclassers override to receive state */
  receiveState(stategroup: string, state: StateObj): void {}

  /** subclassers use this as-is */
  sendMetadata(metagroup: string, meta: DataObj): void {
    UpdateMetadata(metagroup, meta);
  }

  /** subclassers use this as-is */
  sendState(stategroup: string, state: StateObj): void {
    UpdateStateGroup(stategroup, state);
  }

  /// SUBCLASSER HELPERS ///

  /** return an stateobj only if it maps groupname and name attribute */
  protected decodeState(groupName: string, state: StateObj): StateObj {
    if (groupName !== this.getAttribute('group')) return undefined;
    const name = this.getAttribute('name');
    if (!name) throw Error('UIStatelyElement must have a name attribute');
    if (state[name] === undefined) return undefined;
    return state;
  }

  /** return an encoded state object for use with sendState */
  protected encodeState(groupName: string, name: string, value: any): StateObj {
    if (groupName !== this.getAttribute('group')) return undefined;
    if (name !== this.getAttribute('name')) return undefined;
    const state: StateObj = {};
    state[name] = value;
    return state;
  }

  /// BOILERPLATE ///

  /** vestigial methods for subclassers */
  connectedCallback(): void {}

  /** vestigial methods for subclassers */
  disconnectedCallback(): void {}
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UIStatelyElement; // the class
