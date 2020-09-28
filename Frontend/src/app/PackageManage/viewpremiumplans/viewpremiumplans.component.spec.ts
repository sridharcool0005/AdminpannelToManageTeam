import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpremiumplansComponent } from './viewpremiumplans.component';

describe('ViewpremiumplansComponent', () => {
  let component: ViewpremiumplansComponent;
  let fixture: ComponentFixture<ViewpremiumplansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpremiumplansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpremiumplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
