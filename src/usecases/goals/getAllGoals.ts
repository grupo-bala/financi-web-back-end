import { Goal } from "../../model/goal";
import { GoalsRepository } from "./interfaces/goalsRepository";

export class GetAllGoals {
  readonly goalsRepository: GoalsRepository;

  constructor(goalsRepository: GoalsRepository) {
    this.goalsRepository = goalsRepository;
  }

  async getAll(
    userId: number, page: number, size: number, search?: string,
  ): Promise<{
    goals: Goal[],
    howManyPages: number,
  }> {
    const negativeOrZero = 0;

    if (page <= negativeOrZero) {
      throw new Error("A página deve ser um número positivo maior que zero");
    } else if (size <= negativeOrZero) {
      throw new Error("O tamanho deve ser um número positivo maior que zero");
    }

    const repoSize = await this.goalsRepository.getSizeInUser(userId, search);
    const empty = 0;

    if (repoSize === empty) {
      return {
        goals: [],
        howManyPages: 0,
      };
    }

    const goals =
      await this.goalsRepository.getAllOfUser(userId, page, size, search);

    return {
      goals,
      howManyPages: Math.ceil(repoSize / size),
    };
  }
}