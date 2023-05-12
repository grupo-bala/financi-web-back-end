import { UserRepository } from "./interfaces/userRepository";

export class GetMe {
  readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getMe(userId: number) {
    try {
      return await this.userRepository.getById(userId);
    } catch (e) {
      throw new Error("Usuário não existente");
    }
  }
}