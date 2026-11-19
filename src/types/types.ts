export interface TransactionHash {
   price: number;
    songTitle: string;
    sender: string;
    transactionType: string;
}


export interface MarketplaceNodeType {
  url: string;
  peers: string[];
  blockchain: BlockChainType;
  balance: number;
  songs: Record<string, string>;
  broadcastSelf: () => void;
  processTransaction: (transactionHash: TransactionHash) => Promise<string>
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

export interface TransactionInput {
  id?: string;
  sender?: string;
  recipient?: string;
  price?: number;
  type?: string;
  transactionType?: string;
  songTitle?: string;
  [key: string]: any;
}
