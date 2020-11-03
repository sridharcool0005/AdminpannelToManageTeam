import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Vcard01Component } from './vcard01.component';

describe('Vcard01Component', () => {
  let component: Vcard01Component;
  let fixture: ComponentFixture<Vcard01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Vcard01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Vcard01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
