import { config } from "dotenv";
import Fastify from "fastify";
import { registerHandlers } from "./server/plugins/registerHandlers";

config();

const server = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty"
    }
  }
});

server.register(registerHandlers);

server.listen({ port: Number(process.env.PORT || 8080), host: "0.0.0.0" }, (err, addr) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    server.log.info(`Server listening on port ${addr}`);
  }
});