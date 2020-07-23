import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfficelistListComponent } from './customerofficelist-list.component';

describe('CustomerOfficelistListComponent', () => {
  let component: CustomerOfficelistListComponent;
  let fixture: ComponentFixture<CustomerOfficelistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOfficelistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOfficelistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
