/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import {
  PostgresTransactionRepository,
} from "../../../src/adapters/repositories/postgresTransactionRepository";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";
import { mockDeep } from "jest-mock-extended";
import { Transaction } from "../../../src/model/transaction";
import { Decimal } from "@prisma/client/runtime/library";
import { TransactionPreview } from "../../../src/model/transactionPreview";

const prismaMock = mockDeep<PrismaClient>();
Object.defineProperty(PrismaHelper, "client", {
  get: () => prismaMock,
});

describe("testes do repositório de transações", () => {
  test(
    "verificar se uma transação existe pelo id deve " +
    "retornar true caso ela exista",
    async () => {
      const pg = new PostgresTransactionRepository();
      const count = 1;

      prismaMock.transaction.count.mockImplementation(
        (_args: any) => count as any,
      );

      const id = 1;

      await expect(pg.existsById(id))
        .resolves
        .toBe(true);
    },
  );

  test(
    "verificar se uma transação existe pelo id deve " +
    "retornar false caso ela não exista",
    async () => {
      const pg = new PostgresTransactionRepository();
      const count = 0;

      prismaMock.transaction.count.mockImplementation(
        (_args: any) => count as any,
      );

      const id = -1;

      await expect(pg.existsById(id))
        .resolves
        .toBe(false);
    },
  );

  test("adicionar uma transação deve passar", async () => {
    const pg = new PostgresTransactionRepository();

    prismaMock.transaction.create.mockImplementation(
      (_args: any) => ({}) as any,
    );

    const categoryId = 1;
    const userId = 1;

    const newTransaction = new Transaction(
      new Decimal("123.1"),
      categoryId,
      "",
      "",
      true,
      new Date(),
      userId,
      null,
    );

    await expect(pg.add(newTransaction))
      .resolves
      .not
      .toThrow();
  });

  test("remover uma transação deve passar", async () => {
    const pg = new PostgresTransactionRepository();

    prismaMock.transaction.delete.mockImplementation(
      (_args: any) => ({}) as any,
    );

    const id = 1;

    await expect(pg.remove(id))
      .resolves
      .not
      .toThrow();
  });

  test("pegar uma transação deve passar caso o id exista", async () => {
    const pg = new PostgresTransactionRepository();
    const categoryId = 1;
    const id = 1;
    const transaction = new Transaction(
      new Decimal("123.1"),
      categoryId,
      "",
      "",
      true,
      new Date(),
      null,
      id,
    );

    prismaMock.transaction.findUniqueOrThrow.mockImplementation(
      (_args: any) => {
        return {
          description: transaction.description,
          id_category: transaction.categoryId,
          is_entry: transaction.isEntry,
          occurrence_date: transaction.date,
          title: transaction.title,
          value: transaction.value,
        } as any;
      },
    );

    await expect(pg.get(id))
      .resolves
      .toEqual(transaction);
  });

  test(
    "pegar uma transação do banco deve soltar uma exceção caso o id não exista",
    async () => {
      const pg = new PostgresTransactionRepository();
      const id = -1;

      prismaMock.transaction.findUniqueOrThrow.mockImplementation(
        (_args: any) => {
          throw new Error;
        },
      );

      await expect(pg.get(id))
        .rejects
        .toThrow();
    },
  );

  test("remover uma transação deve passar", async () => {
    const pg = new PostgresTransactionRepository();

    prismaMock.transaction.update.mockImplementation(
      (_args: any) => ({}) as any,
    );

    const categoryId = 1;
    const id = 1;
    const transaction = new Transaction(
      new Decimal("123.1"),
      categoryId,
      "",
      "",
      true,
      new Date(),
      null,
      id,
    );

    await expect(pg.update(transaction))
      .resolves
      .not
      .toThrow();
  });

  test("pegar o tamanho do repositório deve passar", async () => {
    const pg = new PostgresTransactionRepository();
    const size = 10;

    prismaMock.transaction.count.mockImplementation(
      (_args: any) => size as any,
    );

    await expect(pg.getSize())
      .resolves
      .toBe(size);
  });

  test(
    "remover uma transação deve soltar ume exceção caso o id não exista",
    async () => {
      const pg = new PostgresTransactionRepository();

      prismaMock.transaction.delete.mockImplementation(
        (_args: any) => {
          throw new Error;
        },
      );

      const idThatNotExists = 1;

      await expect(
        pg.remove(idThatNotExists),
      ).rejects.toThrow();
    },
  );

  test("pegar o tamanho do repositório deve passar", async () => {
    const pg = new PostgresTransactionRepository();
    const size = 10;

    prismaMock.transaction.count.mockImplementation(
      (_args: any) => size as any,
    );

    await expect(pg.getSize())
      .resolves
      .toBe(size);
  });

  test(
    "Pegar o preview de transações deve passar",
    async () => {
      const pg = new PostgresTransactionRepository();
      const id = 1;
      const categoryId = 1;
      const date = new Date();
      const prismaPreviews = [
        {
          id: id,
          id_category: categoryId,
          is_entry: true,
          occurrence_date: date,
          title: "",
          value: new Decimal("123.1"),
        },
      ];
      const transactions = [
        new TransactionPreview(
          new Decimal("123.1"),
          categoryId,
          "",
          true,
          date,
          id,
        ),
      ];

      prismaMock.transaction.findMany.mockImplementation(
        (_args: any) => prismaPreviews as any,
      );

      const page = 1;
      const size = 10;

      await expect(pg.getAllPreviews(page, size))
        .resolves
        .toEqual(transactions);
    },
  );
});