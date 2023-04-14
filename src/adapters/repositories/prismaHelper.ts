import { PrismaClient } from "@prisma/client";

export class PrismaHelper {
  private static prisma: PrismaClient;

  constructor() {
    if (PrismaHelper.prisma === undefined) {
      PrismaHelper.prisma = new PrismaClient();
    }
  }

  get client() {
    return PrismaHelper.prisma;
  }
}