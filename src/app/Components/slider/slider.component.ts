import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectLanguage } from '../../Store/language/language.selector';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Models/category.model';
import { SearchService } from '../../Services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, CarouselModule, TranslatePipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements OnInit, OnDestroy {
  showCarousel = true;
  private langSubscription!: Subscription;
  private categorySubscription!: Subscription;
  constructor(
    private _store: Store,
    private _categoryService: CategoryService,
    private _searchService: SearchService,
    private _router: Router,
  ) {}

  categories: Category[] = [];

  customOptions: OwlOptions = this.buildOptions(false);

  ngOnInit(): void {
    let isFirst = true;

    this.langSubscription = this._store.select(selectLanguage).subscribe({
      next: (lang) => {
        const isRtl = lang === 'ar';
        this.customOptions = this.buildOptions(isRtl);

        if (isFirst) {
          isFirst = false;
          return;
        }

        this.showCarousel = false;
        setTimeout(() => {
          this.showCarousel = true;
        });
      },
    });

    this.categorySubscription = this._categoryService
      .getAllCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories.data;
        },
      });
  }

  private buildOptions(rtl: boolean): OwlOptions {
    return {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      margin: 10,
      rtl,
      navText: [
        '<i class="fa-solid fa-angle-left"></i>',
        '<i class="fa-solid fa-angle-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 2,
        },
        740: {
          items: 3,
        },
        940: {
          items: 6,
        },
      },
      nav: true,
    };
  }

  selectCategory(category: string) {
    this._searchService.setCategory(category);
    this._router.navigate(['/search']);
  }

  ngOnDestroy(): void {
    this.langSubscription?.unsubscribe();
    this.categorySubscription?.unsubscribe();
  }
}
