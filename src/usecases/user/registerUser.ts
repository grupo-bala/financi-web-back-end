import { User } from "../../model/user";
import { UserRepository } from "../interfaces/userRepository";

export class RegisterUser {
  readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(user: User): Promise<void> {
    if (await this.userRepository.exists(user.username)) {
      throw new Error("Usuário já existente");
    }

    await this.userRepository.add(user);
  }
}