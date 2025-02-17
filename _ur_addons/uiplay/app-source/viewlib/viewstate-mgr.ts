/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  view state manager - manages view-related state

  The main state and metadata manager API are exposed as methods
  - GetStateGroup(name: string): StateObj
  - UpdateStateGroup(name: string, state: StateObj): void
  - GetMetadata(name: string): DataObj
  - UpdateMetadata(name: string, metadata: StateObj): void

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj } from '@ursys/core';
type StateObj = DataObj;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const STATE_GROUPS = new Map<string, StateObj>();
const METADATA = new Map<string, DataObj>();
const DBG = true;

/// API FUNCTIONS /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** metadata is used for template info */
function UpdateMetadata(groupName: string, newMeta: DataObj): void {
  const group = METADATA.get(groupName) || {};
  const meta = { ...group, ...newMeta };
  METADATA.set(groupName, meta);
  if (DBG) console.log(`Metadata for '${name}'`, meta);
  const detail = { group: groupName, data: meta };
  const event = new CustomEvent('ui-metadata-update', { detail });
  document.dispatchEvent(event);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** state is used for logical component state values and settings */
function UpdateStateGroup(groupName: string, newState: StateObj): void {
  const group = STATE_GROUPS.get(groupName) || {};
  const state = { ...group, ...newState };
  STATE_GROUPS.set(groupName, state);
  if (DBG) console.log(`StateGroup for '${groupName}'`, newState);
  const detail = { group: groupName, state: newState };
  const event = new CustomEvent('ui-state-update', { detail });
  document.dispatchEvent(event);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetMetadata(name: string): DataObj {
  const metadata = METADATA.get(name);
  if (!metadata) throw Error(`GetMetadata '${name}' not found`);
  return metadata;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function GetStateGroup(name: string): StateObj {
  const stateGroup = STATE_GROUPS.get(name);
  if (!stateGroup) throw Error(`StateGroup '${name}' not found`);
  return stateGroup;
}

/// DEBUGGING EXPORTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
globalThis.update_meta = UpdateMetadata;
globalThis.update_state = UpdateStateGroup;

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // component state
  GetStateGroup,
  UpdateStateGroup,
  // component metadata
  UpdateMetadata,
  GetMetadata
};
export type { DataObj, StateObj };
