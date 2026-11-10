export interface MarketplaceNodeType {
  url: string;
  peers: string[];
  blockchain: string;
  balance: number;
  songs: Record<string, string>;
  broadcastSelf: () => void;
}
