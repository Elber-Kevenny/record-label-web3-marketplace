import Fastify from "fastify";
import { userRoutes } from "./routes/fastifyRoutes.js";
const fastify = Fastify();

fastify.register(userRoutes, { prefix: "/api" });

let [PORT] = process.argv.slice(2);

await fastify.listen({ port: PORT }, (err, address) => {
  const aleat = fastify.server.address().port;
  if (err) {
    console.error(err);
    process.exit(1);
  }

  if (aleat) {
    PORT = fastify.server.address().port;
  }
  console.log(`Running on http://localhost:${PORT}`);
});
