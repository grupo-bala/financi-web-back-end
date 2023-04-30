import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateNews } from "../../../usecases/news/update";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { StatusCodes } from "http-status-codes";
import { UpdateNewsInput } from "../schemas/news/updateSchema";
import { News } from "../../../model/news";

export class UpdateNewsController {
  private readonly updateNews = new UpdateNews(new PostgresNewsRepository());

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { author, content, imgURL, summary, title, updateDate, id } = request.body as UpdateNewsInput;

    try {
      await this.updateNews.update(new News(author, title, summary, content, imgURL, null, updateDate, id));

      await reply
        .status(StatusCodes.OK)
        .send();
    } catch (error) {
      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: (error as Error).message });
    }
  }
}