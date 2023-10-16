import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateCourse } from "../../../usecases/course/updateCourse";
import { UpdateCourseInput } from "../schemas/course/updateCourse.schema";
import { StatusCodes } from "http-status-codes";
import { Course } from "../../../model/course";

export class UpdateCourseController {
  private readonly useCase: UpdateCourse;

  constructor(useCase: UpdateCourse) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { description, title, id } = request.body as UpdateCourseInput;

    try {
      await this.useCase.update(new Course(
        title,
        description,
        null,
        null,
        null,
        id,
      ));

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