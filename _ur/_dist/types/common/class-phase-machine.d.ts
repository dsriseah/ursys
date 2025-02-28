type MachineName = string;
type MachineState = {
    _cur_phase: PhaseID;
    _cur_group: PhaseID;
    [key: string]: any;
};
type PhaseID = string;
type PhaseGroupID = `PHASE_${PhaseID}`;
type PhaseList = PhaseID[];
type PhaseDefinition = {
    [phaseGroup: PhaseID]: PhaseList;
};
type HookSelector = `${MachineName}/${PhaseID}`;
type HookFunction = (machine?: MachineName, phase?: PhaseID) => void | Promise<any>;
type HookObj = {
    phase: PhaseID;
    enter?: HookFunction;
    exec?: HookFunction;
    exit?: HookFunction;
};
type HookEvent = 'enter' | 'exec' | 'exit';
declare class PhaseMachine {
    pm_name: string;
    pm_state: MachineState;
    phase_hooks: Map<PhaseID, HookObj[]>;
    phase_membership: Map<PhaseID, PhaseGroupID>;
    phase_def: PhaseDefinition;
    phase_timer: ReturnType<typeof setTimeout>;
    constructor(pmName: MachineName, phases: PhaseDefinition);
    /** setter: update current phase */
    set cur_phase(phase: PhaseID);
    /** setter: update current phase group */
    set cur_group(group: PhaseID);
    /** return current phase */
    get cur_phase(): PhaseID;
    /** return current phase group */
    get cur_group(): PhaseID;
    /** return the list of phasegroups or phases in the group */
    getPhaseList(phase?: PhaseID): string[];
    /** API: register an Operations Handler. <op> is a string constant
     *  define in phase_def and converted into the MAP. <f> is a function that
     *  will be invoked during the operation, and it can return a promise or value.
     */
    addHookEntry(phid: PhaseID, hook: HookObj): void;
    /** API: execute all hooks associated with a phase event. If any phase
     *  returns a Promise, the function will wait for it to resolve before
     *  returning.
     */
    _promiseHookEvaluation(phid: PhaseID, evt: HookEvent): Promise<void[]>;
    /** API: execute all Promises associated with a Phase Group in serial order,
     *  waiting for each to resolve before executing the next. If there are hooks
     *  associated with the PhaseGroup, they fire after all Phases have completed.
     */
    invokeGroupHooks(pgroup: string): Promise<void>;
    /** helper: return hook function array for a given phase or phase group.
     *  It defaults to returning the 'exec' function.
     */
    getHookFunctions(phid: PhaseID, evt?: HookEvent): HookFunction[];
    /** helper: check for phase group membership */
    lookupPhaseGroup(phid: string): PhaseGroupID;
    /** helper: check for valid phase selector */
    hasHook(psel: string): boolean;
    /** helper: print current phase information to console */
    consolePhaseInfo(pr?: string, bg?: string): string;
    /** API: Register a PhaseHook at any time. If the machine doesn't yet exist,
     *  the hook will be queued until the machine is created */
    static HookPhase(selector: HookSelector, fn: HookFunction): void;
    /** API: Execute a PhaseGroup in a machine. If the machine doesn't yet exist,
     *  the function will throw an error. */
    static RunPhaseGroup(selector: HookSelector): Promise<void>;
    /** API: return a list of all pending machines that have not been hooked. */
    static GetDanglingHooks(): any[];
    /** API: return a string of all current machines and their phase_def */
    static GetMachineStates(): any[];
    /** API: return initialized PhaseMachine if it exists */
    static GetMachine(name: MachineName): PhaseMachine;
}
/**  API: Register a PhaseHook at any time. If the machine doesn't yet exist,
 *   the hook will be queued until the machine is created. The format for
 *   selector is MACHINE/PHASE_NAME, with an optional :enter :exec :exit
 *   event tag at the end. */
declare function HookPhase(selector: HookSelector, fn: HookFunction): void;
/** API: Run all hooks associated with the selector in 'enter', 'exec', and
 *  'exit' order */
declare function RunPhaseGroup(selector: HookSelector): Promise<void>;
/** API: return a list of all pending machines that have not been hooked.
 *  Used after running all phase groups to detect misdefined hooks */
declare function GetDanglingHooks(): any[];
/** API: Create a new PhaseMachine instance with the given name and phase_def */
declare function NewPhaseMachine(name: MachineName, phases: PhaseDefinition): PhaseMachine;
/** API: return a string of all current machines and their phase_def */
declare function GetMachineStates(): any[];
/** API: return initialized PhaseMachine if it exists */
declare function GetMachine(name: MachineName): PhaseMachine;
export default PhaseMachine;
export { PhaseMachine, // class instance
NewPhaseMachine, // (name, phases)
HookPhase, // (hookselector, handlerFunc, event)=>void
RunPhaseGroup, // (hookselector)=>void
GetDanglingHooks, GetMachine, // (name)=>PhaseMachine
GetMachineStates };
export type { MachineName, PhaseID, PhaseDefinition, HookSelector, HookFunction, HookEvent };
