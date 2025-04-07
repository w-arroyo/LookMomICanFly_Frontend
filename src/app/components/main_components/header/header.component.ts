import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  showCategories = false;
  searchActive = false;
  isExpanded = false;
  headerHeight = 60;
  httpClient: HttpClient;
  destroyStream= new Subject<void>();
  categories: String[]=[];

  constructor(httpClient: HttpClient){
    this.httpClient=httpClient;
  }

  ngOnInit(): void{
    this.httpClient.get<{categories: String[]}>(`http://localhost:8080/api/products/categories/`).pipe(
      takeUntil(this.destroyStream)
    )
    .subscribe({
      next: (categories) => {
        this.categories=categories.categories;
        categories.categories.map((category)=> console.log(category))
      },
      error: (error) => {console.log(error)}
    });
    
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

  expandCategories() {
    this.showCategories = true;
    this.isExpanded = true;
    // Altura del header: 60px (base) + altura del dropdown (aproximadamente 250px)
    this.headerHeight = 310;
  }

  expandSearch() {
    this.searchActive = true;
    this.isExpanded = true;
    // Altura del header: 60px (base) + altura del search box (aproximadamente 60px)
    this.headerHeight = 120;
  }

  collapseHeader() {
    this.showCategories = false;
    this.searchActive = false;
    this.isExpanded = false;
    this.headerHeight = 60;
  }

}
