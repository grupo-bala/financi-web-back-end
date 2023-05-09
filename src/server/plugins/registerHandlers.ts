import { FastifyInstance } from "fastify";
import { registerLoginRoute } from "../routes/user/login";
import { registerRegisterRoute } from "../routes/user/register";
import { registerAddNewsRoute } from "../routes/news/addNews";
import { validateJWT } from "../hooks/auth";
import { verifyIsAdmin } from "../hooks/admin";
import {
  registerGetAllNewsPreviewRoute,
} from "../routes/news/getAllNewsPreview";
import { registerRemoveNewsRoute } from "../routes/news/removeNews";
import { registerGetNewsRoute } from "../routes/news/getNews";
import { registerUpdateNewsRoute } from "../routes/news/updateNews";
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

async function registerFreeRoutes(fastify: FastifyInstance) {
  registerLoginRoute(fastify);
  registerRegisterRoute(fastify);
  registerGetAllNewsPreviewRoute(fastify);
  registerGetNewsRoute(fastify);
}

async function registerAdminRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);
  fastify.addHook("preHandler", verifyIsAdmin);

  registerAddNewsRoute(fastify);
  registerRemoveNewsRoute(fastify);
  registerUpdateNewsRoute(fastify);
}

async function registerAuthRoutes(fastify: FastifyInstance) {
  fastify.addHook("preHandler", validateJWT);
}

export async function registerHandlers(fastify: FastifyInstance) {
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "Financi API",
        description: "API para front-end do site Financi",
        version: "0.1.0",
      },
      host: EnviromentVars.vars.SWAGGER_UI_HOST,
      schemes: [EnviromentVars.vars.ENVIRONMENT === "debug" ? "http" : "https"],
      tags: [
        {
          name: "user",
          description: "User related end-points",
        },
        {
          name: "news",
          description: "News related end-points",
        },
      ],
    },
    transform: jsonSchemaTransform,
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

  await fastify.register(cors, {
    origin: "*",
  });

  await fastify.register(cookie);

  await fastify.register(registerFreeRoutes);
  await fastify.register(registerAuthRoutes);
  await fastify.register(registerAdminRoutes);

  fastify.setErrorHandler(async (error, req, res) => {
    if (error instanceof ZodError) {
      fastify.log.warn(error);
      await res
        .status(StatusCodes.BAD_REQUEST)
        .send(error.issues);
    }
  });
}