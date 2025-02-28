export type MOD_PreConfig = (DataObj: any) => void;
export type MOD_PreHook = () => void;
export type MOD_AddComponent = (AddComponentOpt: any) => void;
export type MOD_EventRegister = (evt: string, notifyCB: Function) => void;
export interface SNA_ComponentProps {
    _name?: string;
    AddComponent?: MOD_AddComponent;
    PreConfig?: MOD_PreConfig;
    PreHook?: MOD_PreHook;
    Subscribe?: MOD_EventRegister;
    Unsubscribe?: MOD_EventRegister;
}
export type { SNA_EvtName, SNA_EvtHandler, SNA_EvtOn, SNA_EvtOff, SNA_EvtOnce } from './ursys.ts';
