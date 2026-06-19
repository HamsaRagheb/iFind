import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../Services/auth.service';
import { SearchService } from '../../../Services/search.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { CategoryService } from '../../../Services/category.service';
import { CartService } from '../../../Services/cart.service';
import { ThemeService } from '../../../Services/theme.service';
import { languageAction } from '../../../Store/language/language.action';
import { selectLanguage } from '../../../Store/language/language.selector';
import { Category } from '../../../Models/category.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private wishlistSub!: Subscription;
  private categorySub!: Subscription;
  private cartSub!: Subscription;
  wishlistCount = 0;
  cartCount = 0;
  categories: Category[] = [];
  lang$!: Observable<'en' | 'ar'>;

  @ViewChild('searchInputDesktop') searchInputDesktop!: ElementRef;
  @ViewChild('searchInputMobile') searchInputMobile!: ElementRef;

  constructor(
    private _authService: AuthService,
    private _searchService: SearchService,
    private _wishlistService: WishlistService,
    private _categoryService: CategoryService,
    private _cartService: CartService,
    private _router: Router,
    private _store: Store,
    public _theme: ThemeService,
  ) {
    this.lang$ = this._store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.wishlistSub = this._wishlistService.wishlistItemsCount$.subscribe(
      (count) => (this.wishlistCount = count),
    );

    this.categorySub = this._categoryService
      .getAllCategories()
      .subscribe((res) => {
        this.categories = res.data;
      });

    this.cartSub = this._cartService.cartItemsCount$.subscribe(
      (count) => (this.cartCount = count),
    );
  }

  onSearch(event: Event): void {
    this._searchService.setSearchTerm((event.target as HTMLInputElement).value);
    this._router.navigate(['/search']);
  }

  focuseSearchMobile() {
    this.searchInputMobile.nativeElement.focus();
  }
  focuseSearchDesktop() {
    this.searchInputDesktop.nativeElement.focus();
  }
  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this._searchService.setCategory(value); // empty string = show all
    this._router.navigate(['/search']);
  }

  toggleLanguage(currentLang: 'en' | 'ar'): void {
    const next = currentLang === 'en' ? 'ar' : 'en';
    this._store.dispatch(languageAction({ lang: next }));
  }

  toggleTheme(): void {
    this._theme.toggleTheme();
  }

  logout(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.wishlistSub.unsubscribe();
    this.categorySub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
