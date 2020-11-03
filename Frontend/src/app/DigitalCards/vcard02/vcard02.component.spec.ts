import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vcard02Component } from './vcard02.component';

describe('Vcard02Component', () => {
  let component: Vcard02Component;
  let fixture: ComponentFixture<Vcard02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vcard02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vcard02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
