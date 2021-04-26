import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeOntopPromotionComponent } from './be-ontop-promotion.component';

describe('BeOntopPromotionComponent', () => {
  let component: BeOntopPromotionComponent;
  let fixture: ComponentFixture<BeOntopPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeOntopPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeOntopPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
