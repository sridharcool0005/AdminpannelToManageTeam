import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewclientsComponent } from './viewclients.component';

describe('ViewclientsComponent', () => {
  let component: ViewclientsComponent;
  let fixture: ComponentFixture<ViewclientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewclientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewclientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
