import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserProfileData } from '../../../models/user_profile.model';
import { SellingFee } from '../../../models/selling_fee.model';
import { CommonModule } from '@angular/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ProfileDataService } from '../../../services/profile/profile-data.service';

@Component({
  selector: 'app-profile-data',
  imports: [CommonModule],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css'
})
export class ProfileDataComponent implements OnInit{

  private profileDataService:ProfileDataService;
  profileData$!:Observable<UserProfileData>;
  userLevel$!:Observable<SellingFee>;

  constructor(profileDataService:ProfileDataService){
    this.profileDataService=profileDataService;
  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserLevel();
  }

  private getUserData(){
    this.profileData$=this.handleObservable(this.profileDataService.getProfileData());
  }

  private getUserLevel(){
    this.userLevel$=this.handleObservable(this.profileDataService.getUserLevel());
  }

  private handleObservable(observable:Observable<any>){
      return observable.pipe(
        catchError(
          (error)=>{
            const message=error.error?.error;
            console.log(message);
            return throwError(()=>new Error(message));
          }
        )
      );
    }

}
