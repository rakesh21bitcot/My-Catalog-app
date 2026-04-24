import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogItem, CatalogState } from '../types';
import catalogData from '../data/catalog.json';

const rawItems = catalogData as any[];
const normalizedItems: CatalogItem[] = rawItems.map((item, index) => {
  const id = item.id || `${item.category.toLowerCase()}-${item.itemname.toLowerCase().replace(/\s+/g, '-')}-${index}`;
  return {
    ...item,
    id,
  };
});

const initialState: CatalogState = {
  items: normalizedItems,
  searchQuery: '',
  loading: false,
  error: null,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<CatalogItem[]>) => {
      state.items = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setItems, setSearchQuery } = catalogSlice.actions;
export default catalogSlice.reducer;
