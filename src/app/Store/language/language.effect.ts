import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { languageAction } from './language.action';
import { tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageEffect {
  private _actions$ = inject(Actions);
  private _translateService = inject(TranslateService);

  saveLanguage$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(languageAction),
        tap((action) => {
          localStorage.setItem('lang', action.lang);
          document.documentElement.setAttribute(
            'dir',
            action.lang === 'ar' ? 'rtl' : 'ltr',
          );
          document.documentElement.setAttribute('lang', action.lang);
          this._translateService.use(action.lang);
        }),
      ),
    { dispatch: false },
  );
}
