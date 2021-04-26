import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdltapprovelistComponent } from './viewdltapprovelist.component';

describe('ViewdltapprovelistComponent', () => {
  let component: ViewdltapprovelistComponent;
  let fixture: ComponentFixture<ViewdltapprovelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdltapprovelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdltapprovelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
