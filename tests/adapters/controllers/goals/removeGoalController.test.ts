import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { RemoveGoal } from "../../../../src/usecases/goals/removeGoal";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/goals/removeGoal");

describe("testes do controller de adicionar metas", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso com erro deve retornar status code 404", async () => {
    mock(RemoveGoal).mockImplementation(() => {
      return {
        remove: async (_userId: number, _id: number) => {
          throw new Error();
        },
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "DELETE",
      url: "http://localhost/remove-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        goalId: defaultId,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  test("caso de uso sem erro deve retornar status code 200", async () => {
    mock(RemoveGoal).mockImplementation(() => {
      return {
        remove: async (_userId: number, _id: number) => Promise.resolve(),
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "DELETE",
      url: "http://localhost/remove-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        goalId: defaultId,
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});