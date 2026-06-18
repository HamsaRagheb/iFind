import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTermSubject = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  private categorySubject = new BehaviorSubject<string>('');
  category$ = this.categorySubject.asObservable();

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  setCategory(category: string) {
    this.categorySubject.next(category);
  }
}
