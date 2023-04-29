import { News } from "../../model/news";
import { NewsRepository } from "../../usecases/news/interfaces/newsRepository";
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
}
