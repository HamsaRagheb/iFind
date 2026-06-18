import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductComponent } from '../Shared/product/product.component';
import { Subscription } from 'rxjs';
import { Product } from '../../Models/product.model';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { SliderComponent } from '../slider/slider.component';
import { TranslatePipe } from '@ngx-translate/core';
import { BannerComponent } from '../Shared/banner/banner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    SliderComponent,
    TranslatePipe,
    BannerComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private sliderInterval: any;

  products!: Product[];

  bgImages: string[] = [
    '/images/background_1.png',
    '/images/background_2.png',
    '/images/background_3.png',
    '/images/background_4.png',
    '/images/background_5.png',
    '/images/background_6.png',
  ];
  currentSlide: number = 0;

  constructor(private _productsService: ProductsService) {}

  ngOnInit() {
    this.subscription = this._productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });

    // Auto-rotate every 3 seconds
    this.sliderInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.bgImages.length;
    }, 3000);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    clearInterval(this.sliderInterval); // clear intervals
  }
}
