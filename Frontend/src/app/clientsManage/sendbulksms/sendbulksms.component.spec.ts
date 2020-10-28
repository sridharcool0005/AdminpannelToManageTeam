import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendbulksmsComponent } from './sendbulksms.component';

describe('SendbulksmsComponent', () => {
  let component: SendbulksmsComponent;
  let fixture: ComponentFixture<SendbulksmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendbulksmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendbulksmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
