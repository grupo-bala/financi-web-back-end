import { Category } from "../../model/category";
import { CategoryRepository } from "../../usecases/category/interface/categoryRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresCategoryRepository implements CategoryRepository {
  async getAll(): Promise<Category[]> {
    const prismaCategories = await PrismaHelper
      .client
      .category
      .findMany();

    return prismaCategories;
  }

  async existsById(id: number): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .category
      .count({
        where: {
          id,
        },
      });

    const empty = 0;

    return count > empty;
  }
}