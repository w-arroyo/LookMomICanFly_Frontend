import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileDataComponent } from '../../lowkey_components/profile-data/profile-data.component';
import { ProfileBankAccountComponent } from '../../lowkey_components/profile-bank-account/profile-bank-account.component';
import { ProfilePhoneNumberComponent } from '../../lowkey_components/profile-phone-number/profile-phone-number.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ProfileDataComponent, ProfileBankAccountComponent, ProfilePhoneNumberComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  selectedSection: string = 'profile';

  constructor() {

  }

  selectSection(section: string): void {
    this.selectedSection = section;
  }

  logout(): void {
    // Implementar lógica de logout aquí
    console.log('User logged out');
  }
}

