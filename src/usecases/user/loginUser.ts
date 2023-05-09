import { Token } from "../../adapters/data/token";
import { Password } from "../../model/data/password";
import { UserRepository } from "../interfaces/userRepository";

export class LoginUser {
  readonly userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async loginUser(username: string, password: Password): Promise<Token> {
    try {
      const user = await this.userRepository.getByUsername(username);

      if (user.password.value !== password.value) {
        throw null;
      }

      return Token.encode(user.id, user.isAdmin);
    } catch (error) {
      throw new Error("Nome de usuário ou senha inválidos");
    }
  }
}