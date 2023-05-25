import { Interval } from "./data/Filter";
import { StatisticsRepository } from "./interface/statisticsRepository";

export class GetCategoriesByPeriod {
  readonly statisticsRepository: StatisticsRepository;

  constructor(statisticsRepository: StatisticsRepository) {
    this.statisticsRepository = statisticsRepository;
  }

  async get(userId: number, interval: Interval) {
    if (interval.endDate < interval.initDate) {
      throw new Error("A data final não pode ser menor que a data inicial");
    }

    return await this.statisticsRepository.getCategoriesByPeriod(
      userId, interval,
    );
  }
}