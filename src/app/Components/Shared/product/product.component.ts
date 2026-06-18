import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ProductsService } from '../../../Services/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../Models/product.model';
import { RouterLink } from '@angular/router';
import { SweetAlertService } from '../../../Services/sweet-alert.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() toggleWishlist = new EventEmitter<string>();
  isWishlisted: boolean = false;
  private wishlistSub!: Subscription;

  constructor(
    private _wishlistService: WishlistService,
    private _productsService: ProductsService,
    private _sweetAlert: SweetAlertService,
    private _cartService: CartService,
  ) {}

  ngOnInit() {
    this.wishlistSub = this._wishlistService.wishlistItemsIds$.subscribe(
      (ids) => {
        this.isWishlisted = ids.includes(this.product._id);
      },
    );
  }

  onToggleWishlist() {
    if (this.isWishlisted) {
      if (this.toggleWishlist.observed) {
        this.toggleWishlist.emit(this.product._id);
        return;
      }
      this._productsService.deleteFromWishlist(this.product._id).subscribe({
        next: (res) => {
          this._wishlistService.removeWishListIds(this.product._id);
          this._sweetAlert.success('Removed', res.message);
        },
      });
    } else {
      this._productsService.addToWishlist(this.product._id).subscribe({
        next: (res) => {
          this._wishlistService.addWishlistIds(this.product._id);
          this._sweetAlert.success('Added', res.message);
        },
      });
    }
  }

  averageStars(rate: number): string[] {
    return this._productsService.stars(rate);
  }

  addToCart() {
    this._cartService.addToCart(this.product._id).subscribe({
      next: (res) => {
        this._sweetAlert.success('Added to cart', res.message);
      },
    });
  }

  ngOnDestroy() {
    this.wishlistSub?.unsubscribe();
  }
}
