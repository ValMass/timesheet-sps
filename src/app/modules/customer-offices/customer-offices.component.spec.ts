import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfficesComponent } from './customer-offices.component';

describe('CustomerOfficesComponent', () => {
  let component: CustomerOfficesComponent;
  let fixture: ComponentFixture<CustomerOfficesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOfficesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
