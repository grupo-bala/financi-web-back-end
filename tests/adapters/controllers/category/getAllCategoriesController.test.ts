import Fastify from "fastify";
import { registerHandlers } from "../../../../src/server/plugins/registerHandlers";
import { GetAllCategories } from "../../../../src/usecases/category/getAllCategories";
import { mock } from "../../../util";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/category/getAllCategories");

describe("testes do controller de pegar todas as categorias", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test(
    "caso de uso sem erros deve passar com status 200 e um json com data",
    async () => {
      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      mock(GetAllCategories).mockImplementation(() => {
        return {
          getAll: async () => [],
        };
      });

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-categories",
        cookies: {
          "financi-jwt": token.encoded,
        },
      });

      expect(response.statusCode).toBe(StatusCodes.OK);
      expect(response.json()).toHaveProperty("data");
    },
  );
});