import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageDetailedComponent } from './usage-detailed.component';

describe('UsageDetailedComponent', () => {
  let component: UsageDetailedComponent;
  let fixture: ComponentFixture<UsageDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
