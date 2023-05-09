import { Goal } from "../../model/goal";
import {
  GoalsRepository,
} from "../../usecases/goals/interfaces/goalsRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresGoalsRepository implements GoalsRepository {
  async add({
    title,
    currentValue,
    deadline,
    totalValue,
    userId,
  }: Goal): Promise<void> {
    await PrismaHelper
      .client
      .goal
      .create({
        data: {
          title,
          current_value: currentValue,
          total_value: totalValue,
          deadline,
          id_user: userId,
        },
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

  async getSizeInUser(userId: number): Promise<number> {
    return await PrismaHelper
      .client
      .goal
      .count({
        where: {
          id_user: userId,
        },
      });
  }

  async getAllOfUser(
    userId: number, page: number, size: number,
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
}