import { PhaseMachine } from '../common/class-phase-machine.ts';
import { SNA_Component } from '../common/class-sna-component.ts';
import type { PhaseID, HookFunction } from '../common/class-phase-machine.d.ts';
import type { SNA_ComponentProps } from '../_types/sna.ts';
declare const HookPhase: typeof PhaseMachine.HookPhase, RunPhaseGroup: typeof PhaseMachine.RunPhaseGroup, GetMachine: typeof PhaseMachine.GetMachine, GetDanglingHooks: typeof PhaseMachine.GetDanglingHooks;
declare function SNA_NewComponent(name: string, config: SNA_ComponentProps): SNA_Component;
/** API: register a component with the SNA lifecycle */
declare function SNA_UseComponent(component: SNA_Component): void;
/** API: initialize the server's lifecycle */
declare function SNA_LifecycleStart(): Promise<void>;
/** API: shortcut hook for SNA machine */
declare function SNA_HookAppPhase(phase: PhaseID, fn: HookFunction): void;
/** API: return the current phase machine state */
declare function SNA_LifecycleStatus(): {
    [key: string]: any;
};
export { SNA_NewComponent, SNA_UseComponent, SNA_HookAppPhase, SNA_LifecycleStart, SNA_LifecycleStatus };
export { HookPhase, RunPhaseGroup, GetMachine, GetDanglingHooks };
