import { Transaction } from "../../model/transaction";
import {
  TransactionRepository,
} from "../../usecases/transaction/interface/transactionRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresTransactionRepository implements TransactionRepository {
  async existsById(id: number): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .transaction
      .count({
        where: {
          id,
        },
      });

    const empty = 0;

    return count > empty;
  }

  async add(transaction: Transaction): Promise<void> {
    const {
      categoryId,
      userId,
      date,
      description,
      isEntry,
      title,
      value,
    } = transaction;

    await PrismaHelper
      .client
      .transaction
      .create({
        data: {
          description,
          is_entry: isEntry,
          occurrence_date: date!,
          title,
          value,
          id_user: userId!,
          id_category: categoryId,
        },
      });
  }

  async update(transaction: Transaction): Promise<void> {
    const {
      id,
      categoryId,
      date,
      description,
      isEntry,
      title,
      value,
    } = transaction;

    await PrismaHelper
      .client
      .transaction
      .update({
        where: {
          id: id!,
        },
        data: {
          value,
          is_entry: isEntry,
          occurrence_date: date!,
          description,
          title,
          id_category: categoryId!,
        },
      });
  }

  async get(id: number): Promise<Transaction> {
    const {
      description,
      id_category: categoryId,
      is_entry: isEntry,
      occurrence_date: date,
      title,
      value,
    } = await PrismaHelper
      .client
      .transaction
      .findUniqueOrThrow({
        where: {
          id,
        },
      });

    return new Transaction(
      value,
      categoryId,
      title,
      description,
      isEntry,
      date,
      null,
      id,
    );
  }

  async remove(id: number): Promise<void> {
    await PrismaHelper
      .client
      .transaction
      .delete({
        where: {
          id,
        },
      });
  }
}