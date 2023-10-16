import { User } from "../../model/user";
import { Balance, TransactionRepository } from "../transaction/interface/transactionRepository";
import { UserRepository } from "./interfaces/userRepository";

export class GetMe {
  readonly userRepository: UserRepository;
  readonly transactionsRepository: TransactionRepository;

  constructor(
    userRepository: UserRepository,
    transactionsRepository: TransactionRepository,
  ) {
    this.userRepository = userRepository;
    this.transactionsRepository = transactionsRepository;
  }

  async getMe(userId: number): Promise<User & Balance> {
    try {
      const user = await this.userRepository.getById(userId);
      const balance = await this.transactionsRepository.getCurrentBalance(
        userId,
      );

      return { ...user, ...balance };
    } catch (e) {
      throw new Error("Usuário não existente");
    }
  }
}