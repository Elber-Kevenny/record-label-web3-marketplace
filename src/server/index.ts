import Fastify from "fastify";
import { userRoutes } from "./routes/fastifyRoutes.js";
import { initializeNode } from "./controllers/nodeController.js";

const fastify = Fastify();



fastify.register(userRoutes, { prefix: "/api" });

export let [PORT] = process.argv.slice(2);
PORT = PORT || 0;

try {
  await fastify.listen({ port: PORT });
  PORT = fastify.server.address().port;

  console.log(`Running on http://localhost:${PORT}`);
} catch (e) {
  console.error("Erro ao iniciar o servidor:", e);
  process.exit(1);
}

initializeNode()

