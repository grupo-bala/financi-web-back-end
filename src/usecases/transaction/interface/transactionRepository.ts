import { Transaction } from "../../../model/transaction";
import { TransactionPreview } from "../../../model/transactionPreview";
import { Interval } from "../../statistics/data/Filter";

export type TransactionCategory = Transaction & { category: string };

export interface TransactionRepository {
  existsById: (id: number) => Promise<boolean>;
  add: (transaction: Transaction) => Promise<void>;
  update: (transaction: Transaction) => Promise<void>;
  get: (id: number) => Promise<Transaction>;
  remove: (id: number) => Promise<void>;
  getAllPreviews: (page: number, size: number) => Promise<TransactionPreview[]>;
  getSize: () => Promise<number>;
  getByPeriod: (
    userId: number,
    interval: Interval
  ) => Promise<TransactionCategory[]>;
}