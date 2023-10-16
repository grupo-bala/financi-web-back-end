import {
  GetTransactionsByPeriod,
} from "../../../src/usecases/statistics/getTransactionsByPeriod";
import {
  PostgresStatisticsRepository,
} from "../../../src/adapters/repositories/postgresStatisticsRepository";
import { mock } from "../../util";
import { Interval } from "../../../src/usecases/statistics/data/Filter";

jest.mock("../../../src/adapters/repositories/postgresStatisticsRepository.ts");

mock(PostgresStatisticsRepository).mockImplementation(() => {
  return {
    getTransactionsByDay: async (_id: number, _interval: Interval) => {
      return [{ date: "2023-01-01", entries_sum: 0, outs_sum: 0 }];
    },
    getTransactionsByWeek: async (_id: number, _interval: Interval) => {
      return [{ date: "1/2023", entries_sum: 0, outs_sum: 0 }];
    },
    getTransactionsByMonth: async (_id: number, _interval: Interval) => {
      return [{ date: "1/2023", entries_sum: 0, outs_sum: 0 }];
    },
  };
});

describe(
  "testes do caso de uso de pegar métricas de transações por período",
  () => {
    test("data inicial maior que final deve falhar", async () => {
      const id = 0;
      const usecase = new GetTransactionsByPeriod(
        new PostgresStatisticsRepository(),
      );

      await expect(usecase.get(
        id,
        {
          initDate: new Date("2023-12-31"),
          endDate: new Date("2023-01-01"),
        },
        "Day",
      ))
        .rejects
        .toThrow();
    });

    test(
      "visualização por dia deve retornar 1 entrada no formato yyyy-mm-dd",
      async () => {
        const id = 0;
        const usecase = new GetTransactionsByPeriod(
          new PostgresStatisticsRepository(),
        );

        const dates = await usecase.get(
          id,
          {
            initDate: new Date(),
            endDate: new Date(),
          },
          "Day",
        );

        expect(dates[0].date).toMatch(/\d{4}-\d{1,2}-\d{1,2}/);
      },
    );

    test(
      "visualização por semana deve retornar 1 entrada no formato ww/yyyy",
      async () => {
        const id = 0;
        const usecase = new GetTransactionsByPeriod(
          new PostgresStatisticsRepository(),
        );

        const dates = await usecase.get(
          id,
          {
            initDate: new Date(),
            endDate: new Date(),
          },
          "Week",
        );

        expect(dates[0].date).toMatch(/\d{1,2}\/\d{4}/);
      },
    );

    test(
      "visualização por mês deve retornar 1 entrada no formato mm/yyyy",
      async () => {
        const id = 0;
        const usecase = new GetTransactionsByPeriod(
          new PostgresStatisticsRepository(),
        );

        const dates = await usecase.get(
          id,
          {
            initDate: new Date(),
            endDate: new Date(),
          },
          "Month",
        );

        expect(dates[0].date).toMatch(/\d{1,2}\/\d{4}/);
      },
    );
  },
);