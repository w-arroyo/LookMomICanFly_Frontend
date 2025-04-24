import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  private router:Router;
  private auhenticationService:AuthenticationService;
  selectedSection: string = 'profile';

  constructor(router:Router,auhenticationService:AuthenticationService) {
    this.router=router;
    this.auhenticationService=auhenticationService;
  }

  selectSection(section:string):void {
    this.selectedSection = section;
  }

  isActive(section:string): boolean{
    return this.selectedSection===section;
  }

  logout():void{
    this.auhenticationService.logout();
    this.router.navigate(['home']);
  }
}

