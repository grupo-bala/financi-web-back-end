import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllCategories } from "../../../usecases/category/getAllCategories";
import { StatusCodes } from "http-status-codes";

export class GetAllCategoriesController {
  private readonly useCase: GetAllCategories;

  constructor(useCase: GetAllCategories) {
    this.useCase = useCase;
  }

  async handle(_request: FastifyRequest, reply: FastifyReply) {
    const categories = this.useCase.getAll();

    await reply
      .status(StatusCodes.OK)
      .send({
        data: categories,
      });
  }
}