import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerofficeprofileFormComponent } from './customerofficeprofile-form.component';

describe('CustomerofficeprofileFormComponent', () => {
  let component: CustomerofficeprofileFormComponent;
  let fixture: ComponentFixture<CustomerofficeprofileFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerofficeprofileFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerofficeprofileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
