import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionBoxSummaryComponent } from '../../lowkey_components/transaction-box-summary/transaction-box-summary.component';
import { ProductSummaryService } from '../../../services/product_summary/product-summary.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { SaleService } from '../../../services/sale/sale.service';
import { OrderService } from '../../../services/order/order.service';
import { Observable } from 'rxjs';
import { TransactionSummary } from '../../../models/transaction_summary.model';

@Component({
  selector: 'app-transaction-list',
  imports: [CommonModule, TransactionBoxSummaryComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit, OnDestroy{

  private productService:ProductSummaryService;
  private transactionService:TransactionService;
  private saleService:SaleService;
  private orderService:OrderService;

  private transactions$!:Observable<TransactionSummary[]>;
  
  constructor(productService:ProductSummaryService,transactionService:TransactionService,saleService:SaleService,orderService:OrderService){
    this.productService=productService;
    this.transactionService=transactionService;
    this.saleService=saleService;
    this.orderService=orderService;
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

}
