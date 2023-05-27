import {
  GetTransaction,
} from "../../../src/usecases/transaction/getTransaction";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import { mock } from "../../util";
import { Transaction } from "../../../src/model/transaction";
import { Decimal } from "@prisma/client/runtime/library";

jest.mock("../../../src/adapters/repositories/postgresTransactionRepository");

describe("testes do caso de uso de pegar uma transação", () => {
  test("deve falhar, pois a transação não existe", async () => {
    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const getTransaction = new GetTransaction(
      new PostgresTransactionRepository(),
    );
    const id = -1;

    await expect(getTransaction.get(id))
      .rejects
      .toThrow(Error);
  });

  test("deve passar, pois a transação existe", async () => {
    const categoryId = 1;
    const userId = 1;
    const transactionId = 1;
    const transaction = new Transaction(
      new Decimal("123.2"),
      categoryId,
      "",
      true,
      new Date(),
      userId,
      transactionId,
    );

    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
        get: async (_: number) => transaction,
      };
    });

    const getTransaction = new GetTransaction(
      new PostgresTransactionRepository(),
    );

    await expect(getTransaction.get(transactionId))
      .resolves
      .toEqual(transaction);
  });
});