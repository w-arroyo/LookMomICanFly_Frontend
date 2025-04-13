import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  httpClient: HttpClient;
  authenticationService: AuthenticationService;
  showCategories = false;
  searchActive = false;
  isExpanded = false;
  accountActive= false;
  headerHeight = 60;
  destroyStream= new Subject<void>();
  categories: String[]=[];
  isLogged: boolean=false;

  constructor(httpClient: HttpClient, authenticationService:AuthenticationService){
    this.httpClient=httpClient;
    this.authenticationService=authenticationService;
  }

  ngOnInit(): void{
    this.httpClient.get<{categories: String[]}>(`http://localhost:8080/api/products/categories/`).pipe(
      takeUntil(this.destroyStream)
    )
    .subscribe({
      next: (categories) => {
        this.categories=categories.categories;
      },
      error: (error) => {console.log(error)}
    });
    this.authenticationService.isLogged$.pipe(
      takeUntil(this.destroyStream)
    )
    .subscribe({
      next: (data)=> this.isLogged=data,
      error: (error) => {
        console.log(error);
        this.isLogged=false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

  expandCategories() {
    this.showCategories = true;
    this.isExpanded = true;
    this.headerHeight = 320;
  }

  expandSearch() {
    this.searchActive = true;
    this.isExpanded = true;
    this.headerHeight = 120;
  }

  expandAccount() {
    
      this.accountActive = true;
      this.isExpanded = true;
      this.headerHeight = 140;
    
  }

  collapseHeader() {
    this.showCategories = false;
    this.searchActive = false;
    this.isExpanded = false;
    this.headerHeight = 60;
  }

}
