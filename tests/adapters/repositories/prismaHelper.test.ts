import { PrismaClient } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { PrismaHelper } from "../../../src/adapters/repositories/prismaHelper";

mockDeep<PrismaClient>();

describe("testes do prisma helper", () => {
  test("instâncias do client devem passar sem erros", () => {
    expect(PrismaHelper.client).not.toBeNull();
    expect(PrismaHelper.client).not.toBeNull();
  });
});