import { Email } from "../../model/data/email";
import { UserRepository } from "./interfaces/userRepository";

export class UpdateUser {
  readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async update(
    userId: number, email: Email, name: string, fixedIncome: number,
  ) {
    try {
      await this.userRepository.update(userId, email, name, fixedIncome);
    } catch (e) {
      throw new Error("Usuário não existente");
    }
  }
}