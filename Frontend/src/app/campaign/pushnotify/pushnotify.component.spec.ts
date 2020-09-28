import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushnotifyComponent } from './pushnotify.component';

describe('PushnotifyComponent', () => {
  let component: PushnotifyComponent;
  let fixture: ComponentFixture<PushnotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushnotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushnotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
