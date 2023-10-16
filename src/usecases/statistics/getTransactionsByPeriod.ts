import { Interval, View } from "./data/Filter";
import { StatisticsRepository } from "./interface/statisticsRepository";

export class GetTransactionsByPeriod {
  readonly statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository;
  }

  async get(userId: number, interval: Interval, view: View) {
    if (interval.endDate < interval.initDate) {
      throw new Error("A data final não pode ser menor que a data inicial");
    }

    if (view === "Day") {
      return await this.statisticsRepository.getTransactionsByDay(
        userId, interval,
      );
    } else if (view === "Week") {
      return await this.statisticsRepository.getTransactionsByWeek(
        userId, interval,
      );
    } else {
      return await this.statisticsRepository.getTransactionsByMonth(
        userId, interval,
      );
    }
  }
}