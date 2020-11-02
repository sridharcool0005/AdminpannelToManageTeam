import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalcardsComponent } from './digitalcards.component';

describe('DigitalcardsComponent', () => {
  let component: DigitalcardsComponent;
  let fixture: ComponentFixture<DigitalcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
