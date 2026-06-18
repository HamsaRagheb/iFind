import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategorySidebarService {
  private categorySidebarSubject = new BehaviorSubject<boolean>(false);
  categorySidebar$ = this.categorySidebarSubject.asObservable();

  constructor() {}

  openCategorySidebar() {
    this.categorySidebarSubject.next(true);
  }

  closeCategorySidebar() {
    this.categorySidebarSubject.next(false);
  }
}
