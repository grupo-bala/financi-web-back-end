import { News } from "../../model/news";
import { NewsPreview } from "../../model/newsPreview";
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
    recommended,
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
          recommended,
        },
      });
  }

  async getAllPreviews(page: number, size: number): Promise<NewsPreview[]> {
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

    const newsPreview: NewsPreview[] = [];

    for (
      const {
        img_url: imgURL,
        publish_date: publishDate,
        title,
        id,
        recommended,
      } of prismaNews
    ) {
      newsPreview.push(
        new NewsPreview(id, title, imgURL, publishDate, recommended),
      );
    }

    return newsPreview;
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
      recommended,
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
      recommended,
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

  async getRecommendedPreviews(): Promise<NewsPreview[]> {
    const prismaNews = await PrismaHelper
      .client
      .news
      .findMany({
        take: 5,
        where: {
          recommended: true,
        },
        orderBy: {
          id: "desc",
        },
      });

    const recommendedNews: NewsPreview[] = [];

    for (
      const {
        id,
        img_url: imgURL,
        publish_date: publishDate,
        recommended,
        title,
      } of prismaNews
    ) {
      recommendedNews.push({
        id,
        imgURL,
        publishDate,
        recommended,
        title,
      });
    }

    return recommendedNews;
  }
}
