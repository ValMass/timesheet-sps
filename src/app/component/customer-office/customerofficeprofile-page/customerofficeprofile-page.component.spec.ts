import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerofficeprofilePageComponent } from './customerofficeprofile-page.component';

describe('CustomerofficeprofilePageComponent', () => {
  let component: CustomerofficeprofilePageComponent;
  let fixture: ComponentFixture<CustomerofficeprofilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerofficeprofilePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerofficeprofilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
