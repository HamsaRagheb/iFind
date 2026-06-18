import { Component } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CartProduct } from '../../Models/cart.model';
import { Subscription } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { SweetAlertService } from '../../Services/sweet-alert.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, CurrencyPipe, TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  cartProducts: CartProduct[] = [];
  numOfItems: number = 0;
  totalPrice: number = 0;
  private subscription!: Subscription;

  countries = [
    { value: 'EG', key: 'CHECKOUT.COUNTRIES.EG' },
    { value: 'SA', key: 'CHECKOUT.COUNTRIES.SA' },
    { value: 'AE', key: 'CHECKOUT.COUNTRIES.AE' },
    { value: 'QA', key: 'CHECKOUT.COUNTRIES.QA' },
    { value: 'KW', key: 'CHECKOUT.COUNTRIES.KW' },
    { value: 'BH', key: 'CHECKOUT.COUNTRIES.BH' },
    { value: 'OM', key: 'CHECKOUT.COUNTRIES.OM' },
  ];
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
