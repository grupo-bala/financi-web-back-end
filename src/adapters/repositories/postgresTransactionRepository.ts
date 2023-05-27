import { Transaction } from "../../model/transaction";
import { TransactionPreview } from "../../model/transactionPreview";
import { Interval } from "../../usecases/statistics/data/Filter";
import {
  TransactionCategory,
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

  async getSize(): Promise<number> {
    return await PrismaHelper
      .client
      .transaction
      .count();
  }

  async getAllPreviews(
    page: number,
    size: number,
  ): Promise<TransactionPreview[]> {
    const prismaTransactions = await PrismaHelper
      .client
      .transaction
      .findMany({
        skip: --page * size,
        take: size,
        orderBy: {
          id: "desc",
        },
      });

    const transactionsPreview: TransactionPreview[] = [];

    for (
      const {
        id,
        id_category: categoryId,
        is_entry: isEntry,
        occurrence_date: date,
        title,
        value,
      } of prismaTransactions
    ) {
      transactionsPreview.push(
        new TransactionPreview(value, categoryId, title, isEntry, date, id),
      );
    }

    return transactionsPreview;
  }

  async getByPeriod(
    userId: number,
    interval: Interval,
  ): Promise<TransactionCategory[]> {
    const transactions = await PrismaHelper
      .client
      .transaction
      .findMany({
        where: {
          occurrence_date: {
            gte: interval.initDate,
            lte: interval.endDate,
          },
          id_user: userId,
        },
        include: {
          category: true,
        },
        orderBy: {
          occurrence_date: "desc",
        },
      });

    return transactions.map((t) => {
      const transaction = new Transaction(
        t.value,
        t.id_category,
        t.title,
        t.description,
        t.is_entry,
        t.occurrence_date,
        t.id_user,
        t.id,
      );

      return { category: t.category.name, ...transaction };
    });
  }
}