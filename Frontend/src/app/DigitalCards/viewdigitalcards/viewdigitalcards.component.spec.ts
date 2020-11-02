import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdigitalcardsComponent } from './viewdigitalcards.component';

describe('ViewdigitalcardsComponent', () => {
  let component: ViewdigitalcardsComponent;
  let fixture: ComponentFixture<ViewdigitalcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdigitalcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdigitalcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
