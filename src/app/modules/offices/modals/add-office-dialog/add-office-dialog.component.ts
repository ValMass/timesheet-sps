import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-office-dialog.component.html',
  styleUrls: ['./add-office-dialog.component.css']
})
export class AddOfficeDialogComponent implements OnInit {

  officeForm:FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void { 
    this.officeForm = this.formBuilder.group({
      numeroOre: [null, [Validators.required]],
      contractCode: [null, [Validators.required]],
      eventDate: [null, [Validators.required]]
    });
  }

  submit(){
   console.log(this.officeForm.value);
  }

  close(){

  }

}
