import { FastifyReply, FastifyRequest } from "fastify";
import { GetCourse } from "../../../usecases/course/getCourse";
import { GetCourseInput } from "../schemas/course/getCourse.schema";
import { StatusCodes } from "http-status-codes";

export class GetCourseController {
  readonly usecase: GetCourse;

  constructor(usecase: GetCourse) {
    this.usecase = usecase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as GetCourseInput;

    try {
      const course = await this.usecase.get(id);

      await reply
        .status(StatusCodes.OK)
        .send({ data: course });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.NOT_FOUND)
        .send({ msg: error.message });
    }
  }
}