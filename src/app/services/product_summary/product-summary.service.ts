import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError } from 'rxjs';
import { ProductSummary } from '../../models/product_summary.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSummaryService {

  private baseUrl: string='http://localhost:8080/api/users/login';
  private httpClient: HttpClient;
  private productListBehaviorSubject=new BehaviorSubject<ProductSummary[]>([]);

  constructor(httpClient: HttpClient) { 
    this.httpClient=httpClient;
  }

  getProductListObservable(): Observable<ProductSummary[]>{
    return this.productListBehaviorSubject.asObservable();
  }

  productsByCategory(category:string): void{
    this.httpClient.get<{message:string,products:ProductSummary[]}>(`${this.baseUrl}/get/all-summary-by-category/?category=${category}`).pipe(
      map(
        (response) =>{
          if('message' in response){
            this.productListBehaviorSubject.next(response.products);
          }
          else{
            this.emptyProductList();
            //console.log(response.getError);
          }
        }
      ),
      catchError(
        (error) =>{
          this.emptyProductList();
          console.log(error);
          throw error;
        }
      )
    );
  }

  private emptyProductList(){
    this.productListBehaviorSubject.next([]);
  }

}
