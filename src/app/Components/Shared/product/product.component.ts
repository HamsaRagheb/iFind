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
import { Router, RouterLink } from '@angular/router';
import { SweetAlertService } from '../../../Services/sweet-alert.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { CartService } from '../../../Services/cart.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Output() wishlistItemId = new EventEmitter<string>();
  isWishlisted: boolean = false;
  private wishlistSub!: Subscription;

  constructor(
    private _wishlistService: WishlistService,
    private _productsService: ProductsService,
    private _sweetAlert: SweetAlertService,
    private _cartService: CartService,
    private _router: Router,
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
      if (this.wishlistItemId.observed) {
        this.wishlistItemId.emit(this.product._id);
        return;
      }
      this._productsService.deleteFromWishlist(this.product._id).subscribe({
        next: (res) => {
          this._wishlistService.removeWishListIds(this.product._id);
          this._sweetAlert.success(
            'SWEET_ALERT.REMOVED_TITLE',
            'SWEET_ALERT.WISHLIST_REMOVED',
          );
        },
      });
    } else {
      this._productsService.addToWishlist(this.product._id).subscribe({
        next: (res) => {
          this._wishlistService.addWishlistIds(this.product._id);
          this._sweetAlert
            .successWithAction(
              'SWEET_ALERT.ADDED',
              'SWEET_ALERT.WISHLIST_ADDED',
              'SWEET_ALERT.GO_TO_WISHLIST',
            )
            .then((goToWishlist) => {
              if (goToWishlist) this._router.navigate(['/wishlist']);
            });
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
        this._sweetAlert
          .successWithAction(
            'CART.Added_TO_CART',
            res.message,
            'PRODUCT_DETAILS.GO_TO_CART',
          )
          .then((goToCart) => {
            if (goToCart) {
              this._router.navigate(['/cart']);
            }
          });
      },
    });
  }

  ngOnDestroy() {
    this.wishlistSub?.unsubscribe();
  }
}
