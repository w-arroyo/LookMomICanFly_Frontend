import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sneakers } from '../../models/sneakers.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private baseUrl: string='http://localhost:8080/api/products';
  private httpClient:HttpClient;

  constructor(httpClient:HttpClient) {
    this.httpClient=httpClient;
  }

  loadProductPage(id:string,category:string): Observable<Sneakers>{
    return this.httpClient.get<Sneakers>(`${this.baseUrl}/${category}/get/?id=${id}`)
  }

}
