/* eslint-disable @typescript-eslint/no-empty-function */
import { Decimal } from "@prisma/client/runtime/library";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import {
  PostgresCategoryRepository,
} from "../../../src/adapters/repositories/postgresCategoryRepository";
import { Transaction } from "../../../src/model/transaction";
import {
  UpdateTransaction,
} from "../../../src/usecases/transaction/updateTransaction";
import {
  mock,
} from "../../util";

jest.mock("../../../src/adapters/repositories/postgresTransactionRepository");
jest.mock("../../../src/adapters/repositories/postgresCategoryRepository");

describe("testes do caso de uso de atualizar uma transação", () => {
  test("deve falhar, pois a transação não existe", async () => {
    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_: number, __: number) => false,
      };
    });

    const updateTransaction = new UpdateTransaction(
      new PostgresTransactionRepository(),
      new PostgresCategoryRepository(),
    );

    const categoryId = 1;
    const userId = 1;
    const transactionId = -1;

    const transaction = new Transaction(
      new Decimal("123.1"),
      categoryId,
      "",
      true,
      new Date(),
      userId,
      transactionId,
    );

    await expect(updateTransaction.update(transaction))
      .rejects
      .toThrow(new Error("Essa transação não existe"));
  });

  test("deve falhar, pois a categoria não existe", async () => {
    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_: number, __: number) => true,
      };
    });

    mock(PostgresCategoryRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => false,
      };
    });

    const updateTransaction = new UpdateTransaction(
      new PostgresTransactionRepository(),
      new PostgresCategoryRepository(),
    );

    const categoryId = -1;
    const userId = 1;
    const transactionId = 1;

    const transaction = new Transaction(
      new Decimal("123.1"),
      categoryId,
      "",
      true,
      new Date(),
      userId,
      transactionId,
    );

    await expect(updateTransaction.update(transaction))
      .rejects
      .toThrow(new Error("Essa categoria não existe"));
  });

  test("deve passar, pois a categoria e transação existem", async () => {
    mock(PostgresTransactionRepository).mockImplementation(() => {
      return {
        existsInUserById: async (_: number, __: number) => true,
        update: async (_: Transaction) => {},
      };
    });

    mock(PostgresCategoryRepository).mockImplementation(() => {
      return {
        existsById: async (_: number) => true,
      };
    });

    const updateTransaction = new UpdateTransaction(
      new PostgresTransactionRepository(),
      new PostgresCategoryRepository(),
    );

    const categoryId = 1;
    const userId = 1;
    const transactionId = 1;

    const transaction = new Transaction(
      new Decimal("123.1"),
      categoryId,
      "",
      true,
      new Date(),
      userId,
      transactionId,
    );

    await expect(updateTransaction.update(transaction))
      .resolves
      .not
      .toThrow(Error);
  });
});