import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/repository";

export class GetNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async get(title: string): Promise<News> {
    if (!(await this.newsRepository.exists(title))) {
      throw new Error("Essa notícia não existe");
    }

    return await this.newsRepository.get(title);
  }
}