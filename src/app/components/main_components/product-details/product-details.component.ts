import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsService } from '../../../services/product_details/product-details.service';
import { catchError, Observable, Subject, takeUntil } from 'rxjs';
import { Sneakers } from '../../../models/sneakers.model';
import { PostTableComponent } from '../../secondary_components/post-table/post-table.component';
import { PostService } from '../../../services/post/post.service';
import { SuccessfullRequest } from '../../../models/successful_request.model';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, PostTableComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy{

  private router:Router;
  private activatedRoute:ActivatedRoute;
  private productDetailsService:ProductDetailsService;
  postService:PostService;
  product$!:Observable<Sneakers>;
  private destroyStream:Subject<void>=new Subject<void>();
  productPostDetails$:Observable<Observable<SuccessfullRequest>[]>;


  isLiked: boolean = false;
  selectedSize: string | null = null;
  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL'];

  constructor(router:Router,productDetailsService:ProductDetailsService,activatedRoute:ActivatedRoute,postService:PostService){
    this.router=router;
    this.productDetailsService=productDetailsService;
    this.activatedRoute=activatedRoute;
    this.postService=postService;
    this.productPostDetails$=this.postService.productPostDetailsSubject.asObservable();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      takeUntil(
        this.destroyStream
      )
    ).subscribe(
      params=>{
        const category=params.get('category');
        const productId=params.get('productId');
        if(category && productId){
          this.product$=this.productDetailsService.loadProductPage(productId,category).pipe(
            catchError(
              (error)=>{
                console.log(error.error?.error);
                this.goToHomeScreen();
                throw(()=>new Error(error.error?.error));
              }
            )
          );
        }
        else this.goToHomeScreen();
      }
    );
  }

  goToHomeScreen(): void{
    this.router.navigate(['home']);
  }

  getProductImage(name:string){
    return `${name}.jpg`
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  checkProductType(product:Object){
    return typeof product;
  }

  ngOnDestroy(): void {
    this.destroyStream.next();
    this.destroyStream.complete();
  }

}
