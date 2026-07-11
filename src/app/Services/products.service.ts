import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsResponse } from '../Models/product.model';
import { environment } from '../../environments/environment.development';
import { ProductDetailResponse } from '../Models/product-detail.model';
import {
  AddToCartResponse,
  CartResponse,
  ClearCartResponse,
} from '../Models/cart.model';
import {
  AddToWishlistResponse,
  WishlistItemsResponse,
} from '../Models/wishlist.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  getProducts(): Observable<ProductsResponse> {
    return this._httpClient.get<ProductsResponse>(
      `${environment.baseUrl}/products`,
    );
  }

  getProductById(productId: string): Observable<ProductDetailResponse> {
    return this._httpClient.get<ProductDetailResponse>(
      `${environment.baseUrl}/products/${productId}`,
    );
  }

  stars(rate: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rate);
    const halfStar = rate % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('fa-star');
    }

    if (halfStar) {
      stars.push('fa-star-half-stroke');
    }
    while (stars.length < 5) {
      stars.push('fa-star empty');
    }
    return stars;
  }

  /*******************************Cart*********************************** */
  // Add to Cart endpint
  addToCart(productId: string): Observable<AddToCartResponse> {
    return this._httpClient.post<AddToCartResponse>(
      `${environment.baseUrl}/cart`,
      {
        productId,
      },
    );
  }

  //Get Logged user cart
  getUserCart(): Observable<CartResponse> {
    return this._httpClient.get<CartResponse>(`${environment.baseUrl}/cart`);
  }

  //Delete cart item
  deleteCartItem(itemId: string): Observable<CartResponse> {
    return this._httpClient.delete<CartResponse>(
      `${environment.baseUrl}/cart/${itemId}`,
    );
  }

  //Clear cart
  clearCart(): Observable<ClearCartResponse> {
    return this._httpClient.delete<ClearCartResponse>(
      `${environment.baseUrl}/cart`,
    );
  }

  //Update cart item
  updateCartItem(itemId: string, count: number): Observable<CartResponse> {
    return this._httpClient.put<CartResponse>(
      `${environment.baseUrl}/cart/${itemId}`,
      {
        count,
      },
    );
  }

  /*******************************Wishlist********************************** */
  // Get Wishlist endpoint
  getWishlist(): Observable<WishlistItemsResponse> {
    return this._httpClient.get<WishlistItemsResponse>(
      `${environment.baseUrl}/wishlist`,
    );
  }
  // Add to Wishlist endpoint
  addToWishlist(productId: string): Observable<AddToWishlistResponse> {
    return this._httpClient.post<AddToWishlistResponse>(
      `${environment.baseUrl}/wishlist`,
      {
        productId,
      },
    );
  }
  // Delete from Wishlist endpoint
  deleteFromWishlist(productId: string): Observable<AddToWishlistResponse> {
    return this._httpClient.delete<AddToWishlistResponse>(
      `${environment.baseUrl}/wishlist/${productId}`,
    );
  }
}
