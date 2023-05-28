import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllTransactionsPreview } from "../../../usecases/transaction/getAllTransactionsPreview";
import { GetAllTransactionsPreviewInput } from "../schemas/transaction/getAllTransactionsPreview.schema";
import { StatusCodes } from "http-status-codes";
import { Token } from "../../data/token";

export class GetAllTransactionsPreviewController {
  private readonly useCase: GetAllTransactionsPreview;

  constructor(useCase: GetAllTransactionsPreview) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size } = request.query as GetAllTransactionsPreviewInput;
    const token = request.cookies["financi-jwt"]!;
    const userId = Token.decode(token).id;

    try {
      const result = await this.useCase.get(page, size, userId);

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