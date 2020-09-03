import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentdetailsupdateComponent } from './paymentdetailsupdate.component';

describe('PaymentdetailsupdateComponent', () => {
  let component: PaymentdetailsupdateComponent;
  let fixture: ComponentFixture<PaymentdetailsupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentdetailsupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentdetailsupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
