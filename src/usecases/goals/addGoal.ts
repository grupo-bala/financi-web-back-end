import { Goal } from "../../model/goal";
import { GoalsRepository } from "./interfaces/goalsRepository";

export class AddGoal {
  readonly goalsRepository: GoalsRepository;

  constructor(goalsRepository: GoalsRepository) {
    this.goalsRepository = goalsRepository;
  }

  async add(goal: Goal) {
    return await this.goalsRepository.add(goal);
  }
}