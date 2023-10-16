import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getAllCoursesSchema } from "../../../adapters/controllers/schemas/course/getAllCourses.schema";
import { GetAllCoursesController } from "../../../adapters/controllers/course/getAllCourses.controller";
import { GetAllCourses } from "../../../usecases/course/getAllCourses";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerGetAllCoursesRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-all-courses", {
    schema: {
      querystring: getAllCoursesSchema,
      tags: ["course"],
    },
  }, async (req, res) => {
    await new GetAllCoursesController(
      new GetAllCourses(
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}