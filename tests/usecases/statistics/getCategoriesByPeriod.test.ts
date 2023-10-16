import {
  PostgresStatisticsRepository,
} from "../../../src/adapters/repositories/postgresStatisticsRepository";
import { Interval } from "../../../src/usecases/statistics/data/Filter";
import {
  GetCategoriesByPeriod,
} from "../../../src/usecases/statistics/getCategoriesByPeriod";
import { CategoryByPeriod } from "../../../src/usecases/statistics/interface/statisticsRepository";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresStatisticsRepository.ts");

describe(
  "testes do caso de uso de pegar métricas de categorias por período",
  () => {
    test("data inicial maior que final deve falhar", async () => {
      const id = 0;
      const usecase = new GetCategoriesByPeriod(
        new PostgresStatisticsRepository(),
      );

      await expect(usecase.get(
        id,
        {
          initDate: new Date("2023-12-31"),
          endDate: new Date("2023-01-01"),
        },
      ))
        .rejects
        .toThrow();
    });

    test("data válida deve retornar lista de categorias", async () => {
      mock(PostgresStatisticsRepository).mockImplementation(() => {
        return {
          getCategoriesByPeriod: async (_id: number, _interval: Interval) => {
            return categories;
          },
        };
      });

      const id = 0;
      const usecase = new GetCategoriesByPeriod(
        new PostgresStatisticsRepository(),
      );
      const categories: CategoryByPeriod[] =
        [{ category: "Saúde", entries_sum: 0, outs_sum: 0 }];

      const categoriesResult = await usecase.get(
        id,
        {
          initDate: new Date(),
          endDate: new Date(),
        },
      );

      expect(categoriesResult).toBe(categories);
    });
  },
);