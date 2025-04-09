import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequestData } from '../models/login.model';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ServerError } from '../models/server_error.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private httpClient: HttpClient;
  private loginURL: string= 'http://localhost:8080/api/users/login';
  private tokenBehaviourSubject= new BehaviorSubject<string | null>(null);

  constructor(httpClient:HttpClient) {
    this.httpClient=httpClient;
  }

  login(credentials:LoginRequestData): Observable<any>{
    return this.httpClient.post<{success:string, token:string} | ServerError>(this.loginURL, credentials).pipe(
      map(
        (response) => {
          if('success' in response){
            this.loginSuccessful(response.token);
          }
        }
      ),
      catchError(
        (error)=>{
          console.log(error);
          throw error;
        }
      )
    );
  }

  private loginSuccessful(token: string): void{
    localStorage.setItem('jwt_token', token);
    this.loadToken(token);
  }

  private logout(): void{
    localStorage.removeItem('jwt_token');
    this.tokenBehaviourSubject.next(null);
  }

  checkIfAuthenticated(): boolean{
    return this.getToken()!==null;
  }

  getToken(): string | null{
    return this.tokenBehaviourSubject.value;
  }

  private loadToken(token: string): void{
    this.tokenBehaviourSubject.next(
      localStorage.getItem('jwt_token')
    );
  }

}
