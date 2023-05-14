import { FastifyReply, FastifyRequest } from "fastify";
import { AddNewsInput } from "../schemas/news/addNewsSchema";
import { StatusCodes } from "http-status-codes";
import { AddNews } from "../../../usecases/news/addNews";
import { News } from "../../../model/news";

export class AddNewsController {
  readonly useCase: AddNews;

  constructor(useCase: AddNews) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const {
      author,
      content,
      imgURL,
      publishDate,
      summary,
      title,
      recommended,
    } = request.body as AddNewsInput;

    try {
      await this.useCase.add(
        new News(
          author,
          title,
          summary,
          content,
          imgURL,
          recommended,
          publishDate,
          null,
          null,
        ),
      );

      await reply.status(StatusCodes.CREATED).send();
    } catch (e) {
      const error = e as Error;
      await reply
        .status(StatusCodes.CONFLICT)
        .send({ msg: error.message });
    }
  }
}