import { Transaction } from "../../model/transaction";
import { CategoryRepository } from "../category/interface/categoryRepository";
import { TransactionRepository } from "./interface/transactionRepository";

export class UpdateTransaction {
  private readonly transactionRepository: TransactionRepository;
  private readonly categoryRepository: CategoryRepository;

  constructor(
    transactionRepository: TransactionRepository,
    categoryRepository: CategoryRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.categoryRepository = categoryRepository;
  }

  async update(transaction: Transaction): Promise<void> {
    if (!await this.transactionRepository.existsInUserById(
      transaction.id!,
      transaction.userId!,
    )) {
      throw new Error("Essa transação não existe");
    } else if (
      !await this.categoryRepository.existsById(transaction.categoryId)
    ) {
      throw new Error("Essa categoria não existe");
    }

    await this.transactionRepository.update(transaction);
  }
}