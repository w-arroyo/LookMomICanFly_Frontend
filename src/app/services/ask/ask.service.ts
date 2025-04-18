import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessfullRequest } from '../../models/successful_request.model';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  private baseUrl: string ='http://localhost:8080/api/asks';
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) { 
    this.httpClient=httpClient;
  }

  getLowestAskAmount(productId: string): Observable<any>{
    return this.httpClient.get<SuccessfullRequest>(`${this.baseUrl}/get/lowest-ask/?productId=${productId}`);
  }

}
