import { createReducer, on } from '@ngrx/store';
import { languageAction } from './language.action';

const initialState: 'en' | 'ar' =
  (localStorage.getItem('lang') as 'en' | 'ar') || 'en';

export const languageReducer = createReducer(
  initialState,
  on(languageAction, (state, action) => action.lang),
);
