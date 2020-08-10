import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsystemtemplatesComponent } from './viewsystemtemplates.component';

describe('ViewsystemtemplatesComponent', () => {
  let component: ViewsystemtemplatesComponent;
  let fixture: ComponentFixture<ViewsystemtemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsystemtemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsystemtemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
