import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApkuploadsComponent } from './apkuploads.component';

describe('ApkuploadsComponent', () => {
  let component: ApkuploadsComponent;
  let fixture: ComponentFixture<ApkuploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApkuploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApkuploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
