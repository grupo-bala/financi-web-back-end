import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/newsRepository";

export class UpdateNews {
  readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async update(news: News): Promise<void> {
    if (!await this.newsRepository.existsById(news.id!)) {
      throw new Error("Essa notícia não existe");
    } else if (!await this.newsRepository.existsByTitle(news.title)) {
      throw new Error("Uma notícia com esse nome já existe");
    }

    await this.newsRepository.update(news);
  }
}