import Fastify from "fastify";
import { userRoutes } from "./routes/fastifyRoutes.js";
import { MarketplaceNode } from "./marketplaceNode.js";
const fastify = Fastify();

export let marketPlaceNode: MarketplaceNode;

fastify.register(userRoutes, { prefix: "/api" });




let [PORT] = process.argv.slice(2);
PORT = PORT || 0 

try {
  await fastify.listen({port: PORT})
  PORT = fastify.server.address().port;

  console.log(`Running on http://localhost:${PORT}`);



} catch(e) {
  console.error("Erro ao iniciar o servidor:", e);
  process.exit(1);
}

  export const initializeNode = () => {
  const URL = `http://localhost:${PORT}}`;
  const initialPeers = [`http://localhost:3000`];
  marketPlaceNode = new MarketplaceNode(URL, initialPeers);
};
