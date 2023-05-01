import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { GetAllNews } from "../../../usecases/news/getAllNews";
import { GetAllNewsInput } from "../schemas/news/getAllNewsSchema";

export class GetAllNewsController {
  readonly useCase: GetAllNews;

  constructor(useCase: GetAllNews) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size } = request.query as GetAllNewsInput;

    const news = await this.useCase.getAll(page, size);

    await reply.status(StatusCodes.OK).send({
      data: news.news,
      pages: news.howManyPages,
    });
  }
}