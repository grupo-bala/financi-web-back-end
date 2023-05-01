import { News } from "../../model/news";
import { NewsRepository } from "../../usecases/news/interfaces/newsRepository";
import { PrismaHelper } from "./prismaHelper";

export class PostgresNewsRepository implements NewsRepository {
  async existsByTitle(title: string): Promise<boolean> {
    const count = await PrismaHelper
      .client
      .news
      .count({
        where: {
          title,
        },
      });

    const none = 0;
    return count > none;
  }

  async add({
    author,
    content,
    imgURL,
    publishDate,
    summary,
    title,
  }: News): Promise<void> {
    await PrismaHelper
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
    const prismaNews = await PrismaHelper
      .client
      .news
      .findMany({
        skip: --page * size,
        take: size,
        orderBy: {
          id: "desc",
        },
      });

    const news = [];

    for (
      const {
        author,
        content,
        img_url: imgURL,
        publish_date: publishDate,
        last_update_date: lastUpdateDate,
        summary,
        title,
        id,
      } of prismaNews
    ) {
      news.push(
        new News(
          author,
          title,
          summary,
          content,
          imgURL,
          publishDate,
          lastUpdateDate,
          id,
        ),
      );
    }

    return news;
  }

  async getSize(): Promise<number> {
    return await PrismaHelper
      .client
      .news
      .count();
  }

  async remove(id: number): Promise<void> {
    await PrismaHelper
      .client
      .news
      .delete({
        where: {
          id,
        },
      });
  }

  async get(id: number): Promise<News> {
    const {
      author,
      content,
      img_url: imgURL,
      last_update_date: lastUpdateDate,
      publish_date: publishDate,
      summary,
      title,
    } = await PrismaHelper
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
      imgURL,
      lastUpdateDate,
      publishDate,
      summary,
      id,
    };
  }

  async update({
    author,
    content,
    imgURL,
    lastUpdateDate,
    summary,
    title,
    id,
  }: News): Promise<void> {
    await PrismaHelper
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
    const count = await PrismaHelper
      .client
      .news
      .count({
        where: {
          id,
        },
      });

    const none = 0;
    return count > none;
  }
}
