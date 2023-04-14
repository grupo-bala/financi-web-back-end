import { config } from "dotenv";
import Fastify from "fastify";
import { schemas } from "./adapters/controllers/schemas/buildSchemas";
import { registerRoute } from "./server/routes/register";

config();

const server = Fastify({
  logger: true
});

for (const schema of schemas) {
  server.addSchema(schema);
}

server.register(registerRoute);

server.listen({ port: Number(process.env.PORT || 8080) }, (err, addr) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    server.log.info(`Server listening on port ${addr}`);
  }
});