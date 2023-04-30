import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { GetAllNews } from "../../../usecases/news/getAllNews";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { GetAllNewsInput } from "../schemas/news/getAllNewsSchema";

export class GetAllNewsController {
  private readonly getAllNews = new GetAllNews(new PostgresNewsRepository());

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size } = request.query as GetAllNewsInput;

    const news = await this.getAllNews.getAll(page, size);

    await reply.status(StatusCodes.OK).send({
      data: news.news,
      pages: news.howManyPages,
    });
  }
}