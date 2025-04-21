import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileDataService } from '../../../services/profile/profile-data.service';
import { catchError, Observable, Subject, takeUntil, tap, throwError } from 'rxjs';
import { UserProfileData } from '../../../models/user_profile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update-data',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile-update-data.component.html',
  styleUrl: './profile-update-data.component.css'
})
export class ProfileUpdateDataComponent implements OnInit,OnDestroy{

  private profileDataService:ProfileDataService;
  userData$!:Observable<UserProfileData>;
  private destroyStream:Subject<void>=new Subject<void>();
  private router:Router;
  isEditingEmail = false;
  
  editedEmail = '';
  
  currentPassword = '';
  newPassword = '';
  
  errorMessage = '';

  constructor(profileDataService:ProfileDataService,router:Router){
    this.profileDataService=profileDataService;
    this.router=router;
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(){
    this.userData$=this.profileDataService.getProfileData().pipe(
      catchError(
        (error)=>{
          const message=error.error?.error;
          console.log(message);
          this.errorMessage=message;
          return throwError(()=>new Error(message));
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

  startEmailEditing(userMail:string): void {
    this.editedEmail = userMail;
    this.isEditingEmail = true;
  }

  cancelEmailEditing(): void {
    this.isEditingEmail = false;
    this.errorMessage = '';
  }

  updateEmail(): void {
    if (!this.editedEmail || !this.isValidEmail(this.editedEmail)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }
    this.profileDataService.updateEmail(this.editedEmail).pipe(
      takeUntil(
        this.destroyStream
      ),
      tap({
        next: (data)=>{
          this.editedEmail='';
          this.isEditingEmail=false;
          this.errorMessage=data.message;
          this.getUserData();
        },
        error: (error)=>{
          const message=error.error?.error;
          console.log(message);
          this.errorMessage=message;
        }
      })
    )
    .subscribe();
  }

  updatePassword(): void {
    if(!this.currentPassword || !this.newPassword) {
      this.errorMessage = 'Both password fields are required';
      return;
    }
    if(this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }
    this.profileDataService.updatePassword(this.currentPassword,this.newPassword).pipe(
      takeUntil(
        this.destroyStream
      ),
      tap({
        next: (data)=>{
          this.currentPassword='';
          this.newPassword='';
          this.errorMessage=data.message;
        },
        error: (error)=>{
          const message=error.error?.error;
          console.log(message);
          this.errorMessage=message;
        }
      })
    )
    .subscribe();
  }

  deleteAccount(){
    this.profileDataService.deactivateAccount().pipe(
      takeUntil(
        this.destroyStream
      )
    )
    .subscribe({
      next: (data)=>{
        this.router.navigate(['home']);
      },
      error: (error)=>{
        console.log(error);
        this.errorMessage=error.error?.error;
      }
    })
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
