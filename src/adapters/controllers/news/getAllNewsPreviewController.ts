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
    const { page, size } = request.query as GetAllNewsPreviewInput;

    const result = await this.useCase.getAll(page, size);

    await reply.status(StatusCodes.OK).send({
      data: result.previews,
      pages: result.howManyPages,
    });
  }
}