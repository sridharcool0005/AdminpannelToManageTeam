import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacktabsComponent } from './packtabs.component';

describe('PacktabsComponent', () => {
  let component: PacktabsComponent;
  let fixture: ComponentFixture<PacktabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacktabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacktabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
