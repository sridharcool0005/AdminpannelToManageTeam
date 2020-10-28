import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsmstoclientsComponent } from './sendsmstoclients.component';

describe('SendsmstoclientsComponent', () => {
  let component: SendsmstoclientsComponent;
  let fixture: ComponentFixture<SendsmstoclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsmstoclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsmstoclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
