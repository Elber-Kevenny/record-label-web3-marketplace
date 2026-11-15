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
}
