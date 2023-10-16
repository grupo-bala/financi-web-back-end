/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";
import { UpdateCourse } from "../../../../src/usecases/course/updateCourse";
import { Course } from "../../../../src/model/course";

const server = Fastify();

jest.mock("../../../../src/usecases/course/updateCourse");

describe("teste do controller de atualizar curso", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("atualizar curso deve falhar, pois id não existe", async () => {
    mock(UpdateCourse).mockImplementation(() => {
      return {
        update: async (_: Course) => {
          throw new Error("Esse curso não existe");
        },
      };
    });

    const defaultId = 0;
    const adminToken = Token.encode(defaultId, true);

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-course",
      cookies: {
        "financi-jwt": adminToken.encoded,
      },
      payload: {
        id: -1,
        title: "",
        description: "",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(response.json())
      .toEqual({
        msg: "Esse curso não existe",
      });
  });

  test("atualizar curso deve passar", async () => {
    mock(UpdateCourse).mockImplementation(() => {
      return {
        update: async (_: Course) => {},
      };
    });

    const defaultId = 0;
    const adminToken = Token.encode(defaultId, true);

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-course",
      cookies: {
        "financi-jwt": adminToken.encoded,
      },
      payload: {
        id: "1",
        title: "",
        description: "",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});