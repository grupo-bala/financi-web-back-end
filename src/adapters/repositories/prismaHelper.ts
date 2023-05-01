import { PrismaClient } from "@prisma/client";

export class PrismaHelper {
  private static prisma: PrismaClient;

  private constructor() {
    if (PrismaHelper.prisma === undefined) {
      PrismaHelper.prisma = new PrismaClient();
    }
  }

  static get client() {
    return PrismaHelper.prisma;
  }
}