import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfficesDetailComponent } from './customer-offices-detail.component';

describe('CustomerOfficesDetailComponent', () => {
  let component: CustomerOfficesDetailComponent;
  let fixture: ComponentFixture<CustomerOfficesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOfficesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOfficesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
