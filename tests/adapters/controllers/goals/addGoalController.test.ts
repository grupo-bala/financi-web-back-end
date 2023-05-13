import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { AddGoal } from "../../../../src/usecases/goals/addGoal";
import { Goal } from "../../../../src/model/goal";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/goals/addGoal");

describe("testes do controller de adicionar metas", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("caso de uso com erro deve retornar status code 409", async () => {
    mock(AddGoal).mockImplementation(() => {
      return {
        add: async (_goal: Goal) => {
          throw new Error();
        },
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);
    const noMoney = 0;

    const response = await server.inject({
      method: "POST",
      url: "http://localhost/add-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        title: "",
        totalValue: noMoney,
        deadline: new Date(),
      },
    });

    expect(response.statusCode).toBe(StatusCodes.CONFLICT);
  });

  test("caso de uso sem erro deve retornar status code 201", async () => {
    mock(AddGoal).mockImplementation(() => {
      return {
        add: async (_goal: Goal) => Promise.resolve(),
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);
    const noMoney = 0;

    const response = await server.inject({
      method: "POST",
      url: "http://localhost/add-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        title: "",
        totalValue: noMoney,
        deadline: new Date(),
      },
    });

    expect(response.statusCode).toBe(StatusCodes.CREATED);
  });
});