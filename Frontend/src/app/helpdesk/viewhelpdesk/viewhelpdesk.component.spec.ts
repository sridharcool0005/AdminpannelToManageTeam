import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewhelpdeskComponent } from './viewhelpdesk.component';

describe('ViewhelpdeskComponent', () => {
  let component: ViewhelpdeskComponent;
  let fixture: ComponentFixture<ViewhelpdeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewhelpdeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewhelpdeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
