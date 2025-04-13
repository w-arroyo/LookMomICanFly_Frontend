import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';

@Component({
  selector: 'app-product-summary-list',
  imports: [CommonModule],
  templateUrl: './product-summary-list.component.html',
  styleUrl: './product-summary-list.component.css'
})
export class ProductSummaryListComponent {

  private productSummaryService: ProductSummaryService;

  constructor(productSummaryService: ProductSummaryService){
    this.productSummaryService=productSummaryService;
  }

}
