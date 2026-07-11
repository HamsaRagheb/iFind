import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { WishlistItemsResponse } from '../Models/wishlist.model';
import { Product } from '../Models/product.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItemsIds = new BehaviorSubject<string[]>([]);
  wishlistItemsIds$ = this.wishlistItemsIds.asObservable();
  // RxJS map
  wishlistItemsCount$ = this.wishlistItemsIds$.pipe(
    map((idsArray) => idsArray.length),
  );

  constructor(private _httpClient: HttpClient) {
    this.loadWishlistFromServer();
  }

  private loadWishlistFromServer() {
    const token = localStorage.getItem('userToken');
    if (!token) return;

    this._httpClient
      .get<WishlistItemsResponse>(`${environment.baseUrl}/wishlist`)
      .subscribe({
        next: (res) => {
          // JavaScript Array.map()
          const ids = res.data.map((item: Product) => item._id);
          this.wishlistItemsIds.next(ids);
        },
      });
  }

  addWishlistIds(id: string) {
    const currentIds = this.wishlistItemsIds.value;
    this.wishlistItemsIds.next([...currentIds, id]);
  }

  removeWishListIds(id: string) {
    const currentIds = this.wishlistItemsIds.value;
    this.wishlistItemsIds.next(currentIds.filter((itemId) => itemId !== id));
  }
}
