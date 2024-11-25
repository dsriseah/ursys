/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA_Module Support Class

  Formalizes the interface of an SNA Module that participates in a lifecycle
  driven SNA Application. SNA Modules export an instance of this class
  as the default export.

  SNA Module use HOOKS to interact with the lifecycle of the application.
  By registering an SNA Module through RegisterModule(), the module is given
  the chance to configure itself, hook into selected lifecycle events, and
  also provide subscribe/unsubscribe methods for event handling. SNA Modules
  can also have other SNA modules they are dependent on, and so can register
  them during their own registration via the AddModule() method.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  SNA_ModProps,
  MOD_AddModule,
  MOD_PreConfig,
  MOD_PreHook,
  SNA_EvtOn,
  SNA_EvtOff
} from '../_types/sna.d.ts';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class SNA_Module implements SNA_ModProps {
  _name: string;
  AddModule?: MOD_AddModule;
  PreConfig?: MOD_PreConfig;
  PreHook?: MOD_PreHook;
  Subscribe?: SNA_EvtOn;
  Unsubscribe?: SNA_EvtOff;

  constructor(name: string, config: SNA_ModProps) {
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
/** utility to declare an SNA_Module with a name and config object */
function SNA_DeclareModule(name: string, config: SNA_ModProps): SNA_Module {
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
  SNA_ModProps,
  MOD_AddModule,
  MOD_PreConfig,
  MOD_PreHook,
  SNA_EvtOn,
  SNA_EvtOff
};
