import { Component, Input } from '@angular/core';
import { UserProfileData } from '../../../models/user_profile.model';
import { SellingFee } from '../../../models/selling_fee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-data',
  imports: [CommonModule],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css'
})
export class ProfileDataComponent {

  @Input() profileData: UserProfileData | null = null;
  @Input() userLevel: SellingFee | null = null;

}
