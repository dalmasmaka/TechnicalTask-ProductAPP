import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductDTO } from '../../models/products/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:44360/api/Product/paged';

  constructor(private http: HttpClient) {}

  getPagedProducts(pageIndex: number, pageSize: number): Observable<any> {
    const params = {
      pageNumber: (pageIndex + 1).toString(),  
      pageSize: pageSize.toString(),
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
 
}
