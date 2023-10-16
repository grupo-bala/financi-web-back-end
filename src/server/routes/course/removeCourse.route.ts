import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { RemoveCourseSchema } from "../../../adapters/controllers/schemas/course/removeCourse.schema";
import { RemoveCourseController } from "../../../adapters/controllers/course/removeCourse.controller";
import { RemoveCourse } from "../../../usecases/course/removeCourse";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerRemoveCourseRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().delete("/remove-course", {
    schema: {
      body: RemoveCourseSchema,
      tags: ["course"],
    },
  }, async (req, res) => {
    await new RemoveCourseController(
      new RemoveCourse(
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}