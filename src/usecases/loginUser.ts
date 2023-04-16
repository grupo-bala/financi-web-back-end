import { Token } from "../adapters/data/token";
import { Password } from "../model/data/password";
import { UserRepository } from "./interfaces/userRepository";

export class LoginUser {
  private readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async loginUser(username: string, password: Password): Promise<Token> {
    if (!await this.userRepository.exists(username)) {
      throw new Error("Nome de usuário ou senha inválidos");
    } else if ((await this.userRepository.getByUsername(username)).password.value !== password.value) {
      throw new Error("Nome de usuário ou senha inválidos");
    }

    return new Token(username, false);
  }
}