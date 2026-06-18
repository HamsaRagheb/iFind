import { createFeatureSelector } from '@ngrx/store';

export const selectLanguage = createFeatureSelector<'en' | 'ar'>('language');
