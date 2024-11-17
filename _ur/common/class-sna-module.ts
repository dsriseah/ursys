/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA_Module class

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  I_SNA_Module,
  MOD_AddModule,
  MOD_PreConfig,
  MOD_PreHook,
  SNA_EvtOn,
  SNA_EvtOff
} from '../_types/sna.d.ts';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class SNA_Module implements I_SNA_Module {
  _name: string;
  AddModule?: MOD_AddModule;
  PreConfig?: MOD_PreConfig;
  PreHook?: MOD_PreHook;
  Subscribe?: SNA_EvtOn;
  Unsubscribe?: SNA_EvtOff;

  constructor(name: string, config: I_SNA_Module) {
    if (typeof name !== 'string') throw Error('SNA_Module: bad name');
    this._name = name;
    const { AddModule, PreConfig, PreHook, Subscribe, Unsubscribe } = config;
    this.AddModule = AddModule;
    this.PreConfig = PreConfig;
    this.PreHook = PreHook;
    this.Subscribe = Subscribe;
    this.Unsubscribe = Unsubscribe;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function SNA_DeclareModule(name: string, config: I_SNA_Module): SNA_Module {
  return new SNA_Module(name, config);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_Module;
export {
  SNA_Module,
  // method
  SNA_DeclareModule
};
export type {
  I_SNA_Module,
  MOD_AddModule,
  MOD_PreConfig,
  MOD_PreHook,
  SNA_EvtOn,
  SNA_EvtOff
};
