import { Product } from './product.model';

export interface AddToWishlistResponse {
  statusMsg?: string;
  status?: string;
  message: string;
  data?: string[];
}

export interface WishlistItemsResponse {
  status: string;
  count: number;
  data: Product[];
}
