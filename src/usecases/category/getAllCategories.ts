import { Category } from "../../model/category";
import { CategoryRepository } from "./interface/categoryRepository";

export class GetAllCategories {
  private readonly categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }
}