import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcardsComponent } from './uploadcards.component';

describe('UploadcardsComponent', () => {
  let component: UploadcardsComponent;
  let fixture: ComponentFixture<UploadcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
