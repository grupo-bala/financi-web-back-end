import { Goal } from "../../model/goal";
import { GoalsRepository } from "./interfaces/goalsRepository";

export class AddGoal {
  readonly goalsRepository: GoalsRepository;

  constructor(goalsRepository: GoalsRepository) {
    this.goalsRepository = goalsRepository;
  }

  async add(goal: Goal) {
    if (await this.goalsRepository.existsInUserByTitle(
      goal.userId, goal.title,
    )) {
      throw new Error("Uma meta com esse nome já existe para esse usuário");
    }

    return await this.goalsRepository.add(goal);
  }
}