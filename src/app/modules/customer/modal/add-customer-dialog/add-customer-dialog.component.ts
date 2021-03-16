import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.css']
})
export class AddCustomerDialogComponent implements OnInit {
  customerForm: FormGroup;
  submitted = false;

  constructor( private dialogRef: MatDialogRef<AddCustomerDialogComponent>,
               private formBuilder: FormBuilder) { }



  /*customerForm = new FormGroup({
    nome: new FormControl('', [ Validators.required, ] ),
    legaladdress: new FormControl('', [ Validators.required, ] ),
  });*/

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      nome: ['', Validators.required],
      legaladdress: ['', Validators.required],
      piva: ['', Validators.required],
      rea: [''],
      postacertificata: [''],
      referente: [''],
    });
  }

  get f() { return this.customerForm.controls; }

  onsubmit() {

    this.submitted = true;

    if ( this.customerForm.invalid ) {
      //console.log(this.submitted && this.f.nome.errors );
      return false;
    }
    this.dialogRef.close({ data: this.customerForm.value });
  }

}
