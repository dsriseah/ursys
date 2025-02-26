/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  TransactionMgr is a simple support class for NetEndpoint that manages
  a list of transaction objects. A transaction is identified by a unique
  identifier

  A transaction consists of a 'message' and a 'hash' that is used to identify
  the transaction. To create a transaction entry, the following must be
  provided by the caller:
  
  - hash: NP_Hash - a unique identifier for the transaction
  - msg: NP_Msg - the message identifier/service that is being sent
  - resolve: (value?: unknown) => void - resolve the transaction
  - reject: (reason?: any) => void - reject the transaction
  - ...data: any - any additional data to be stored with the transaction
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { NP_Hash } from '../_types/urnet';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** a transaction consists functions used to resolve or reject the transaction
 *  for async operations. Additional data can be stored with the transaction
 */
type TrxResolver = {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
  [key: string]: any; // any additional data
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type TrxMap = Map<NP_Hash, TrxResolver>; // map hashes to resolver objects
type TrxInfo = {
  hash: NP_Hash; // unique identifier for the transaction
  [key: string]: any; // any additional data
};

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DBG = false;
const PR =
  // @ts-ignore - multiplatform definition check
  typeof process !== 'undefined'
    ? 'Transact'.padEnd(13) // nodejs
    : 'Transact'.padEnd(11); // browser
const LOG = console.log.bind(console);

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class TransactionMgr {
  // fields
  private transaction_log: TrxMap; // log of current transactions

  /** create a new transaction manager */
  constructor() {
    this.transaction_log = new Map<NP_Hash, TrxResolver>();
  }

  /** add a transaction to the transaction log */
  setTransaction(hash: NP_Hash, resolver: TrxResolver) {
    const fn = 'setTransaction:';
    const { resolve, reject, msg, ...meta } = resolver;
    if (typeof hash !== 'string') throw Error(`${fn} invalid hash ${hash}`);
    if (typeof msg !== 'string') throw Error(`${fn} invalid msg ${msg}`);
    if (typeof resolve !== 'function') throw Error(`${fn} invalid resolve`);
    if (typeof reject !== 'function') throw Error(`${fn} invalid reject`);
    if (this.transaction_log.has(hash)) throw Error(`${fn} duplicate hash ${hash}`);
    if (DBG && meta) LOG(PR, `${fn}: additional metadata`, meta);
    this.transaction_log.set(hash, resolver);
  }

  /** lookup a transaction by hash */
  getTransactionByHash(hash: NP_Hash): TrxResolver {
    const fn = 'getTransactionByHash:';
    if (!this.transaction_log.has(hash)) throw Error(`${fn} hash not found ${hash}`);
    return this.transaction_log.get(hash);
  }

  /** resolve a transaction by hash */
  resolveTransaction(hash: NP_Hash): TrxResolver {
    const fn = 'resolveTransaction:';
    if (!this.transaction_log.has(hash)) throw Error(`${fn} hash not found ${hash}`);
    const transaction = this.getTransactionByHash(hash);
    this.transaction_log.delete(hash);
    return transaction;
  }

  /** return a list of pending transactions */
  getPendingTransactions(): TrxInfo[] {
    const fn = 'getPendingTransactionList:';
    const list = [];
    this.transaction_log.forEach((transaction, hash) => {
      const { resolve, reject, ...meta } = transaction;
      list.push({ hash, ...meta });
    });
    return list;
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default TransactionMgr;
export { TransactionMgr };
