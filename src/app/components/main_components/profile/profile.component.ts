import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileDataComponent } from '../../lowkey_components/profile-data/profile-data.component';
import { ProfileBankAccountComponent } from '../../lowkey_components/profile-bank-account/profile-bank-account.component';
import { ProfilePhoneNumberComponent } from '../../lowkey_components/profile-phone-number/profile-phone-number.component';
import { ProfileUpdateDataComponent } from '../../lowkey_components/profile-update-data/profile-update-data.component';
import { ProfileAddressesComponent } from '../../lowkey_components/profile-addresses/profile-addresses.component';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ProfileDataComponent, ProfileBankAccountComponent, ProfilePhoneNumberComponent,ProfileUpdateDataComponent,ProfileAddressesComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, OnDestroy{

  private router:Router;
  selectedSection: string = 'profile';

  constructor(router:Router) {
    this.router=router;
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  logout(): void {
    // Implementar lógica de logout aquí
    console.log('User logged out');
  }
}

