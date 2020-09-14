import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuypremiumplansComponent } from './buypremiumplans.component';

describe('BuypremiumplansComponent', () => {
  let component: BuypremiumplansComponent;
  let fixture: ComponentFixture<BuypremiumplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuypremiumplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuypremiumplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
