import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewapkdownloadComponent } from './viewapkdownload.component';

describe('ViewapkdownloadComponent', () => {
  let component: ViewapkdownloadComponent;
  let fixture: ComponentFixture<ViewapkdownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewapkdownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewapkdownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
