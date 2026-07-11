import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Observable, pairwise, Subscription } from 'rxjs';
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
  private routerSub!: Subscription;
  wishlistCount = 0;
  cartCount = 0;
  categories: Category[] = [];
  isLoggedIn$!: Observable<boolean>;
  lang$!: Observable<'en' | 'ar'>;

  @ViewChild('searchInputMobile') searchInputMobile!: ElementRef;
  @ViewChild('searchInputDesktop') searchInputDesktop!: ElementRef;

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
    this.isLoggedIn$ = this._authService.isLoggedIn$;
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

    this.routerSub = this._router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        pairwise(),
      )
      .subscribe(([prev, curr]) => {
        const wasOnSearch = prev.urlAfterRedirects.startsWith('/search');
        const stillOnSearch = curr.urlAfterRedirects.startsWith('/search');

        if (wasOnSearch && !stillOnSearch) {
          this.clearSearchInputs();
          this._searchService.setSearchTerm('');
          this._searchService.setCategory('');
        }
      });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._searchService.setSearchTerm(input.value);
    this._router.navigate(['/search']);
  }

  focuseSearchMobile() {
    this.searchInputMobile.nativeElement.focus();
  }
  focuseSearchDesktop() {
    this.searchInputDesktop.nativeElement.focus();
  }

  private clearSearchInputs(): void {
    if (this.searchInputMobile) {
      this.searchInputMobile.nativeElement.value = '';
    }
    if (this.searchInputDesktop) {
      this.searchInputDesktop.nativeElement.value = '';
    }
  }
  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this._searchService.setCategory(value);
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
    this.routerSub.unsubscribe();
  }
}
