import axios from "axios";
import { MarketplaceNodeType } from "../types/types.js";

export class MarketplaceNode implements MarketplaceNodeType {
  url: string;
  peers: string[];
  blockchain: string;
  balance: number;
  songs: Record<string, string>;

  constructor(url: string, peers: string[] = [], blockchain: string) {
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
  }
}
