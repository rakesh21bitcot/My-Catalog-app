export interface ItemProp {
  name?: string;
  label?: string;
  value: string;
}

export interface CatalogItem {
  id: string;
  itemname: string;
  category: string;
  image: string;
  itemprops: ItemProp[];
}

export interface CatalogState {
  items: CatalogItem[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}
