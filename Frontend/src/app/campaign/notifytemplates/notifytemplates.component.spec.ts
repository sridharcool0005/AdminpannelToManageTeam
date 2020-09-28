import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifytemplatesComponent } from './notifytemplates.component';

describe('NotifytemplatesComponent', () => {
  let component: NotifytemplatesComponent;
  let fixture: ComponentFixture<NotifytemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifytemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifytemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
