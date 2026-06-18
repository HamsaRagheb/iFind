import { Component } from '@angular/core';
import { CartResponse } from '../../Models/cart.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { BannerComponent } from '../Shared/banner/banner.component';
import { SweetAlertService } from '../../Services/sweet-alert.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, BannerComponent, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts?: CartResponse;
  updateQuantityReuest: any;

  orderNote = new FormControl('', [
    Validators.maxLength(30),
    Validators.pattern(/^[a-zA-Z0-9 .,'\-\n]*$/),
  ]);

  constructor(
    private _cartService: CartService,
    private _sweetAlert: SweetAlertService,
  ) {}

  ngOnInit() {
    this._cartService.getUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartProducts = res;
      },
    });
  }
  updateCart(itemId: string, itemCount: number) {
    clearTimeout(this.updateQuantityReuest);
    this.updateQuantityReuest = setTimeout(() => {
      this._cartService.updateCartItem(itemId, itemCount).subscribe({
        next: (res) => {
          console.log(res);
          this.cartProducts = res;
        },
      });
    }, 1000);
  }
  increaseQuantity(itemId: string, itemCount: number) {
    this.updateCart(itemId, itemCount + 1);
  }
  decreaseQuantity(itemId: string, itemCount: number) {
    if (itemCount === 1) {
      this.deleteItem(itemId);
    } else {
      this.updateCart(itemId, itemCount - 1);
    }
  }
  async deleteItem(itemId: string) {
    const confirmed = await this._sweetAlert.confirm(
      'Remove this item?',
      'This product will be removed from your cart.',
    );

    if (!confirmed) return;

    this._cartService.deleteCartItem(itemId).subscribe({
      next: (res) => {
        this.cartProducts = res;
        this._sweetAlert.success(
          'Removed!',
          'The product has been removed successfully from your cart.',
        );
      },
    });
  }

  async clearAllItems() {
    const confirmed = await this._sweetAlert.confirm(
      'Clear your cart?',
      'All items will be removed from your cart.',
    );

    if (!confirmed) return;

    this._cartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          if (this.cartProducts?.data) {
            this.cartProducts.data.products = [];
            this.cartProducts.numOfCartItems = 0;
          }
          this._sweetAlert.success('success', 'Cart cleared successfully.');
        }
      },
    });
  }
  onSubmitNote() {
    if (this.orderNote.invalid) return;

    const note = this.orderNote.value?.trim();
    if (!note) {
      this._sweetAlert.error(
        'Empty Note',
        'Please enter a note before submitting.',
      );
      this.orderNote.reset();
      return;
    }

    this._sweetAlert.success(
      'Thank You!',
      'Your note has been submitted successfully.',
    );
    this.orderNote.reset();
  }
}
