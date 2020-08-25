import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapksComponent } from './viewapks.component';

describe('ViewapksComponent', () => {
  let component: ViewapksComponent;
  let fixture: ComponentFixture<ViewapksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewapksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewapksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
