import { PrismaClient } from "@prisma/client";

export class PrismaHelper {
  private static prisma: PrismaClient;

  static get client() {
    if (PrismaHelper.prisma === undefined) {
      PrismaHelper.prisma = new PrismaClient();
    }

    return PrismaHelper.prisma;
  }
}