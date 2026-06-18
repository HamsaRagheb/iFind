import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { errorInterceptor } from './Interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { spinnerInterceptor } from './Interceptors/spinner.interceptor';
import { provideStore } from '@ngrx/store';
import { languageReducer } from './Store/language/language.reducer';
import { provideEffects } from '@ngrx/effects';
import { LanguageEffect } from './Store/language/language.effect';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    NgxSpinnerModule,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, spinnerInterceptor, errorInterceptor]),
    ),
    provideStore({ language: languageReducer }),
    provideEffects([LanguageEffect]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
    }),
  ],
};
