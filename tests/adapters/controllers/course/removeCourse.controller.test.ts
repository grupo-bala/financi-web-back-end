/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { RemoveCourse } from "../../../../src/usecases/course/removeCourse";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();

jest.mock("../../../../src/usecases/course/removeCourse");

describe("teste do controller de remover curso", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("remover curso deve falhar, pois id não existe", async () => {
    mock(RemoveCourse).mockImplementation(() => {
      return {
        remove: async (_: number) => {
          throw new Error("Esse curso não existe");
        },
      };
    });

    const defaultId = 0;
    const adminToken = Token.encode(defaultId, true);

    const response = await server.inject({
      method: "DELETE",
      url: "http://localhost/remove-course",
      cookies: {
        "financi-jwt": adminToken.encoded,
      },
      payload: {
        id: -1,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(response.json())
      .toEqual({
        msg: "Esse curso não existe",
      });
  });

  test("remover curso deve passar", async () => {
    mock(RemoveCourse).mockImplementation(() => {
      return {
        remove: async (_: number) => {},
      };
    });

    const defaultId = 0;
    const adminToken = Token.encode(defaultId, true);

    const response = await server.inject({
      method: "DELETE",
      url: "http://localhost/remove-course",
      cookies: {
        "financi-jwt": adminToken.encoded,
      },
      payload: {
        id: 1,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});