import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/newsRepository";

export class GetNews {
  readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async get(id: number): Promise<News> {
    if (!await this.newsRepository.existsById(id)) {
      throw new Error("Essa notícia não existe");
    }

    return await this.newsRepository.get(id);
  }
}