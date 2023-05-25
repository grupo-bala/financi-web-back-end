import { Interval } from "../data/Filter";

export interface TransactionsByPeriod {
  occurrence_date: number,
  entries_sum: number,
  outs_sum: number,
}

export interface CategoryByPeriod {
  category: string,
  entries_sum: number,
  outs_sum: number,
}

export interface StatisticsRepository {
  getTransactionsByDay(
    userId: number,
    interval: Interval,
  ): Promise<TransactionsByPeriod[]>;

  getTransactionsByWeek(
    userId: number,
    interval: Interval,
  ): Promise<TransactionsByPeriod[]>;

  getTransactionsByMonth(
    userId: number,
    interval: Interval,
  ): Promise<TransactionsByPeriod[]>;

  getCategoriesByPeriod(
    userId: number,
    interval: Interval
  ): Promise<CategoryByPeriod[]>;
}