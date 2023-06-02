import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresGoalsRepository,
} from "../../../src/adapters/repositories/postgresGoalsRepository";
import { Goal } from "../../../src/model/goal";
import { UpdateGoal } from "../../../src/usecases/goals/updateGoal";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresGoalsRepository");

describe("testes de atualizar uma meta", () => {
  test("meta inexistente no usuário deve falhar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_userId: number, _id: number) => false,
      };
    });

    const updateGoal = new UpdateGoal(new PostgresGoalsRepository());
    const invalidId = -1;
    const noMoney = 0;

    const newGoal = new Goal({
      id: invalidId,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      idealPerMonth: new Decimal(noMoney),
      deadline: new Date(),
      title: "",
      userId: invalidId,
    });

    await expect(updateGoal.update(newGoal))
      .rejects
      .toThrow();
  });

  test("novo título já existente deve falhar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_userId: number, _id: number) => true,
        existsInUserByTitle: async (_userId: number, _title: string) => true,
      };
    });

    const updateGoal = new UpdateGoal(new PostgresGoalsRepository());
    const id = -1;
    const noMoney = 0;

    const newGoal = new Goal({
      id,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      idealPerMonth: new Decimal(noMoney),
      deadline: new Date(),
      title: "",
      userId: id,
    });

    await expect(updateGoal.update(newGoal))
      .rejects
      .toThrow();
  });

  test("meta e existente e novo título inexistente deve passar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_userId: number, _id: number) => true,
        existsInUserByTitle: async (_userId: number, _title: string) => false,
        updateGoal: async (_goal: Goal) => Promise.resolve(),
      };
    });

    const updateGoal = new UpdateGoal(new PostgresGoalsRepository());
    const invalidId = -1;
    const noMoney = 0;

    const newGoal = new Goal({
      id: invalidId,
      currentValue: new Decimal(noMoney),
      totalValue: new Decimal(noMoney),
      idealPerMonth: new Decimal(noMoney),
      deadline: new Date(),
      title: "",
      userId: invalidId,
    });

    await expect(updateGoal.update(newGoal))
      .resolves
      .not.toThrow();
  });
});