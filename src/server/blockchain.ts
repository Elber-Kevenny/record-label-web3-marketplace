import { createHash } from "node:crypto";
import { BlockChainType } from "../types/types.js";
import Block from "./block.js";

export class BlockChain implements BlockChainType {
  chain: string | any;
  difficult: number;
  pendingTransactions: string[];
  miningReward: number;

  constructor(chain: string, pendingTransactions = []) {
    this.chain = chain || [this.createGenesisBlock()];
    this.difficult = 4;
    this.pendingTransactions = pendingTransactions;
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block([], null);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  async mineBlock() {
    const targetPrefix = "0".repeat(this.difficult);
    let nonce = 0;
    let hash = "";

    while (hash.substring(0, this.difficult) !== targetPrefix) {
      nonce++;
      hash = createHash("sha256")
        .update(JSON.stringify(this.chain) + nonce)
        .digest("hex");
    }
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(this.pendingTransactions, previousBlock.hash);
    previousBlock.nextHash = newBlock.hash;
    this.chain.push(newBlock);
    this.pendingTransactions = [];
  }
}
