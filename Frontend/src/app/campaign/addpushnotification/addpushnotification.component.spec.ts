import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpushnotificationComponent } from './addpushnotification.component';

describe('AddpushnotificationComponent', () => {
  let component: AddpushnotificationComponent;
  let fixture: ComponentFixture<AddpushnotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpushnotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpushnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
