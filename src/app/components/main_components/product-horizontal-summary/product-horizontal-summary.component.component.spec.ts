import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHorizontalSummaryComponentComponent } from './product-horizontal-summary.component.component';

describe('ProductHorizontalSummaryComponentComponent', () => {
  let component: ProductHorizontalSummaryComponentComponent;
  let fixture: ComponentFixture<ProductHorizontalSummaryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductHorizontalSummaryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductHorizontalSummaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
