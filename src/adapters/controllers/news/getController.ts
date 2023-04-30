import { FastifyReply, FastifyRequest } from "fastify";
import { GetNews } from "../../../usecases/news/get";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { GetNewsInput } from "../schemas/news/getSchema";
import { StatusCodes } from "http-status-codes";

export class GetNewsController {
  private readonly getNews = new GetNews(new PostgresNewsRepository());

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title } = request.query as GetNewsInput;

    try {
      const news = await this.getNews.get(title);

      await reply
        .status(StatusCodes.OK)
        .send({
          data: news,
        });
    } catch (error) {
      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: (error as Error).message });
    }
  }
}