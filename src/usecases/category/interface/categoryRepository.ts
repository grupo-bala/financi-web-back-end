import { Category } from "../../../model/category";

export interface CategoryRepository {
  getAll: () => Promise<Category[]>;
}