import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/repository";

export class GetAllNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async getAll(page: number, size: number): Promise<{ news: News[], howManyPages: number}> {
    const repositorySize = await this.newsRepository.getSize();

    if (repositorySize === 0) {
      return {
        news: [],
        howManyPages: 0,
      };
    }

    const repositoryNews = await this.newsRepository.getAll(page, size);

    return {
      news: repositoryNews,
      howManyPages: repositorySize / size,
    };
  }
}