import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfileData } from '../../models/user_profile.model';
import { SellingFee } from '../../models/selling_fee.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileDataService {

  private httpClient:HttpClient;
  private router:Router;
  private baseUrl:string='http://localhost:8080/api';
  private authService:AuthenticationService;
  private userId:string | null;

  constructor(httpClient:HttpClient,authService:AuthenticationService,router:Router) {
    this.httpClient=httpClient;
    this.authService=authService;
    this.router=router;
    this.userId=authService.getUserId();
    if(this.userId==null){
      authService.logout();
      router.navigate(['home']);
    }
  }

  getProfileData():Observable<UserProfileData>{
    return this.httpClient.get<UserProfileData>(`${this.baseUrl}/users/get/?id=${this.userId}`);
  }

  getUserLevel(): Observable<SellingFee>{
    return this.httpClient.get<SellingFee>(`${this.baseUrl}/fees/level/?userId=${this.userId}`);
  }

}
