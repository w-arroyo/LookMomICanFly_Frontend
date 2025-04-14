import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, throwError } from 'rxjs';
import { ProductSummary } from '../../models/product_summary.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSummaryService {

  private baseUrl: string='http://localhost:8080/api/products';
  private httpClient: HttpClient;
  productListBehaviorSubject=new BehaviorSubject<ProductSummary[]>([]);

  constructor(httpClient: HttpClient) { 
    this.httpClient=httpClient;
  }

  getProductListObservable(): Observable<ProductSummary[]>{
    return this.productListBehaviorSubject.asObservable();
  }

  productsByCategory(category:string): void{
    this.httpClient.get<ProductSummary[]>(`${this.baseUrl}/get/all-summary-by-category/?category=${category}`).pipe(
      catchError(
        (error) =>{
          this.emptyProductList();
          const message= error.error?.error || 'Server error.';
          return throwError(()=>new Error(message));
        }
      )
    ).subscribe({
      next: (response) => {
        this.productListBehaviorSubject.next(response);
      },
      error: (error) => console.log(error.message)
    });
  }

  private emptyProductList(){
    this.productListBehaviorSubject.next([]);
  }

}
