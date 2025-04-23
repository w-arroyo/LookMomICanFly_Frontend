import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { Sale } from '../../models/sale.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private httpClient:HttpClient;
  private baseUrl:string='http://localhost:8080/api/sales';
  private authenticationService:AuthenticationService;
  private userId:string='';

  constructor(httpClient:HttpClient,authenticationService:AuthenticationService) {
    this.httpClient=httpClient;
    this.authenticationService=authenticationService;
    const id=authenticationService.getUserId();
    if(id)
      this.userId=id;
  }

  findSale(saleId:string):Observable<Sale>{
    return this.httpClient.get<Sale>(`${this.baseUrl}/get/?saleId=${saleId}&userId=${this.userId}`);
  }
}
