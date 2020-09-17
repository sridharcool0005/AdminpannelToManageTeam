import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanexpirytrackingComponent } from './planexpirytracking.component';

describe('PlanexpirytrackingComponent', () => {
  let component: PlanexpirytrackingComponent;
  let fixture: ComponentFixture<PlanexpirytrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanexpirytrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanexpirytrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
