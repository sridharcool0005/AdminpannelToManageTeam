import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaddigprofileComponent } from './uploaddigprofile.component';

describe('UploaddigprofileComponent', () => {
  let component: UploaddigprofileComponent;
  let fixture: ComponentFixture<UploaddigprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddigprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddigprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
