import { Transaction } from "../../model/transaction";
import { TransactionRepository } from "./interface/transactionRepository";

export class GetTransaction {
  private readonly transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async get(id: number, userId: number): Promise<Transaction> {
    if (!await this.transactionRepository.existsInUserById(id, userId)) {
      throw new Error("Essa transação não existe");
    }

    return await this.transactionRepository.get(id);
  }
}