import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingOption } from '../models/shipping_option.model';
import { Observable } from 'rxjs';
import { publicEndpoint } from '../config/request.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ShippingOptionService {

  private httpClient:HttpClient;

  constructor(httpClient:HttpClient) {
    this.httpClient=httpClient;
  }

  getShippingOptions(): Observable<ShippingOption[]>{
    return this.httpClient.get<ShippingOption[]>(`http://localhost:8080/api/shipping-options/get-all`, {context: publicEndpoint()});
  }

}
