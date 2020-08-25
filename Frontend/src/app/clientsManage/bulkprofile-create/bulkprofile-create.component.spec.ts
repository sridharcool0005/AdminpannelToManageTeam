import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkprofileCreateComponent } from './bulkprofile-create.component';

describe('BulkprofileCreateComponent', () => {
  let component: BulkprofileCreateComponent;
  let fixture: ComponentFixture<BulkprofileCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkprofileCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkprofileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
