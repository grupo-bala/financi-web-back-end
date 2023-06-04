import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "http-status-codes";
import { GetAllNewsPreview } from "../../../usecases/news/getAllNewsPreview";
import {
  GetAllNewsPreviewInput,
} from "../schemas/news/getAllNewsPreviewSchema";

export class GetAllNewsPreviewController {
  readonly useCase: GetAllNewsPreview;

  constructor(useCase: GetAllNewsPreview) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size, search } = request.query as GetAllNewsPreviewInput;

    try {
      const result = await this.useCase.getAll(page, size, search);

      await reply.status(StatusCodes.OK).send({
        data: result.previews,
        pages: result.howManyPages,
      });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}