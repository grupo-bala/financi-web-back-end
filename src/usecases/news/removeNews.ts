import { NewsRepository } from "./interfaces/newsRepository";

export class RemoveNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async remove(title: string): Promise<void> {
    if (!(await this.newsRepository.exists(title))) {
      throw new Error("Essa notícia não existe");
    }

    await this.newsRepository.remove(title);
  }
}