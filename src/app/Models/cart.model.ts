import { Brand, Category, Subcategory } from './product.model';

// ─── Product inside GET cart response ───────────────────────────
export interface CartProductDetails {
  subcategory: Subcategory[];
  _id: string;
  id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
}

// ─── Cart Items ──────────────────────────────────────────────────
export interface CartItem {
  count: number;
  _id: string; // Post response → _id is the cart item ID
  product: string; // POST response → product is just an ID
  price: number;
}

export interface CartProduct {
  count: number;
  _id: string;
  product: CartProductDetails; // GET response → product is a full object
  price: number;
}

// ─── Generic CartData (reused for both responses) ────────────────
export interface CartData<T> {
  _id: string;
  cartOwner: string;
  products: T[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

// ─── Responses ───────────────────────────────────────────────────
export interface AddToCartResponse {
  statusMsg?: string;
  message: string;
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<CartItem>; // products → string IDs
}
// GET cart response
export interface CartResponse {
  statusMsg?: string;
  message?: string;
  status?: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData<CartProduct>; // products → full objects
}
// Clear Cart Response
export interface ClearCartResponse {
  statusMsg?: string;
  message: string;
}
