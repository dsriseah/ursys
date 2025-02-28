type TOpChangeFunc = (newOp: TOpNode, oldOp: TOpNode, ops?: OpSequencer) => void;
type TDataObj = {
    [key: string]: any;
};
type TOpNode = {
    data: TDataObj;
    _seqName?: string;
    _opName?: string;
    _opIndex?: number;
};
type TNodeOptions = {
    mutable?: boolean;
};
declare class OpSequencer {
    ops: TOpNode[];
    seqName: string;
    lastOp: TOpNode;
    currentOp: TOpNode;
    opIndex: number;
    opsMap: Map<string, number>;
    subs: Map<string, Set<TOpChangeFunc>>;
    _disposed: boolean;
    constructor(seqName: string);
    /** given nodeName and a source TOpNode, add a clone of the source node to the sequencer */
    addOp(name: string, data: TDataObj, opt?: TNodeOptions): TOpNode;
    deleteOp(name: string): void;
    data(key?: string): TDataObj;
    length(): number;
    start(): TOpNode;
    current(): TOpNode;
    stop(): TOpNode;
    next(): TOpNode;
    previous(): TOpNode;
    subscribe(opName: string, subf: TOpChangeFunc): void;
    unsubscribe(name: string, subf: TOpChangeFunc): void;
    _update(): void;
    _notifyChange(): void;
    hasOp(opName: string): boolean;
    matchOp(opName: string): boolean;
    /** remove all nodes and subscribers */
    dispose(): void;
    static GetSequencer(seqName: string): OpSequencer;
    static DeleteSequencer(seqName: string): void;
}
export default OpSequencer;
export { OpSequencer };
export type { TOpNode, TOpChangeFunc };
