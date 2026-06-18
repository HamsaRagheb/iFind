import { Component } from '@angular/core';
import { CategoriesResponse } from '../../../Models/category.model';
import { Category } from '../../../Models/product.model';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../Services/category.service';
import { CommonModule } from '@angular/common';
import { CategorySidebarService } from '../../../Services/category-sidebar.service';
import { SearchService } from '../../../Services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-sidebar',
  imports: [CommonModule],
  templateUrl: './category-sidebar.component.html',
  styleUrl: './category-sidebar.component.css',
})
export class CategorySidebarComponent {
  private categorySub!: Subscription;
  private categorySidebarSub!: Subscription;

  categories: Category[] = [];
  isOpen = false;

  constructor(
    private _categoryService: CategoryService,
    private _categorySidebarService: CategorySidebarService,
    private _searchService: SearchService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.categorySidebarSub =
      this._categorySidebarService.categorySidebar$.subscribe({
        next: (state) => {
          this.isOpen = state;
        },
      });
    this.categorySub = this._categoryService.getAllCategories().subscribe({
      next: (res: CategoriesResponse) => {
        this.categories = res.data;
      },
    });
  }

  selectedCategory(categoryName: string) {
    this._searchService.setCategory(categoryName);
    this.closeSidebar();
    this._router.navigate(['/search']);
  }

  showAllCategories() {
    this._searchService.setCategory('All Categories');
    this.closeSidebar();
  }

  closeSidebar() {
    this._categorySidebarService.closeCategorySidebar();
  }

  ngOnDestroy() {
    this.categorySub?.unsubscribe();
    document.body.style.overflow = '';
  }
}
