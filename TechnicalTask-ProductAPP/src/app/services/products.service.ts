import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { Product } from '../models/products/products.model';
import { ApiService } from './api.service';
import { PagedResult } from '../models/products/paged.model';
import { FilterProduct } from '../models/products/filter.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  controllerName: string = "Product"
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private totalCountSubject = new BehaviorSubject<number>(0);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();
  public count$: Observable<number> = this.totalCountSubject.asObservable();

  constructor(private apiService: ApiService) { }
  loadProducts(page: number, pageSize: number, sortColumn: string = "Name", sortDirection: string = "desc", filterObject: FilterProduct): void {
    const queryParams = `?pageNumber=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortDirection=${sortDirection}`;
    const url = `${this.controllerName}/paged${queryParams}`;

    this.apiService

      .post<PagedResult, FilterProduct>(url, filterObject)
      .pipe(
        tap((data: PagedResult) => {
          this.productsSubject.next(data.items);
          this.totalCountSubject.next(data.totalCount);
        }),
        catchError((error) => {
          console.error('Error loading products', error);
          return [];
        })
      ).subscribe();
  }

}
