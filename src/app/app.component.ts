import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/Shared/header/header.component';
import { AuthService } from './Services/auth.service';
import { Subscription, take } from 'rxjs';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';
import { CategorySidebarComponent } from './Components/Shared/category-sidebar/category-sidebar.component';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectLanguage } from './Store/language/language.selector';
import { ScrollToTopComponent } from './Components/Shared/scroll-to-top/scroll-to-top.component';
import { WelcomePopupComponent } from './Components/welcome-popup/welcome-popup.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    NavbarComponent,
    CategorySidebarComponent,
    CommonModule,
    NgxSpinnerComponent,
    FooterComponent,
    ScrollToTopComponent,
    WelcomePopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isLoggedIn = false;
  private subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    private _store: Store,
    private _translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.subscription = this._authService.isLoggedIn$.subscribe({
      next: (value) => {
        this.isLoggedIn = value;
      },
    });
    this._store
      .select(selectLanguage)
      .pipe(take(1))
      .subscribe((lang) => {
        this._translateService.use(lang); // only use() in v18
        document.documentElement.setAttribute(
          'dir',
          lang === 'ar' ? 'rtl' : 'ltr',
        );
        document.documentElement.setAttribute('lang', lang);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
