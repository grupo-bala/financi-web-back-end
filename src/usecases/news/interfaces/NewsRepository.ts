import { News } from "../../../model/news";

export interface NewsRepository {
  exists: (title: string) => Promise<boolean>;
  add: (news: News) => Promise<void>;
}