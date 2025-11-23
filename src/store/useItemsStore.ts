import { create } from 'zustand';
import { ItemMetadata, MatchResult } from '@/types';

interface ItemsState {
  lostItems: ItemMetadata[];
  foundItems: ItemMetadata[];
  matches: MatchResult[];
  isLoading: boolean;
  setLostItems: (items: ItemMetadata[]) => void;
  setFoundItems: (items: ItemMetadata[]) => void;
  setMatches: (matches: MatchResult[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  addLostItem: (item: ItemMetadata) => void;
  addFoundItem: (item: ItemMetadata) => void;
}

export const useItemsStore = create<ItemsState>((set) => ({
  lostItems: [],
  foundItems: [],
  matches: [],
  isLoading: false,
  setLostItems: (items) => set({ lostItems: items }),
  setFoundItems: (items) => set({ foundItems: items }),
  setMatches: (matches) => set({ matches }),
  setIsLoading: (isLoading) => set({ isLoading }),
  addLostItem: (item) => set((state) => ({ lostItems: [...state.lostItems, item] })),
  addFoundItem: (item) => set((state) => ({ foundItems: [...state.foundItems, item] })),
}));
