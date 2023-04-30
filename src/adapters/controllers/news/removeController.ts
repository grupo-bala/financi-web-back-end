import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveNews } from "../../../usecases/news/remove";
import { PostgresNewsRepository } from "../../repositories/postgresNewsRepository";
import { RemoveNewsInput } from "../schemas/news/removeSchema";
import { StatusCodes } from "http-status-codes";

export class RemoveNewsController {
  private readonly removeNews = new RemoveNews(new PostgresNewsRepository());

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title } = request.body as RemoveNewsInput;

    try {
      await this.removeNews.remove(title);

      await reply.status(StatusCodes.OK).send();
    } catch (error) {
      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: (error as Error).message });
    }
  }
}