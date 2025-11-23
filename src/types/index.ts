export type ItemType = 'LOST' | 'FOUND';

export type ItemStatus = 'PENDING' | 'APPROVED' | 'RETURNED' | 'CLAIMED';

export interface ItemMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  color: string;
  location: string;
  dateLost: string;
  imageCid: string;
  type: ItemType;
  owner: string;
  createdAt: number;
}

export interface BlockchainItem {
  itemId: string;
  itemType: ItemType;
  metadataCid: string;
  owner: string;
  status: ItemStatus;
  timestamp: number;
}

export interface MatchResult {
  itemId: string;
  metadata: ItemMetadata;
  similarityScore: number;
  matchedWith: string;
}

export const ITEM_CATEGORIES = [
  'Electronics',
  'Documents',
  'Accessories',
  'Clothing',
  'Pets',
  'Keys',
  'Bags',
  'Jewelry',
  'Other'
] as const;

export type ItemCategory = typeof ITEM_CATEGORIES[number];
