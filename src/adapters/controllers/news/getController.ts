import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { GetNews } from "../../../usecases/news/get";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { GetNewsInput } from "../schemas/news/getSchema";

export class GetNewsController {
  private readonly getNews = new GetNews(new PostgresNewsRepository()); // todo

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size } = request.query as GetNewsInput;
    
    const news = await this.getNews.getNews(page, size);

    await reply.status(StatusCodes.OK).send({
      data: news.news,
      pages: news.howManyPages,
    });
  }
}