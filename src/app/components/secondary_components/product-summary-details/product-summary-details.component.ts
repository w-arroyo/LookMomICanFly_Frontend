import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductSummary } from '../../../models/product_summary.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-summary-details',
  imports: [CommonModule],
  templateUrl: './product-summary-details.component.html',
  styleUrl: './product-summary-details.component.css'
})
export class ProductSummaryDetailsComponent{

  private router:Router;
  @Input() productSummary!: ProductSummary;

  constructor(router:Router){
    this.router=router;
  }

  getImage(name: String): string{
    return `${name}.jpg`
  }

}
