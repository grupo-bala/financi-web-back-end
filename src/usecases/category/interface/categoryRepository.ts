import { Category } from "../../../model/category";

export interface CategoryRepository {
  existsById: (id: number) => Promise<boolean>;
  getAll: () => Promise<Category[]>;
}