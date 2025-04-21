import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sneakers } from '../../models/sneakers.model';
import { Product } from '../../models/product.model';
import { publicEndpoint } from '../../config/request.interceptor';
import { ProductSummary } from '../../models/product_summary.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private baseUrl: string='http://localhost:8080/api/products';
  private httpClient:HttpClient;

  constructor(httpClient:HttpClient) {
    this.httpClient=httpClient;
  }

  loadProductPage(id:string,category:string): Observable<Product>{
    return this.httpClient.get<Sneakers>(`${this.baseUrl}/${category}/get/?id=${id}`, {context: publicEndpoint()})
  }

  loadProductSummary(id:string):Observable<ProductSummary>{
    return this.httpClient.get<ProductSummary>(`${this.baseUrl}/get/?productId=${id}`, {context:publicEndpoint()})
  }

}
