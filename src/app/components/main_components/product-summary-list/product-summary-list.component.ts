import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';
import { ProductSummaryDetailsComponent } from '../../secondary_components/product-summary-details/product-summary-details.component';
import { Observable, Subject } from 'rxjs';
import { ProductSummary } from '../../../models/product_summary.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-summary-list',
  imports: [CommonModule, ProductSummaryDetailsComponent],
  templateUrl: './product-summary-list.component.html',
  styleUrl: './product-summary-list.component.css'
})
export class ProductSummaryListComponent implements OnInit, OnDestroy {

  private productSummaryService: ProductSummaryService;
  productList$: Observable<ProductSummary[]>;
  private completeStream= new Subject<void>();
  private activatedRoute: ActivatedRoute;

  constructor(productSummaryService: ProductSummaryService, activatedRoute: ActivatedRoute){
    this.productSummaryService=productSummaryService;
    this.productList$=productSummaryService.productListBehaviorSubject.asObservable();
    this.activatedRoute=activatedRoute;
  }

  ngOnInit(): void {
    if(this.productSummaryService.productListBehaviorSubject.value.length==0){
      let path='';
      this.activatedRoute.url.subscribe(
      parts=>{
        path = parts.map(part => part.path).join('/');
      }
    );
    this.filterProducts(path);
    }
  }

  private filterProducts(path:string):void{
    if(path.includes('category')){
      const category=this.activatedRoute.snapshot.paramMap.get('category');
      if(category!=null)
        this.productSummaryService.productsByCategory(category);
    }
  }

  ngOnDestroy(): void {
    this.completeStream.next();
    this.completeStream.complete();
  }

}
