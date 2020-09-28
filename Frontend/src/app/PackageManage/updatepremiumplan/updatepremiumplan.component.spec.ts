import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepremiumplanComponent } from './updatepremiumplan.component';

describe('UpdatepremiumplanComponent', () => {
  let component: UpdatepremiumplanComponent;
  let fixture: ComponentFixture<UpdatepremiumplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepremiumplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepremiumplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
