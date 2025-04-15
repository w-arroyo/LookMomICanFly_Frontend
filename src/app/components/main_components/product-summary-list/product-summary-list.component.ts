import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';
import { ProductSummaryDetailsComponent } from '../../secondary_components/product-summary-details/product-summary-details.component';
import { Observable, Subject } from 'rxjs';
import { ProductSummary } from '../../../models/product_summary.model';
import { ActivatedRoute } from '@angular/router';
import { FilterProductsComponent } from '../../secondary_components/filter-products/filter-products.component';
import { FilterProductsService } from '../../../services/filter_products/filter-products.service';

@Component({
  selector: 'app-product-summary-list',
  imports: [CommonModule, ProductSummaryDetailsComponent, FilterProductsComponent],
  templateUrl: './product-summary-list.component.html',
  styleUrl: './product-summary-list.component.css'
})
export class ProductSummaryListComponent implements OnInit, OnDestroy {

  private productSummaryService: ProductSummaryService;
  productList$: Observable<ProductSummary[]>;
  private activatedRoute: ActivatedRoute;
  private filterProductsService:FilterProductsService;

  constructor(productSummaryService: ProductSummaryService, activatedRoute: ActivatedRoute, filterProductsService:FilterProductsService){
    this.productSummaryService=productSummaryService;
    this.productList$=productSummaryService.productListBehaviorSubject.asObservable();
    this.activatedRoute=activatedRoute;
    this.filterProductsService=filterProductsService;
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
      if(category!=null && category.trim()!=='')
        this.productSummaryService.productsByCategory(category);
    }
    else if(path.includes('search')){
      const productName=this.activatedRoute.snapshot.paramMap.get('product-name');
      if(productName!=null && productName.trim()!==''){
        this.productSummaryService.productsBySearch(productName);
      }
    }
    else if(path.includes('best-sellers')){
      this.productSummaryService.productsByBestSellers();
    }
    else if(path.includes('all')){
      this.productSummaryService.allProducts();
    }
  }

  activateFilterComponent() {
    this.filterProductsService.isVisibleSubject.next(true);
  }

  onFilterClose() {
    this.filterProductsService.isVisibleSubject.next(false);
  }

  ngOnDestroy(): void {
    
  }

}
