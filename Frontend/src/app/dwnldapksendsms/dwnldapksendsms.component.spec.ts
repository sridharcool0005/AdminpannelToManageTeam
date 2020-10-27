import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DwnldapksendsmsComponent } from './dwnldapksendsms.component';

describe('DwnldapksendsmsComponent', () => {
  let component: DwnldapksendsmsComponent;
  let fixture: ComponentFixture<DwnldapksendsmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DwnldapksendsmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DwnldapksendsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
