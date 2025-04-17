import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductSummary } from '../../../models/product_summary.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AskService } from '../../../services/ask/ask.service';

@Component({
  selector: 'app-product-summary-details',
  imports: [CommonModule],
  templateUrl: './product-summary-details.component.html',
  styleUrl: './product-summary-details.component.css'
})
export class ProductSummaryDetailsComponent implements OnInit{

  private router:Router;
  private askService: AskService;
  askAmount!: string;
  @Input() productSummary!: ProductSummary;

  constructor(router:Router, askService: AskService){
    this.router=router;
    this.askService=askService;
  }

  ngOnInit(): void {
    this.askService.getLowestAskAmount(this.productSummary.id).subscribe({
      next: (data) =>{
        this.askAmount=data.message;
      },
      error: (error) =>{
        console.log(error.message);
        this.askAmount=' -';
      }
  });
  }

  getImage(name: String): string{
    return `${name}.jpg`
  }

}
