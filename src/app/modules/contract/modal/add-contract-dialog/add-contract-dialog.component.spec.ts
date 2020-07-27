import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractDialogComponent } from './add-contract-dialog.component';

describe('AddContractDialogComponent', () => {
  let component: AddContractDialogComponent;
  let fixture: ComponentFixture<AddContractDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContractDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
