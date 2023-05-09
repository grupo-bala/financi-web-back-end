import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveNews } from "../../../usecases/news/removeNews";
import { RemoveNewsInput } from "../schemas/news/removeNewsSchema";
import { StatusCodes } from "http-status-codes";

export class RemoveNewsController {
  readonly useCase: RemoveNews;

  constructor(useCase: RemoveNews) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.body as RemoveNewsInput;

    try {
      await this.useCase.remove(id);

      await reply.status(StatusCodes.OK).send();
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}