import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSummaryComponentComponent } from './product-summary.component.component';

describe('ProductSummaryComponentComponent', () => {
  let component: ProductSummaryComponentComponent;
  let fixture: ComponentFixture<ProductSummaryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSummaryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSummaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
