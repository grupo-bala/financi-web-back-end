import { News } from "../../model/news";
import { NewsRepository } from "./interfaces/newsRepository";

export class AddNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async add(news: News) {
    if (await this.newsRepository.exists(news.title)) {
      throw new Error("Uma notícia com esse título já está cadastrada");
    }

    this.newsRepository.add(news);
  }
}