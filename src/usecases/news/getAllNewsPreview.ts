import { NewsPreview } from "../../model/newsPreview";
import { NewsRepository } from "./interfaces/newsRepository";

export class GetAllNewsPreview {
  readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async getAll(
    page: number,
    size: number,
    search?: string,
  ): Promise<{
    previews: NewsPreview[],
    howManyPages: number
  }> {
    const negativeOrZero = 0;

    if (page <= negativeOrZero) {
      throw new Error("A página deve ser um número positivo maior que zero");
    } else if (size <= negativeOrZero) {
      throw new Error("O tamanho deve ser um número positivo maior que zero");
    }

    const repositorySize = await this.newsRepository.getSize();
    const empty = 0;

    if (repositorySize === empty) {
      return {
        previews: [],
        howManyPages: 0,
      };
    }

    const repositoryNews = await this
      .newsRepository
      .getAllPreviews(page, size, search);

    return {
      previews: repositoryNews,
      howManyPages: Math.ceil(repositorySize / size),
    };
  }
}