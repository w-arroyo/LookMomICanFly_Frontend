import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLinkWithHref, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private httpClient: HttpClient;
  private authenticationService: AuthenticationService;
  private productSummaryService: ProductSummaryService;
  private router: Router;
  showCategories = false;
  searchActive = false;
  isExpanded = false;
  accountActive= false;
  headerHeight = 60;
  search: string='';
  destroyStream= new Subject<void>();
  categories: String[]=[];
  isLogged: boolean=false;

  constructor(httpClient: HttpClient, authenticationService:AuthenticationService, router: Router, productSummaryService: ProductSummaryService){
    this.httpClient=httpClient;
    this.authenticationService=authenticationService;
    this.router=router;
    this.productSummaryService=productSummaryService;
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

  ngOnDestroy(): void{
    this.destroyStream.next();
    this.destroyStream.complete();
  }

  expandCategories(): void{
    this.showCategories = true;
    this.isExpanded = true;
    this.headerHeight = 320;
  }

  expandSearch(): void{
    this.search='';
    this.searchActive = true;
    this.isExpanded = true;
    this.headerHeight = 120;
  }

  expandAccount(): void{
      this.accountActive = true;
      this.isExpanded = true;
      this.headerHeight = 140;
  }

  collapseHeader(): void{
    this.showCategories = false;
    this.searchActive = false;
    this.isExpanded = false;
    this.headerHeight = 60;
  }

  logout(): void{
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

  redirectHome(): void{
    this.router.navigate(['/home']);
  }

  redirectToBestSellers(): void{
    this.router.navigate(['/products/best-sellers'])
  }

  redirectToCategory(category: String): void{
    this.productSummaryService.productsByCategory(category+'');
    this.router.navigate([`/products/category/${category.toLowerCase()}`])
  }

  searchItems(): void{
    if(this.search.trim()!=='')
      this.router.navigate([`/products/search/${this.search}`])    
  }

}
