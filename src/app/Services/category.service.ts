import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriesResponse } from '../Models/category.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  //Get All Categories
  getAllCategories(): Observable<CategoriesResponse> {
    return this._http.get<CategoriesResponse>(
      `${environment.baseUrl}/categories`,
    );
  }

  //Get specific category
  getCategoryById(id: string): Observable<CategoriesResponse> {
    return this._http.get<CategoriesResponse>(
      `${environment.baseUrl}/categories/${id}`,
    );
  }
}
