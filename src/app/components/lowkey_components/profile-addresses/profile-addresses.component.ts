import { Component, OnInit } from '@angular/core';
import { Address } from '../../../models/address,model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileDataService } from '../../../services/profile/profile-data.service';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-profile-addresses',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile-addresses.component.html',
  styleUrl: './profile-addresses.component.css'
})
export class ProfileAddressesComponent implements OnInit{

  private profileDataService:ProfileDataService;
  addresses$!:Observable<Address[]>;
  isAddingAddress: boolean = false;
  errorMessage: string | null = null;
  newAddress:Address;

  constructor(profileDataService:ProfileDataService){
    this.profileDataService=profileDataService;
    this.newAddress=new Address();
  }

  ngOnInit(): void {
    this.addresses$=this.profileDataService.getUserAddresses().pipe(
      catchError(
        (error)=>{
          console.log(error.error?.error);
          return throwError(()=> new Error(error.error?.error));
        }
      )
    )
  }

  saveAddress(){
    
  }

  deleteAddress(addressId: string): void {
    // Aquí implementarás la lógica para eliminar la dirección
    // Por ahora solo la eliminamos del array de ejemplo
    //this.addresses = this.addresses.filter(addr => addr.id !== addressId);
    // En tu implementación real, probablemente llamarías a un servicio:
    // this.addressService.deleteAddress(addressId).subscribe(...);
  }

  openAddAddressForm(): void {
    this.isAddingAddress = true;
    this.errorMessage = null;
    this.newAddress=new Address();
   
  }

  cancelAddAddress(): void {
    this.isAddingAddress = false;
    this.errorMessage = null;
  }

}
