import { NewsPreview } from "../../model/newsPreview";
import { NewsRepository } from "./interfaces/newsRepository";

export class GetAllNewsPreview {
  readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async getAll(page: number, size: number): Promise<{
    previews: NewsPreview[],
    howManyPages: number
  }> {
    const repositorySize = await this.newsRepository.getSize();
    const empty = 0;

    if (repositorySize === empty) {
      return {
        previews: [],
        howManyPages: 0,
      };
    }

    const repositoryNews = await this.newsRepository.getAllPreviews(page, size);

    return {
      previews: repositoryNews,
      howManyPages: Math.ceil(repositorySize / size),
    };
  }
}