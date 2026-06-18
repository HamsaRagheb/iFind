import { Brand, Category, Subcategory } from './product.model';

export interface ReviewUser {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetail {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  priceAfterDiscount?: number; // optional — not always present
  quantity: number;
  sold: number;
  imageCover: string;
  images: string[];
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  ratingsAverage: number;
  ratingsQuantity: number;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetailResponse {
  data: ProductDetail;
}
