import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LoginRequestData } from '../../models/login.model';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { AuthenticationSuccess } from '../../models/authentication_success.model';
import { UserRegistration } from '../../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  private httpClient: HttpClient;
  private URL: string= 'http://localhost:8080/api/users';
  private tokenBehaviourSubject= new BehaviorSubject<string | null>(null);
  isLoggedSubject=new BehaviorSubject<boolean>(false);

  constructor(httpClient:HttpClient) {
    this.httpClient=httpClient;
  }

  ngOnInit(): void {
    this.initializeService();
  }

  private initializeService(): void{
    const token= localStorage.getItem('jwt_token');
    if(token!==null){
      this.tokenBehaviourSubject.next(token);
      this.isLoggedSubject.next(true);
    }
  }

  login(credentials:LoginRequestData): Observable<any>{
    return this.checkCredentials(this.httpClient.post<AuthenticationSuccess>(`${this.URL}/login`, credentials));
  }

  createNewAccount(credentials: UserRegistration): Observable<any>{
    return this.checkCredentials(this.httpClient.post<AuthenticationSuccess>(`${this.URL}/register`, credentials));
  }

  private checkCredentials(observable:Observable<any>): Observable<any>{
    return observable.pipe(
      map(
        (response)=>{
          this.loginSuccessful(response.token);
        }
      ),
      catchError(
        (error)=>{
          const message= error.error?.error || 'Server error.';
          return throwError(()=>new Error(message));
        }
      )
    );
  }

  private loginSuccessful(token: string): void{
    localStorage.setItem('jwt_token', token);
    this.tokenBehaviourSubject.next(token);
    this.isLoggedSubject.next(true);
  }

  logout(): void{
    this.httpClient.post<AuthenticationSuccess>(`${this.URL}/logout`,null);
    localStorage.removeItem('jwt_token');
    this.tokenBehaviourSubject.next(null);
    this.isLoggedSubject.next(false);
  }

  checkIfAuthenticated(): boolean{
    return this.getToken()!==null;
  }

  getToken(): string | null{
    return this.tokenBehaviourSubject.value;
  }

}
