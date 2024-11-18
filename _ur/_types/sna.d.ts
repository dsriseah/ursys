/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SRI NEW ARCHITECTURE (SNA) TYPES

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataObj, OpResult } from './ursys.d.ts';

/// SNA MODULE DEFAULT EXPORT /////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an SNA module uses the sna-hooks, sna-urnet, and sna-monitor modules to
/// add itself to the overall SNA lifecycle.
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type MOD_PreConfig = (DataObj) => void; // called before lifecycle
export type MOD_PreHook = () => void; // called before lifecycle
export type MOD_AddModule = ({ f_AddModule: Function }) => void; // called during reg
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SNA_EvtOn = (evt: string, param: DataObj) => void;
export type SNA_EvtOff = (evt: string, param: DataObj) => void;
export type SNA_EvtOnce = (evt: string, param: DataObj) => void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// for code modules, exporting default SNA with SNA_Module is a suggested
/// practice
export interface I_SNA_Module {
  _name: string;
  AddModule?: MOD_AddModule;
  PreConfig?: MOD_PreConfig;
  PreHook?: MOD_PreHook;
  Subscribe?: SNA_EvtOn;
  Unsubscribe?: SNA_EvtOff;
}

/// SNA EVENT CONVENTIONS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// SNA events use these conventions, which are based on ursys.d.ts DataObj
/// They are distinct from UI events and are used for notification purposes
/// rather than cascading events that can cancel each other.
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SNA_EvtName = string; // camelCase
export type SNA_EvtHandler = (evt: SNA_EvtName, param: DataObj) => void;
