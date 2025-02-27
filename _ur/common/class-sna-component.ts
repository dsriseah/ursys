/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA_Component Support Class

  Formalizes the interface of an SNA Module that participates in a lifecycle
  driven SNA Application. SNA Modules export an instance of this class
  as the default export.

  SNA Module use HOOKS to interact with the lifecycle of the application.
  By registering an SNA Module through RegisterModule(), the module is given
  the chance to configure itself, hook into selected lifecycle events, and
  also provide subscribe/unsubscribe methods for event handling. SNA Modules
  can also have other SNA modules they are dependent on, and so can register
  them during their own registration via the AddComponent() method.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  SNA_ComponentProps,
  MOD_AddComponent,
  MOD_PreConfig,
  MOD_PreHook,
  SNA_EvtOn,
  SNA_EvtOff
} from '../_types/sna.d.ts';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class SNA_Component implements SNA_ComponentProps {
  _name: string;
  AddComponent?: MOD_AddComponent;
  PreConfig?: MOD_PreConfig;
  PreHook?: MOD_PreHook;
  Subscribe?: SNA_EvtOn;
  Unsubscribe?: SNA_EvtOff;

  constructor(name: string, config: SNA_ComponentProps) {
    if (typeof name !== 'string') throw Error('SNA_Component: bad name');
    this._name = name;
    const { AddComponent, PreConfig, PreHook, Subscribe, Unsubscribe } = config;
    this.AddComponent = AddComponent;
    this.PreConfig = PreConfig;
    this.PreHook = PreHook;
    this.Subscribe = Subscribe;
    this.Unsubscribe = Unsubscribe;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** utility to declare an SNA_Component with a name and config object */
function SNA_NewComponent(name: string, config: SNA_ComponentProps): SNA_Component {
  return new SNA_Component(name, config);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default SNA_Component;
export {
  SNA_Component,
  // method
  SNA_NewComponent
};
export type {
  SNA_ComponentProps,
  MOD_AddComponent,
  MOD_PreConfig,
  MOD_PreHook,
  SNA_EvtOn,
  SNA_EvtOff
};
