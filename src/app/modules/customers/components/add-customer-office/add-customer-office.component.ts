import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer-office',
  templateUrl: './add-customer-office.component.html',
  styleUrls: ['./add-customer-office.component.css']
})
export class AddCustomerOfficeComponent implements OnInit {
  addCustomerOfficeForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, 
              private dialogRef: MatDialogRef<AddCustomerOfficeComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data); 
    this.addCustomerOfficeForm = this.fb.group({
      address: [this.data['office'] ? this.data['office'].address : '', Validators.required],
      citta: [this.data['office'] ? this.data['office'].city : '', Validators.required],
      cap: [this.data['office'] ? this.data['office'].cap : '', Validators.required],
    });
  }

  isValidInput(fieldName): boolean {
    return this.addCustomerOfficeForm.controls[fieldName].invalid &&
      (this.addCustomerOfficeForm.controls[fieldName].dirty || this.addCustomerOfficeForm.controls[fieldName].touched);
  }

  saveCustomerOffice() {
    this.dialogRef.close({ data: this.addCustomerOfficeForm.value });
  }

  close() {
    this.dialogRef.close();
  }

}
