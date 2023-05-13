import { Transaction } from "../../../model/transaction";

export interface TransactionRepository {
  existsById: (id: number) => Promise<boolean>;
  add: (transaction: Transaction) => Promise<void>;
  update: (transaction: Transaction) => Promise<void>;
  get: (id: number) => Promise<Transaction>;
  remove: (id: number) => Promise<void>;
}