import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserProfileData } from '../../../models/user_profile.model';
import { SellingFee } from '../../../models/selling_fee.model';
import { ProfileDataService } from '../../../services/profile/profile-data.service';
import { ProfileDataComponent } from '../../lowkey_components/profile-data/profile-data.component';
import { ProfileBankAccountComponent } from '../../lowkey_components/profile-bank-account/profile-bank-account.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ProfileDataComponent, ProfileBankAccountComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private profileService:ProfileDataService;
  selectedSection: string = 'profile';
  profileData$!:Observable<UserProfileData>;
  userLevel$!:Observable<SellingFee>;

  constructor(profileService:ProfileDataService) {
    this.profileService=profileService;
  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserLevel();
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  private getUserData(){
    this.profileData$=this.handleObservable(this.profileService.getProfileData());
  }

  private getUserLevel(){
    this.userLevel$=this.handleObservable(this.profileService.getUserLevel());
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

  logout(): void {
    // Implementar lógica de logout aquí
    console.log('User logged out');
  }
}

