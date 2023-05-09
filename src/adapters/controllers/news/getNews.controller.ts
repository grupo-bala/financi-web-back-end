import { FastifyReply, FastifyRequest } from "fastify";
import { GetNews } from "../../../usecases/news/getNews";
import { GetNewsInput } from "../schemas/news/getNewsSchema";
import { StatusCodes } from "http-status-codes";

export class GetNewsController {
  readonly useCase: GetNews;

  constructor(useCase: GetNews) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as GetNewsInput;

    try {
      const news = await this.useCase.get(id);

      await reply
        .status(StatusCodes.OK)
        .send({
          data: news,
        });
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}