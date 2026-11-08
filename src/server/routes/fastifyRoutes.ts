import {
  FastifyHttpOptions,
  FastifyReply,
  FastifyRequest,
  FastifyRouterOptions,
} from "fastify";

export async function userRoutes(app: any, options: any) {
  app.get("/", async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({ message: "Marketplace is Running" });
  });
}
