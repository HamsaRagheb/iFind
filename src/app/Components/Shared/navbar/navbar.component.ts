import { AsyncPipe, CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Offcanvas } from 'bootstrap';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../../Services/auth.service';
import { WishlistService } from '../../../Services/wishlist.service';
import { CartService } from '../../../Services/cart.service';
import { ThemeService } from '../../../Services/theme.service';
import { languageAction } from '../../../Store/language/language.action';
import { selectLanguage } from '../../../Store/language/language.selector';
import { CategorySidebarComponent } from '../category-sidebar/category-sidebar.component';
import { CategorySidebarService } from '../../../Services/category-sidebar.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    TranslatePipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private wishlistSub!: Subscription;
  private cartSub!: Subscription;

  wishlistCount = 0;
  cartCount = 0;
  lang$!: Observable<'en' | 'ar'>;

  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild(CategorySidebarComponent)
  categorySidebar!: CategorySidebarComponent;

  constructor(
    private _authService: AuthService,
    private _wishlistService: WishlistService,
    private _cartService: CartService,
    private _store: Store,
    public _theme: ThemeService,
    private _categorySidebarService: CategorySidebarService,
  ) {
    this.lang$ = this._store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.wishlistSub = this._wishlistService.wishlistItemsCount$.subscribe(
      (count) => (this.wishlistCount = count),
    );

    this.cartSub = this._cartService.cartItemsCount$.subscribe(
      (count) => (this.cartCount = count),
    );
  }

  toggleLanguage(currentLang: 'en' | 'ar'): void {
    const next = currentLang === 'en' ? 'ar' : 'en';
    this._store.dispatch(languageAction({ lang: next }));
    this.clodeSidebar();
  }

  toggleTheme(): void {
    this._theme.toggleTheme();
    this.clodeSidebar();
  }

  clodeSidebar() {
    const offcanvasEl = this.sidebar.nativeElement;
    const offcanvas = Offcanvas.getInstance(offcanvasEl);

    // Listen for Bootstrap's own 'hidden' event — fires after animation completes
    offcanvasEl.addEventListener(
      'hidden.bs.offcanvas',
      () => {
        document.querySelector('.offcanvas-backdrop')?.remove();
        document.body.style.overflow = '';
      },
      { once: true }, // auto-removes the listener after one call
    );

    offcanvas?.hide();
  }
  openCategorySidebar() {
    this._categorySidebarService.openCategorySidebar();
    this.clodeSidebar();
  }
  logout(): void {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this.wishlistSub.unsubscribe();
    this.cartSub.unsubscribe();
  }
}
