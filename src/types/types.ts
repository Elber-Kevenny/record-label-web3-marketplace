export interface MarketplaceNodeType {
  url: string;
  peers: string[];
  blockchain: string;
  balance: number;
  songs: Record<string, string>;
  broadcastSelf: () => void;
}

export interface BlockType {
  timestemp: number;
  transactions: Record<string, string>;
  previousHash: string;
  nextHash: null;
  hash: string;
}
