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
  currentCategorySubject:BehaviorSubject<string | null>=new BehaviorSubject<string | null>(null);

  constructor(httpClient: HttpClient) { 
    this.httpClient=httpClient;
  }

  allProducts(){
    this.handleBackendResponse(
      this.httpClient.get<ProductSummary[]>(`${this.baseUrl}/get/all-summary`)
    );
  }

  productsByCategory(category:string): void{
    this.handleBackendResponse(
      this.httpClient.get<ProductSummary[]>(`${this.baseUrl}/get/all-summary-by-category/?category=${category}`)
    );
  }

  productsBySearch(productName: string): void{
    this.handleBackendResponse(
      this.httpClient.get<ProductSummary[]>(`${this.baseUrl}/find/?name=${productName}`)
    );
  }

  productsByBestSellers(): void{
    this.handleBackendResponse(
      this.httpClient.get<ProductSummary[]>(`${this.baseUrl}/best-sellers`)
    );
  }

  private handleBackendResponse(response: Observable<ProductSummary[]>): void{
    response.pipe(
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

  emptyProductList(){
    this.productListBehaviorSubject.next([]);
  }

}
