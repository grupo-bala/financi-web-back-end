/* eslint-disable @typescript-eslint/no-empty-function */
import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { AddCourse } from "../../../../src/usecases/course/addCourse";
import { Course } from "../../../../src/model/course";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();

jest.mock("../../../../src/usecases/course/addCourse");

describe("teste do controller de adicionar curso", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("adicionar curso deve passar", async () => {
    mock(AddCourse).mockImplementation(() => {
      return {
        add: async (_: Course) => {},
      };
    });

    const defaultId = 0;
    const adminToken = Token.encode(defaultId, true);

    const response = await server.inject({
      method: "POST",
      url: "http://localhost/add-course",
      cookies: {
        "financi-jwt": adminToken.encoded,
      },
      payload: {
        title: "",
        description: "",
      },
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });
});