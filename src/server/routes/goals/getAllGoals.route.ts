import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  getAllGoalsSchema,
} from "../../../adapters/controllers/schemas/goals/getAllGoals.schema";
import {
  GetAllGoalsController,
} from "../../../adapters/controllers/goals/getAllGoals.controller";
import {
  GetAllGoals,
} from "../../../usecases/goals/getAllGoals";
import {
  PostgresGoalsRepository,
} from "../../../adapters/repositories/postgresGoalsRepository";

export async function registerGetAllGoalsRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().get("/get-all-goals", {
    schema: {
      querystring: getAllGoalsSchema,
      tags: ["goals"],
    },
  }, async (req, res) => {
    await new GetAllGoalsController(
      new GetAllGoals(
        new PostgresGoalsRepository(),
      ),
    ).handle(req, res);
  });
}