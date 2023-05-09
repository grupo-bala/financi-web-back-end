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
  }: Goal) {
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

  async existsInUserByTitle({
    title,
    userId,
  }: Goal) {
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
}