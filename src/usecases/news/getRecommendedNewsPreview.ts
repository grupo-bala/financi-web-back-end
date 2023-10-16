import { NewsPreview } from "../../model/newsPreview";
import { NewsRepository } from "./interfaces/newsRepository";

export class GetRecommendedNewsPreview {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async get(): Promise<NewsPreview[]> {
    return await this.newsRepository.getRecommendedPreviews();
  }
}