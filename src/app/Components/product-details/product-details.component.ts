import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { Subscription } from 'rxjs';
import { ProductDetailResponse } from '../../Models/product-detail.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SweetAlertService } from '../../Services/sweet-alert.service';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id!: string;
  productDetails?: ProductDetailResponse;
  selectedImage: string = '';
  selectedImageIndex: number = 0;
  isWishlisted: boolean = false;

  private subscription!: Subscription;
  private wishlistSub!: Subscription;

  constructor(
    private _productService: ProductsService,
    private _activatedRoute: ActivatedRoute,
    private _sweerAlert: SweetAlertService,
    private _wishlistService: WishlistService,
    private _cartService: CartService,
  ) {}

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.paramMap.get('id')!;

    this.subscription = this._productService.getProductById(this.id).subscribe({
      next: (res) => {
        this.productDetails = res;
        this.selectedImage = this.productDetails.data.imageCover;
      },
    });

    this.wishlistSub = this._wishlistService.wishlistItemsIds$.subscribe(
      (ids) => {
        this.isWishlisted = ids.includes(this.id);
      },
    );
  }

  changeMainImage(image: string, i: number) {
    this.selectedImage = image;
    this.selectedImageIndex = i;
  }

  averageStars(rate: number): string[] {
    return this._productService.stars(rate);
  }

  addToCart() {
    this._cartService.addToCart(this.id).subscribe({
      next: (res) => {
        this._sweerAlert.success('Success', res.message);
      },
    });
  }

  toggleWishlist() {
    if (this.isWishlisted) {
      this._productService.deleteFromWishlist(this.id).subscribe({
        next: (res) => {
          this._wishlistService.removeWishListIds(this.id);
          this._sweerAlert.success('Removed', res.message);
        },
      });
    } else {
      this._productService.addToWishlist(this.id).subscribe({
        next: (res) => {
          this._wishlistService.addWishlistIds(this.id);
          this._sweerAlert.success('Added', res.message);
        },
      });
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.wishlistSub?.unsubscribe();
  }
}
