import { Transaction } from "../../../model/transaction";
import { TransactionPreview } from "../../../model/transactionPreview";
import { Interval } from "../../statistics/data/Filter";

export type TransactionCategory = Transaction & { category: string };

export interface TransactionRepository {
  existsInUserById: (id: number, userId: number) => Promise<boolean>;
  add: (transaction: Transaction) => Promise<Transaction>;
  update: (transaction: Transaction) => Promise<void>;
  get: (id: number) => Promise<Transaction>;
  remove: (id: number) => Promise<void>;
  getByPeriod: (
    userId: number,
    interval: Interval
  ) => Promise<TransactionCategory[]>;
  getAllPreviews: (
    page: number,
    size: number,
    userId: number,
    search?: string,
  ) => Promise<TransactionPreview[]>;
  getSize: (userId: number, search?: string) => Promise<number>;
}