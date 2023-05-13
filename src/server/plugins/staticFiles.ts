import { FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";
import fs from "fs";

export async function staticFiles(fastify: FastifyInstance) {
  const staticPath = path.join(process.cwd(), "public/users/profiles");
  fastify.register(fastifyStatic, {
    root: staticPath,
    prefix: "/public/users/profiles",
  });

  if (!fs.existsSync(staticPath)) {
    fs.mkdirSync(path.join(process.cwd(), "public"));
    fs.mkdirSync(path.join(process.cwd(), "public/users"));
    fs.mkdirSync(path.join(process.cwd(), "public/users/profiles"));
  }
}