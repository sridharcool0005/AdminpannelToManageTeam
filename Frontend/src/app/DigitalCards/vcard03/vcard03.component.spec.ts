import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vcard03Component } from './vcard03.component';

describe('Vcard03Component', () => {
  let component: Vcard03Component;
  let fixture: ComponentFixture<Vcard03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vcard03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vcard03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
