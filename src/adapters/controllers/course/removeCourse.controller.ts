import { FastifyReply, FastifyRequest } from "fastify";
import { RemoveCourse } from "../../../usecases/course/removeCourse";
import { RemoveCourseInput } from "../schemas/course/removeCourse.schema";
import { StatusCodes } from "http-status-codes";

export class RemoveCourseController {
  private readonly useCase: RemoveCourse;

  constructor(useCase: RemoveCourse) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.body as RemoveCourseInput;

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