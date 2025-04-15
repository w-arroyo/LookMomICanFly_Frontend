import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterProductsService } from '../../../services/filter_products/filter-products.service';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-filter-products',
  imports: [CommonModule],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.css'
})
export class FilterProductsComponent implements OnInit, OnDestroy{

  private filterProductsService:FilterProductsService;
  private productSummaryService: ProductSummaryService;
  isOpen:boolean=false;
  yearList:number[]=[];
  colors:string[]=[];
  private destroyStream:Subject<void>=new Subject<void>();

  constructor(filterProductsService:FilterProductsService, productSummaryService: ProductSummaryService){
    this.filterProductsService=filterProductsService;
    this.productSummaryService=productSummaryService;
  }

  ngOnInit(): void {
    this.filterProductsService.isVisible$.pipe(
      takeUntil(
        this.destroyStream
      )
    )
    .subscribe({
      next: (data)=> this.isOpen=data,
      error: (error)=>{
        console.log(error);
        this.isOpen=false;
      }
    });
    this.filterProductsService.getReleaseYears().subscribe({
      next: (data)=> this.yearList=data,
      error: (error) => {
        console.log(error);
        this.yearList=[]
      }
    });
    this.filterProductsService.getDifferentColors().subscribe({
      next: (data)=> this.colors=data,
      error: (error) => {
        console.log(error);
        this.colors=[]
      }
    });
  }

  applyFilters() {
    this.filterProductsService.isVisibleSubject.next(false);
  }

  closeFilterEvent() {
    this.filterProductsService.isVisibleSubject.next(false);
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

}
