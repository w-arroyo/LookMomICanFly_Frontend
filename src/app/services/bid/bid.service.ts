import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SuccessfullRequest } from '../../models/successful_request.model';
import { publicEndpoint } from '../../config/request.interceptor';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  private httpClient: HttpClient;
  private baseUrl:string='http://localhost:8080/api/bids/';

  constructor(httpClient: HttpClient) {
    this.httpClient=httpClient;
  }

    findHighestBidByProductIdAndSize(productId:string, size:string): Observable<SuccessfullRequest>{
      return this.httpClient.get<SuccessfullRequest>(`${this.baseUrl}highest-bid/?productId=${productId}&size=${size}`, {context: publicEndpoint()});
    }

}
