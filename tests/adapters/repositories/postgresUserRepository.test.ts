/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { PrismaClient, financi_user as financiUser } from "@prisma/client";
import {
  PostgresUserRepository,
} from "../../../src/adapters/repositories/postgresUserRepository";
import { mockDeep } from "jest-mock-extended";
import { Decimal } from "@prisma/client/runtime/library";
import { User } from "../../../src/model/user";
import { Email } from "../../../src/model/data/email";
import { Password } from "../../../src/model/data/password";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";

const prismaMock = mockDeep<PrismaClient>();
Object.defineProperty(PrismaHelper, "client", { get: () => prismaMock });

describe("testes do repositório de usuários", () => {
  test("usuário buscado existe no banco deve passar", async () => {
    const pg = new PostgresUserRepository();
    prismaMock.financi_user.count.mockImplementation(
      (_args: any) => 1 as any,
    );

    await expect(
      pg.exists("teste"),
    ).resolves.toBeTruthy();
  });

  test("adicionar usuário não existente deve passar", async () => {
    const pg = new PostgresUserRepository();
    const returnUser: financiUser = {
      name: "test",
      username: "test",
      email: "test@test.com",
      balance: new Decimal(0),
      fixedincome: new Decimal(0),
      id: -1,
      isadmin: false,
      password: "test",
    };

    prismaMock.financi_user.create.mockImplementation(
      (_: any) => {
        return returnUser as any;
      },
    );

    const returnedUser = await pg.add(new User({
      name: "test",
      username: "test",
      email: new Email("test@test.com"),
      balance: new Decimal(0),
      fixedIncome: new Decimal(0),
      id: -1,
      isAdmin: false,
      password: Password.fromHash("test"),
    }));

    expect(returnedUser.name).toBe(returnUser.name);
    expect(returnedUser.username).toBe(returnUser.username);
    expect(returnedUser.email.value).toBe(returnUser.email);
    expect(returnedUser.password.value).toBe(returnUser.password);
  });

  test("adicionar usuário extistente deve falhar", async () => {
    const pg = new PostgresUserRepository();
    const newUser = new User({
      name: "test",
      username: "test",
      email: new Email("test@test.com"),
      balance: new Decimal(0),
      fixedIncome: new Decimal(0),
      id: -1,
      isAdmin: false,
      password: Password.fromHash(""),
    });

    prismaMock.financi_user.create.mockImplementation(
      (_: any) => {
        throw new Error();
      },
    );

    await expect(pg.add(newUser)).rejects.toThrow();
  });

  test("buscar usuário existente deve passar", async () => {
    const pg = new PostgresUserRepository();
    const returnUser: financiUser = {
      name: "test",
      username: "test",
      email: "test@test.com",
      balance: new Decimal(0),
      fixedincome: new Decimal(0),
      id: -1,
      isadmin: false,
      password: "test",
    };

    prismaMock.financi_user.findFirst.mockImplementation(
      (_: any) => returnUser as any,
    );

    const returnedUser = await pg.getByUsername("test");

    expect(returnedUser.name).toBe(returnUser.name);
    expect(returnedUser.username).toBe(returnUser.username);
    expect(returnedUser.email.value).toBe(returnUser.email);
    expect(returnedUser.password.value).toBe(returnUser.password);
  });

  test("buscar usuário inexistente deve falhar", async () => {
    const pg = new PostgresUserRepository();

    prismaMock.financi_user.findFirst.mockImplementation(
      (_: any) => null as any,
    );

    await expect(
      pg.getByUsername("teste"),
    ).rejects.toThrow();
  });
});