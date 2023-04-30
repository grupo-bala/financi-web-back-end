import { NewsRepository } from "./interfaces/newsRepository";

export class RemoveNews {
  private readonly newsRepository: NewsRepository;

  constructor(newsRepository: NewsRepository) {
    this.newsRepository = newsRepository;
  }

  async remove(id: number): Promise<void> {
    if (!(await this.newsRepository.existsById(id))) {
      throw new Error("Essa notícia não existe");
    }

    await this.newsRepository.remove(id);
  }
}