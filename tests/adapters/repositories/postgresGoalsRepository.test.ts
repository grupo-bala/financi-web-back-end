/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";
import {
  PostgresGoalsRepository,
} from "../../../src/adapters/repositories/postgresGoalsRepository";
import { Goal } from "../../../src/model/goal";
import { Decimal } from "@prisma/client/runtime/library";

const prismaMock = mockDeep<PrismaClient>();
Object.defineProperty(PrismaHelper, "client", {
  get: () => prismaMock,
});

describe("testes do repositório de metas", () => {
  test("adicionar meta não existente deve passar", async () => {
    const pg = new PostgresGoalsRepository();
    const noMoney = 0;
    const goal = new Goal({
      id: 0,
      title: "",
      userId: 0,
      totalValue: new Decimal(noMoney),
      currentValue: new Decimal(noMoney),
      deadline: new Date(),
    });

    prismaMock.goal.create.mockImplementation(
      (_args: any) => ({} as any),
    );

    await expect(pg.add(goal))
      .resolves
      .not.toThrow();
  });

  test("título buscado existe deve retornar verdadeiro", async () => {
    const pg = new PostgresGoalsRepository();
    const count = 1;
    const userId = 0;

    prismaMock.goal.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.existsInUserByTitle(userId, ""))
      .resolves
      .toBeTruthy();
  });

  test("título buscado não existe deve retornar falso", async () => {
    const pg = new PostgresGoalsRepository();
    const count = 0;
    const userId = 0;

    prismaMock.goal.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.existsInUserByTitle(userId, ""))
      .resolves
      .toBeFalsy();
  });

  test("id buscado existe deve retornar verdadeiro", async () => {
    const pg = new PostgresGoalsRepository();
    const count = 1;
    const id = 0;

    prismaMock.goal.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.existsInUserById(id, id))
      .resolves
      .toBeTruthy();
  });

  test("id buscado não existe deve retornar falso", async () => {
    const pg = new PostgresGoalsRepository();
    const count = 0;
    const id = 0;

    prismaMock.goal.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.existsInUserById(id, id))
      .resolves
      .toBeFalsy();
  });

  test("usuário com 10 metas deve retornar 10", async () => {
    const pg = new PostgresGoalsRepository();
    const count = 10;
    const id = 0;

    prismaMock.goal.count.mockImplementation(
      (_args: any) => count as any,
    );

    await expect(pg.getSizeInUser(id))
      .resolves
      .toBe(count);
  });

  test("usuário sem metas deve retornar lista de metas vazia", async () => {
    const pg = new PostgresGoalsRepository();
    const id = 0;
    const page = 1;
    const size = 1;

    prismaMock.goal.findMany.mockImplementation(
      (_args: any) => [] as any,
    );

    await expect(pg.getAllOfUser(id, page, size))
      .resolves
      .toStrictEqual([]);
  });

  test(
    "usuário com 1 meta deve retornar lista com tamanho maior que zero",
    async () => {
      const pg = new PostgresGoalsRepository();
      const id = 0;
      const page = 1;
      const size = 1;

      prismaMock.goal.findMany.mockImplementation(
        (_args: any) => [{}] as any,
      );

      const list = await pg.getAllOfUser(id, page, size);
      const oneElement = 1;
      expect(list.length).toBe(oneElement);
    });

  test("remover meta do usuário deve passar", async () => {
    const pg = new PostgresGoalsRepository();
    const id = 0;

    prismaMock.goal.deleteMany.mockImplementation(
      (_args: any) => ({} as any),
    );

    await expect(pg.removeFromUser(id, id))
      .resolves
      .not.toThrow();
  });

  test("novo título inexistente ao atualizar deve passar", async () => {
    const pg = new PostgresGoalsRepository();
    const noMoney = 0;
    const goal = new Goal({
      id: 0,
      title: "",
      userId: 0,
      totalValue: new Decimal(noMoney),
      currentValue: new Decimal(noMoney),
      deadline: new Date(),
    });

    prismaMock.goal.updateMany.mockImplementation(
      (_args: any) => ({} as any),
    );

    await expect(pg.updateGoal(goal))
      .resolves
      .not.toThrow();
  });

  test("novo título existente deve falhar", async () => {
    const pg = new PostgresGoalsRepository();
    const noMoney = 0;
    const goal = new Goal({
      id: 0,
      title: "",
      userId: 0,
      totalValue: new Decimal(noMoney),
      currentValue: new Decimal(noMoney),
      deadline: new Date(),
    });

    prismaMock.goal.updateMany.mockImplementation(
      (_args: any) => {
        throw new Error();
      },
    );

    await expect(pg.updateGoal(goal))
      .rejects
      .toThrow();
  });
});