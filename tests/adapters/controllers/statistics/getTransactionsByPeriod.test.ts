import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { GetTransactionsByPeriod } from "../../../../src/usecases/statistics/getTransactionsByPeriod";
import { Token } from "../../../../src/adapters/data/token";
import { mock } from "../../../util";
import { Interval, View } from "../../../../src/usecases/statistics/data/Filter";
import { StatusCodes } from "http-status-codes";
import { TransactionsByPeriod } from "../../../../src/usecases/statistics/interface/statisticsRepository";

const server = Fastify();
jest.mock("../../../../src/usecases/statistics/getTransactionsByPeriod");

describe(
  "testes do controlador de pegar métrias de transações por período",
  () => {
    beforeAll(() => {
      server.register(registerHandlers);
    });

    test(
      "caso de uso sem erros deve retornar status 200 e lista de transações",
      async () => {
        const transactions: TransactionsByPeriod[] = [];
        mock(GetTransactionsByPeriod).mockImplementation(() => {
          return {
            get: async (_id: number, _interval: Interval, _view: View) => {
              return transactions;
            },
          };
        });

        const defaultId = 0;
        const token = Token.encode(defaultId, false);
        const response = await server.inject({
          method: "GET",
          url: "http://localhost/stats/get-transactions-by-period",
          cookies: {
            "financi-jwt": token.encoded,
          },
          query: {
            initDate: "2023-01-01",
            endDate: "2023-05-30",
            view: "Day",
          },
        });

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.json()).toEqual({
          data: transactions,
        });
      },
    );

    test(
      "caso de uso com erro deve retornar status 400",
      async () => {
        mock(GetTransactionsByPeriod).mockImplementation(() => {
          return {
            get: async (_id: number, _interval: Interval, _view: View) => {
              throw new Error();
            },
          };
        });

        const defaultId = 0;
        const token = Token.encode(defaultId, false);
        const response = await server.inject({
          method: "GET",
          url: "http://localhost/stats/get-transactions-by-period",
          cookies: {
            "financi-jwt": token.encoded,
          },
          query: {
            initDate: "2023-01-01",
            endDate: "2023-05-30",
            view: "Day",
          },
        });

        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      },
    );
  },
);