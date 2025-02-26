/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SRI NEW ARCHITECTURE (SNA) TYPES

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataObj, OpResult } from './ursys';

/// SNA MODULE DEFAULT EXPORT /////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an SNA module uses the sna-hooks, sna-urnet, and sna-monitor modules to
/// add itself to the overall SNA lifecycle.
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type MOD_PreConfig = (DataObj) => void; // called before lifecycle
export type MOD_PreHook = () => void; // called before lifecycle
export type MOD_AddComponent = ({ f_AddComponent: Function }) => void; // called during reg
export type MOD_EventRegister = (evt: string, notifyCB: Function) => void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// for code modules, exporting default SNA with SNA_Component is a suggested
/// practice
export interface SNA_ComponentProps {
  _name?: string;
  AddComponent?: MOD_AddComponent;
  PreConfig?: MOD_PreConfig;
  PreHook?: MOD_PreHook;
  Subscribe?: MOD_EventRegister;
  Unsubscribe?: MOD_EventRegister;
}

/// SNA EVENT CONVENTIONS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// SNA events use these conventions, which are based on ursys.d.ts DataObj
/// They are distinct from UI events and are used for notification purposes
/// rather than cascading events that can cancel each other.
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SNA_EvtName = string; // camelCase
export type SNA_EvtHandler = (evt: SNA_EvtName, param: DataObj) => void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SNA_EvtOn = (evt: string, param: DataObj) => void;
export type SNA_EvtOff = (evt: string, param: DataObj) => void;
export type SNA_EvtOnce = (evt: string, param: DataObj) => void;
