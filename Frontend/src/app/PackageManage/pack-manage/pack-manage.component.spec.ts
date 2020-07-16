import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackManageComponent } from './pack-manage.component';

describe('PackManageComponent', () => {
  let component: PackManageComponent;
  let fixture: ComponentFixture<PackManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
