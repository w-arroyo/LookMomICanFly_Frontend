import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FilterProductsService } from '../../../services/filter_products/filter-products.service';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FilterSelectedOptions } from '../../../models/filter_options.model';

@Component({
  selector: 'app-filter-products',
  imports: [CommonModule],
  templateUrl: './filter-products.component.html',
  styleUrl: './filter-products.component.css'
})
export class FilterProductsComponent implements OnInit, OnDestroy{

  private filterProductsService:FilterProductsService;
  private productSummaryService: ProductSummaryService;
  private filterSelectedOptions:FilterSelectedOptions;
  isOpen:boolean=false;
  yearList:number[]=[];
  colors:string[]=[];
  manufacturers:string[]=[];
  subcategories:string[]=[];
  category!:string|null;
  private destroyStream:Subject<void>=new Subject<void>();

  constructor(filterProductsService:FilterProductsService, productSummaryService: ProductSummaryService){
    this.filterProductsService=filterProductsService;
    this.productSummaryService=productSummaryService;
    this.filterSelectedOptions=new FilterSelectedOptions();
  }

  ngOnInit(): void {
    this.subscribeToVisibility();
    this.subscribeToYears();
    this.subscribeToColors();
    this.subscribeToManufacturers();
    this.subscribeToSubcategories();
  }

  private subscribeToVisibility(){
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
  }

  private subscribeToYears(){
    this.filterProductsService.getReleaseYears().pipe(
      takeUntil(
        this.destroyStream
      )
    ).subscribe({
      next: (data)=> this.yearList=data,
      error: (error) => {
        console.log(error);
        this.yearList=[]
      }
    });
  }

  private subscribeToColors(){
    this.filterProductsService.getDifferentColors().pipe(
      takeUntil(
        this.destroyStream
      )
    ).subscribe({
      next: (data)=> this.colors=data,
      error: (error) => {
        console.log(error);
        this.colors=[]
      }
    });
  }

  private subscribeToManufacturers(){
    this.filterProductsService.getDifferentManufacturers().pipe(
      takeUntil(
        this.destroyStream
      )
    ).subscribe({
      next: (data)=> this.manufacturers=data,
      error: (error) => {
        console.log(error);
        this.manufacturers=[]
      }
    });
  }

  private subscribeToSubcategories(){
    this.productSummaryService.currentCategorySubject.asObservable().pipe(
      takeUntil(
        this.destroyStream
      )
    ).subscribe({
      next: (data)=> {
        if(data!=null){
          this.category=data;
          this.filterProductsService.getCategorySubcategories(this.category).pipe(
            takeUntil(
              this.destroyStream
            )
          ).subscribe({
            next: (data)=> this.subcategories=data,
            error: (error) => {
              console.log(error);
              this.subcategories=[]
            }
          });
        }
      },
      error: (error) => {
        console.log(error);
        this.category=null;
      }
    });
  }

  applyFilters() {
    this.clearSelection();
    this.filterProductsService.isVisibleSubject.next(false);
  }

  closeFilterEvent() {
    this.clearSelection();
    this.filterProductsService.isVisibleSubject.next(false);
  }

  private getSelectedCheckboxes(){
    
  }

  private clearSelection(){
    // get checkboxes and uncheck them
    this.filterSelectedOptions.clearOptions();
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

}
