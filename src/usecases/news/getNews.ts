import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/newsRepository";

export class GetNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async getNews(page: number, size: number): Promise<{ news: News[], howManyPages: number}> {
    const repositorySize = await this.newsRepository.getSize();

    if (repositorySize === 0) {
      return {
        news: [],
        howManyPages: 0,
      };
    }

    const repositoryNews = await this.newsRepository.getNews(page, size);

    return {
      news: repositoryNews,
      howManyPages: repositorySize / size,
    };
  }
}