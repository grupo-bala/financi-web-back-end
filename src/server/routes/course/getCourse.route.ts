import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getCourseSchema } from "../../../adapters/controllers/schemas/course/getCourse.schema";
import { GetCourseController } from "../../../adapters/controllers/course/getCourse.controller";
import { GetCourse } from "../../../usecases/course/getCourse";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerGetCourseRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-course", {
    schema: {
      querystring: getCourseSchema,
      tags: ["course"],
    },
  }, async (req, res) => {
    await new GetCourseController(
      new GetCourse(
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}