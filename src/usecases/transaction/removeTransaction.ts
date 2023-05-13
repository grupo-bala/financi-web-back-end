import { TransactionRepository } from "./interface/transactionRepository";

export class RemoveTransaction {
  private readonly transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async remove(id: number): Promise<void> {
    if (!await this.transactionRepository.existsById(id)) {
      throw new Error("Essa transação não existe");
    }

    await this.transactionRepository.remove(id);
  }
}