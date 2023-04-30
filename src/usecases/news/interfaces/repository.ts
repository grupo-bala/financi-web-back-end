import { News } from "../../../model/news";

export interface NewsRepository {
  exists: (title: string) => Promise<boolean>;
  existsById: (id: number) => Promise<boolean>;
  add: (news: News) => Promise<void>;
  getAll: (page: number, size: number) => Promise<News[]>;
  getSize: () => Promise<number>;
  remove: (title: string) => Promise<void>;
  get: (title: string) => Promise<News>;
  update: (news: News) => Promise<void>;
}