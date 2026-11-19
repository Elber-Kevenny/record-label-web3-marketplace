import { FastifyReply, FastifyRequest } from "fastify";
import { BlockChain } from "../blockchain.js";
import { PORT } from "../index.js";
import { MarketplaceNodeType } from "../../types/types.js";
import { MarketplaceNode } from "../marketplaceNode.js";

let marketPlaceNode: MarketplaceNodeType

export const initializeNode = () => {
  const URL = `http://localhost:${PORT}}`;
  const initialPeers = [`http://localhost:3000`];
  const blockChain = new BlockChain()
  marketPlaceNode = new MarketplaceNode(URL, initialPeers, blockChain);
}



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

export const syncBlockchain = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const { chain } = request.body;
  marketPlaceNode.blockchain = new BlockChain(
    chain,
    marketPlaceNode.blockchain.pendingTransactions,
  );
  console.log(`Syncing blocks ${JSON.stringify(chain)}`);
  reply
    .status(200)
    .send({ message: "blockchain synced", blockCount: chain.length });
};

export const payment = async (request: FastifyRequest, reply: FastifyReply) => {
  const { price }: { price: number } = request.body;
  marketPlaceNode.balance += price;
  reply.send({ message: `New balance ${marketPlaceNode.balance}` });
};

export const sell = async (request: FastifyRequest, reply: FastifyReply) => {
  const { price, songTitle }: {price: number, songTitle: string} = request.body;
  await marketPlaceNode.processTransaction({
    price,
    songTitle,
    sender: marketPlaceNode.url,
    transactionType: "SELL",
  });
  reply.send({ message: "Song being listed" });
};

export const buy = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.body;
  const transaction = marketPlaceNode.songs[id];
  if (!transaction) {
    return reply.send({ message: "No songs exists by that id" });
  }
  const result = await marketPlaceNode.processTransaction({
    id: transaction.id,
    price: transaction.price,
    songTitle: transaction.songTitle,
    expirtaion: transaction.expiration,
    recipient: transaction.sender,
    sender: marketPlaceNode.url,
    transactionType: "BUY",
  });
  reply.send({ message: result });
};

export const songs = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.status(200).send({ songs: marketPlaceNode.availableSongs });
};
