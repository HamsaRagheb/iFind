import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDark = false;

  constructor() {
    if (localStorage.getItem('theme') === 'dark') this.enableDark();
  }

  toggleTheme() {
    this.isDark ? this.enableLight() : this.enableDark();
  }

  private enableDark() {
    this.isDark = true;
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  private enableLight() {
    this.isDark = false;
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }

  get currentTheme(): boolean {
    return this.isDark;
  }
}
