type ModeMachineClass = string;
type ModeName = `::${string}`;
declare class ModeMachine {
    mmClass: ModeMachineClass;
    modeNames: Set<ModeName>;
    /** require a unique class name for the event machine */
    constructor(mmClass: ModeMachineClass);
    /** validate mode machine class name, which must be lower_snake_case */
    _okClass(mmClass: ModeMachineClass): boolean;
    /** validate mode names  */
    _okMode(modeName: ModeName): void;
}
export default ModeMachine;
export { ModeMachine };
