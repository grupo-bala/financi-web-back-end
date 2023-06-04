import { Decimal } from "@prisma/client/runtime/library";
import { Goal } from "../../model/goal";
import {
  GoalsRepository,
} from "../../usecases/goals/interfaces/goalsRepository";
import { PrismaHelper } from "./prismaHelper";
import { differenceInMonths } from "date-fns";

export class PostgresGoalsRepository implements GoalsRepository {
  async add({
    title,
    currentValue,
    deadline,
    totalValue,
    userId,
  }: Goal): Promise<Goal> {
    const monthDiff = differenceInMonths(deadline, new Date());
    const minDist = 1;
    const idealPerMonth =
      new Decimal(Number(totalValue) / Math.max(monthDiff + minDist, minDist));

    const { id } = await PrismaHelper
      .client
      .goal
      .create({
        data: {
          title,
          current_value: currentValue,
          total_value: totalValue,
          deadline,
          id_user: userId,
          ideal_per_month: idealPerMonth,
        },
      });

    return new Goal({
      id,
      title,
      deadline,
      userId,
      totalValue,
      currentValue,
      idealPerMonth,
    });
  }

  async existsInUserByTitle(userId: number, title: string): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .goal
      .count({
        where: {
          title,
          id_user: userId,
        },
      });

    const none = 0;
    return count > none;
  }

  async existsInUserById(userId: number, goalId: number): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .goal
      .count({
        where: {
          id_user: userId,
          id: goalId,
        },
      });

    const none = 0;
    return count > none;
  }

  async getSizeInUser(userId: number, search?: string): Promise<number> {
    return await PrismaHelper
      .client
      .goal
      .count({
        where: {
          id_user: userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });
  }

  async getAllOfUser(
    userId: number, page: number, size: number, search?: string,
  ): Promise<Goal[]> {
    const prismaGoals = await PrismaHelper
      .client
      .goal
      .findMany({
        skip: --page * size,
        take: size,
        orderBy: {
          id: "desc",
        },
        where: {
          id_user: userId,
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

    const goals = [];

    for (
      const {
        id,
        title,
        deadline,
        id_user: userId,
        total_value: totalValue,
        current_value: currentValue,
        ideal_per_month: idealPerMonth,
      } of prismaGoals
    ) {
      goals.push(
        new Goal({
          id,
          title,
          deadline,
          userId,
          totalValue,
          currentValue,
          idealPerMonth,
        }),
      );
    }

    return goals;
  }

  async removeFromUser(userId: number, goalId: number): Promise<void> {
    await PrismaHelper
      .client
      .goal
      .deleteMany({
        where: {
          id: goalId,
          id_user: userId,
        },
      });
  }

  async updateGoal({
    id,
    userId,
    title,
    currentValue,
    totalValue,
    deadline,
  }: Goal): Promise<void> {
    const monthDiff = differenceInMonths(deadline, new Date());
    const minDist = 1;
    const idealPerMonth =
      new Decimal(Number(totalValue) / Math.max(monthDiff + minDist, minDist));

    await PrismaHelper
      .client
      .goal
      .updateMany({
        where: {
          id,
          id_user: userId,
        },
        data: {
          title,
          deadline,
          current_value: currentValue,
          total_value: totalValue,
          ideal_per_month: idealPerMonth,
        },
      });
  }
}