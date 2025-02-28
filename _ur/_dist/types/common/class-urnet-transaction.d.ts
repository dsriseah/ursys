import type { NP_Hash } from '../_types/urnet.d.ts';
/** a transaction consists functions used to resolve or reject the transaction
 *  for async operations. Additional data can be stored with the transaction
 */
type TrxResolver = {
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
    [key: string]: any;
};
type TrxInfo = {
    hash: NP_Hash;
    [key: string]: any;
};
declare class TransactionMgr {
    private transaction_log;
    /** create a new transaction manager */
    constructor();
    /** add a transaction to the transaction log */
    setTransaction(hash: NP_Hash, resolver: TrxResolver): void;
    /** lookup a transaction by hash */
    getTransactionByHash(hash: NP_Hash): TrxResolver;
    /** resolve a transaction by hash */
    resolveTransaction(hash: NP_Hash): TrxResolver;
    /** return a list of pending transactions */
    getPendingTransactions(): TrxInfo[];
}
export default TransactionMgr;
export { TransactionMgr };
