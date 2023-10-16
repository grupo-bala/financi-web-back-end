import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import {
  addGoalSchema,
} from "../../../adapters/controllers/schemas/goals/addGoal.schema";
import {
  AddGoalController,
} from "../../../adapters/controllers/goals/addGoal.controller";
import { AddGoal } from "../../../usecases/goals/addGoal";
import {
  PostgresGoalsRepository,
} from "../../../adapters/repositories/postgresGoalsRepository";

export async function registerAddGoalRoute(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>().post("/add-goal", {
    schema: {
      body: addGoalSchema,
      tags: ["goals"],
    },
  }, async (req, res) => {
    await new AddGoalController(
      new AddGoal(
        new PostgresGoalsRepository(),
      ),
    ).handle(req, res);
  });
}