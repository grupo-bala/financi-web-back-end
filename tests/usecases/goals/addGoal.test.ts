import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresGoalsRepository,
} from "../../../src/adapters/repositories/postgresGoalsRepository";
import { Goal } from "../../../src/model/goal";
import { AddGoal } from "../../../src/usecases/goals/addGoal";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresGoalsRepository");

describe("testes de adicionar metas", () => {
  test("meta válida deve passar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        add: async (_goal: Goal) => Promise.resolve() as any,
      };
    });

    const noMoney = 0;
    const newGoal = new Goal({
      id: 0,
      title: "Teste",
      userId: 0,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      idealPerMonth: new Decimal(noMoney),
      deadline: new Date(),
    });

    const addGoal = new AddGoal(new PostgresGoalsRepository());

    await expect(addGoal.add(newGoal))
      .resolves
      .not
      .toThrow();
  });
});