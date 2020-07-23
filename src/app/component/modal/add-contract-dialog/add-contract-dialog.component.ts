import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contract-dialog',
  templateUrl: './add-contract-dialog.component.html',
  styleUrls: ['./add-contract-dialog.component.css']
})
export class AddContractDialogComponent implements OnInit {

  public submitted: boolean = false;

  profileForm = new FormGroup({
    contracttype: new FormControl('', [ Validators.required, ] ),
    startingfrom: new FormControl('', [ Validators.required, ] ),
    companyid: new FormControl('', [ Validators.required, ] ),
    anagraphicid: new FormControl('', [ Validators.required, ] ),
    anastablevalue: new FormControl('', [ Validators.required, ] ),
    cartype: new FormControl('', [ Validators.required, ] ),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<AddContractDialogComponent>,
              ) { }

  ngOnInit(): void {

  }
  get f() { return this.profileForm.controls; }

  submit() {
    this.dialogRef.close({ data: this.profileForm.value });

  }
}

