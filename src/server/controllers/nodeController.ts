import { FastifyReply, FastifyRequest } from "fastify";
import { marketPlaceNode } from "../index.js";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { url: newNodeUrl }: { url: string } = request.body;
  await marketPlaceNode.registerNode(newNodeUrl);
  reply.status(200).send({ message: "Node registered" });
};

export const synPeers = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { peers } = request.body as string[];
  marketPlaceNode.peers = peers;
  console.log(`${marketPlaceNode} synced ${marketPlaceNode.peers}`);
  reply.status(200).send({ message: "Synced Peers" });
};
