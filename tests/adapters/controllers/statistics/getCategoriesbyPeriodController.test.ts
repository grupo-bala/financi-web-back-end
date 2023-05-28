import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { GetCategoriesByPeriod } from "../../../../src/usecases/statistics/getCategoriesByPeriod";
import { Token } from "../../../../src/adapters/data/token";
import { mock } from "../../../util";
import { Interval } from "../../../../src/usecases/statistics/data/Filter";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/statistics/getCategoriesByPeriod");

describe(
  "testes do controlador de pegar métricas de categorias por período",
  () => {
    beforeAll(() => {
      server.register(registerHandlers);
    });

    test(
      "caso de uso sem erros deve retornar status 200 e lista de categorias",
      async () => {
        const categories = [{ category: "Saúde", entries_sum: 0, outs_sum: 0 }];
        mock(GetCategoriesByPeriod).mockImplementation(() => {
          return {
            get: async (_id: number, _interval: Interval) => {
              return categories;
            },
          };
        });

        const defaultId = 0;
        const token = Token.encode(defaultId, false);
        const response = await server.inject({
          method: "GET",
          url: "http://localhost/stats/get-categories-by-period",
          cookies: {
            "financi-jwt": token.encoded,
          },
          query: {
            initDate: "2023-01-01",
            endDate: "2023-05-30",
          },
        });

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.json()).toEqual({
          data: categories,
        });
      },
    );

    test(
      "erro no caso de uso deve retornar status 400",
      async () => {
        mock(GetCategoriesByPeriod).mockImplementation(() => {
          return {
            get: async (_id: number, _interval: Interval) => {
              throw new Error();
            },
          };
        });

        const defaultId = 0;
        const token = Token.encode(defaultId, false);
        const response = await server.inject({
          method: "GET",
          url: "http://localhost/stats/get-categories-by-period",
          cookies: {
            "financi-jwt": token.encoded,
          },
          query: {
            initDate: "2023-01-01",
            endDate: "2023-05-30",
          },
        });

        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      },
    );
  },
);