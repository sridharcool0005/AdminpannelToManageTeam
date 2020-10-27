import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendpushnotificationComponent } from './sendpushnotification.component';

describe('SendpushnotificationComponent', () => {
  let component: SendpushnotificationComponent;
  let fixture: ComponentFixture<SendpushnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendpushnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendpushnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
