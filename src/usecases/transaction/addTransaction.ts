import { Transaction } from "../../model/transaction";
import { CategoryRepository } from "../category/interface/categoryRepository";
import { TransactionRepository } from "./interface/transactionRepository";

export class AddTransaction {
  private readonly transactionRepository: TransactionRepository;
  private readonly categoryRepository: CategoryRepository;

  constructor(
    transactionRepository: TransactionRepository,
    categoryRepository: CategoryRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.categoryRepository = categoryRepository;
  }

  async add(transaction: Transaction): Promise<Transaction> {
    if (!await this.categoryRepository.existsById(transaction.categoryId)) {
      throw new Error("Essa categoria não existe");
    }

    return await this.transactionRepository.add(transaction);
  }
}