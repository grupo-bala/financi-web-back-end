import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresGoalsRepository,
} from "../../../src/adapters/repositories/postgresGoalsRepository";
import { Goal } from "../../../src/model/goal";
import { AddGoal } from "../../../src/usecases/goals/addGoal";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresGoalsRepository");

describe("testes de adicionar metas", () => {
  test("título já existente no usuário deve falhar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserByTitle: async (_goal: Goal) => true,
      };
    });

    const noMoney = 0;
    const newGoal = new Goal({
      id: 0,
      title: "Teste",
      userId: 0,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      deadline: new Date(),
    });

    const addGoal = new AddGoal(new PostgresGoalsRepository());

    await expect(addGoal.add(newGoal))
      .rejects
      .toThrow();
  });

  test("título não existente no usuário deve passar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserByTitle: async (_goal: Goal) => false,
        add: async (_goal: Goal) => Promise.resolve(),
      };
    });

    const noMoney = 0;
    const newGoal = new Goal({
      id: 0,
      title: "Teste",
      userId: 0,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      deadline: new Date(),
    });

    const addGoal = new AddGoal(new PostgresGoalsRepository());

    await expect(addGoal.add(newGoal))
      .resolves
      .not
      .toThrow();
  });
});