import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailedComponent } from './purchase-detailed.component';

describe('PurchaseDetailedComponent', () => {
  let component: PurchaseDetailedComponent;
  let fixture: ComponentFixture<PurchaseDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
