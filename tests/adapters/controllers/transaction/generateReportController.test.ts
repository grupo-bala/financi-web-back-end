import Fastify from "fastify";
import { registerHandlers } from "../../../../src/server/plugins/registerHandlers";
import { Token } from "../../../../src/adapters/data/token";
import { GenerateReport } from "../../../../src/usecases/transaction/generateReport";
import { mock } from "../../../util";
import { Interval } from "../../../../src/usecases/statistics/data/Filter";
import { StatusCodes } from "http-status-codes";
import { PDF } from "../../../../src/adapters/services/pdf";

const server = Fastify();
jest.mock("../../../../src/usecases/transaction/generateReport.ts");

describe("testes do controller de relatórios", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso com erros deve falhar com status 400", async () => {
    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    mock(GenerateReport).mockImplementation(() => {
      return {
        generate: async (_id: number, _interval: Interval) => {
          throw new Error();
        },
      };
    });

    const response = await server.inject({
      method: "GET",
      url: "http://localhost/generate-report",
      query: {
        initDate: "2023-01-01",
        endDate: "2023-05-30",
      },
      cookies: {
        "financi-jwt": token.encoded,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
  });

  test(
    "caso de uso sem erros deve passar com status 200 e retornar um arquivo",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(GenerateReport).mockImplementation(() => {
        return {
          generate: async (_id: number, _interval: Interval) => {
            return await PDF.generateReport([], "test", {
              initDate: new Date(),
              endDate: new Date(),
            });
          },
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/generate-report",
        query: {
          initDate: "2023-01-01",
          endDate: "2023-05-30",
        },
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.headers["content-disposition"]).toBe(
        "attachment; filename=test.pdf",
      );
      expect(response.headers["content-type"]).toBe(
        "application/octet-stream",
      );
    },
  );
});