import type { SNA_ComponentProps, MOD_AddComponent, MOD_PreConfig, MOD_PreHook, SNA_EvtOn, SNA_EvtOff } from '../_types/sna.d.ts';
declare class SNA_Component implements SNA_ComponentProps {
    _name: string;
    AddComponent?: MOD_AddComponent;
    PreConfig?: MOD_PreConfig;
    PreHook?: MOD_PreHook;
    Subscribe?: SNA_EvtOn;
    Unsubscribe?: SNA_EvtOff;
    constructor(name: string, config: SNA_ComponentProps);
}
/** utility to declare an SNA_Component with a name and config object */
declare function SNA_NewComponent(name: string, config: SNA_ComponentProps): SNA_Component;
export default SNA_Component;
export { SNA_Component, SNA_NewComponent };
export type { SNA_ComponentProps, MOD_AddComponent, MOD_PreConfig, MOD_PreHook, SNA_EvtOn, SNA_EvtOff };
