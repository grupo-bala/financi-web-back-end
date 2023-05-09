import { GoalsRepository } from "./interfaces/goalsRepository";

export class RemoveGoal {
  readonly goalsRepository: GoalsRepository;

  constructor(goalsRepository: GoalsRepository) {
    this.goalsRepository = goalsRepository;
  }

  async remove(userId: number, goalId: number) {
    if (!await this.goalsRepository.existsInUserById(userId, goalId)) {
      throw new Error("Meta inexistente nesse usuário");
    }

    await this.goalsRepository.removeFromUser(userId, goalId);
  }
}