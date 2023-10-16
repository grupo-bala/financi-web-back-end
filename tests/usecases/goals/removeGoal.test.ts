import {
  PostgresGoalsRepository,
} from "../../../src/adapters/repositories/postgresGoalsRepository";
import { RemoveGoal } from "../../../src/usecases/goals/removeGoal";
import { mock } from "../../util";

jest.mock("../../../src/adapters/repositories/postgresGoalsRepository");

describe("testes de remover metas", () => {
  test("meta inexistente no usuário deve falhar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_userId: number, _id: number) => false,
      };
    });

    const removeGoal = new RemoveGoal(new PostgresGoalsRepository());
    const invalidId = -1;

    await expect(removeGoal.remove(invalidId, invalidId))
      .rejects
      .toThrow();
  });

  test("remover uma meta existente no usuário deve passar", async () => {
    mock(PostgresGoalsRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_userId: number, _id: number) => true,
        removeFromUser: async (_userId: number, _id: number) => {
          return Promise.resolve();
        },
      };
    });

    const removeGoal = new RemoveGoal(new PostgresGoalsRepository());
    const validId = -1;

    await expect(removeGoal.remove(validId, validId))
      .resolves
      .not.toThrow();
  });
});