import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewusersfeedbackComponent } from './viewusersfeedback.component';

describe('ViewusersfeedbackComponent', () => {
  let component: ViewusersfeedbackComponent;
  let fixture: ComponentFixture<ViewusersfeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewusersfeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewusersfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
