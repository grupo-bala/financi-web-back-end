import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresGoalsRepository,
} from "../../../src/adapters/repositories/postgresGoalsRepository";
import { Goal } from "../../../src/model/goal";
import {
  GetAllGoals,
} from "../../../src/usecases/goals/getAllGoals";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresGoalsRepository");

describe("testes de obter todas as metas de um usuário", () => {
  test("página negativa deve falhar", async () => {
    const getAllGoals = new GetAllGoals(
      new PostgresGoalsRepository(),
    );

    const page = -1;
    const size = 10;
    const userId = 0;

    await expect(getAllGoals.getAll(userId, page, size))
      .rejects
      .toThrow();
  });

  test("tamanho negativo deve falhar", async () => {
    const getAllGoals = new GetAllGoals(
      new PostgresGoalsRepository(),
    );

    const page = 1;
    const size = -1;
    const userId = 0;

    await expect(getAllGoals.getAll(userId, page, size))
      .rejects
      .toThrow();
  });

  test(
    "usuário sem metas deve passar e retornar lista vazia",
    async () => {
      const goalsQnt = 0;
      const pagesQnt = 0;

      mock(PostgresGoalsRepository).mockImplementation(() => {
        return {
          getSizeInUser: async (_id: number) => goalsQnt,
        };
      });

      const getAllGoals = new GetAllGoals(
        new PostgresGoalsRepository(),
      );

      const userId = 0;
      const page = 1;
      const size = 10;

      const res = await getAllGoals.getAll(userId, page, size);
      expect(res.goals.length).toBe(goalsQnt);
      expect(res.howManyPages).toBe(pagesQnt);
    });

  test("usuário com metas deve passar e retornar lista não vazia", async () => {
    const goalsQnt = 1;
    const pagesQnt = 1;

    const noMoney = 0;
    const returnGoal = new Goal({
      id: 0,
      title: "Teste",
      userId: 0,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      deadline: new Date(),
    });

    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        getSizeInUser: async (_id: number) => goalsQnt,
        getAllOfUser: async (_id: number) => [returnGoal],
      };
    });

    const getAllGoals = new GetAllGoals(
      new PostgresGoalsRepository(),
    );

    const userId = 0;
    const page = 1;
    const size = 10;

    await expect(getAllGoals.getAll(userId, page, size))
      .resolves
      .toEqual({
        goals: [returnGoal],
        howManyPages: pagesQnt,
      });
  });
});