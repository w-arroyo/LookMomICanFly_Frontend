import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, Observable, shareReplay, throwError } from 'rxjs';
import { PostService } from '../../../services/post/post.service';
import { SuccessfullRequest } from '../../../models/successful_request.model';

@Component({
  selector: 'app-post-table',
  imports: [CommonModule],
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.css'
})
export class PostTableComponent implements OnInit{

  postService:PostService;
  private bidsCache:{[size:string]:Observable<SuccessfullRequest>}={};
  private asksCache:{[size:string]:Observable<SuccessfullRequest>}={};
  private salesCache:{[size:string]:Observable<SuccessfullRequest>}={};
  @Input() productId!: string;
  isTableOpen = false;
  sizes$!: Observable<string[]>;

  selectedSize: string | null = null;

  constructor(postService:PostService){
    this.postService=postService;
  }

  ngOnInit(): void {
    this.sizes$=this.postService.getProductSizes(this.productId).pipe(
      catchError(
        (error)=>{
          console.log(error.error?.error);
          return throwError(()=>new Error(error.error?.error))
        }
      )
    );
  }

  getAsk(size:string): Observable<SuccessfullRequest>{
    if(!this.asksCache[size]){
      this.asksCache[size]=this.postService.findLowestAskByProductIdAndSize(this.productId,size)
      .pipe(
        shareReplay(1)
      )
    }
    return this.asksCache[size];
  }

  getBid(size:string): Observable<SuccessfullRequest>{
    if(!this.bidsCache[size]){
      this.bidsCache[size]=this.postService.findHighestBidByProductIdAndSize(this.productId,size)
      .pipe(
        shareReplay(1)
      )
    }
    return this.bidsCache[size];
  }

  getSale(size:string): Observable<SuccessfullRequest>{
    if(!this.salesCache[size]){
      this.salesCache[size]=this.postService.findProductLastSaleBySize(this.productId,size)
      .pipe(
        shareReplay(1)
      )
    }
    return this.salesCache[size];
  }

  toggleTable() {
    this.isTableOpen = !this.isTableOpen;
  }

  selectSize(size:string) {
    this.selectedSize = size;
    this.postService.productPostDetailsSubject.next([this.bidsCache[size],this.asksCache[size],this.salesCache[size]]);
    this.postService.selectedSizeSubject.next(size);
    this.isTableOpen = false;
  }

}
