import { Interval } from "../../usecases/statistics/data/Filter";
import { CategoryByPeriod, StatisticsRepository, TransactionsByPeriod } from "../../usecases/statistics/interface/statisticsRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresStatisticsRepository implements StatisticsRepository {
  async getTransactionsByDay(
    userId: number,
    interval: Interval,
  ): Promise<TransactionsByPeriod[]> {
    return await PrismaHelper
      .client
      .$queryRaw`
        select
          cast(occurrence_date as text) date,
          sum(case when is_entry then value else 0 end) as entries_sum,
          sum(case when not is_entry then value else 0 end) as outs_sum
        from transaction
        where id_user = ${userId}
          and occurrence_date >= ${interval.initDate}
          and occurrence_date <= ${interval.endDate}
        group by date
        order by date
      `;
  }

  async getTransactionsByWeek(
    userId: number,
    interval: Interval,
  ): Promise<TransactionsByPeriod[]> {
    return await PrismaHelper
      .client
      .$queryRaw`
        select
          cast(date_part('week', occurrence_date) as text)
            || '/'
            || cast(date_part('year', occurrence_date) as text) date,
          sum(case when is_entry then value else 0 end) as entries_sum,
          sum(case when not is_entry then value else 0 end) as outs_sum
        from transaction
        where id_user = ${userId}
          and occurrence_date >= ${interval.initDate}
          and occurrence_date <= ${interval.endDate}
        group by date
        order by date
      `;
  }

  async getTransactionsByMonth(
    userId: number,
    interval: Interval,
  ): Promise<TransactionsByPeriod[]> {
    return await PrismaHelper
      .client
      .$queryRaw`
        select
          cast(date_part('month', occurrence_date) as text)
            || '/'
            || cast(date_part('year', occurrence_date) as text) date,
          sum(case when is_entry then value else 0 end) as entries_sum,
          sum(case when not is_entry then value else 0 end) as outs_sum
        from transaction
        where id_user = ${userId}
          and occurrence_date >= ${interval.initDate}
          and occurrence_date <= ${interval.endDate}
        group by date
        order by date
      `;
  }

  async getCategoriesByPeriod(
    userId: number,
    interval: Interval,
  ): Promise<CategoryByPeriod[]> {
    return await PrismaHelper
      .client
      .$queryRaw`
        select
          c.name category,
          sum(case when is_entry then value else 0 end) as entries_sum,
          sum(case when not is_entry then value else 0 end) as outs_sum
        from transaction
        join category c on id_category = c.id
        where id_user = ${userId}
          and occurrence_date >= ${interval.initDate}
          and occurrence_date <= ${interval.endDate}
        group by c.name
      `;
  }
}