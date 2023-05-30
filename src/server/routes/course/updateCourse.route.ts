import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { updateCourseSchema } from "../../../adapters/controllers/schemas/course/updateCourse.schema";
import { UpdateCourseController } from "../../../adapters/controllers/course/updateCourse.controller";
import { UpdateCourse } from "../../../usecases/course/updateCourse";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerUpdateCourseRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().put("/update-course", {
    schema: {
      body: updateCourseSchema,
      tags: ["course"],
    },
  }, async (req, res) => {
    await new UpdateCourseController(
      new UpdateCourse(
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}