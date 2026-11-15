import axios from "axios";
import { BlockChainType, MarketplaceNodeType } from "../types/types.js";

export class MarketplaceNode implements MarketplaceNodeType {
  url: string;
  peers: string[];
  blockchain: BlockChainType;
  balance: number;
  songs: Record<string, string>;

  constructor(url: string, peers: string[] = [], blockchain: BlockChainType) {
    this.url = url;
    this.peers = peers;
    this.blockchain = blockchain;
    this.balance = 5000;
    this.songs = {};
    this.broadcastSelf();
  }

  async broadCast(path: string, data: any) {
    await Promise.all(
      this.peers.map(async (peer) => {
        if (peer === this.url) {
          return;
        }
        try {
          await axios.post(`${peer}/${path}`, data);
        } catch (e: any) {
          console.error(e.message);
        }
      }),
    );
  }

  async broadcastSelf() {
    this.broadCast("register-node", { url: this.url });
  }

  async registerNode(newNodeUrl: string) {
    this.peers.push(newNodeUrl);
    await this.broadCast("sync-peers", { peers: this.peers });
    this.broadcastBlockchain();
  }
  async broadcastBlockchain() {
    this.broadCast("sync-blockchain", { chain: this.blockchain.chain });
  }

  async processTransaction(transactionHash) {
    const transaction = new Transaction(transactionHash);
    const id = transactionHash.id || transaction.id;

    if (transaction.type === "BUY") {
      if (this.balance < transaction.price) return "Insuficient balance";
      this.balance -= transaction.price;

      try {
        await axios.post(`${transaction.sender}/payment`, {
          price: transaction.price,
        });
      } catch (e: any) {
        console.log(e.message);
      }
      console.log({ bal: this.balance });
    }
    this.songs[id] = transaction;
    this.blockchain.pendingTransactions.push(transaction);
    if (this.blockchain.pendingTransactions.length > 4) {
      console.log(await this.mime());
    }
    await this.broadcastBlockchain();
    return "Processed transaction"
  }
}
