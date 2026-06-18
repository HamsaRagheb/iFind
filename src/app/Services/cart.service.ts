import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductsService } from './products.service';
import {
  AddToCartResponse,
  CartResponse,
  ClearCartResponse,
} from '../Models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsCount = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCount.asObservable();

  constructor(private _productService: ProductsService) {
    this.loadCartItemsCountFromServer();
  }

  loadCartItemsCountFromServer() {
    this._productService.getUserCart().subscribe({
      next: (res) => {
        this.cartItemsCount.next(res.numOfCartItems);
      },
    });
  }

  addToCart(productId: string): Observable<AddToCartResponse> {
    return this._productService
      .addToCart(productId)
      .pipe(
        tap((res: AddToCartResponse) =>
          this.cartItemsCount.next(res.numOfCartItems),
        ),
      );
  }
  deleteCartItem(itemId: string): Observable<CartResponse> {
    return this._productService
      .deleteCartItem(itemId)
      .pipe(
        tap((res: CartResponse) =>
          this.cartItemsCount.next(res.numOfCartItems),
        ),
      );
  }
  updateCartItem(itemId: string, count: number): Observable<CartResponse> {
    return this._productService
      .updateCartItem(itemId, count)
      .pipe(tap((res) => this.cartItemsCount.next(res.numOfCartItems)));
  }

  clearCart(): Observable<ClearCartResponse> {
    return this._productService
      .clearCart()
      .pipe(tap(() => this.cartItemsCount.next(0)));
  }

  getUserCart(): Observable<CartResponse> {
    return this._productService.getUserCart();
  }
}
