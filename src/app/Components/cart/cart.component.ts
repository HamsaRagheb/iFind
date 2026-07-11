import { Component } from '@angular/core';
import { CartResponse } from '../../Models/cart.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { BannerComponent } from '../Shared/banner/banner.component';
import { SweetAlertService } from '../../Services/sweet-alert.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    RouterLink,
    BannerComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  private cartSub!: Subscription;
  cartProducts?: CartResponse;
  totalCartPrice: number = 0;
  updateQuantityRequest: any;

  orderNote = new FormControl('', [
    Validators.maxLength(30),
    Validators.pattern(/^[a-zA-Z0-9 .,'\-\n]*$/),
  ]);
  countries = [
    { value: 'EG', key: 'CART.COUNTRIES.EG' },
    { value: 'SA', key: 'CART.COUNTRIES.SA' },
    { value: 'AE', key: 'CART.COUNTRIES.AE' },
    { value: 'QA', key: 'CART.COUNTRIES.QA' },
    { value: 'KW', key: 'CART.COUNTRIES.KW' },
    { value: 'BH', key: 'CART.COUNTRIES.BH' },
    { value: 'OM', key: 'CART.COUNTRIES.OM' },
  ];
  constructor(
    private _cartService: CartService,
    private _sweetAlert: SweetAlertService,
  ) {}

  ngOnInit() {
    this.cartSub = this._cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartProducts = res;
        this.totalCartPrice = res.data.totalCartPrice;
      },
    });
  }
  /*********************************************************************** */

  updateCart(itemId: string, itemCount: number) {
    clearTimeout(this.updateQuantityRequest);
    this.updateQuantityRequest = setTimeout(() => {
      this._cartService.updateCartItem(itemId, itemCount).subscribe({
        next: (res) => {
          console.log(res);
          this.cartProducts = res;
          this.totalCartPrice = res.data.totalCartPrice;
        },
      });
    }, 1000);
  }
  /*********************************************************************** */

  increaseQuantity(itemId: string, itemCount: number) {
    this.updateCart(itemId, itemCount + 1);
  }
  /*********************************************************************** */

  decreaseQuantity(itemId: string, itemCount: number) {
    if (itemCount === 1) {
      this.deleteItem(itemId);
    } else {
      this.updateCart(itemId, itemCount - 1);
    }
  }
  /*********************************************************************** */

  async deleteItem(itemId: string) {
    const confirmed = await this._sweetAlert.confirm(
      'SWEET_ALERT.REMOVE_ITEM_TITLE',
      'SWEET_ALERT.REMOVE_ITEM_TEXT',
    );

    if (!confirmed) return;

    this._cartService.deleteCartItem(itemId).subscribe({
      next: (res) => {
        this.cartProducts = res;
        this._sweetAlert.success(
          'SWEET_ALERT.REMOVED_TITLE',
          'SWEET_ALERT.REMOVED_TEXT',
        );
      },
    });
  }
  /*********************************************************************** */

  async clearAllItems() {
    const confirmed = await this._sweetAlert.confirm(
      'SWEET_ALERT.CLEAR_CART_TITLE',
      'SWEET_ALERT.CLEAR_CART_TEXT',
    );

    if (!confirmed) return;

    this._cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          if (this.cartProducts?.data) {
            this.cartProducts.data.products = [];
            this.cartProducts.numOfCartItems = 0;
          }
          this._sweetAlert.success(
            'SWEET_ALERT.SUCCESS',
            'SWEET_ALERT.CART_CLEARED',
          );
        }
      },
    });
  }
  /*********************************************************************** */

  onSubmitNote() {
    const note = this.orderNote.value?.trim();
    if (!note) {
      this._sweetAlert.error(
        'SWEET_ALERT.EMPTY_NOTE_TITLE',
        'SWEET_ALERT.EMPTY_NOTE_TEXT',
      );
      this.orderNote.reset();
      return;
    }

    this._sweetAlert.success(
      'SWEET_ALERT.NOTE_SUBMITTED_TITLE',
      'SWEET_ALERT.NOTE_SUBMITTED_TEXT',
    );
    this.orderNote.reset();
  }
  /*********************************************************************** */
  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
