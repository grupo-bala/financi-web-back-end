import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllCourses } from "../../../usecases/course/getAllCourses";
import { GetAllCoursesInput } from "../schemas/course/getAllCourses.schema";
import { StatusCodes } from "http-status-codes";

export class GetAllCoursesController {
  private readonly useCase: GetAllCourses;

  constructor(useCase: GetAllCourses) {
    this.useCase = useCase;
  }

  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, size } = request.query as GetAllCoursesInput;

    try {
      const { courses, howManyPages } = await this.useCase.getAll(page, size);

      await reply
        .status(StatusCodes.OK)
        .send({
          data: courses,
          pages: howManyPages,
        });
    } catch (e) {
      const error = e as Error;

      await reply
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: error.message });
    }
  }
}