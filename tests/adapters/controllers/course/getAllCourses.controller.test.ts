import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { GetAllCourses } from "../../../../src/usecases/course/getAllCourses";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();

jest.mock("../../../../src/usecases/course/getAllCourses");

describe("teste do controller de adicionar curso", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("teste deve passar com status 200", async () => {
    mock(GetAllCourses).mockImplementation(() => {
      return {
        getAll: async (_: number, __: number) => {
          return {
            courses: [],
            howManyPages: 0,
          };
        },
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "GET",
      url: "http://localhost/get-all-courses",
      cookies: {
        "financi-jwt": token.encoded,
      },
      query: {
        page: "1",
        size: "10",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.json()).toEqual({
      data: [],
      pages: 0,
    });
  });

  test(
    "teste deve falhar, pois a página é negativa ou igual a zero",
    async () => {
      mock(GetAllCourses).mockImplementation(() => {
        return {
          getAll: async (_: number, __: number) => {
            throw new Error(
              "A página deve ser um número positivo maior que zero",
            );
          },
        };
      });

      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-courses",
        cookies: {
          "financi-jwt": token.encoded,
        },
        query: {
          page: "-1",
          size: "10",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.json()).toEqual({
        msg: "A página deve ser um número positivo maior que zero",
      });
    },
  );

  test(
    "teste deve falhar, pois o tamanho é negativo ou igual a zero",
    async () => {
      mock(GetAllCourses).mockImplementation(() => {
        return {
          getAll: async (_: number, __: number) => {
            throw new Error(
              "O tamanho deve ser um número positivo maior que zero",
            );
          },
        };
      });

      const defaultId = 0;
      const token = Token.encode(defaultId, false);

      const response = await server.inject({
        method: "GET",
        url: "http://localhost/get-all-courses",
        cookies: {
          "financi-jwt": token.encoded,
        },
        query: {
          page: "1",
          size: "-1",
        },
      });

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.json()).toEqual({
        msg: "O tamanho deve ser um número positivo maior que zero",
      });
    },
  );
});