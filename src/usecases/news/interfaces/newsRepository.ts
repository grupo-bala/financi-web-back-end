import { News } from "../../../model/news";

export interface NewsRepository {
  existsByTitle: (title: string) => Promise<boolean>;
  existsById: (id: number) => Promise<boolean>;
  add: (news: News) => Promise<void>;
  getAll: (page: number, size: number) => Promise<News[]>;
  getSize: () => Promise<number>;
  remove: (id: number) => Promise<void>;
  get: (id: number) => Promise<News>;
  update: (news: News) => Promise<void>;
}