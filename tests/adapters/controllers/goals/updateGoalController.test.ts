import Fastify from "fastify";
import {
  registerHandlers,
} from "../../../../src/server/plugins/registerHandlers";
import { mock } from "../../../util";
import { UpdateGoal } from "../../../../src/usecases/goals/updateGoal";
import { Goal } from "../../../../src/model/goal";
import { Token } from "../../../../src/adapters/data/token";
import { StatusCodes } from "http-status-codes";

const server = Fastify();
jest.mock("../../../../src/usecases/goals/updateGoal");

describe("testes do controller de adicionar metas", () => {
  beforeAll(() => {
    server.register(registerHandlers);
  });

  test("meta inexistente deve retornar status code 404", async () => {
    mock(UpdateGoal).mockImplementation(() => {
      return {
        update: async (_goal: Goal) => {
          throw new Error("Essa meta não existe nesse usuário");
        },
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        id: defaultId,
        title: "",
        currentValue: 0,
        totalValue: 0,
        deadline: new Date(),
      },
    });

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
  });

  test("título já existente deve retornar status code 409", async () => {
    mock(UpdateGoal).mockImplementation(() => {
      return {
        update: async (_goal: Goal) => {
          throw new Error("Já existe uma meta com esse nome");
        },
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        id: defaultId,
        title: "",
        currentValue: 0,
        totalValue: 0,
        deadline: new Date(),
      },
    });

    expect(response.statusCode).toBe(StatusCodes.CONFLICT);
  });

  test("caso de uso sem erro deve retornar status code 200", async () => {
    mock(UpdateGoal).mockImplementation(() => {
      return {
        update: async (_goal: Goal) => Promise.resolve(),
      };
    });

    const defaultId = 0;
    const token = Token.encode(defaultId, false);

    const response = await server.inject({
      method: "PUT",
      url: "http://localhost/update-goal",
      cookies: {
        "financi-jwt": token.encoded,
      },
      payload: {
        id: defaultId,
        title: "",
        currentValue: 0,
        totalValue: 0,
        deadline: new Date(),
      },
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
  });
});