import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { getAllLessonsSchema } from "../../../adapters/controllers/schemas/lesson/getAllLessons.schema";
import { GetAllLessonsController } from "../../../adapters/controllers/lesson/getAllLessons.controller";
import { GetAllLessons } from "../../../usecases/lesson/getAllLessons";
import { PostgresLessonRepository } from "../../../adapters/repositories/postgresLessonRepository";
import { PostgresCourseRepository } from "../../../adapters/repositories/postgresCourseRepository";

export async function registerGetAllLessonsRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-all-lessons", {
    schema: {
      querystring: getAllLessonsSchema,
      tags: ["lessons"],
    },
  }, async (req, res) => {
    await new GetAllLessonsController(
      new GetAllLessons(
        new PostgresLessonRepository(),
        new PostgresCourseRepository(),
      ),
    ).handle(req, res);
  });
}