import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/newsRepository";

export class AddNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async add(news: News): Promise<void> {
    if (await this.newsRepository.existsByTitle(news.title)) {
      throw new Error("Uma notícia com esse título já está cadastrada");
    }

    await this.newsRepository.add(news);
  }
}