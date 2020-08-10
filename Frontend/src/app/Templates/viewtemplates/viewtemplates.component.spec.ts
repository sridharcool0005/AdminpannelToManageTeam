import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtemplatesComponent } from './viewtemplates.component';

describe('ViewtemplatesComponent', () => {
  let component: ViewtemplatesComponent;
  let fixture: ComponentFixture<ViewtemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
