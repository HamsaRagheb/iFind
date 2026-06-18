export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
export interface CategoryResponse {
  data: Category;
}
export interface CategoriesMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
export interface CategoriesResponse {
  results: number;
  metadata: CategoriesMetadata;
  data: Category[];
}
