/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SRI NEW ARCHITECTURE (SNA) TYPES

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { DataObj, OpResult } from './ursys.d.ts';

/// SNA MODULE DEFAULT EXPORT /////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// an SNA module uses the sna-hooks, sna-urnet, and sna-monitor modules to
/// add itself to the overall SNA lifecycle.
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SNA_ModInit = () => void;
export type SNA_EvtOn = (evt: string, param: DataObj) => void;
export type SNA_EvtOff = (evt: string, param: DataObj) => void;
export type SNA_EvtOnce = (evt: string, param: DataObj) => void;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// for code modules, exporting default SNA with SNA_Module is a suggested
/// practice
export type SNA_Module = {
  Init: SNA_ModInit;
  On: SNA_EvtOn;
  Off: SNA_EvtOff;
  Once?: SNA_EvtOnce;
};

/// SNA EVENT CONVENTIONS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// SNA events use these conventions, which are based on ursys.d.ts DataObj
/// They are distinct from UI events and are used for notification purposes
/// rather than cascading events that can cancel each other.
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export type SNA_EvtName = string; // camelCase
export type SNA_EvtHandler = (evt: SNA_EvtName, param: DataObj) => void;
