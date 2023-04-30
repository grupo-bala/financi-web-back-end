import { News } from "../../model/news";
import { NewsRepository } from "../../usecases/news/interfaces/newsRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresNewsRepository implements NewsRepository {
  async existsByTitle(title: string): Promise<boolean> {
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

  async add({ author, content, imgURL, publishDate, summary, title }: News): Promise<void> {
    await new PrismaHelper()
      .client
      .news
      .create({
        data: {
          author,
          content,
          img_url: imgURL,
          publish_date: publishDate!,
          summary,
          title,
        },
      });
  }

  async getAll(page: number, size: number): Promise<News[]> {
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

    for (const { author, content, img_url, publish_date, last_update_date, summary, title, id } of prismaNews) {
      news.push(new News(author, title, summary, content, img_url, publish_date, last_update_date, id));
    }

    return news;
  }

  async getSize(): Promise<number> {
    return await new PrismaHelper()
      .client
      .news
      .count();
  }

  async remove(id: number): Promise<void> {
    await new PrismaHelper()
      .client
      .news
      .delete({
        where: {
          id,
        },
      });
  }

  async get(id: number): Promise<News> {
    const { author, content, img_url, last_update_date, publish_date, summary, title } = await new PrismaHelper()
      .client
      .news
      .findUniqueOrThrow({
        where: {
          id,
        },
      });

    return {
      author,
      title,
      content,
      imgURL: img_url,
      lastUpdateDate: last_update_date,
      publishDate: publish_date,
      summary,
      id,
    };
  }

  async update({ author, content, imgURL, lastUpdateDate, summary, title, id }: News): Promise<void> {
    await new PrismaHelper()
      .client
      .news
      .update({
        where: {
          id: id!,
        },
        data: {
          title,
          author,
          content,
          img_url: imgURL,
          last_update_date: lastUpdateDate!,
          summary,
        },
      });
  }

  async existsById(id: number): Promise<boolean> {
    const count = await new PrismaHelper()
      .client
      .news
      .count({
        where: {
          id,
        },
      });

    return count > 0;
  }
}
