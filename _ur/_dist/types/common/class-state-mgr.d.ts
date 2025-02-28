type TStateObj = {
    [key: string]: any;
};
type TGroupName = string;
type TStateChangeFunc = (newState: TStateObj, curState: TStateObj) => void;
type TEffectFunc = () => void;
type TTapFunc = (state: TStateObj) => void;
type TQueuedAction = {
    stateEvent: TStateObj;
    callback: Function;
};
interface IStateMgr {
    State: (key: string) => TStateObj;
    SendState: (vmStateEvent: TStateObj, callback: Function) => void;
    subscribeState: (subFunc: TStateChangeFunc) => void;
    unsubscribeState: (subFunc: TStateChangeFunc) => void;
    queueEffect: (effectFunc: TEffectFunc) => void;
    _initializeState: (stateObj: TStateObj) => void;
    _setState: (vmState: TStateObj) => void;
    _interceptState: (tapFunc: TTapFunc) => void;
    _insertStateEvent: (stateEvent: TStateObj, callback: TEffectFunc) => void;
    _isValidState: (stateObj: TStateObj) => boolean;
    _mergeState: (stateObj: TStateObj) => TStateObj;
    _notifySubs: (stateObj: TStateObj) => void;
    _enqueue: (action: TQueuedAction) => void;
    _dequeue: () => void;
    _doEffect: () => void;
}
declare class StateMgr {
    name: string;
    init: boolean;
    subs: Set<TStateChangeFunc>;
    queue: any[];
    taps: TTapFunc[];
    effects: TEffectFunc[];
    constructor(groupName: TGroupName);
    /** Return a COPY of the current clonedEvent */
    state(key: string): TStateObj;
    /** Handle a clonedEvent update from a subscribing module. The incoming
     *  vmstateEvent is checked against the master state object to ensure it
     *  contains valid keys. Any filter functions are allowed to mutate a copy of
     *  the incoming state event.
     *  @param {object} vmStateEvent - object with group-specific props
     */
    sendState(vmStateEvent: TStateObj, callback: Function): void;
    /** Subscribe to state. The subscriber function looks like:
     *  ( vmStateEvent, currentState ) => void
     */
    subscribeState(subFunc: TStateChangeFunc): void;
    /** Unsubscribe state */
    unsubscribeState(subFunc: TStateChangeFunc): void;
    /** When executing a side effect from a component, use this method to
     *  hold it until after all state updates have completed, so the DOM
     *  is stable
     */
    queueEffect(effectFunc: TEffectFunc): void;
    /** Set the state object directly. used to initialize the state from within
     *  an appcore module. skips state validation because the VM_STATE entry
     *  is an empty object
     */
    _initializeState(stateObj: TStateObj): void;
    /** In some cases, we want to update state but not trigger subscribers
     *  related to it. Alias for _mergeState()
     */
    _setState(vmState: TStateObj): void;
    /** When SendState() is invoked, give the instance manager a change to
     *  inspect the incoming state and do a side-effect and/or a filter.
     *  They will run in order of interceptor registration
     *  @param {function} tapFunc - receive stateEvent to mutate or act-on
     */
    _interceptState(tapFunc: TTapFunc): void;
    /** Allow synthesis of a state event by adding to queue without
     *  immediately executing it. For use by _interceptState only.
     *  Creates an action { stateObj, callback }
     */
    _insertStateEvent(stateEvent: TStateObj, callback: TEffectFunc): void;
    /** Return true if the event object conforms to expectations (see below) */
    _isValidState(stateObj: TStateObj): boolean;
    /** Scan the object properties for arrays, and mutate with a new array.
     *  In the case of an array containing references, the references will still
     *  be the same but the array itself will be different
     */
    _derefProps(stateObj: TStateObj): TStateObj;
    /** Utility method to clone state event. It handles array cloning as well but
     *  is otherwise a shallow clone
     */
    _cloneStateObject(stateObj: TStateObj): TStateObj;
    /** Take a clonedEvent event object and update the VM_STATE entry with
     *  its property values. This creates an entirely new state object
     */
    _mergeState(stateObj: TStateObj): TStateObj;
    /** Forward the event to everyone. The vmStateEvent object contains
     *  properties that changed only, appending a 'stateGroup' identifier
     *  that tells you who sent it. Sends a read-only copy.
     */
    _notifySubs(stateObj: TStateObj): void;
    /** Placeholder queueing system that doesn't do much now.
     *  An action is { vmStateEvent, callback }
     */
    _enqueue(action: TQueuedAction): void;
    /** Placeholder dequeing system that doesn't do much now.
     *  An action is { vmStateEvent, callback }
     */
    _dequeue(): void;
    /** execute effect functions that have been queued, generally if there
     *  are no pending state changes
     */
    _doEffect(): void;
    /** Return a state manager instance if it exists, undefined if not. Throws
     *  errors if there are issues with the name */
    static GetStateManager(groupName: string): StateMgr;
    /** return a locked copy of the state of a particular named state group.
     *  Unlike GetStateManager, this returns just the data object.
     */
    static GetStateData(groupName: string): any;
    /** return a Stage Manager instance. This just hides the new operator that
     *  purposefully always returns an instance of an existing group if it
     *  already exists
     */
    static GetInstance(groupName: string): StateMgr;
}
/** return a READ-ONLY object containing state for a particular group */
export default StateMgr;
export { StateMgr };
export type { TStateObj, TGroupName, TStateChangeFunc, TEffectFunc };
export type { IStateMgr };
