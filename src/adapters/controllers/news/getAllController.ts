import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { GetAllNews } from "../../../usecases/news/getAll";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { GetAllNewsInput } from "../schemas/news/getAllSchema";

export class GetAllNewsController {
  private readonly getNews = new GetAllNews(new PostgresNewsRepository()); // todo

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size } = request.query as GetAllNewsInput;

    const news = await this.getNews.getAll(page, size);

    await reply.status(StatusCodes.OK).send({
      data: news.news,
      pages: news.howManyPages,
    });
  }
}