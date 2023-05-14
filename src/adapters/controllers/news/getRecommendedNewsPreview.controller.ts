import { FastifyReply, FastifyRequest } from "fastify";
import { GetRecommendedNewsPreview } from "../../../usecases/news/getRecommendedNewsPreview";
import { StatusCodes } from "http-status-codes";

export class GetRecommendedNewsPreviewController {
  private readonly useCase: GetRecommendedNewsPreview;

  constructor(useCase: GetRecommendedNewsPreview) {
    this.useCase = useCase;
  }

  async handle(_: FastifyRequest, reply: FastifyReply) {
    const recommendedNews = await this.useCase.get();

    await reply
      .status(StatusCodes.OK)
      .send({
        data: recommendedNews,
      });
  }
}