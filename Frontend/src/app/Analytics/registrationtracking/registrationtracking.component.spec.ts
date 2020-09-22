import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationtrackingComponent } from './registrationtracking.component';

describe('RegistrationtrackingComponent', () => {
  let component: RegistrationtrackingComponent;
  let fixture: ComponentFixture<RegistrationtrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationtrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationtrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
