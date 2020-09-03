import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmspackagelistComponent } from './smspackagelist.component';

describe('SmspackagelistComponent', () => {
  let component: SmspackagelistComponent;
  let fixture: ComponentFixture<SmspackagelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmspackagelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmspackagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
