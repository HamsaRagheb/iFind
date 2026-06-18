import { createAction, props } from '@ngrx/store';

export const languageAction = createAction(
  '[language] Set Language',
  props<{ lang: 'en' | 'ar' }>(),
);
