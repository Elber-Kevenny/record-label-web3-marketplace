import { TransactionInput } from "../types/types.js";
import crypto from "crypto";

export class Transaction {
  id: string;
  sender?: string;
  recipient?: string;
  price: number;
  type: string;
  songTitle?: string;
  timestamp: number;

  constructor(data: TransactionInput = {}) {
    this.id = data.id || crypto.randomUUID();
    this.sender = data.sender;
    this.recipient = data.recipient;
    this.price = data.price ?? 0;
    this.type = data.type || data.transactionType || "";
    this.songTitle = data.songTitle;
    this.timestamp = data.timestamp || Date.now();
  }
}