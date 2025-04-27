import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { SaleService } from '../../../services/sale/sale.service';
import { Sale } from '../../../models/sale.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale-details',
  imports: [CommonModule,RouterLinkWithHref],
  templateUrl: './sale-details.component.html',
  styleUrl: './sale-details.component.css'
})
export class SaleDetailsComponent implements OnInit{

  saleId: string = '';
  sale$!: Observable<Sale>;

  private saleService: SaleService;
  private router: Router;
  private activatedRoute: ActivatedRoute

  constructor(saleService: SaleService, router: Router, activatedRoute: ActivatedRoute){
    this.saleService=saleService;
    this.router=router;
    this.activatedRoute=activatedRoute;
  }

  ngOnInit(): void {
    const saleId = this.activatedRoute.snapshot.paramMap.get('saleId');
    if (!saleId) {
      this.router.navigate(['home']);
      return;
    }
    this.saleId = saleId;
    this.getSale();
  }

  private getSale() {
    this.sale$ = this.saleService.findSale(this.saleId).pipe(
      catchError((error) => {
        console.log(error);
        this.router.navigate(['home']);
        return throwError(() => new Error(error.error?.error));
      })
    );
  }

  getProductImage(productName: string): string {
    return `${productName}.jpg`;
  }

  calculateTotalPayout(amount: number, feePercentage: number, shippingFee: number): number {
    const feeAmount = amount * (feePercentage / 100);
    return amount - feeAmount - shippingFee;
  }
  
}
