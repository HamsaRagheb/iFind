import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product.model';

@Pipe({
  name: 'searchByCategory',
})
export class SearchByCategoryPipe implements PipeTransform {
  transform(products: Product[], category: string): Product[] {
    if (!products || !category || category.trim() === 'All Categories')
      return products;

    return products.filter(
      (product) =>
        product.category.name.toLowerCase() === category.toLowerCase(),
    );
  }
}
