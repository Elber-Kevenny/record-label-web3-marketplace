import {
  FastifyHttpOptions,
  FastifyReply,
  FastifyRequest,
  FastifyRouterOptions,
} from "fastify";
import * as controller from "../controllers/nodeController.js";

export async function userRoutes(app: any, options: any) {
  app.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ message: "Marketplace is Running" });
  });

  app.post("/register-node", controller.register);
  app.post("/sync-peers", controller.synPeers);
}
