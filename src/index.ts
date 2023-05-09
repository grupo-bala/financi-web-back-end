import Fastify from "fastify";
import { registerHandlers } from "./server/plugins/registerHandlers";
import { EnviromentVars } from "./server/config/enviromentVars";
import { config } from "dotenv";

config();
EnviromentVars.validateVars();

const server = Fastify({
  logger: {
    level: "info",
    transport: {
      target: "pino-pretty",
    },
  },
});

server.register(registerHandlers);

server.listen(
  { port: Number(EnviromentVars.vars.PORT),
    host: "0.0.0.0",
  }, (err, addr) => {
    if (err) {
      const exitStatusCode = 1;
      server.log.error(err);
      process.exit(exitStatusCode);
    } else {
      server.log.info(`Server listening on port ${addr}`);
    }
  },
);