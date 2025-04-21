import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessfullRequest } from '../../models/successful_request.model';
import { catchError, Observable, throwError } from 'rxjs';
import { publicEndpoint } from '../../config/request.interceptor';
import { AuthenticationService } from '../authentication/authentication.service';
import { Ask } from '../../models/ask.model';

@Injectable({
  providedIn: 'root'
})
export class AskService {

  private baseUrl: string ='http://localhost:8080/api/asks';
  private httpClient: HttpClient;
  private authenticationService:AuthenticationService;
  private userId:string | null;

  constructor(httpClient: HttpClient,authenticationService:AuthenticationService) { 
    this.httpClient=httpClient;
    this.authenticationService=authenticationService;
    this.userId=authenticationService.getUserId();
  }

  getLowestAskAmount(productId: string): Observable<any>{
    return this.httpClient.get<SuccessfullRequest>(`${this.baseUrl}/get/lowest-ask/?productId=${productId}`);
  }

  findLowestAskByProductIdAndSize(productId:string, size:string): Observable<SuccessfullRequest>{
    return this.httpClient.get<SuccessfullRequest>(`${this.baseUrl}/lowest-ask/?productId=${productId}&size=${size}`, {context: publicEndpoint()});
  }

  saveAsk(ask:Ask){
    if(this.userId)
      ask.userId=this.userId;
    return this.httpClient.post<any>(``,ask)
  }

}
