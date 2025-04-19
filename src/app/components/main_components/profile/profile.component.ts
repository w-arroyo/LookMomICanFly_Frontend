import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserProfileData } from '../../../models/user_profile.model';
import { SellingFee } from '../../../models/selling_fee.model';
import { ProfileDataService } from '../../../services/profile/profile-data.service';
import { DateFormatter } from '../../../utils/date_parser';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  private profileService:ProfileDataService;
  selectedSection: string = 'profile';
  profileData$!:Observable<UserProfileData>;
  userLevel$!:Observable<SellingFee>;
  user: any = {
    name: 'Álvaro Arroyo',
    creationDate: new Date('2023-01-15'),
    level: 'Premium',
    email: 'wdomaroyo@gmail.com'
  };

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
    this.profileData$=this.profileService.getProfileData().pipe(
      catchError(
        (error)=>{
          const message=error.error?.error;
          console.log(message);
          return throwError(()=>new Error(message));
        }
      )
    );
  }

  private getUserLevel(){
    this.userLevel$=this.profileService.getUserLevel().pipe(
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

