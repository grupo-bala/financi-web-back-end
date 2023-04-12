import { config } from "dotenv";
import Fastify from "fastify";

config();

const server = Fastify({
  logger: true
});

server.listen({ port: Number(process.env.PORT || 8080) }, (err, addr) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    server.log.info(`Server listening on port ${addr}`);
  }
});