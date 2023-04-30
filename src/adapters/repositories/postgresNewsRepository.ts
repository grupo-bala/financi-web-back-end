import { News } from "../../model/news";
import { NewsRepository } from "../../usecases/news/interfaces/repository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresNewsRepository implements NewsRepository {
  async exists(title: string): Promise<boolean> {
    const count = await new PrismaHelper()
      .client
      .news
      .count({
        where: {
          title,
        },
      });

    return count > 0;
  }

  async add({author, content, imgURL, publishDate, summary, title}: News): Promise<void> {
    await new PrismaHelper()
      .client
      .news
      .create({
        data: {
          author,
          content,
          img_url: imgURL,
          publish_date: publishDate,
          summary,
          title,
        },
      });
  }

  async getNews(page: number, size: number): Promise<News[]> {
    const prismaNews = await new PrismaHelper()
      .client
      .news
      .findMany({
        skip: (page - 1) * size,
        take: size,
        orderBy: {
          id: "desc",
        },
      });

    const news = [];

    for (const {author, content, img_url, publish_date, last_update_date, summary, title} of prismaNews) {
      news.push(new News(author, title, summary, content, publish_date, img_url, last_update_date ?? undefined));
    }

    return news;
  }

  async getSize(): Promise<number> {
    return await new PrismaHelper()
      .client
      .news
      .count();
  }

  async remove(title: string): Promise<void> {
    await new PrismaHelper()
      .client
      .news
      .delete({
        where: {
          title,
        },
      });
  }
}
