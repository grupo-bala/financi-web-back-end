import { FastifyReply, FastifyRequest } from "fastify";
import { AddNewsInput } from "../schemas/news/addSchema";
import { StatusCodes } from "http-status-codes";
import { AddNews } from "../../../usecases/news/add";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { News } from "../../../model/news";

export class AddNewsController {
  private readonly addNews = new AddNews(new PostgresNewsRepository());

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { author, content, imgURL, publishDate, summary, title } = request.body as AddNewsInput;

    try {
      await this.addNews.add(new News(author, title, summary, content, imgURL, publishDate, null, null));

      await reply.status(StatusCodes.CREATED).send();
    } catch (error) {
      await reply
        .status(StatusCodes.CONFLICT)
        .send({ msg: (error as Error).message });
    }
  }
}