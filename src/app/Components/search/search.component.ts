import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductComponent } from '../Shared/product/product.component';
import { Subscription } from 'rxjs';
import { Product } from '../../Models/product.model';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../Services/search.service';
import { SearchPipe } from '../../Pipes/search.pipe';
import { SearchByCategoryPipe } from '../../Pipes/search-by-category.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    TranslatePipe,
    SearchPipe,
    SearchByCategoryPipe,
    ProductComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private subscription!: Subscription;
  private searchSubscription!: Subscription;
  private categorySubscription!: Subscription;

  products!: Product[];
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private _productsService: ProductsService,
    private _searchService: SearchService,
  ) {}

  ngOnInit() {
    this.subscription = this._productsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
    });

    this.searchSubscription = this._searchService.searchTerm$.subscribe({
      next: (term) => {
        this.searchTerm = term;
      },
    });

    this.categorySubscription = this._searchService.category$.subscribe({
      next: (category) => {
        this.selectedCategory = category;
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}
