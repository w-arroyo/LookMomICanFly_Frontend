import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BidDetails } from '../../../models/full_bid.model';
import { BidService } from '../../../services/bid/bid.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bid-details',
  imports: [CommonModule],
  templateUrl: './bid-details.component.html',
  styleUrl: './bid-details.component.css'
})
export class BidDetailsComponent implements OnInit{

  bidId:string='';
  bid$!:Observable<BidDetails>;
  private bidService:BidService;
  private router:Router;
  private activatedRoute:ActivatedRoute;

  constructor(bidService: BidService,router:Router,activatedRoute:ActivatedRoute) {
    this.bidService=bidService;
    this.router=router;
    this.activatedRoute=activatedRoute;
  }

  ngOnInit():void {
    const bid=this.activatedRoute.snapshot.paramMap.get('bidId');
    if(!bid){
      this.router.navigate(['home']);
      return;
    }
    this.bidId=bid;
    this.getBid();
  }

  private getBid() {
    this.bid$=this.bidService.findBid(this.bidId).pipe(
      catchError(
        (error) => {
          console.log(error);
          this.router.navigate(['home']);
          return throwError(() => new Error(error.error?.error));
        }
      )
    );
  }

  getProductImage(productName:string): string {
    return `${productName}.jpg`;
  }

  calculateTotalCost(amount: number,feePercentage:number,shippingCost:number):number{
    const feeAmount=amount*(feePercentage/100);
    return amount+feeAmount+shippingCost;
  }
}
