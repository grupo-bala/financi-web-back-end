/* eslint-disable @typescript-eslint/no-empty-function */
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import {
  RemoveTransaction,
} from "../../../src/usecases/transaction/removeTransaction";
import {
  mock,
} from "../../util";

jest.mock("../../../src/adapters/repositories/postgresTransactionRepository");

describe("testes do caso de uso de remover transação", () => {
  test("deve falhar, pois a transação não existe", async () => {
    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const removeTransaction = new RemoveTransaction(
      new PostgresTransactionRepository(),
    );

    const id = -1;

    await expect(removeTransaction.remove(id))
      .rejects
      .toThrow(Error);
  });

  test("deve passar pois a transação existe", async () => {
    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        remove: async (_: number) => {},
      };
    });

    const removeTransaction = new RemoveTransaction(
      new PostgresTransactionRepository(),
    );

    const id = 1;

    await expect(removeTransaction.remove(id))
      .resolves
      .not
      .toThrow(Error);
  });
});