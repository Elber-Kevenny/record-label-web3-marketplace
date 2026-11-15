export interface MarketplaceNodeType {
  url: string;
  peers: string[];
  blockchain: BlockChainType;
  balance: number;
  songs: Record<string, string>;
  broadcastSelf: () => void;
}

export interface BlockType {
  timestemp: number;
  transactions: string[] | [];
  previousHash: string | null;
  nextHash: null;
  hash: string;
}

export interface BlockChainType {
  chain: string | any;
  difficult: number;
  pendingTransactions: string[];
  miningReward: number;
}
