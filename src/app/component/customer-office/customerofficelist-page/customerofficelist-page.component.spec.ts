import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOfficelistPageComponent } from './customerofficelist-page.component';

describe('CustomerOfficelistPageComponent', () => {
  let component: CustomerOfficelistPageComponent;
  let fixture: ComponentFixture<CustomerOfficelistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOfficelistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOfficelistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
