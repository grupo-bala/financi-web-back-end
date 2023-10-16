import { Decimal } from "@prisma/client/runtime/library";
import { Transaction } from "../../../model/transaction";
import { TransactionPreview } from "../../../model/transactionPreview";
import { Interval } from "../../statistics/data/Filter";

export type TransactionCategory = Transaction & {
  category: string,
};

export type Balance = {
  entries: Decimal,
  outs: Decimal,
};

export interface TransactionRepository {
  existsInUserById: (id: number, userId: number) => Promise<boolean>;
  add: (transaction: Transaction) => Promise<Transaction>;
  update: (transaction: Transaction) => Promise<void>;
  get: (id: number) => Promise<Transaction>;
  remove: (id: number) => Promise<void>;
  getCurrentBalance: (userId: number) => Promise<Balance>;
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