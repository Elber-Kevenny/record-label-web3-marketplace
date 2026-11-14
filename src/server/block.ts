import { BlockType } from "../types/types.js";
import { createHash } from "crypto";

class Block implements BlockType {
  timestemp: number;
  transactions: Record<string, string>;
  previousHash: string;
  nextHash: null;
  hash: string;


  constructor(transactions: Record<string, string>, previousHash: string) {
    this.timestemp = Date.now();
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nextHash = null
  }

  calculateHash() {
    return createHash('sha256').update(
      this.previousHash + this.timestemp + JSON.stringify(this.transactions)
    ).digest("hex")
  }
}

export default Block;