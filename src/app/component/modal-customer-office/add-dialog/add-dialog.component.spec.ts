import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerOfficeDialogComponent } from './add-dialog.component';

describe('AddCustomerOfficeDialogComponent', () => {
  let component: AddCustomerOfficeDialogComponent;
  let fixture: ComponentFixture<AddCustomerOfficeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerOfficeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerOfficeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
