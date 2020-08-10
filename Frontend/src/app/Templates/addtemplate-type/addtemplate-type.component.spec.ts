import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtemplateTypeComponent } from './addtemplate-type.component';

describe('AddtemplateTypeComponent', () => {
  let component: AddtemplateTypeComponent;
  let fixture: ComponentFixture<AddtemplateTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddtemplateTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtemplateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
