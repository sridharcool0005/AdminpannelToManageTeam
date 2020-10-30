import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerviewComponent } from './resellerview.component';

describe('ResellerviewComponent', () => {
  let component: ResellerviewComponent;
  let fixture: ComponentFixture<ResellerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResellerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
