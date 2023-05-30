import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { addCourseSchema } from "../../../adapters/controllers/schemas/course/addCourse.schema";
import { AddCourseController } from "../../../adapters/controllers/course/addCourse.controller";
import { AddCourse } from "../../../usecases/course/addCourse";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerAddCourseRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/add-course", {
    schema: {
      body: addCourseSchema,
      tags: ["course"],
    },
  }, async (req, res) => {
    await new AddCourseController(
      new AddCourse(
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}