import { FastifyInstance } from "fastify";
import { registerLoginRoute } from "../routes/user/login.route";
import { registerRegisterRoute } from "../routes/user/register.route";
import { registerAddNewsRoute } from "../routes/news/addNews.route";
import { validateJWT } from "../hooks/auth";
import { verifyIsAdmin } from "../hooks/admin";
import {
  registerGetAllNewsPreviewRoute,
} from "../routes/news/getAllNewsPreview.route";
import { registerRemoveNewsRoute } from "../routes/news/removeNews.route";
import { registerGetNewsRoute } from "../routes/news/getNews.route";
import { registerUpdateNewsRoute } from "../routes/news/updateNews.route";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { EnviromentVars } from "../config/enviromentVars";
import { ZodError } from "zod";
import { StatusCodes } from "http-status-codes";
import { registerAddGoalRoute } from "../routes/goals/addGoal.route";
import { registerGetAllGoalsRoute } from "../routes/goals/getAllGoals.route";
import { registerRemoveGoalRoute } from "../routes/goals/removeGoal.route";
import { registerUpdateGoalRoute } from "../routes/goals/updateGoal.route";
import { registerGetMeRoute } from "../routes/user/getMe.route";
import fastifyMultipart from "@fastify/multipart";
import { registerUploadPhotoRoute } from "../routes/user/uploadPhoto.route";
import {
  registerAddTransactionRoute,
} from "../routes/transaction/addTransaction.route";
import {
  registerUpdateTransactionRoute,
} from "../routes/transaction/updateTransaction.route";
import {
  registerRemoveTransactionRoute,
} from "../routes/transaction/removeTransaction.route";
import {
  registerGetTransactionRoute,
} from "../routes/transaction/getTransaction.route";
import { registerGetAllCategoriesRoute } from "../routes/category/getAllCategories.route";
import { registerGetAllTransactionsPreviewRoute } from "../routes/transaction/getAllTransactionsPreview.route";
import { registerGetRecommendedNewsPreviewRoute } from "../routes/news/getRecommendedNewsPreview.route";
import { registerGetTransactionsByPeriodRoute } from "../routes/statistics/getTransactionsByPeriod.route";
import { registerGetCategoriesByPeriodRoute } from "../routes/statistics/getCategoriesByPeriod.route";
import { registerGenerateReportPDFRoute } from "../routes/transaction/generateReportPDF.route";
import { registerGenerateReportXLSX } from "../routes/transaction/generateReportXLSX.route";
import { registerAddCourseRoute } from "../routes/course/addCourse.route";
import { registerRemoveCourseRoute } from "../routes/course/removeCourse.route";
import { registerUpdateCourseRoute } from "../routes/course/updateCourse.route";
import { registerGetAllCoursesRoute } from "../routes/course/getAllCourses.route";
import { registerAddLessonRoute } from "../routes/lesson/addLesson.route";
import { registerRemoveLessonRoute } from "../routes/lesson/removeLesson.route";
import { registerUpdateLessonRoute } from "../routes/lesson/updateLesson.route";
import { registerGetAllLessonsRoute } from "../routes/lesson/getAllLessons.route";
import { registerGetLessonRoute } from "../routes/lesson/getLesson.route";
import { registerUpdateLessonWatchedStatusRoute } from "../routes/lesson/updateLessonWatchedStatus.route";
import { registerGetPhotoRoute } from "../routes/user/getPhoto.route";
import { registerLogoutRoute } from "../routes/user/logout.route";

async function registerFreeRoutes(fastify: FastifyInstance) {
  await registerLoginRoute(fastify);
  await registerRegisterRoute(fastify);
  await registerGetAllNewsPreviewRoute(fastify);
  await registerGetNewsRoute(fastify);
  await registerGetRecommendedNewsPreviewRoute(fastify);
}

async function registerAdminRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);
  fastify.addHook("preHandler", verifyIsAdmin);

  await registerAddNewsRoute(fastify);
  await registerRemoveNewsRoute(fastify);
  await registerUpdateNewsRoute(fastify);
  await registerAddCourseRoute(fastify);
  await registerRemoveCourseRoute(fastify);
  await registerUpdateCourseRoute(fastify);
  await registerAddLessonRoute(fastify);
  await registerRemoveLessonRoute(fastify);
  await registerUpdateLessonRoute(fastify);
}

async function registerAuthRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);

  await registerLogoutRoute(fastify);
  await registerGetMeRoute(fastify);
  await registerUploadPhotoRoute(fastify);
  await registerGetPhotoRoute(fastify);
  await registerAddGoalRoute(fastify);
  await registerGetAllGoalsRoute(fastify);
  await registerRemoveGoalRoute(fastify);
  await registerUpdateGoalRoute(fastify);
  await registerAddTransactionRoute(fastify);
  await registerUpdateTransactionRoute(fastify);
  await registerRemoveTransactionRoute(fastify);
  await registerGetTransactionRoute(fastify);
  await registerGetAllTransactionsPreviewRoute(fastify);
  await registerGetAllCategoriesRoute(fastify);
  await registerGetTransactionsByPeriodRoute(fastify);
  await registerGetCategoriesByPeriodRoute(fastify);
  await registerGenerateReportPDFRoute(fastify);
  await registerGenerateReportXLSX(fastify);
  await registerGetAllCoursesRoute(fastify);
  await registerGetAllLessonsRoute(fastify);
  await registerGetLessonRoute(fastify);
  await registerUpdateLessonWatchedStatusRoute(fastify);
}

export async function registerHandlers(fastify: FastifyInstance) {
  fastify.setErrorHandler(async (error, _, res) => {
    if (error instanceof ZodError) {
      fastify.log.warn(error);
      await res
        .status(StatusCodes.BAD_REQUEST)
        .send({ msg: JSON.parse(error.message) });
    }
  });

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(swagger, {
    openapi: {
      info: {
        title: "Financi API",
        description: "API para front-end do site Financi",
        version: "0.1.0",
      },
      servers: [ { url: EnviromentVars.vars.SWAGGER_UI_HOST } ],
      tags: [
        {
          name: "user",
          description: "User related end-points",
        },
        {
          name: "news",
          description: "News related end-points",
        },
        {
          name: "goals",
          description: "Goals related end-points",
        },
      ],
    },
    transform: ({ schema, url }) => {
      if (url === "/upload-photo") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformed = schema as any;

        return { schema: transformed, url };
      } else {
        return jsonSchemaTransform({ schema, url });
      }
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject) => swaggerObject,
    transformSpecificationClone: true,
  });

  await fastify.register(fastifyMultipart);

  await fastify.register(cors, {
    origin: EnviromentVars.vars.ENVIRONMENT === "debug"
      ? "http://localhost:5173"
      : ["https://financi.fly.dev", "https://financi.netlify.app"],
    credentials: true,
  });

  await fastify.register(cookie);

  await fastify.register(registerFreeRoutes);
  await fastify.register(registerAuthRoutes);
  await fastify.register(registerAdminRoutes);
}