import { Transaction } from "../../../model/transaction";
import { TransactionPreview } from "../../../model/transactionPreview";

export interface TransactionRepository {
  existsById: (id: number) => Promise<boolean>;
  add: (transaction: Transaction) => Promise<void>;
  update: (transaction: Transaction) => Promise<void>;
  get: (id: number) => Promise<Transaction>;
  remove: (id: number) => Promise<void>;
  getAllPreviews: (page: number, size: number) => Promise<TransactionPreview[]>;
  getSize: () => Promise<number>;
}