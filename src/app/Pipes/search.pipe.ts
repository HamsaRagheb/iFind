import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Models/product.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: Product[], searchTerm: string): Product[] {
    if (!products || !searchTerm || searchTerm.trim() === '') {
      return products;
    }

    const term = searchTerm.toLowerCase().trim();

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term),
    );
  }
}
