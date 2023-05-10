import { Goal } from "../../model/goal";
import { GoalsRepository } from "./interfaces/goalsRepository";

export class UpdateGoal {
  readonly goalRepository: GoalsRepository;

  constructor(goalRepository: GoalsRepository) {
    this.goalRepository = goalRepository;
  }

  async update(goal: Goal) {
    if (!await this.goalRepository.existsInUserById(goal.userId, goal.id)) {
      throw new Error("Essa meta não existe nesse usuário");
    } else if (
      await this.goalRepository.existsInUserByTitle(goal.userId, goal.title)
    ) {
      throw new Error("Já existe uma meta com esse nome");
    }

    await this.goalRepository.updateGoal(goal);
  }
}