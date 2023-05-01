import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateNews } from "../../../usecases/news/updateNews";
import { StatusCodes } from "http-status-codes";
import { UpdateNewsInput } from "../schemas/news/updateNewsSchema";
import { News } from "../../../model/news";

export class UpdateNewsController {
  readonly useCase: UpdateNews;

  constructor(useCase: UpdateNews) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      author,
      content,
      imgURL,
      summary,
      title,
      updateDate,
      id,
    } = request.body as UpdateNewsInput;

    try {
      await this.useCase.update(
        new News(
          author,
          title,
          summary,
          content,
          imgURL,
          null,
          updateDate,
          id,
        ),
      );

      await reply
        .status(StatusCodes.OK)
        .send();
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}