import { TransactionPreview } from "../../model/transactionPreview";
import { TransactionRepository } from "./interface/transactionRepository";

export class GetAllTransactionsPreview {
  private readonly transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async get(page: number, size: number): Promise<{
    previews: TransactionPreview[],
    howManyPages: number,
  }> {
    const minimum = 0;

    if (page <= minimum) {
      throw new Error("A página deve ser um número positivo maior que zero");
    } else if (size <= minimum) {
      throw new Error("O tamanho deve ser um número positivo maior que zero");
    }

    const repositorySize = await this.transactionRepository.getSize();
    const empty = 0;

    if (repositorySize === empty) {
      return {
        previews: [],
        howManyPages: 0,
      };
    }

    const repositoryTransactionsPreview = await this
      .transactionRepository
      .getAllPreviews(page, size);

    return {
      previews: repositoryTransactionsPreview,
      howManyPages: Math.ceil(repositorySize / size),
    };
  }
}