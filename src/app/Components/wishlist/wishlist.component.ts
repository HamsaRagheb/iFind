import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SweetAlertService } from '../../Services/sweet-alert.service';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../Shared/product/product.component';
import { WishlistService } from '../../Services/wishlist.service';
import { BannerComponent } from '../Shared/banner/banner.component';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Product } from '../../Models/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [
    CommonModule,
    ProductComponent,
    BannerComponent,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  wishlistItems?: Product[];

  constructor(
    private _productService: ProductsService,
    private _sweetAlert: SweetAlertService,
    private _wishlistService: WishlistService,
  ) {}

  ngOnInit() {
    this.subscription = this._productService.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems = res.data;
      },
    });
  }

  deleteWishlistItem(productId: string) {
    this._productService.deleteFromWishlist(productId).subscribe({
      next: (res) => {
        this.wishlistItems! = this.wishlistItems!.filter(
          (item) => item._id !== productId,
        );
        this._wishlistService.removeWishListIds(productId);
        this._sweetAlert.success(
          'SWEET_ALERT.REMOVED_TITLE',
          'SWEET_ALERT.WISHLIST_REMOVED',
        );
      },
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
