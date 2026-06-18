import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CartProduct } from '../../Models/cart.model';
import { Subscription } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SweetAlertService } from '../../Services/sweet-alert.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartProducts: CartProduct[] = [];
  numOfItems: number = 0;
  totalPrice: number = 0;
  private subscription!: Subscription;

  constructor(
    private _cartService: CartService,
    private _sweetAlert: SweetAlertService,
  ) {}

  ngOnInit() {
    this.subscription = this._cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartProducts = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.numOfItems = res.numOfCartItems;
      },
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextStep() {
    this._sweetAlert.custom({
      title: 'Payment Gateway Coming Soon....',
    });
  }
}
