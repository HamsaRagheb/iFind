import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistItemsResponse } from '../../Models/wishlist.model';
import { Subscription } from 'rxjs';
import { SweetAlertService } from '../../Services/sweet-alert.service';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../Shared/product/product.component';
import { WishlistService } from '../../Services/wishlist.service';
import { BannerComponent } from '../Shared/banner/banner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, ProductComponent, BannerComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  wishlistItems?: WishlistItemsResponse;

  constructor(
    private _productService: ProductsService,
    private _sweetAlert: SweetAlertService,
    private _wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    this.subscription = this._productService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res;
      },
    });
  }

  deleteWishlistItem(productId: string) {
    this._productService.deleteFromWishlist(productId).subscribe({
      next: (res) => {
        this._wishlistService.removeWishListIds(productId);
        this.wishlistItems!.data = this.wishlistItems!.data.filter(
          (item) => item._id !== productId,
        );
        this._sweetAlert.success('Success', res.message);
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
