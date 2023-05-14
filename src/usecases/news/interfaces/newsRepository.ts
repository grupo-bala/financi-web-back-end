import { News } from "../../../model/news";
import { NewsPreview } from "../../../model/newsPreview";

export interface NewsRepository {
  existsByTitle: (title: string) => Promise<boolean>;
  existsById: (id: number) => Promise<boolean>;
  add: (news: News) => Promise<void>;
  getAllPreviews: (page: number, size: number) => Promise<NewsPreview[]>;
  getSize: () => Promise<number>;
  remove: (id: number) => Promise<void>;
  get: (id: number) => Promise<News>;
  update: (news: News) => Promise<void>;
  getRecommendedPreviews: () => Promise<NewsPreview[]>;
}